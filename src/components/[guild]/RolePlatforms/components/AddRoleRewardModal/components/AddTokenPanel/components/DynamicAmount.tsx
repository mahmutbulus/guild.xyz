import { Icon, Stack, Text } from "@chakra-ui/react"
import { Star } from "@phosphor-icons/react/dist/ssr"
import useGuildPlatform from "components/[guild]/hooks/useGuildPlatform"
import OptionImage from "components/common/StyledSelect/components/CustomSelectOption/components/OptionImage"
import useTokenData from "hooks/useTokenData"
import { ReactNode } from "react"
import { useWatch } from "react-hook-form"
import DynamicTypeForm from "rewards/Token/DynamicTypeForm"
import Token from "static/icons/token.svg"
import ConversionInput from "./ConversionInput"

const DynamicAmount = () => {
  const pointsPlatformId = useWatch({ name: "data.guildPlatformId" })
  const chain = useWatch({ name: `chain` })
  const address = useWatch({ name: `tokenAddress` })

  const { guildPlatform: selectedPointsPlatform } =
    useGuildPlatform(pointsPlatformId)

  const {
    data: { symbol, logoURI },
  } = useTokenData(chain, address)

  const pointsPlatformImage: ReactNode = selectedPointsPlatform?.platformGuildData
    ?.imageUrl ? (
    <OptionImage
      img={selectedPointsPlatform?.platformGuildData?.imageUrl}
      alt={selectedPointsPlatform?.platformGuildData?.name ?? "Point type image"}
    />
  ) : (
    <Icon as={Star} />
  )

  return (
    <>
      <Text colorScheme="gray">
        Claimable amount is dynamic based on a snapshot containing each eligible user
        paired with a number.
      </Text>

      <DynamicTypeForm />

      <Stack gap={0}>
        <ConversionInput
          name="multiplier"
          toImage={logoURI ? <OptionImage img={logoURI} alt={symbol} /> : <Token />}
          fromImage={pointsPlatformImage}
          defaultMultiplier={1}
        />
      </Stack>
    </>
  )
}

export default DynamicAmount
