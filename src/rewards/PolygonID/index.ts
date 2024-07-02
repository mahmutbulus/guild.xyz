import { Key } from "@phosphor-icons/react"
import dynamic from "next/dynamic"
import { AddRewardPanelLoadingSpinner } from "rewards/components/AddRewardPanelLoadingSpinner"
import LoadingRewardPreview from "rewards/components/LoadingRewardPreview"
import { PlatformAsRewardRestrictions, RewardData } from "rewards/types"
import PolygonIDCardButton from "./PolygonIDCardButton"
import PolygonIDCardMenu from "./PolygonIDCardMenu"
import usePolygonIDCardProps from "./usePolygonIDCardProps"

export default {
  icon: Key,
  imageUrl: "/requirementLogos/polygonId.svg",
  name: "PolygonID",
  colorScheme: "purple",
  gatedEntity: "",
  cardPropsHook: usePolygonIDCardProps,
  cardButton: PolygonIDCardButton,
  cardMenuComponent: PolygonIDCardMenu,
  asRewardRestriction: PlatformAsRewardRestrictions.MULTIPLE_ROLES,
  autoRewardSetup: true,
  // Until we don't have a generalized connection flow
  isPlatform: false,
  AddRewardPanel: dynamic(
    () =>
      import(
        "components/[guild]/RolePlatforms/components/AddRoleRewardModal/components/AddPolygonIDPanel"
      ),
    {
      ssr: false,
      loading: AddRewardPanelLoadingSpinner,
    }
  ),
  RewardPreview: dynamic(() => import("rewards/components/PolygonIDPreview"), {
    ssr: false,
    loading: LoadingRewardPreview,
  }),
  RoleCardComponent: dynamic(() => import("rewards/components/PolygonIDReward"), {
    ssr: false,
  }),
} as const satisfies RewardData
