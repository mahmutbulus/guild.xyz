import { ButtonProps, IconButton, Tooltip } from "@chakra-ui/react"
import { Flag } from "@phosphor-icons/react/dist/ssr"
import Button from "components/common/Button"
import { useEffect } from "react"
import { addIntercomSettings } from "utils/intercom"
import useGuild from "./hooks/useGuild"

type Props = {
  layout?: "FULL" | "ICON"
} & ButtonProps

const label = "Report guild"
const className = "report-guild-btn"

const ReportGuildButton = ({
  layout = "FULL",
  ...buttonProps
}: Props): JSX.Element => {
  const { id, name } = useGuild()

  useEffect(() => {
    if (!id || !name) return
    addIntercomSettings({ reportedGuildName: `${name} (#${id})` })

    return () => addIntercomSettings({ reportedGuildName: null })
  }, [id, name])

  const baseButtonProps = {
    className,
    size: "sm",
    variant: "ghost",
  }

  return layout === "FULL" ? (
    <Button {...baseButtonProps} leftIcon={<Flag />} {...buttonProps}>
      {label}
    </Button>
  ) : (
    <Tooltip label={label} placement="top" hasArrow>
      <IconButton
        {...baseButtonProps}
        icon={<Flag />}
        aria-label={label}
        boxSize={8}
        rounded="full"
        minW="none"
        {...buttonProps}
      />
    </Tooltip>
  )
}

export default ReportGuildButton
