import {
  Checkbox,
  Collapse,
  FormControl,
  FormLabel,
  Stack,
  Tag,
  Text,
  Textarea,
  Tooltip,
} from "@chakra-ui/react"
import { ArrowCounterClockwise, Check, File } from "@phosphor-icons/react/dist/ssr"
import { isValidAddress } from "components/[guild]/EditGuild/components/Admins/Admins"
import Button from "components/common/Button"
import FormErrorMessage from "components/common/FormErrorMessage"
import { env } from "env"
import useDropzone from "hooks/useDropzone"
import useSubmit from "hooks/useSubmit"
import { useRouter } from "next/router"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import fetcher from "utils/fetcher"
import parseFromObject from "utils/parseFromObject"
import { z } from "zod"

function validateEmailAllowlist(toValidate: string[]) {
  if (!toValidate) return

  const containsEmpty = toValidate.some((address) => address === "")

  if (containsEmpty) {
    return "Field contains empty line"
  }

  const invalidEmails = toValidate.filter(
    (address) => !z.string().email().safeParse(address).success
  )

  if (invalidEmails.length > 0) {
    return `Field contains invalid email address: ${invalidEmails[0]}`
  }
}

export default function AllowlistFormInputs({
  baseFieldPath,
}: {
  baseFieldPath: string
}) {
  const {
    setValue,
    formState: { errors },
    control,
    register,
  } = useFormContext()
  const router = useRouter()

  const isHidden = useWatch({ name: `${baseFieldPath}.data.hideAllowlist` })
  const requirementFileId = useWatch({ name: `${baseFieldPath}.data.fileId` })
  const addressCount = useWatch({ name: `${baseFieldPath}.data.addressCount` })
  const status = useWatch({ name: `${baseFieldPath}.data.status` })

  const requirementType = useWatch({ name: `${baseFieldPath}.type` })

  const uploadFileToGcs = useSubmit(async (file: File) => {
    const [data, body] = await Promise.all([
      fetcher(
        `${env.NEXT_PUBLIC_API.replace(
          "/v1",
          "/v2"
        )}/third-party/google/signed-url?requirementType=${
          requirementType || "ALLOWLIST"
        }`
      ),
      file.arrayBuffer(),
    ])

    const { signedUrl, fileId } = data || {}

    if (!signedUrl || !fileId) {
      throw new Error("Failed to upload allowlist")
    }

    const gcsResponse = await fetch(signedUrl, {
      method: "PUT",
      body,
      headers: {
        "Content-Type": "text/csv",
      },
    })

    if (!gcsResponse.ok) {
      throw new Error("Failed to upload allowlist")
    }

    setValue(`${baseFieldPath}.data.addresses`, [], {
      shouldDirty: true,
    })

    setValue(`${baseFieldPath}.data.fileId`, fileId, {
      shouldDirty: true,
    })

    return fileId
  })

  const { isDragActive, fileRejections, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { "text/*": [".csv"] },
    onDrop: (accepted) => {
      if (accepted.length > 0) {
        uploadFileToGcs.onSubmit(accepted[0])
      }
    },
    maxSizeMb: 50,
  })

  const type = useWatch({ name: `${baseFieldPath}.type` })

  return (
    <Stack spacing={4} alignItems="start" {...getRootProps()}>
      <FormControl isInvalid={!!fileRejections?.[0]} textAlign="left">
        <FormLabel display={"flex"} gap={2}>
          Upload from file
          {addressCount && (
            <Tooltip
              label={`Currently an allowlist with ${addressCount} addresses is uploaded. Uploading a new file overwrites these addresses`}
            >
              <Tag>
                {new Intl.NumberFormat("en", {
                  notation: "standard",
                }).format(addressCount)}
              </Tag>
            </Tooltip>
          )}
          {uploadFileToGcs.response && (
            <Button
              size="xs"
              variant="ghost"
              onClick={() => {
                uploadFileToGcs.reset()
                setValue(`${baseFieldPath}.data.addresses`, [], {
                  shouldDirty: true,
                })
                setValue(`${baseFieldPath}.data.fileId`, undefined, {
                  shouldDirty: true,
                })
              }}
              leftIcon={<ArrowCounterClockwise />}
              iconSpacing={1}
            >
              Clear
            </Button>
          )}
        </FormLabel>

        <Tooltip
          isDisabled={status !== "IN-PROGRESS"}
          label="The uploaded file is being processed. Please wait for it to finish before editing it"
        >
          <Button
            as="label"
            leftIcon={uploadFileToGcs.response ? <Check /> : <File />}
            h={10}
            maxW={56}
            cursor="pointer"
            isLoading={uploadFileToGcs.isLoading || status === "IN-PROGRESS"}
            loadingText={
              status === "IN-PROGRESS" ? "Processing allowlist" : "Uploading"
            }
            isDisabled={uploadFileToGcs.response}
          >
            <input {...getInputProps()} hidden />
            <Text as="span" display="block" maxW={44} noOfLines={1}>
              {uploadFileToGcs.response
                ? "File uploaded"
                : isDragActive
                  ? "Drop the file here"
                  : "Choose .csv"}
            </Text>
          </Button>
        </Tooltip>

        <FormErrorMessage>
          {fileRejections?.[0]?.errors?.[0]?.message}
        </FormErrorMessage>
      </FormControl>

      <Collapse
        in={
          !uploadFileToGcs.isLoading &&
          !uploadFileToGcs.response &&
          !requirementFileId
        }
      >
        <FormControl
          isInvalid={!!parseFromObject(errors, baseFieldPath)?.data?.addresses}
        >
          <Controller
            control={control}
            name={`${baseFieldPath}.data.addresses` as const}
            rules={{
              validate:
                type === "ALLOWLIST_EMAIL"
                  ? validateEmailAllowlist
                  : (value_) => {
                      if (!value_) return

                      const validAddresses = value_.filter(
                        (address) => address !== "" && isValidAddress(address)
                      )
                      // for useBalancy
                      setValue(
                        `${baseFieldPath}.data.validAddresses`,
                        validAddresses
                      )

                      if (validAddresses.length !== value_.length)
                        return "Field contains invalid addresses"

                      if (router.route !== "/balancy" && value_.length > 50000)
                        return `You've added ${value_.length} addresses but the maximum is 50000`
                    },
            }}
            render={({ field: { onChange, onBlur, value: textareaValue, ref } }) => (
              <Textarea
                ref={ref}
                resize="vertical"
                p={2}
                minH={64}
                className="custom-scrollbar"
                cols={42}
                wrap="off"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                value={textareaValue?.join("\n") || ""}
                onChange={(e) => onChange(e.target.value?.split("\n"))}
                onBlur={onBlur}
                placeholder="...or paste addresses, each one in a new line"
              />
            )}
          />
          <FormErrorMessage>
            {
              (parseFromObject(errors, baseFieldPath)?.data?.addresses as any)
                ?.message
            }
          </FormErrorMessage>
        </FormControl>
      </Collapse>
      {router.asPath !== "/balancy" && (
        <FormControl pb={3}>
          <Checkbox
            fontWeight="medium"
            {...register(`${baseFieldPath}.data.hideAllowlist`)}
            checked={isHidden}
          >
            Make allowlist private
          </Checkbox>
        </FormControl>
      )}
    </Stack>
  )
}
