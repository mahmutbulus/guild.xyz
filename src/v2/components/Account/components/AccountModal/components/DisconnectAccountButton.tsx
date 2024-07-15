import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog"
import { Button, ButtonProps } from "@/components/ui/Button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"
import { DisclosureState } from "@/hooks/useDisclosure"
import { cn } from "@/lib/utils"
import { PiLinkBreak } from "react-icons/pi"

const DisconnectAccountButton = ({
  onConfirm,
  isLoading,
  loadingText,
  className,
  name,
  state: { isOpen, onClose, onOpen },
}: {
  onConfirm: () => void
  isLoading: ButtonProps["isLoading"]
  loadingText: ButtonProps["loadingText"]
  className?: ButtonProps["className"]
  name: string
  state: DisclosureState
}) => (
  <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn("size-8 rounded-full px-0", className)}
            variant="destructive-ghost"
            aria-label="Disconnect account"
            onClick={onOpen}
          >
            <PiLinkBreak weight="bold" className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Disconnect account</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <AlertDialog open={isOpen}>
      <AlertDialogContent onEscapeKeyDown={onClose}>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Disconnect ${name} account`}</AlertDialogTitle>
          <AlertDialogDescription>
            {`Are you sure? This account will lose every Guild gated access on ${name}.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={onConfirm}
              isLoading={isLoading}
              loadingText={loadingText}
            >
              Disconnect
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
)

export { DisconnectAccountButton }
