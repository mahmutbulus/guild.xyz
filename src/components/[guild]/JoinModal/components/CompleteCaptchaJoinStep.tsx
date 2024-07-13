import { useWeb3ConnectionManager } from "@/components/Web3ConnectionManager/hooks/useWeb3ConnectionManager"
import { Icon, useDisclosure } from "@chakra-ui/react"
import { Robot } from "@phosphor-icons/react/dist/ssr"
import useSWRWithOptionalAuth from "hooks/useSWRWithOptionalAuth"
import { CompleteCaptchaModal } from "requirements/Captcha/components/CompleteCaptcha"
import JoinStep from "./JoinStep"

const CompleteCaptchaJoinStep = (): JSX.Element => {
  const { isWeb3Connected } = useWeb3ConnectionManager()

  const {
    data: isDone,
    isLoading,
    mutate,
  } = useSWRWithOptionalAuth(`/v2/util/gate-proof-existence/CAPTCHA`)

  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <>
      <JoinStep
        isDone={isDone}
        colorScheme="cyan"
        icon={<Icon as={Robot} />}
        title="Complete CAPTCHA"
        buttonLabel={isDone ? "Completed" : "Complete"}
        onClick={onOpen}
        isDisabled={!isWeb3Connected && "Connect wallet first"}
        isLoading={isLoading}
      />

      <CompleteCaptchaModal
        isOpen={isOpen}
        onClose={onClose}
        onComplete={() => mutate(() => true, { revalidate: false })}
      />
    </>
  )
}

export default CompleteCaptchaJoinStep
