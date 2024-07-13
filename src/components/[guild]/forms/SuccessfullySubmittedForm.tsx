import { Icon, Text, VStack, useColorModeValue } from "@chakra-ui/react"
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr"
import Button from "components/common/Button"
import Card from "components/common/Card"
import Link from "next/link"
import useGuild from "../hooks/useGuild"

const SuccessfullySubmittedForm = () => {
  const bgColor = useColorModeValue("var(--chakra-colors-gray-100)", "#343439")
  const bgFile = useColorModeValue("bg_light.svg", "bg.svg")

  const { urlName } = useGuild()

  return (
    <Card
      position="relative"
      bg={bgColor}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        bg: `radial-gradient(${bgColor} 50%, transparent), url('/landing/${bgFile}')`,
        bgSize: "100% 200%, 96%",
        bgRepeat: "no-repeat",
        bgPosition: "center 1rem",
        opacity: "0.07",
      }}
    >
      <VStack spacing={8} py={6}>
        <VStack spacing={4}>
          <Icon as={CheckCircle} color="green.500" weight="fill" boxSize={8} />
          <Text fontWeight="semibold">Form successfully submitted</Text>
        </VStack>
        <Button
          as={Link}
          href={`/${urlName}`}
          colorScheme="green"
          rightIcon={<ArrowRight />}
        >
          Go back to guild page
        </Button>
      </VStack>
    </Card>
  )
}
export default SuccessfullySubmittedForm
