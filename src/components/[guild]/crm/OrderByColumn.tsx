import {
  Button,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Column } from "@tanstack/react-table"
import { PiSortAscending } from "react-icons/pi"
import { PiSortDescending } from "react-icons/pi"
import { PiTrashSimple } from "react-icons/pi"
import capitalize from "utils/capitalize"

type Props = {
  label: string
  column: Column<any>
}

const OrderByColumn = ({ label, column }: Props) => {
  const sortDirection = column.getIsSorted()

  return (
    <Popover placement="bottom-end">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              size="sm"
              variant="ghost"
              px="2"
              right="-2"
              colorScheme={sortDirection ? "blue" : "gray"}
              flexShrink={0}
            >
              {sortDirection && (
                <Text colorScheme="blue" pl="0.5" pr="1" mb="-1px" fontSize="xs">
                  {capitalize(sortDirection)}
                </Text>
              )}
              <Icon
                as={sortDirection === "desc" ? PiSortDescending : PiSortAscending}
              />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <HStack justifyContent={"space-between"}>
                  <Text
                    colorScheme="gray"
                    fontWeight={"semibold"}
                    fontSize="sm"
                  >{`Order by: ${label}`}</Text>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      column.clearSorting()
                      onClose()
                    }}
                    leftIcon={<PiTrashSimple />}
                    flexShrink={0}
                  >
                    Clear
                  </Button>
                </HStack>
                <RadioGroup
                  my="2"
                  onChange={(newValue) => column.toggleSorting(newValue === "desc")}
                  value={sortDirection as string}
                >
                  <Stack>
                    <Radio value="desc">Descending</Radio>
                    <Radio value="asc">Ascending</Radio>
                  </Stack>
                </RadioGroup>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}

export default OrderByColumn
