"use client"

import { useDisclosure } from "@/hooks/useDisclosure"
import { cn } from "@/lib/utils"
import { Bell } from "@phosphor-icons/react"
import { SignIn } from "@phosphor-icons/react/dist/ssr"
import useUser from "components/[guild]/hooks/useUser"
import useResolveAddress from "hooks/useResolveAddress"
import { useSetAtom } from "jotai"
import shortenHex from "utils/shortenHex"
import { GuildAvatar } from "../GuildAvatar"
import { usePostHogContext } from "../Providers/PostHogProvider"
import { accountModalAtom, walletSelectorModalAtom } from "../Providers/atoms"
import { useWeb3ConnectionManager } from "../Web3ConnectionManager/hooks/useWeb3ConnectionManager"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover"
import { NotificationContent } from "./components/Notification/NotificationContent"

export const Account = () => {
  const { address } = useWeb3ConnectionManager()
  const setIsAccountModalOpen = useSetAtom(accountModalAtom)
  const setIsWalletSelectorModalOpen = useSetAtom(walletSelectorModalAtom)
  const { isOpen, setValue } = useDisclosure()

  const domainName = useResolveAddress(address)
  const { addresses } = useUser()
  const linkedAddressesCount = (addresses?.length ?? 1) - 1
  const { captureEvent } = usePostHogContext()

  if (!address)
    return (
      <Card className="overflow-visible">
        <Button
          variant="ghost"
          onClick={() => setIsWalletSelectorModalOpen(true)}
          data-testid="sign-in-button"
          className="rounded-2xl"
        >
          <SignIn weight="bold" />
          Sign in
        </Button>
      </Card>
    )

  return (
    <Card className="flex items-center overflow-visible" data-testid="account-card">
      <Popover open={isOpen} onOpenChange={setValue}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-r-none rounded-l-2xl border-border border-r"
            aria-label="Notifications"
            onClick={() => {
              if (isOpen) return
              captureEvent("opened UserActivityLogPopover")
            }}
          >
            <Bell weight="bold" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[min(100vw,theme(space.96))] px-0">
          <NotificationContent />
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        onClick={() => setIsAccountModalOpen(true)}
        className="rounded-r-2xl rounded-l-none"
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end gap-0">
            <span
              className={cn("font-semibold text-base", {
                "font-bold text-sm": linkedAddressesCount > 0,
              })}
            >
              {domainName || `${shortenHex(address, 3)}`}
            </span>
            {linkedAddressesCount > 0 && (
              <span className="font-medium text-muted-foreground text-xs">
                {`+ ${linkedAddressesCount} address${
                  linkedAddressesCount > 1 ? "es" : ""
                }`}
              </span>
            )}
          </div>
          <GuildAvatar address={address} className="size-4" />
        </div>
      </Button>
    </Card>
  )
}
