import { Funnel } from "@phosphor-icons/react/dist/ssr"
import {
  FILTER_NAMES,
  Filter,
  useActivityLogFilters,
} from "components/[guild]/activity/ActivityLogFiltersBar/components/ActivityLogFiltersContext"
import Button from "components/common/Button"

type Props = {
  filter: Omit<Filter, "id">
}

const FilterBy = ({ filter: filterProp }: Props): JSX.Element => {
  const filtersContext = useActivityLogFilters()
  const { activeFilters, addFilter } = filtersContext ?? {}

  const isDisabled =
    !filtersContext ||
    !!activeFilters.find(
      (f) => f.filter === filterProp.filter && f.value === filterProp.value
    )

  return (
    <Button
      variant="ghost"
      leftIcon={<Funnel />}
      size="sm"
      borderRadius={0}
      onClick={() => addFilter(filterProp)}
      isDisabled={isDisabled}
      justifyContent="start"
    >
      {`Filter by ${FILTER_NAMES[filterProp.filter].toLowerCase()}`}
    </Button>
  )
}

export default FilterBy
