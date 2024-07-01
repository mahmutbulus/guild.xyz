import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { usePrevious } from "@/hooks/usePrevious"
import { useUserPublic } from "components/[guild]/hooks/useUser"
import { usePostHogContext } from "components/_app/PostHogProvider"
import CardMotionWrapper from "components/common/CardMotionWrapper"
import { addressLinkParamsAtom } from "components/common/Layout/components/Account/components/AccountModal/components/LinkAddressButton"
import useSetKeyPair from "hooks/useSetKeyPair"
import useShowErrorToast from "hooks/useShowErrorToast"
import { useAtom, useSetAtom } from "jotai"
import Link from "next/link"
import { ArrowSquareOut } from "phosphor-react"
import { useEffect } from "react"
import { useAccount, useConnect, type Connector } from "wagmi"
import useWeb3ConnectionManager from "../../hooks/useWeb3ConnectionManager"
import { walletLinkHelperModalAtom } from "../WalletLinkHelperModal"
import AccountButton from "./components/AccountButton"
import ConnectorButton from "./components/ConnectorButton"
import FuelConnectorButtons from "./components/FuelConnectorButtons"
import useIsWalletConnectModalActive from "./hooks/useIsWalletConnectModalActive"
import useLinkAddress from "./hooks/useLinkAddress"
import processConnectionError from "./utils/processConnectionError"
import { COINBASE_WALLET_SDK_ID, COINBASE_INJECTED_WALLET_ID } from "./constants"

type Props = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

