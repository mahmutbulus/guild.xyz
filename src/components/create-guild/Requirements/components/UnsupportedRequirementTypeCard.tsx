import { Icon } from "@chakra-ui/react"
import { Warning } from "@phosphor-icons/react/dist/ssr"
import Requirement from "components/[guild]/Requirements/components/Requirement"
import DataBlock from "components/common/DataBlock"
import { PropsWithChildren } from "react"
import RequirementBaseCard from "./RequirementBaseCard"

type Props = {
  type: string
}

const UnsupportedRequirementTypeCard = ({
  type,
  children,
}: PropsWithChildren<Props>) => (
  <RequirementBaseCard>
    <Requirement image={<Icon as={Warning} boxSize={5} color="orange.300" />}>
      {`Unsupported requirement type: `}
      <DataBlock>{type}</DataBlock>
    </Requirement>
    {children}
  </RequirementBaseCard>
)

export default UnsupportedRequirementTypeCard
