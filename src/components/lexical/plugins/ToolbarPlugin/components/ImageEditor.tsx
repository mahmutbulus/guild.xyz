import {
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { ImageSquare } from "@phosphor-icons/react/dist/ssr"
import Button from "components/common/Button"
import { useRef, useState } from "react"
import { INSERT_IMAGE_COMMAND } from "../../ImagesPlugin"

const ImageEditor = (): JSX.Element => {
  const [editor] = useLexicalComposerContext()
  const initialFocusRef = useRef<HTMLInputElement>()

  const { isOpen, onToggle, onClose } = useDisclosure()

  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")

  const clearAndClose = () => {
    setImageUrl("")
    setImageAlt("")
    onClose()
  }

  const addImage = () => {
    if (!imageUrl) return

    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      src: imageUrl,
      altText: imageAlt,
    })
    clearAndClose()
  }

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        initialFocusRef={initialFocusRef}
      >
        <PopoverTrigger>
          <IconButton
            onClick={onToggle}
            aria-label="Add image"
            icon={<ImageSquare />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader
            px={2}
            pt={2}
            pb={0}
            fontWeight="semibold"
            fontSize="sm"
            border="none"
          >
            Add image
          </PopoverHeader>

          <PopoverBody px={2}>
            <Stack>
              <Input
                ref={initialFocusRef}
                size="sm"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") addImage()
                }}
              />
              <Input
                size="sm"
                placeholder="Alternate text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") addImage()
                }}
              />
            </Stack>
          </PopoverBody>

          <PopoverFooter border="none">
            <HStack justifyContent="end">
              <Button onClick={clearAndClose} size="xs" rounded="lg">
                Cancel
              </Button>
              <Button
                colorScheme="green"
                onClick={addImage}
                isDisabled={!imageUrl}
                variant="solid"
                size="xs"
                rounded="lg"
              >
                Add image
              </Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ImageEditor
