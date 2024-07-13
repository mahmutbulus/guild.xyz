import { MenuItem, useDisclosure } from "@chakra-ui/react"
import { PencilSimple } from "@phosphor-icons/react/dist/ssr"
import EditRewardAvailabilityMenuItem from "components/[guild]/AccessHub/components/EditRewardAvailabilityMenuItem"
import RemovePlatformMenuItem from "components/[guild]/AccessHub/components/RemovePlatformMenuItem"
import useGuild from "components/[guild]/hooks/useGuild"
import PlatformCardMenu from "../../components/[guild]/RolePlatforms/components/PlatformCard/components/PlatformCardMenu"
import EditUniqueTextModal from "./EditUniqueTextModal"

type Props = {
  platformGuildId: string
}

const UniqueTextCardMenu = ({ platformGuildId }: Props): JSX.Element => {
  const { guildPlatforms } = useGuild()
  const guildPlatform = guildPlatforms?.find(
    (gp) => gp.platformGuildId === platformGuildId
  )

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <PlatformCardMenu>
        <MenuItem icon={<PencilSimple />} onClick={onOpen}>
          Edit unique secret
        </MenuItem>
        <EditRewardAvailabilityMenuItem platformGuildId={platformGuildId} />
        <RemovePlatformMenuItem platformGuildId={platformGuildId} />
      </PlatformCardMenu>

      <EditUniqueTextModal
        isOpen={isOpen}
        onClose={onClose}
        guildPlatformId={guildPlatform?.id}
        platformGuildData={guildPlatform?.platformGuildData}
      />
    </>
  )
}
export default UniqueTextCardMenu
