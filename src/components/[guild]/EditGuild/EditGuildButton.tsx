import { IconButton } from "@chakra-ui/react"
import { PiGearSix } from "react-icons/pi"
import { useThemeContext } from "../ThemeContext"
import { useEditGuildDrawer } from "./EditGuildDrawerContext"

const EditGuildButton = (): JSX.Element => {
  const { onOpen } = useEditGuildDrawer()

  const { textColor, buttonColorScheme } = useThemeContext()

  return (
    <IconButton
      icon={<PiGearSix />}
      aria-label="Edit Guild"
      minW={"44px"}
      rounded="full"
      colorScheme={buttonColorScheme}
      color={textColor}
      onClick={onOpen}
    />
  )
}

export default EditGuildButton
