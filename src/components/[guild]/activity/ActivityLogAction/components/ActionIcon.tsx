import { Icon } from "@chakra-ui/react"
import { SystemStyleObject } from "@chakra-ui/theme-tools"
import type { IconProps } from "@phosphor-icons/react"
import { Question } from "@phosphor-icons/react/dist/ssr"
import { Rest } from "types"
import { ACTION, activityLogActionIcons } from "../../constants"
import { useActivityLogActionContext } from "../ActivityLogActionContext"

type Props = {
  action?: ACTION
  size?: number
} & Rest

type ActionIconProps = {
  as: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
  boxSize: number
  color?: string
  sx: SystemStyleObject
}

const getActionIconProps = (action: string, size = 7): ActionIconProps => {
  const propsBase: ActionIconProps = {
    as: Question,
    boxSize: size,
    sx: {
      "> *": {
        strokeWidth: "1rem",
      },
    },
  }

  return {
    ...propsBase,
    ...activityLogActionIcons[action],
  }
}

const ActionIcon = ({ action: actionProp, size }: Props): JSX.Element => {
  const { action } = useActivityLogActionContext() ?? {}

  return <Icon {...getActionIconProps(actionProp ?? action, size)} />
}

export default ActionIcon
