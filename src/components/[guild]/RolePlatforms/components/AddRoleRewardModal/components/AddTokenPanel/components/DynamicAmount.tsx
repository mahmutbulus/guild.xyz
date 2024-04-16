import {
  Alert,
  AlertIcon,
  Box,
  Circle,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import useGuild from "components/[guild]/hooks/useGuild"
import RadioSelect from "components/common/RadioSelect"
import { Option } from "components/common/RadioSelect/RadioSelect"
import OptionImage from "components/common/StyledSelect/components/CustomSelectOption/components/OptionImage"
import useToast from "hooks/useToast"
import useTokenData from "hooks/useTokenData"
import { ArrowRight, ListNumbers, Lock, LockOpen, Upload } from "phosphor-react"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useFormContext, useWatch } from "react-hook-form"
import Star from "static/icons/star.svg"
import { PlatformType } from "types"
import { AddTokenFormType } from "../AddTokenPanel"
import ConversionNumberInput from "./ConversionNumberInput"
import SnapshotSelector from "./SnapshotSelector"

const DynamicAmount = () => {
  const { guildPlatforms } = useGuild()

  const existingPointsRewards = guildPlatforms?.filter(
    (gp) => gp.platformId === PlatformType.POINTS
  )

  const [conversionLocked, setConversionLocked] = useState(false)
  const [conversionAmounts, setConversionAmounts] = useState(["1", "1"])
  const [conversionRate, setConversionRate] = useState(1.0)

  const { control, setValue } = useFormContext<AddTokenFormType>()

  useEffect(() => {
    const convRate = Number(conversionAmounts[1]) / Number(conversionAmounts[0])
    setValue("multiplier", convRate)
  }, [conversionAmounts])

  const chain = useWatch({ name: `chain`, control })
  const address = useWatch({ name: `tokenAddress`, control })

  const selectedExistingId = useWatch({
    control,
    name: "data.guildPlatformId",
  })

  const selectedPointsReward = existingPointsRewards.find(
    (gp) => gp.id === selectedExistingId
  )

  const {
    data: { logoURI: tokenLogo },
  } = useTokenData(chain, address)

  const circleBgColor = useColorModeValue("blackAlpha.200", "gray.600")

  enum SnapshotOption {
    GUILD_POINTS = "GUILD_POINTS",
    CUSTOM = "CUSTOM",
  }

  const [snapshotOption, setSnapshotOption] = useState(SnapshotOption.GUILD_POINTS)
  const toast = useToast()

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (accepted) => {
      if (accepted.length > 0) {
        // uploader.onUpload({ data: [accepted[0]], onProgress: setProgress })
      }
    },
    onError: (error) => toast({ status: "error", title: error.message }),
  })

  const dynamicOptions: Option[] = [
    {
      value: SnapshotOption.GUILD_POINTS,
      title: "Guild points snapshot",
      description:
        "Calculate rewards based on users' Guild points at a specific time",
      leftComponent: (
        <Circle bg={circleBgColor} p={3}>
          <Icon as={Star} />
        </Circle>
      ),
      children: (
        <Box w="full" p={5}>
          {existingPointsRewards.length === 0 ? (
            <>
              <Alert status="error" display="flex" alignItems="center">
                <AlertIcon mt={0} /> <p>You need to create a point reward first!</p>
              </Alert>
            </>
          ) : (
            <>
              <SnapshotSelector />
            </>
          )}
        </Box>
      ),
    },
    {
      value: SnapshotOption.CUSTOM,
      title: "Custom snapshot",
      disabled: "Soon",
      description:
        "Upload a custom snapshot to assign unique numbers to users for reward calculation",
      leftComponent: (
        <Circle bg={circleBgColor} p={3}>
          <Icon as={ListNumbers} />
        </Circle>
      ),
      children: (
        <Box
          border={"1px"}
          borderStyle={"dashed"}
          borderColor={"whiteAlpha.300"}
          bg={"blackAlpha.200"}
          p={4}
          m={4}
          borderRadius={10}
          display={"flex"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
          _hover={{ cursor: "pointer", bg: "blackAlpha.300" }}
          transitionDuration={"0.2s"}
          {...getRootProps()}
        >
          <Icon as={Upload} boxSize={4} opacity={0.5} />
          <Text opacity={0.5}>Drag and drop file or browse from device</Text>

          <input {...getInputProps()} accept="csv" hidden />
        </Box>
      ),
    },
  ]

  const toggleConversionLock = () => {
    if (conversionLocked) {
      setConversionLocked(false)
      setConversionAmounts([conversionAmounts[0], calculatePreview()])
    } else {
      setConversionRate(Number(conversionAmounts[1]) / Number(conversionAmounts[0]))
      setConversionLocked(true)
    }
  }

  const calculatePreview = () =>
    parseFloat((Number(conversionAmounts[0]) * conversionRate).toFixed(4)).toString()

  return (
    <>
      <Text colorScheme="gray">
        Claimable amount is dynamic based on a snapshot containing each eligible user
        paired with a number.
      </Text>

      <FormControl>
        <RadioSelect
          options={dynamicOptions}
          colorScheme="primary"
          onChange={(val) => setSnapshotOption(SnapshotOption[val])}
          value={snapshotOption.toString()}
        />
      </FormControl>

      <Stack gap={0}>
        <HStack justifyContent={"space-between"}>
          <FormLabel>Conversion</FormLabel>
          <IconButton
            opacity={conversionLocked ? 1 : 0.5}
            icon={conversionLocked ? <Lock /> : <LockOpen />}
            size={"xs"}
            rounded={"full"}
            variant={"ghost"}
            aria-label="Lock/unlock conversion"
            onClick={toggleConversionLock}
          ></IconButton>
        </HStack>

        <HStack w={"full"}>
          <InputGroup>
            <InputLeftElement>
              {selectedPointsReward?.platformGuildData?.imageUrl ? (
                <OptionImage
                  img={selectedPointsReward?.platformGuildData?.imageUrl}
                  alt={
                    selectedPointsReward?.platformGuildData?.name ??
                    "Point type image"
                  }
                />
              ) : (
                <Icon as={Star} />
              )}
            </InputLeftElement>

            <ConversionNumberInput
              value={conversionAmounts[0]}
              setValue={(val) => setConversionAmounts([val, conversionAmounts[1]])}
            />
          </InputGroup>

          <Circle background={"whiteAlpha.200"} p="1">
            <ArrowRight size={12} color="grayText" />
          </Circle>

          <InputGroup>
            <InputLeftElement>
              <OptionImage img={tokenLogo} alt={chain} />
            </InputLeftElement>

            <ConversionNumberInput
              value={conversionLocked ? calculatePreview() : conversionAmounts[1]}
              setValue={
                conversionLocked
                  ? (val) => {}
                  : (val) => setConversionAmounts([conversionAmounts[0], val])
              }
              isReadOnly={conversionLocked}
            />
          </InputGroup>
        </HStack>
      </Stack>
    </>
  )
}

export default DynamicAmount
