import { act, render, screen, within } from "@testing-library/react"

import userEvent from "@testing-library/user-event"

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ContactForm } from "./ContactForm"

type User = ReturnType<typeof userEvent.setup>

const fetchMock = vi.fn<typeof fetch>()

// A fetch response the test settles by hand, so the in-between "sending"
// state can be asserted before the request finishes.
function pendingResponse() {
  let resolve: (response: Response) => void

  const promise = new Promise<Response>((res) => {
    resolve = res
  })

  fetchMock.mockReturnValueOnce(promise)

  return {
    settle: (response: Response) => act(async () => resolve(response)),
  }
}

async function fillAndSubmit(user: User) {
  await user.type(screen.getByLabelText("Name"), "Ana Torres")

  await user.type(screen.getByLabelText("Email"), "ana@studio.co")

  await user.type(screen.getByLabelText("Message"), "Hi Juan")

  await user.click(screen.getByRole("button", { name: "Send message" }))
}

beforeEach(() => {
  fetchMock.mockReset()

  vi.stubGlobal("fetch", fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("ContactForm", () => {
  it("posts the form urlencoded to Netlify Forms and shows the sending state", async () => {
    const user = userEvent.setup()

    const request = pendingResponse()

    render(<ContactForm />)

    await fillAndSubmit(user)

    expect(fetchMock).toHaveBeenCalledTimes(1)

    expect(fetchMock).toHaveBeenCalledWith("/", {
      method: "POST",

      headers: { "Content-Type": "application/x-www-form-urlencoded" },

      body: "form-name=contact&name=Ana+Torres&email=ana%40studio.co&message=Hi+Juan",
    })

    const button = screen.getByRole("button", { name: "Sending…" })

    expect(button).toHaveAttribute("aria-disabled", "true")

    expect(button).toHaveFocus()

    expect(screen.getByRole("status")).toHaveTextContent("Sending…")

    for (const label of ["Name", "Email", "Message"]) {
      expect(screen.getByLabelText(label)).toHaveAttribute("readonly")
    }

    await request.settle(new Response("ok"))
  })

  it("ignores repeat submits while a message is sending", async () => {
    const user = userEvent.setup()

    const request = pendingResponse()

    render(<ContactForm />)

    await fillAndSubmit(user)

    await user.click(screen.getByRole("button", { name: "Sending…" }))

    await user.type(screen.getByLabelText("Name"), "{Enter}")

    expect(fetchMock).toHaveBeenCalledTimes(1)

    await request.settle(new Response("ok"))
  })

  it("shows an error, keeps the message and focus, and offers a retry when Netlify rejects it", async () => {
    const user = userEvent.setup()

    fetchMock.mockResolvedValueOnce(new Response("", { status: 500 }))

    render(<ContactForm />)

    await fillAndSubmit(user)

    const alert = await screen.findByRole("alert")

    expect(alert).toHaveTextContent("Your message didn't go through.")

    expect(
      within(alert).getByRole("link", { name: "hello@juanbonilla.me" }),
    ).toHaveAttribute("href", "mailto:hello@juanbonilla.me")

    const retry = screen.getByRole("button", { name: "Try again" })

    expect(retry).toHaveFocus()

    expect(retry).not.toHaveAttribute("aria-disabled")

    expect(screen.getByRole("status")).toBeEmptyDOMElement()

    expect(screen.getByLabelText("Name")).toHaveValue("Ana Torres")

    expect(screen.getByLabelText("Email")).toHaveValue("ana@studio.co")

    expect(screen.getByLabelText("Message")).toHaveValue("Hi Juan")

    expect(screen.getByLabelText("Name")).not.toHaveAttribute("readonly")
  })

  it("treats a network failure as an error too", async () => {
    const user = userEvent.setup()

    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"))

    render(<ContactForm />)

    await fillAndSubmit(user)

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Your message didn't go through.",
    )
  })

  it("clears the error as soon as the visitor retries, and shows it again on a repeat failure", async () => {
    const user = userEvent.setup()

    fetchMock.mockResolvedValueOnce(new Response("", { status: 500 }))

    render(<ContactForm />)

    await fillAndSubmit(user)

    await screen.findByRole("alert")

    const retry = pendingResponse()

    await user.click(screen.getByRole("button", { name: "Try again" }))

    expect(screen.queryByRole("alert")).not.toBeInTheDocument()

    expect(screen.getByRole("button", { name: "Sending…" })).toBeInTheDocument()

    await retry.settle(new Response("", { status: 500 }))

    expect(screen.getByRole("alert")).toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument()

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it("replaces the form with a confirmation that echoes the email after a successful send", async () => {
    const user = userEvent.setup()

    fetchMock.mockResolvedValueOnce(new Response("ok"))

    render(<ContactForm />)

    await fillAndSubmit(user)

    const heading = await screen.findByRole("heading", { name: "Message sent" })

    expect(heading).toHaveFocus()

    expect(screen.getByText("ana@studio.co")).toBeInTheDocument()

    // The form stays mounted (it keeps the card's height) but is hidden,
    // inert and cleared.
    const name = screen.getByLabelText("Name")

    expect(name).not.toBeVisible()

    expect(name.closest("[inert]")).not.toBeNull()

    expect(name).toHaveValue("")

    expect(
      screen.queryByRole("button", { name: "Send message" }),
    ).not.toBeInTheDocument()
  })

  it("brings back an empty form, focused on Name, to send another message", async () => {
    const user = userEvent.setup()

    fetchMock.mockResolvedValueOnce(new Response("ok"))

    render(<ContactForm />)

    await fillAndSubmit(user)

    await user.click(
      await screen.findByRole("button", { name: "Send another message" }),
    )

    expect(
      screen.queryByRole("heading", { name: "Message sent" }),
    ).not.toBeInTheDocument()

    const name = screen.getByLabelText("Name")

    expect(name).toHaveFocus()

    expect(name).toBeVisible()

    expect(name.closest("[inert]")).toBeNull()

    expect(name).toHaveValue("")

    expect(screen.getByRole("button", { name: "Send message" })).toBeVisible()
  })
})
