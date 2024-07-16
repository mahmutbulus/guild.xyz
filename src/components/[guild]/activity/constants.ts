import { ArrowLeft } from "@phosphor-icons/react/ArrowLeft"
import { ArrowRight } from "@phosphor-icons/react/ArrowRight"
import { ArrowsClockwise } from "@phosphor-icons/react/ArrowsClockwise"
import { ArrowsLeftRight } from "@phosphor-icons/react/ArrowsLeftRight"
import { Eye } from "@phosphor-icons/react/Eye"
import { File } from "@phosphor-icons/react/File"
import { FileMinus } from "@phosphor-icons/react/FileMinus"
import { FilePlus } from "@phosphor-icons/react/FilePlus"
import { FileText } from "@phosphor-icons/react/FileText"
import { FolderUser } from "@phosphor-icons/react/FolderUser"
import { House } from "@phosphor-icons/react/House"
import { IdentificationCard } from "@phosphor-icons/react/IdentificationCard"
import { LinkSimple } from "@phosphor-icons/react/LinkSimple"
import { LockKey } from "@phosphor-icons/react/LockKey"
import { PaintBrushBroad } from "@phosphor-icons/react/PaintBrushBroad"
import { PlusMinus } from "@phosphor-icons/react/PlusMinus"
import { Question } from "@phosphor-icons/react/Question"
import { Shield } from "@phosphor-icons/react/Shield"
import { ShieldCheck } from "@phosphor-icons/react/ShieldCheck"
import { SignIn } from "@phosphor-icons/react/SignIn"
import { SignOut } from "@phosphor-icons/react/SignOut"
import { Star } from "@phosphor-icons/react/Star"
import { StarHalf } from "@phosphor-icons/react/StarHalf"
import { TextT } from "@phosphor-icons/react/TextT"
import { UserCircleGear } from "@phosphor-icons/react/UserCircleGear"
import { UserFocus } from "@phosphor-icons/react/UserFocus"
import { UserList } from "@phosphor-icons/react/UserList"
import { UserMinus } from "@phosphor-icons/react/UserMinus"
import { UserSwitch } from "@phosphor-icons/react/UserSwitch"
import { IconProps } from "@phosphor-icons/react/dist/lib/types"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export enum ACTION {
  // Guild
  CreateGuild = "create guild",
  UpdateGuild = "update guild",
  DeleteGuild = "delete guild",
  ExecutePendingActions = "execute pending actions",
  TransferOwnership = "transfer ownership",
  // Guild update
  AddAdmin = "add admin",
  RemoveAdmin = "remove admin",
  ShowMembersOn = "show members on",
  ShowMembersOff = "show members off",
  HideFromExplorerOn = "hide from explorer on",
  HideFromExplorerOff = "hide from explorer off",
  // Role
  CreateRole = "create role",
  UpdateRole = "update role",
  DeleteRole = "delete role",
  // Form
  CreateForm = "create form",
  UpdateForm = "update form",
  DeleteForm = "delete form",
  SubmitForm = "submit form",
  // Reward
  AddReward = "add reward",
  RemoveReward = "remove reward",
  UpdateReward = "update reward",
  // Requirement
  AddRequirement = "add requirement",
  UpdateRequirement = "update requirement",
  RemoveRequirement = "remove requirement",
  // Status update
  StartStatusUpdate = "start status update",
  RestartStatusUpdate = "restart status update",
  StopStatusUpdate = "stop status update",
  // User
  ClickJoinOnPlatform = "click join on platform",
  JoinGuild = "join guild",
  LeaveGuild = "leave guild",
  KickFromGuild = "kick from guild",
  UserStatusUpdate = "user status update",
  GetRole = "get role",
  LoseRole = "lose role",
  SendReward = "send reward",
  GetReward = "get reward",
  RevokeReward = "revoke reward",
  LoseReward = "lose reward",
  ConnectIdentity = "connect identity",
  DisconnectIdentity = "disconnect identity",
  OptIn = "user opt-in",
  OptOut = "user opt-out",

  // These actions are only used on the frontend
  UpdateUrlName = "UpdateUrlName",
  UpdateLogoOrTitle = "UpdateLogoOrTitle",
  UpdateDescription = "UpdateDescription",
  UpdateLogic = "UpdateLogic",
  UpdateTheme = "UpdateTheme",
}

export enum ActivityLogActionGroup {
  UserAction = "User actions",
  AdminAction = "Admin actions",
}

export type ActivityLogActionType = keyof typeof ACTION

export type ActivityLogAction = {
  id: string
  parentId?: string
  action: ACTION
  correlationId: string
  service: string
  timestamp: string
  before?: Record<string, any>
  data?: Record<string, any>
  ids: {
    user?: number
    form?: number
    guild?: number
    role?: number
    rolePlatform?: number
  }
  children?: Array<ActivityLogAction>
}

export const activityLogActionIcons: Record<
  ACTION,
  {
    as: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    color?: string
  }
