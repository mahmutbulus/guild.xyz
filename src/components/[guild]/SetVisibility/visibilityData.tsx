import { Visibility } from "@guildxyz/types"
import type { IconProps } from "@phosphor-icons/react"
import {
  Detective,
  EyeSlash,
  GlobeHemisphereEast,
} from "@phosphor-icons/react/dist/ssr"
import { Option } from "components/common/RadioSelect/RadioSelect"
import PrivateVisibilityOptions from "./components/PrivateVisibilityOptions"

export const VISIBILITY_DATA: Record<
  Visibility,
  Partial<Option> & {
    title: string
    Icon: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >
    Child?: typeof PrivateVisibilityOptions
  }
> = {
  PUBLIC: {
    title: "Public",
    Icon: GlobeHemisphereEast,
    description: "Visible to everyone",
  },
  PRIVATE: {
    title: "Secret",
    Icon: Detective,
    description: "Only visible to users that satisfy...",
    Child: PrivateVisibilityOptions,
  },
  HIDDEN: {
    title: "Hidden",
    Icon: EyeSlash,
    description: "Only visible to admins",
  },
}
