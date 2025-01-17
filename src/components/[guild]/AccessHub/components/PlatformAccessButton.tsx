import { Icon } from "@chakra-ui/react"
import { ArrowSquareOut } from "@phosphor-icons/react"
import Button from "components/common/Button"
import rewards from "rewards"
import { GuildPlatform, PlatformType } from "types"
import usePlatformAccessButton from "./usePlatformAccessButton"

type Props = {
  platform: GuildPlatform
}

const PlatformAccessButton = ({ platform }: Props) => {
  const { label, ...buttonProps } = usePlatformAccessButton(platform)
  const { colorScheme, icon } = rewards[PlatformType[platform.platformId]]

  return (
    <Button
      {...buttonProps}
      leftIcon={!buttonProps.href && <Icon as={icon} />}
      rightIcon={buttonProps.href && <ArrowSquareOut />}
      colorScheme={colorScheme}
    >
      {label}
    </Button>
  )
}

export default PlatformAccessButton
