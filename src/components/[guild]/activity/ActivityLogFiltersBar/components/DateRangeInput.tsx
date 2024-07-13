import {
  Center,
  HStack,
  Icon,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react"
import {
  CalendarBlank,
  CalendarCheck,
  CaretDown,
  TrashSimple,
} from "@phosphor-icons/react/dist/ssr"
import Button from "components/common/Button"
import { ChangeEvent } from "react"
import { useActivityLog } from "../../ActivityLogContext"
import {
  SupportedQueryParam,
  useActivityLogFilters,
} from "./ActivityLogFiltersContext"

const CURRENT_TIMESTAMP = Date.now()
const MONTH_IN_MILISEC = 30 * 24 * 60 * 60 * 1000
const LAST_MONTH_TIMESTAMP = CURRENT_TIMESTAMP - MONTH_IN_MILISEC

const timestampToDateString = (ts?: number): string =>
  ts ? new Date(ts).toISOString().split("T")[0] : ""

const CURRENT_DATE = timestampToDateString(CURRENT_TIMESTAMP)

const DateRangeInput = ({ ...chakraStyles }) => {
  const buttonBgColor = useColorModeValue("white", "blackAlpha.300")
  const isMobile = useBreakpointValue({ base: true, md: false })

  const { activityLogType } = useActivityLog()

  const { activeFilters, addFilter, updateFilter, removeFilter } =
    useActivityLogFilters()
  const beforeFilter = activeFilters?.find(({ filter }) => filter === "before")
  const afterFilter = activeFilters?.find(({ filter }) => filter === "after")

  const beforeInputValue = timestampToDateString(
    beforeFilter ? Number(beforeFilter.value) : undefined
  )
  const afterInputValue = timestampToDateString(
    afterFilter ? Number(afterFilter.value) : undefined
  )

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    filter: Extract<SupportedQueryParam, "before" | "after">
  ) => {
    const filterToUpdate = filter === "before" ? beforeFilter : afterFilter

    const newTimestamp = !isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : undefined

    if (!newTimestamp) {
      removeFilter(filterToUpdate)
      return
    }

    if (newTimestamp) {
      const value = newTimestamp.toString()
      if (filterToUpdate) {
        updateFilter({ ...filterToUpdate, value })
      } else {
        addFilter({ filter, value })
      }
    }
  }

  const buttonLabel =
    beforeInputValue && afterInputValue
      ? `${afterInputValue} - ${beforeInputValue}`
      : beforeInputValue
        ? `Before ${beforeInputValue}`
        : afterInputValue
          ? `After ${afterInputValue}`
          : // TODO: if CRM is enabled, we should display "Last 30 days"
            activityLogType === "user"
            ? "Last 30 days"
            : "Last 24 hours"

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          flexShrink={0}
          variant="unstyled"
          bgColor={buttonBgColor}
          size="sm"
          boxSizing="border-box"
          px={3}
          fontWeight="normal"
          display="flex"
          justifyContent="space-between"
          borderWidth={1}
          borderColor={
            beforeInputValue || afterInputValue ? "indigo.500" : undefined
          }
          borderRadius="lg"
          rightIcon={<Icon as={CaretDown} boxSize={3.5} />}
          _focusVisible={{
            boxShadow: "0 0 0 1px var(--chakra-colors-gray-500)",
          }}
          {...chakraStyles}
        >
          {!isMobile ? (
            buttonLabel
          ) : (
            <Center>
              {beforeInputValue || afterInputValue ? (
                <CalendarCheck color={"var(--chakra-colors-indigo-500)"} />
              ) : (
                <CalendarBlank />
              )}
            </Center>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent minW="none" w="none">
        <PopoverHeader border={0} pb="1">
          <HStack justifyContent={"space-between"}>
            <Text colorScheme="gray" fontWeight={"semibold"} fontSize="sm" mt="0.5">
              Time interval
            </Text>
            {(beforeFilter || afterFilter) && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  removeFilter(beforeFilter)
                  removeFilter(afterFilter)
                }}
                leftIcon={<TrashSimple />}
                mb="-1"
              >
                Clear
              </Button>
            )}
          </HStack>
        </PopoverHeader>
        <PopoverBody>
          <Stack>
            <Input
              type="date"
              name="after"
              min={timestampToDateString(LAST_MONTH_TIMESTAMP)}
              max={beforeInputValue || CURRENT_DATE}
              value={afterInputValue}
              onChange={(e) => onChange(e, "after")}
            />
            <Input
              type="date"
              name="before"
              min={afterInputValue}
              max={CURRENT_DATE}
              value={beforeInputValue}
              onChange={(e) => onChange(e, "before")}
            />
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
export default DateRangeInput
