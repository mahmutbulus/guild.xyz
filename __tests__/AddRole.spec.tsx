import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import AddRoleButton from "../src/components/[guild]/AddRoleButton/AddRoleButton"
import { onSubmitSpy } from "./spies/useCreateRole.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

// TODO: Optimization: Mock the components that are unused in the given test

beforeEach(() => {
  render(<ProvidersWrapper Component={AddRoleButton} />)
})

beforeEach(async () => {
  fireEvent.click(screen.getByRole("button"))

  await waitFor(() => {
    expect(screen.getByRole("heading", { name: /Add role/i })).toBeDefined()
  })
})

it("should add a role", async () => {
  fireEvent.change(screen.getByTestId("edit-name-input"), {
    target: { value: "New Role" },
  })

  fireEvent.change(screen.getByTestId("description-textarea"), {
    target: { value: "New Role description" },
  })

  fireEvent.click(screen.getByText(/free entry/i))

  fireEvent.click(screen.getByText("Save"))

  await waitFor(() => {
    expect(onSubmitSpy).toHaveBeenCalledWith({
      name: "New Role",
      description: "New Role description",
      requirements: [{ type: "FREE", data: {}, chain: null, address: null }],
    })
  })
})
