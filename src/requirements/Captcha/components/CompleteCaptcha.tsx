import {
  Box,
  ButtonProps,
  Center,
  Code,
  Icon,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { Robot } from "@phosphor-icons/react/dist/ssr"
import useMembershipUpdate from "components/[guild]/JoinModal/hooks/useMembershipUpdate"
import { useRequirementContext } from "components/[guild]/Requirements/components/RequirementContext"
import useUser from "components/[guild]/hooks/useUser"
import Button from "components/common/Button"
import ErrorAlert from "components/common/ErrorAlert"
import { Modal } from "components/common/Modal"
import { useRoleMembership } from "components/explorer/hooks/useMembership"
import { useFetcherWithSign } from "hooks/useFetcherWithSign"
import { useEffect } from "react"
import useSWRImmutable from "swr/immutable"
import useVerifyCaptcha from "../hooks/useVerifyCaptcha"

const CompleteCaptcha = (props: ButtonProps): JSX.Element => {
  const { id: userId } = useUser()
  const { id, roleId } = useRequirementContext()
  const { onOpen, onClose, isOpen } = useDisclosure()

  const { reqAccesses } = useRoleMembership(roleId)

  const reqAccess = reqAccesses?.find((err) => err.requirementId === id)

  if (!userId || (!!reqAccess?.access && !reqAccess?.errorType)) return null

  return (
    <>
      <Button
        size="xs"
        onClick={onOpen}
        colorScheme="cyan"
        leftIcon={<Icon as={Robot} />}
        iconSpacing="1"
        {...props}
      >
        Complete CAPTCHA
      </Button>

      <CompleteCaptchaModal
        onClose={onClose}
        isOpen={isOpen}
        shouldTriggerMembershipUpdate
      />
    </>
  )
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
  shouldTriggerMembershipUpdate?: boolean
}

const CompleteCaptchaModal = ({
  isOpen,
  onClose,
  onComplete,
  shouldTriggerMembershipUpdate,
}: Props) => {
  const fetcherWithSign = useFetcherWithSign()
  const {
    data: getGateCallbackData,
    isValidating,
    error: getGateCallbackError,
  } = useSWRImmutable(
    isOpen
      ? [`/v2/util/gate-callbacks/session?requirementType=CAPTCHA`, { body: {} }]
      : null,
    fetcherWithSign
  )
  const { triggerMembershipUpdate } = useMembershipUpdate()
  const { onSubmit, isLoading, response } = useVerifyCaptcha(
    shouldTriggerMembershipUpdate ? () => triggerMembershipUpdate() : undefined
  )

  const onVerify = (token: string) =>
    onSubmit({
      callback: getGateCallbackData?.callbackUrl,
      token,
    })

  useEffect(() => {
    if (!response) return
    onComplete?.()
    onClose()
  }, [response, onComplete, onClose])

  return (
    <Modal
      {...{
        isOpen,
        onClose,
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Complete CAPTCHA</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center flexDirection={"column"}>
            {getGateCallbackError ? (
              <ErrorAlert label="Couldn't generate CAPTCHA" />
            ) : (!getGateCallbackData?.callbackUrl && isValidating) || isLoading ? (
              <>
                <Spinner size="xl" mt="8" />
                <Text mt="4" mb="8">
                  {`${isLoading ? "Verifying" : "Generating"} CAPTCHA`}
                </Text>
              </>
            ) : (
              <>
                <Box>
                  {typeof window !== "undefined" &&
                  window.location.hostname === "localhost" ? (
                    <Text textAlign="left">
                      HCaptcha doesn't work on localhost. Please use{" "}
                      <Code>127.0.0.1</Code> instead.
                    </Text>
                  ) : (
                    <HCaptcha
                      sitekey="05bdce9d-3de2-4457-8318-85633ffd281c"
                      onVerify={onVerify}
                    />
                  )}
                </Box>
                <Text mt="10" textAlign="center">
                  Please complete the CAPTCHA above! The modal will automatically
                  close on success
                </Text>
              </>
            )}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CompleteCaptcha
export { CompleteCaptchaModal }
