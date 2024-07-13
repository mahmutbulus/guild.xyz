import { HStack, Icon, Text, Tooltip, useClipboard } from "@chakra-ui/react"
import { Check } from "@phosphor-icons/react/dist/ssr"
import { PropsWithChildren } from "react"
import DataBlock from "./DataBlock"

type Props = {
  text: string
}

const DataBlockWithCopy = ({
  text,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const { onCopy, hasCopied } = useClipboard(text)

  return (
    <Tooltip
      hasArrow
      closeOnClick={false}
      label={
        <HStack spacing={0.5}>
          {hasCopied && <Icon as={Check} />}
          <Text as="span">{hasCopied ? "Copied" : "Click to copy"}</Text>
        </HStack>
      }
      placement="top"
      shouldWrapChildren
    >
      <DataBlock>
        <Text as="span" cursor="pointer" onClick={onCopy}>
          {children ?? text}
        </Text>
      </DataBlock>
    </Tooltip>
  )
}

export default DataBlockWithCopy
