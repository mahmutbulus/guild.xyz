import { JoinJob } from "@guildxyz/types"
import { CircleWavyCheck } from "@phosphor-icons/react/dist/ssr"
import { GUILD_PIN_MAINTENANCE } from "components/[guild]/Requirements/components/GuildCheckout/MintGuildPin/MintGuildPin"
import { useMintGuildPinContext } from "components/[guild]/Requirements/components/GuildCheckout/MintGuildPinContext"
import useGuild from "components/[guild]/hooks/useGuild"
import useUser from "components/[guild]/hooks/useUser"
import { UseSubmitOptions } from "hooks/useSubmit/useSubmit"
import { useToastWithButton, useToastWithTweetButton } from "hooks/useToast"
import { useRouter } from "next/router"
import { useState } from "react"
import useMembershipUpdate from "./useMembershipUpdate"

const useJoin = ({ onSuccess, onError }: UseSubmitOptions<JoinJob>) => {
  const guild = useGuild()
  const user = useUser()
  const toastWithTweetButton = useToastWithTweetButton()
  const toastWithButton = useToastWithButton()
  const [isNoAccess, setIsNoAccess] = useState(false)

  const mintGuildPinContext = useMintGuildPinContext()
  // Destructuring it separately, since we don't have a MintGuildPinContext on the POAP minting page
  const { onOpen } = mintGuildPinContext ?? {}
  const { pathname } = useRouter()

  const { triggerMembershipUpdate, joinProgress, isLoading, reset } =
    useMembershipUpdate({
      onSuccess: (response) => {
        if (
          response?.roleAccesses?.length > 0 &&
          response.roleAccesses.every((role) => !role.access)
        ) {
          setIsNoAccess(true)
          return
        }

        if (
          pathname === "/[guild]" &&
          guild.featureFlags.includes("GUILD_CREDENTIAL") &&
          guild.guildPin?.isActive &&
          !GUILD_PIN_MAINTENANCE
        ) {
          toastWithButton({
            status: "success",
            title: "Successfully joined guild",
            description: "Let others know as well by minting it onchain",
            buttonProps: {
              leftIcon: <CircleWavyCheck weight="fill" />,
              children: "Mint Guild Pin",
              onClick: onOpen,
            },
          })
        } else {
          toastWithTweetButton({
            title: "Successfully joined guild",
            tweetText: `Just joined the ${guild.name} guild. Continuing my brave quest to explore all corners of web3!
      guild.xyz/${guild.urlName}`,
          })
        }

        // mutate user in case they connected new platforms during the join flow
        user?.mutate?.()

        onSuccess?.(response)
      },
      onError,
      keepPreviousData: true,
    })

  return {
    onSubmit: (data) => {
      setIsNoAccess(false)
      triggerMembershipUpdate(data)
    },
    joinProgress: (isLoading || isNoAccess) && joinProgress,
    isLoading,
    reset,
  }
}

export default useJoin