const WalletSelectorModal = ({ isOpen, onClose }: Props): JSX.Element => {
  const { isWeb3Connected, isInSafeContext, disconnect, address } =
    useWeb3ConnectionManager()

  const { connectors, error, connect, variables, isPending } = useConnect()

  /**
   * If we can't detect an EIP-6963 compatible wallet, we fallback to a general
   * injected wallet option
   */
  const shouldShowInjected =
    !!window.ethereum &&
    connectors
      .filter((c) => c.id !== COINBASE_INJECTED_WALLET_ID)
      .filter((c) => c.type === "injected").length === 1

  const { connector, status } = useAccount()

  const [addressLinkParams, setAddressLinkParams] = useAtom(addressLinkParamsAtom)
  const isAddressLink = !!addressLinkParams?.userId

  const { captureEvent } = usePostHogContext()

  const { keyPair, id, error: publicUserError } = useUserPublic()
  const set = useSetKeyPair({
    onError: (err) => {
      /**
       * Needed temporarily for debugging WalletConnect issues (GUILD-2423) Checking
       * for Error instance to filter out fetcher-thrown errors, which are irrelevant
       * here
       */
      if (err instanceof Error) {
        captureEvent("[verify] - failed", {
          errorMessage: err.message,
          errorStack: err.stack,
          errorCause: err.cause,
          wagmiAccountStatus: status,
        })
      }
    },
  })

  useEffect(() => {
    if (keyPair && !isAddressLink) onClose()
  }, [keyPair, isAddressLink, onClose])

  const isConnectedAndKeyPairReady = isWeb3Connected && !!id

  const isWalletConnectModalActive = useIsWalletConnectModalActive()

  const linkAddress = useLinkAddress()

  const shouldShowVerify =
    isWeb3Connected && (!!publicUserError || (!!id && !keyPair))

  const setIsWalletLinkHelperModalOpen = useSetAtom(walletLinkHelperModalAtom)
  useEffect(() => {
    if (!isWeb3Connected) return
    setIsWalletLinkHelperModalOpen(false)
  }, [isWeb3Connected, setIsWalletLinkHelperModalOpen])

  const prevAddress = usePrevious(address)
  const triesToLinkCurrentAddress =
    isAddressLink &&
    !shouldShowVerify &&
    !prevAddress &&
    address === addressLinkParams.address

  const showErrorToast = useShowErrorToast()

  useEffect(() => {
    if (!triesToLinkCurrentAddress) return
    setAddressLinkParams({ userId: undefined, address: undefined })
    showErrorToast(
      "You cannot link an address to itself. Please choose a different address."
    )
  }, [triesToLinkCurrentAddress, setAddressLinkParams, showErrorToast])

  const conditionalOnClose = () => {
    if (!isWeb3Connected || !!keyPair) onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) return
        setTimeout(() => {
          disconnect()
        }, 200)
      }}
    >
      <DialogContent
        onPointerDownOutside={conditionalOnClose}
        onEscapeKeyDown={conditionalOnClose}
        trapFocus={!isWalletConnectModalActive}
      >
        <DialogHeader className="flex-row items-center gap-1.5">
          <DialogTitle className="-mt-1">
            {isAddressLink ? "Link address" : "Connect to Guild"}
          </DialogTitle>
        </DialogHeader>

        {/* TODO: generate & customize an Alert component & use it in the Error component */}
        {/* <ErrorComponent
          {...(set.error || linkAddress.error
            ? {
                error: set.error ?? linkAddress.error,
                processError: (err: any) => {
                  if (err?.code === "ACTION_REJECTED") {
                    return {
<<<<<<< HEAD
                      title: "Error",
                      description:
                        err?.message ??
                        (typeof err?.error === "string"
                          ? err?.error
                          : typeof err === "string"
                            ? err
                            : err?.errors?.[0]?.msg),
=======
                      title: "Rejected",
                      description: "Signature request has been rejected",
                    }
                  }

                  return {
                    title: "Error",
                    description:
                      err?.message ??
                      (typeof err?.error === "string"
                        ? err?.error
                        : typeof err === "string"
                          ? err
                          : err?.errors?.[0]?.msg),
                  }
                },
              }
            : { error, processError: processConnectionError })}
        /> */}

        {shouldShowVerify && (
          <p className="mb-6 animate-fade-in">
            Sign message to verify that you're the owner of this address.
          </p>
        )}

        {isWeb3Connected ? (
          <AccountButton />
        ) : (
          <div className="flex flex-col gap-0">
            {!connector && !addressLinkParams?.userId && (
              <>
                <CardMotionWrapper key={COINBASE_WALLET_SDK_ID}>
                  <ConnectorButton
                    connector={connectors.find(
                      (conn) => conn.id === COINBASE_WALLET_SDK_ID
                    )}
                    connect={connect}
                    pendingConnector={
                      isPending ? (variables?.connector as Connector) : undefined
>>>>>>> 7deb36d6b803763fdc923e153a47905754608356
                    }
                    error={error}
                  />
                </CardMotionWrapper>

                <p className="mb-2 mt-6 text-xs font-bold uppercase text-muted-foreground">
                  Or connect with wallet
                </p>
              </>
            )}

            <div className="flex flex-col gap-2">
              {connectors
                .filter(
                  (conn) =>
                    conn.id !== COINBASE_WALLET_SDK_ID &&
                    (isInSafeContext || conn.id !== "safe") &&
                    (shouldShowInjected || conn.id !== "injected") &&
                    // Filtering Coinbase Wallet, since we use the `coinbaseWallet` connector for it
                    conn.id !== COINBASE_INJECTED_WALLET_ID
                )
                .sort((conn, _) => (conn.type === "injected" ? -1 : 0))
                .map((conn) => (
                  <CardMotionWrapper key={conn.id}>
                    <ConnectorButton
                      connector={conn}
                      connect={connect}
                      pendingConnector={
                        isPending ? (variables?.connector as Connector) : undefined
                      }
                      error={error}
                    />
                  </CardMotionWrapper>
                ))}
              {/* TODO: migrate these components too */}
              {/* <GoogleLoginButton />*/}
              <FuelConnectorButtons key="fuel" />
            </div>
          </div>
        )}

        {shouldShowVerify && (
          <Button
            size="xl"
            variant="success"
            onClick={() => {
              if (isAddressLink) {
                return linkAddress.onSubmit(addressLinkParams)
              }
              return set.onSubmit()
            }}
            disabled={!id && !publicUserError}
            isLoading={
              linkAddress.isLoading || set.isLoading || (!id && !publicUserError)
            }
            loadingText={!id ? "Looking for keypairs" : "Check your wallet"}
            className="mb-4 animate-fade-in"
          >
            {isAddressLink ? "Link address" : "Verify address"}{" "}
          </Button>
        )}

        <DialogFooter>
          {!isConnectedAndKeyPairReady ? (
            <div className="flex w-full flex-col gap-2 text-center text-sm">
              <p className="text-muted-foreground">
                <span>{"New to Ethereum wallets? "}</span>
                {/* TODO: custom link component with generalised styles */}
                <a href="https://ethereum.org/en/wallets">Learn more</a>
                <ArrowSquareOut className="ml-1 inline" />
              </p>

              <p className="text-muted-foreground">
                <span>{"By continuing, you agree to our "}</span>
                <Link
                  href="/privacy-policy"
                  className="font-semibold"
                  onClick={onClose}
                >
                  Privacy Policy
                </Link>
                <span>{" and "}</span>
                <Link
                  href="/terms-of-use"
                  className="font-semibold"
                  onClick={onClose}
                >
                  Terms & conditions
                </Link>
              </p>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-2 text-center text-sm">
              <p className="text-muted-foreground">
                Signing the message doesn't cost any gas
              </p>
              <p className="text-muted-foreground">
                <span>{"This site is protected by reCAPTCHA, so the Google "}</span>
                <a
                  href="https://policies.google.com/privacy"
                  className="font-semibold"
                >
                  Privacy Policy
                </a>{" "}
                <span>{"and "}</span>
                <a
                  href="https://policies.google.com/terms"
                  className="font-semibold"
                >
                  Terms of Service
                </a>
                <span>{" apply"}</span>
              </p>
            </div>
          )}
        </DialogFooter>

        <DialogCloseButton onClick={conditionalOnClose} />
      </DialogContent>
    </Dialog>
  )
}

export default WalletSelectorModal
