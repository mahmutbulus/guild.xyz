import type { AccessCheckJob, AccessFlowJob } from "@guild.xyz/guild-queues"
import useGuild from "components/[guild]/hooks/useGuild"
import { useIntercom } from "components/_app/IntercomProvider"
import useFlow, { FlattenJobType } from "hooks/useFlow"
import { useEffect, useMemo } from "react"

type AccessCheckJobs = Extract<
  AccessFlowJob,
  { queueName: "access-preparation" | "access-logic" | "access-result" }
>

const emptyArrayToUndefined = <T>(value: T) =>
  Array.isArray(value) && value.length <= 0 ? undefined : value

type BaseAccessReturnType<Data> = {
  data: Data & {
    requirementAccesses: SWRData["children:access-check:jobs"]
  }
  error: any
  hasAccess: boolean
  isLoading: boolean
  mutate: () => Promise<string>
}

type SWRData = ReturnType<
  typeof useFlow<
    AccessCheckJobs,
    { "children:access-check:jobs": FlattenJobType<AccessCheckJob>[] }
  >
>["data"]

type GuildResult = BaseAccessReturnType<{
  roleAccesses: SWRData["roleAccesses"]
  requirementErrors: SWRData["children:access-check:jobs"][number]["error"][]
}>

type RoleResult = BaseAccessReturnType<{
  roleAccess: SWRData["roleAccesses"][number]
  roleErrors: SWRData["children:access-check:jobs"][number]["error"][]
}>

function useAccess(): GuildResult
function useAccess(roleId: undefined, newAccessFlowIntervalMs?: number): GuildResult
function useAccess(roleId: number, newAccessFlowIntervalMs?: number): RoleResult
function useAccess(
  roleId: number | "UNSET" = "UNSET",
  newAccessFlowIntervalMs?: number
) {
  const { id: guildId, roles } = useGuild()

  const requirementIdsByRoleId = useMemo(
    () =>
      Object.fromEntries(
        (roles ?? []).map((role) => [
          role.id,
          new Set(
            (role.requirements ?? []).map(({ id: requirementId }) => requirementId)
          ),
        ])
      ),
    [roles]
  )

  const poll = useFlow<
    AccessCheckJobs,
    { "children:access-check:jobs": FlattenJobType<AccessCheckJob>[] }
  >(
    `/v2/actions/access-check`,
    { guildId },
    { guildId: `${guildId}` },
    guildId && roleId !== 0,
    { creationPollMs: newAccessFlowIntervalMs }
  )

  const hasAccess = roleId
    ? poll.data?.roleAccesses?.find(
        (accessResult) => accessResult?.roleId === roleId
      )?.access
    : poll.data?.roleAccesses?.every(({ access }) => access)

  const roleBasedResult = roleId
    ? {
        roleAccess: poll?.data?.roleAccesses?.find(
          (roleAccess) => roleAccess.roleId === roleId
        ),
        roleErrors: emptyArrayToUndefined(
          poll.data?.["children:access-check:jobs"]
            ?.map(({ error }) => error)
            ?.filter(Boolean)
            ?.filter(({ requirementId }) =>
              requirementIdsByRoleId[roleId]?.has(requirementId)
            )
        ),
      }
    : {
        roleAccesses: poll.data?.roleAccesses,
        requirementErrors: emptyArrayToUndefined(
          poll.data?.["children:access-check:jobs"]
            ?.map(({ error }) => error)
            ?.filter(Boolean)
        ),
      }

  const { addIntercomSettings } = useIntercom()
  useEffect(() => {
    if (!poll.data) return

    const nullAccesseErrors = [
      ...new Set(
        (poll.data["children:access-check:jobs"] ?? [])
          .filter((acc) => acc.access === null)
          .map(({ error }) => error)
          .filter(Boolean)
          .map((err) => err.errorType)
      ),
    ]

    if (nullAccesseErrors.length)
      addIntercomSettings({ errorMessage: nullAccesseErrors.join() })
  }, [poll.data])

  return {
    data: {
      requirementAccesses: poll.data?.["children:access-check:jobs"],
      ...roleBasedResult,
    },
    error: poll.error,
    hasAccess,
    isLoading: poll.isLoading,
    mutate: () => poll.mutate(),
  }
}

export default useAccess
