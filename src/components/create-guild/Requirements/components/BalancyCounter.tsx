import {
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  Tooltip,
  Wrap,
  useClipboard,
} from "@chakra-ui/react"
import {
  Copy,
  DownloadSimple,
  Question,
  Warning,
} from "@phosphor-icons/react/dist/ssr"
import Button from "components/common/Button"
import useBalancy from "../hooks/useBalancy"

const BalancyCounterWithPopover = ({ ...rest }) => {
  const { holders, addresses, isLoading, inaccuracy, usedLogic } = useBalancy()

  const { hasCopied, onCopy } = useClipboard(addresses ? addresses?.join("\n") : "")

  const exportAddresses = () => {
    const csvContent = "data:text/csv;charset=utf-8," + addresses?.join("\n")
    const encodedUri = encodeURI(csvContent)
    window.open(encodedUri, "_blank")
  }

  return (
    <HStack spacing={4} {...rest}>
      {typeof holders === "number" ? (
        <HStack>
          {inaccuracy > 0 && (
            <Tooltip
              label={`Couldn't calculate holders for ${inaccuracy} requirement${
                inaccuracy > 1 ? "s" : ""
              }.`}
            >
              <Warning color="gray" />
            </Tooltip>
          )}
          <Text fontSize="sm" color="gray" fontWeight="medium">
            {inaccuracy > 0 ? (usedLogic === "OR" ? "at least" : "at most") : ""}{" "}
            {isLoading ? <Spinner size="sm" color="gray" mx={2} /> : holders}{" "}
            {`potential member${holders > 1 ? "s" : ""}`}
          </Text>
          <Popover trigger="hover" openDelay={0} size="lg">
            <PopoverTrigger>
              <Question color="gray" />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Text>
                  Number of addresses meeting the requirements for your guild.
                </Text>

                <Wrap spacing={1} mt={3}>
                  <Button
                    size="xs"
                    pt="1px"
                    rounded="md"
                    onClick={onCopy}
                    isDisabled={!addresses?.length}
                    leftIcon={<Copy />}
                  >
                    {hasCopied ? "Copied!" : "Copy addresses"}
                  </Button>
                  <Button
                    size="xs"
                    pt="1px"
                    rounded="md"
                    onClick={exportAddresses}
                    isDisabled={!addresses?.length}
                    leftIcon={<DownloadSimple />}
                  >
                    Export addresses
                  </Button>
                </Wrap>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      ) : (
        isLoading && <Spinner size="sm" color="gray" />
      )}
    </HStack>
  )
}

export default BalancyCounterWithPopover
