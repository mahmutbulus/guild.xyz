import { Icon } from "@phosphor-icons/react/dist/lib/types"
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut"
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown"
import { Check } from "@phosphor-icons/react/dist/ssr/Check"
import { Shield } from "@phosphor-icons/react/dist/ssr/Shield"
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck"
import useGuild, { useSimpleGuild } from "components/[guild]/hooks/useGuild"
import useUser from "components/[guild]/hooks/useUser"

import { GuildLogo } from "@/components/GuildLogo"
import { anchorVariants } from "@/components/ui/Anchor"
import { Button, ButtonProps } from "@/components/ui/Button"
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Skeleton } from "@/components/ui/Skeleton"
import { cn } from "@/lib/utils"
import { UserProfile } from "@guildxyz/types"
import { useEffect } from "react"
import pluralize from "utils/pluralize"
import useEditSharedSocials from "../hooks/useEditSharedSocials"

const SharedSocials = () => {
  const { id } = useGuild()
  const { sharedSocials } = useUser()

  const guildSharedSocial =
    id && sharedSocials?.find((sharedSocial) => sharedSocial.guildId === id)
  const restSharedSocials = !guildSharedSocial
    ? sharedSocials
    : sharedSocials?.filter((sharedSocial) => sharedSocial.guildId !== id)

  const buttonProps = {
    size: "sm",
    variant: "ghost",
    className: "ml-auto -my-1",
  } satisfies ButtonProps

  return (
    <Dialog>
      {/* TODO: scrollBehavior="inside" (maybe we can do it here and don't need to abstract it into the component?) */}
      <DialogTrigger asChild>
        {!guildSharedSocial ? (
          <Button {...buttonProps}>
            <Shield weight="bold" className="mr-1" />
            {`Shared with ${pluralize(
              sharedSocials?.filter(
                (sharedSocial) => sharedSocial.isShared !== false
              )?.length,
              "guild"
            )}`}
          </Button>
        ) : guildSharedSocial.isShared !== false ? (
          <Button {...buttonProps}>
            <ShieldCheck weight="bold" className="mr-1 text-primary" />
            Shared with guild
          </Button>
        ) : (
          <Button {...buttonProps}>
            <Shield weight="bold" className="mr-1" />
            Hidden to guild
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shared account connections</DialogTitle>
        </DialogHeader>

        <p className="mb-10">
          Choose which guilds you'd like to share your profile with.{" "}
          <a
            href="https://help.guild.xyz/en/articles/8489031-privacy-for-members"
            className={anchorVariants({
              variant: "muted",
              className: "font-semibold",
            })}
            target="_blank"
          >
            Learn more{" "}
            <ArrowSquareOut weight="bold" className="-top-px relative inline" />
          </a>
        </p>

        <div className="flex flex-col gap-4">
          {guildSharedSocial && (
            <>
              <ShareSocialsWithGuildSelect
                key={guildSharedSocial.guildId}
                guildId={guildSharedSocial.guildId}
                sharedSocials={sharedSocials}
              />
              <hr className="border-border-muted" />
            </>
          )}
          {restSharedSocials.map((sharedSocial) => (
            <>
              <ShareSocialsWithGuildSelect
                key={sharedSocial.guildId}
                guildId={sharedSocial.guildId}
                sharedSocials={sharedSocials}
              />
              <hr className="border-border-muted" />
            </>
          ))}
        </div>

        <DialogCloseButton />
      </DialogContent>
    </Dialog>
  )
}

/**
 * Passing sharedSocials as prop instead of just isShared, because it doesn't change
 * on edit success that way for some reason, regardless of the mutate
 */
const ShareSocialsWithGuildSelect = ({
  guildId,
  sharedSocials,
}: {
  guildId: number
  sharedSocials: UserProfile["sharedSocials"]
}) => {
  const { imageUrl, name } = useSimpleGuild(guildId)
  const { onSubmit, submit } = useEditSharedSocials(guildId)

  const isShared = sharedSocials?.find(
    (sharedSocial) => sharedSocial.guildId === guildId
  )?.isShared

  /**
   * Change null to true on mount (without toast), indicating that the user has seen
   * the notification, and the useNewSharedSocialsToast won't fire again
   */
  useEffect(() => {
    if (isShared === null) submit(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isSharedBoolean = isShared !== false

  return (
    <div className="flex items-center gap-4">
      {imageUrl ? (
        <GuildLogo imageUrl={imageUrl} className="size-9" />
      ) : (
        <Skeleton className="size-9 shrink-0 rounded-full" />
      )}

      {name?.length > 0 ? (
        <span className="overflow-hidden text-ellipsis font-bold text-lg">
          {name}
        </span>
      ) : (
        <Skeleton className="h-7 w-[80%]" />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn("ml-auto gap-1.5", {
              "text-success": isSharedBoolean,
            })}
          >
            {isSharedBoolean ? (
              <ShieldCheck weight="bold" />
            ) : (
              <Shield weight="bold" />
            )}
            {isSharedBoolean ? "Shared" : "Hidden"}
            <CaretDown weight="bold" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-96 max-w-full py-0">
          <MenuItemOption
            title="Shared"
            description="The guild owner can see your profile"
            icon={ShieldCheck}
            onClick={() => onSubmit(true)}
            selected={isSharedBoolean}
          />
          <DropdownMenuSeparator />
          <MenuItemOption
            title="Hidden"
            description="Your profile is kept private"
            icon={Shield}
            onClick={() => onSubmit(false)}
            selected={!isSharedBoolean}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const MenuItemOption = ({
  title,
  description,
  icon: Icon,
  onClick,
  selected,
}: {
  title: string
  description: string
  icon: Icon
  onClick: () => void
  selected: boolean
}) => (
  <DropdownMenuItem
    onClick={!selected ? onClick : () => {}}
    className="flex h-auto w-full items-center gap-4 p-4 text-base"
  >
    <div className="flex size-3 items-center justify-center">
      {selected && <Check weight="bold" />}
    </div>
    <div className="flex flex-col">
      <span className="font-semibold">{title}</span>
      <p className="text-muted-foreground">{description}</p>
    </div>
    <Icon weight="bold" className="ml-auto" />
  </DropdownMenuItem>
)

export default SharedSocials
