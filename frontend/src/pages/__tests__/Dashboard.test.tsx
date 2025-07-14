import { describe, it, expect } from "vitest"
import Dashboard from "@/pages/Dashboard"
import { axiosMock, renderInCtx } from "@/lib/__tests__/utils"
import { fireEvent } from "@testing-library/dom"

describe("Dashboard", () => {
  const urls = [
    { id: 1, address: "https://test.com", status: "queued", title: "Test URL" },
    { id: 2, address: "https://example.com", status: "done", title: "Example URL" },
  ]
  it("renders list of URLs from API", async () => {
    axiosMock.onGet("/api/urls").reply(200, urls)

    const screen = renderInCtx(<Dashboard />, { withRouter: true })
    expect(await screen.findByText(urls[0].title)).toBeDefined()
    expect(await screen.findByText(urls[0].address)).toBeDefined()
    expect(await screen.findAllByTitle("Start")).toBeDefined()
  });

  it("should allow filtering by status", async () => {
    axiosMock.onGet("/api/urls").reply(200, urls)

    const screen = renderInCtx(<Dashboard />, { withRouter: true, initialEntries: ["/"] })

    await screen.findByText(urls[0].title)
    await screen.findByText(urls[1].title)

    fireEvent.click(screen.getByText("All"))
    fireEvent.click(await screen.findByText("Queued"))

    expect(await screen.findByText(urls[0].title)).toBeDefined()
    expect(screen.queryByText(urls[1].title)).toBeNull()
  });

  it("should allow searching by title or address", async () => {
    axiosMock.onGet("/api/urls").reply(200, urls)

    const screen = renderInCtx(<Dashboard />, { withRouter: true })

    await screen.findByText(urls[0].title)
    await screen.findByText(urls[1].title)

    fireEvent.change(screen.getByPlaceholderText("Search by title"), {
      target: { value: "Test" },
    })

    expect(await screen.findByText(urls[0].title)).toBeDefined()
    expect(screen.queryByText(urls[1].title)).toBeNull()
  });
})
