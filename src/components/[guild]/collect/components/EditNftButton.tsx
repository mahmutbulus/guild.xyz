import { IconButton, useDisclosure } from "@chakra-ui/react"
import { ContractCallFunction } from "components/[guild]/RolePlatforms/components/AddRoleRewardModal/components/AddContractCallPanel/components/CreateNftForm/hooks/useCreateNft"
import { useThemeContext } from "components/[guild]/ThemeContext"
import { PiGearSix } from "react-icons/pi"
import EditNftModal from "rewards/ContractCall/components/EditNftModal"
import { useCollectNftContext } from "./CollectNftContext"

const EditNftButton = () => {
  const { guildPlatform } = useCollectNftContext()
  const { textColor, buttonColorScheme } = useThemeContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (
    guildPlatform.platformGuildData.function ===
    ContractCallFunction.DEPRECATED_SIMPLE_CLAIM
  )
    return null

  return (
    <>
      <IconButton
        icon={<PiGearSix />}
        aria-label="Edit NFT"
        size="sm"
        variant="ghost"
        colorScheme={buttonColorScheme}
        color={textColor}
        onClick={onOpen}
      />

      <EditNftModal
        isOpen={isOpen}
        onClose={onClose}
        guildPlatform={guildPlatform}
      />
    </>
  )
}
export default EditNftButton
