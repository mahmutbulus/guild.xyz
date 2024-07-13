import {
  Box,
  Collapse,
  HStack,
  IconButton,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"
import useMembershipUpdate from "components/[guild]/JoinModal/hooks/useMembershipUpdate"
import { FormProvider, useForm } from "react-hook-form"
import { UniswapChains } from "requirements/Uniswap/hooks/useParsePoolChain"
import SelectLiquidityPoolStep from "./components/SelectLiquidityPoolStep"
import SetLiquidityPointsRewardStep from "./components/SetLiquidityPointsRewardStep"
import useCreateLiquidityIncentive from "./hooks/useCreateLiquidityIncentive"

export type LiquidityIncentiveForm = {
  conversion: number
  pointsId?: number | null // if points reward is selected
  imageUrl?: string // if points reward is created
  name?: string // if points reawrd is created
  pool: {
    /**
     * TODO: figure out better typing solution form resetting needs to allow for
     * nulls
     */
    data: {
      lpVault: `0x${string}` | null // pool address
      baseCurrency: "token0" | "token1"
      minAmount: number
      token0: `0x${string}` | null
      token1: `0x${string}` | null
      defaultFee: number
      countedPositions: string
    }
    chain: UniswapChains
  }
}

const uniswapReqDefaults = {
  lpVault: null,
  baseCurrency: "token0",
  countedPositions: "FULL_RANGE",
  minAmount: 0,
  defaultFee: 0,
  token0: null,
  token1: null,
} satisfies LiquidityIncentiveForm["pool"]["data"]

const defaultValues = {
  conversion: 1,
  pool: {
    data: {
      ...uniswapReqDefaults,
    },
  },
  name: "",
  imageUrl: "",
  pointsId: null,
}

const steps = [
  { title: "Choose your liquidity pool", content: SelectLiquidityPoolStep },
  { title: "Set points reward", content: SetLiquidityPointsRewardStep },
]

const LiquidityIncentiveSetupModal = ({
  onClose,
}: {
  onClose: (closeAll?: boolean) => void
}) => {
  const methods = useForm<LiquidityIncentiveForm>({
    mode: "all",
    defaultValues,
  })

  const handleClose = () => {
    onClose(true)
    methods.reset(defaultValues)
    setActiveStep(0)
  }

  const { triggerMembershipUpdate } = useMembershipUpdate()

  const { onSubmit, isLoading } = useCreateLiquidityIncentive(() => {
    triggerMembershipUpdate()
    handleClose()
  })

  const { activeStep, goToNext, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <ModalContent>
      <FormProvider {...methods}>
        <ModalCloseButton />

        <ModalHeader pb="5">
          <HStack>
            <IconButton
              rounded="full"
              aria-label="Back"
              size="sm"
              mb="-3px"
              icon={<ArrowLeft size={20} />}
              variant="ghost"
              onClick={() => onClose(false)}
            />
            <Text>Liquidity incentive program</Text>
          </HStack>
        </ModalHeader>

        <ModalBody className="custom-scrollbar">
          <Text colorScheme="gray" fontWeight="semibold" mb="9">
            Create a point-based incentive for liquidity providers. More liquidity
            means more points. Set a custom conversion rate to fine-tune the rewards
          </Text>

          <Stepper
            colorScheme="indigo"
            index={activeStep}
            orientation="vertical"
            gap="0"
            w="full"
            height="100%"
          >
            {steps.map((step, index) => (
              <Step
                key={index}
                style={{ width: "100%", height: "100%" }}
                onClick={activeStep > index ? () => setActiveStep(index) : undefined}
              >
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box
                  w="full"
                  mt={1}
                  minH={index === steps.length - 1 ? 0 : 12}
                  _hover={activeStep > index ? { cursor: "pointer" } : undefined}
                >
                  <StepTitle>{step.title}</StepTitle>
                  <Collapse
                    in={activeStep === index}
                    animateOpacity
                    style={{ padding: "2px", margin: "-2px" }}
                  >
                    <step.content
                      onContinue={goToNext}
                      isLoading={isLoading}
                      onSubmit={methods.handleSubmit(onSubmit)}
                    />
                  </Collapse>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </ModalBody>
      </FormProvider>
    </ModalContent>
  )
}

export default LiquidityIncentiveSetupModal