> = {
  [ACTION.CreateForm]: {
    as: FilePlus,
    color: "green.500",
  },
  [ACTION.UpdateForm]: {
    as: File,
    color: "blue.400",
  },
  [ACTION.DeleteForm]: {
    as: FileMinus,
    color: "red.500",
  },
  [ACTION.SubmitForm]: {
    as: FileText,
    color: "green.500",
  },
  [ACTION.CreateGuild]: {
    as: House,
    color: "green.500",
  },
  [ACTION.UpdateGuild]: {
    as: House,
    color: "blue.400",
  },
  [ACTION.DeleteGuild]: {
    as: House,
    color: "red.500",
  },
  [ACTION.ExecutePendingActions]: {
    as: Question,
    color: "gray.500",
  },
  [ACTION.TransferOwnership]: {
    as: ArrowsLeftRight,
    color: "green.500",
  },
  [ACTION.AddAdmin]: {
    as: UserCircleGear,
    color: "green.500",
  },
  [ACTION.RemoveAdmin]: {
    as: UserCircleGear,
    color: "red.500",
  },
  [ACTION.ShowMembersOn]: {
    as: UserList,
    color: "green.500",
  },
  [ACTION.ShowMembersOff]: {
    as: UserList,
    color: "red.500",
  },
  [ACTION.HideFromExplorerOn]: {
    as: Eye,
    color: "red.500",
  },
  [ACTION.HideFromExplorerOff]: {
    as: Eye,
    color: "green.500",
  },
  [ACTION.CreateRole]: {
    as: FolderUser,
    color: "green.500",
  },
  [ACTION.UpdateRole]: {
    as: FolderUser,
    color: "blue.400",
  },
  [ACTION.DeleteRole]: {
    as: FolderUser,
    color: "red.500",
  },
  [ACTION.AddReward]: {
    as: Star,
    color: "green.500",
  },
  [ACTION.RemoveReward]: {
    as: Star,
    color: "red.500",
  },
  [ACTION.UpdateReward]: {
    as: Star,
    color: "blue.400",
  },
  [ACTION.AddRequirement]: {
    as: LockKey,
    color: "green.500",
  },
  [ACTION.UpdateRequirement]: {
    as: LockKey,
    color: "blue.400",
  },
  [ACTION.RemoveRequirement]: {
    as: LockKey,
    color: "red.500",
  },
  [ACTION.StartStatusUpdate]: {
    as: ArrowsClockwise,
    color: "blue.400",
  },
  [ACTION.RestartStatusUpdate]: {
    as: ArrowsClockwise,
    color: "orange.500",
  },
  [ACTION.StopStatusUpdate]: {
    as: ArrowsClockwise,
    color: "red.500",
  },
  [ACTION.ClickJoinOnPlatform]: {
    as: SignIn,
    color: "green.500",
  },
  [ACTION.JoinGuild]: {
    as: SignIn,
    color: "green.500",
  },
  [ACTION.LeaveGuild]: {
    as: SignOut,
    color: "red.500",
  },
  [ACTION.KickFromGuild]: {
    as: UserMinus,
    color: "red.500",
  },
  [ACTION.UserStatusUpdate]: {
    as: UserSwitch,
    color: "blue.400",
  },
  [ACTION.GetRole]: {
    as: IdentificationCard,
    color: "green.500",
  },
  [ACTION.LoseRole]: {
    as: IdentificationCard,
    color: "red.500",
  },
  [ACTION.SendReward]: {
    as: ArrowRight,
  },
  [ACTION.GetReward]: {
    as: Star,
    color: "green.500",
  },
  [ACTION.RevokeReward]: {
    as: ArrowLeft,
  },
  [ACTION.LoseReward]: {
    as: StarHalf,
    color: "red.500",
  },
  [ACTION.ConnectIdentity]: {
    as: UserFocus,
    color: "green.500",
  },
  [ACTION.DisconnectIdentity]: {
    as: UserFocus,
    color: "red.500",
  },
  [ACTION.OptIn]: {
    as: ShieldCheck,
    color: "green.500",
  },
  [ACTION.OptOut]: {
    as: Shield,
    color: "gray.500",
  },

  // Custom actions
  [ACTION.UpdateUrlName]: {
    as: LinkSimple,
    color: "blue.400",
  },
  [ACTION.UpdateLogoOrTitle]: {
    as: TextT,
    color: "blue.400",
  },
  [ACTION.UpdateDescription]: {
    as: TextT,
    color: "blue.400",
  },
  [ACTION.UpdateLogic]: {
    as: PlusMinus,
    color: "blue.400",
  },
  [ACTION.UpdateTheme]: {
    as: PaintBrushBroad,
    color: "blue.400",
  },
}

export const HIDDEN_ACTIONS: ACTION[] = [
  ACTION.UpdateUrlName,
  ACTION.UpdateLogoOrTitle,
  ACTION.UpdateDescription,
  ACTION.UpdateLogic,
  ACTION.UpdateTheme,
]

export const USER_ACTIONS: ACTION[] = [
  ACTION.ClickJoinOnPlatform,
  ACTION.JoinGuild,
  ACTION.LeaveGuild,
  ACTION.UserStatusUpdate,
  ACTION.GetRole,
  ACTION.LoseRole,
  ACTION.GetReward,
  ACTION.LoseReward,
  ACTION.ConnectIdentity,
  ACTION.DisconnectIdentity,
  ACTION.OptIn,
  ACTION.OptOut,
  ACTION.KickFromGuild,
  ACTION.SendReward,
  ACTION.RevokeReward,
  ACTION.SubmitForm,
]

export const ADMIN_ACTIONS = Object.values(ACTION).filter(
  (action) => !USER_ACTIONS.includes(action) && !HIDDEN_ACTIONS.includes(action)
)
