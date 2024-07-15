import {
  Icon,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"
import { PiArrowSquareOut } from "react-icons/pi"
import { PiQuestion } from "react-icons/pi"

const FeePopover = () => (
  <Popover placement="top" trigger="hover">
    <PopoverTrigger>
      <Icon as={PiQuestion} color="gray" />
    </PopoverTrigger>
    <PopoverContent w="max-content">
      <PopoverArrow />
      <PopoverBody fontSize="sm">
        {`Learn more about `}
        <Link
          isExternal
          href="https://help.guild.xyz/en/articles/8193498-guild-base-fee"
        >
          Guild base fee <Icon as={PiArrowSquareOut} ml={1} />
        </Link>
      </PopoverBody>
    </PopoverContent>
  </Popover>
)

export default FeePopover
