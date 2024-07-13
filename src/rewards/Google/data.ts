import { GoogleLogo } from "@phosphor-icons/react/dist/ssr"
import { PlatformAsRewardRestrictions, RewardData } from "rewards/types"

export const googleData = {
  icon: GoogleLogo,
  imageUrl: "/platforms/google.png",
  name: "Google Workspace",
  colorScheme: "blue",
  gatedEntity: "document",
  autoRewardSetup: false,
  isPlatform: true,
  asRewardRestriction: PlatformAsRewardRestrictions.SINGLE_ROLE,
} satisfies RewardData
