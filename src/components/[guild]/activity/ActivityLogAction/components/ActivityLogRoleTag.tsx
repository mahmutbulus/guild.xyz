import { TagProps, forwardRef } from "@chakra-ui/react"
import { DotsThreeVertical } from "@phosphor-icons/react/DotsThreeVertical"
import { IconProps } from "@phosphor-icons/react/dist/lib/types"
import RoleTag from "components/[guild]/RoleTag"
import useGuild from "components/[guild]/hooks/useGuild"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { useActivityLog } from "../../ActivityLogContext"
import ClickableTagPopover from "./ClickableTagPopover"
import FilterBy from "./ClickableTagPopover/components/FilterBy"
import ViewInCRM from "./ClickableTagPopover/components/ViewInCRM"
import ViewRole from "./ClickableTagPopover/components/ViewRole"

type Props = ClickableRoleTagProps &
  TagProps & {
    rightIcon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  }

const ActivityLogRoleTag = forwardRef<Props, "span">(
  ({ roleId, guildId, ...rest }, ref): JSX.Element => {
    const { data } = useActivityLog()

    const { roles } = useGuild(guildId)
    const guildRole = roles?.find((role) => role.id === roleId)
    const activityLogRole = data?.values.roles.find((role) => role.id === roleId)

    const name = activityLogRole?.name ?? guildRole?.name ?? "Unknown role"
    const imageUrl = guildRole?.imageUrl

    return <RoleTag ref={ref} name={name} imageUrl={imageUrl} {...rest} />
  }
)

type ClickableRoleTagProps = {
  roleId: number
  guildId: number
}

const ClickableRoleTag = ({
  roleId,
  guildId,
}: ClickableRoleTagProps): JSX.Element => (
  <ClickableTagPopover
    options={
      <>
        <FilterBy
          filter={{
            filter: "roleId",
            value: roleId.toString(),
          }}
        />
        <ViewInCRM
          label="View members"
          queryKey="roleId"
          queryValue={roleId.toString()}
        />
        <ViewRole roleId={roleId} />
      </>
    }
  >
    <ActivityLogRoleTag
      roleId={roleId}
      guildId={guildId}
      cursor="pointer"
      rightIcon={DotsThreeVertical}
    />
  </ClickableTagPopover>
)

export default ActivityLogRoleTag
export { ClickableRoleTag }
