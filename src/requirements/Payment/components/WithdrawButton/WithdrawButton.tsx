import { Icon, Spinner, Tooltip } from "@chakra-ui/react"
import { LinkBreak, Wallet } from "@phosphor-icons/react/dist/ssr"
import { useRequirementContext } from "components/[guild]/Requirements/components/RequirementContext"
import Button from "components/common/Button"
import useTokenData from "hooks/useTokenData"
import useTriggerNetworkChange from "hooks/useTriggerNetworkChange"
import useVault from "requirements/Payment/hooks/useVault"
import shortenHex from "utils/shortenHex"
import { formatUnits } from "viem"
import { useAccount } from "wagmi"
import { CHAIN_CONFIG, Chains } from "wagmiConfig/chains"
import useWithdraw from "./hooks/useWithdraw"

const WithdrawButton = (): JSX.Element => {
  const {
    address: vaultAddressAsString,
    chain,
    data,
  } = useRequirementContext<"PAYMENT">()
  const vaultAddress = vaultAddressAsString as `0x${string}`
  const { owner, token, balance } = useVault(vaultAddress, data?.id, chain)
  const {
    data: { symbol, decimals },
  } = useTokenData(chain, token)

  const { address, chainId } = useAccount()
  const { requestNetworkChange } = useTriggerNetworkChange()

  const isOnVaultsChain = Chains[chain] === chainId

  const formattedWithdrawableAmount =
    balance && decimals && Number(formatUnits(balance, decimals)) * 0.9

  const { onSubmitTransaction, isPreparing, isLoading, error } = useWithdraw(
    vaultAddress,
    +data.id,
    chain
  )

  const isDisabledLabel =
    balance === BigInt(0)
      ? "Withdrawable amount is 0"
      : owner && owner !== address
        ? `Only the requirement's original creator can withdraw (${shortenHex(owner)})`
        : isOnVaultsChain && error

  return (
    <Tooltip
      label={isDisabledLabel}
      isDisabled={!isDisabledLabel}
      hasArrow
      placement="right"
    >
      <Button
        data-test="withdraw-button"
        size="xs"
        borderRadius="md"
        leftIcon={
          isLoading ? (
            <Spinner size="xs" />
          ) : (
            <Icon as={isDisabledLabel || isOnVaultsChain ? Wallet : LinkBreak} />
          )
        }
        isDisabled={isPreparing || isLoading || isDisabledLabel}
        onClick={
          isOnVaultsChain && !isPreparing
            ? onSubmitTransaction
            : () => requestNetworkChange(Chains[chain])
        }
      >
        {isLoading
          ? "Withdrawing"
          : isDisabledLabel || !formattedWithdrawableAmount
            ? "Withdraw"
            : isOnVaultsChain
              ? `Withdraw ${
                  formattedWithdrawableAmount < 0.001
                    ? "< 0.001"
                    : formattedWithdrawableAmount.toFixed(3)
                } ${symbol}`
              : `Switch to ${CHAIN_CONFIG[chain].name} to withdraw`}
      </Button>
    </Tooltip>
  )
}

export default WithdrawButton
