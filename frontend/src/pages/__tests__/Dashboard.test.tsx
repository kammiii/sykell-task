import { describe, it, expect } from "vitest"
import Dashboard from "@/pages/Dashboard"
import { axiosMock, renderInCtx } from "@/lib/__tests__/utils"

describe("Dashboard", () => {
  it("renders list of URLs from API", async () => {
    const urls = [
      { id: 1, address: "https://test.com", status: "queued", title: "Test URL" },
      { id: 2, address: "https://example.com", status: "done", title: "Example URL" },
    ]
    axiosMock.onGet("/api/urls").reply(200, urls)

    const screen = renderInCtx(<Dashboard />, { withRouter: true })
    expect(await screen.findByText(`${urls[0].title} (${urls[0].address})`)).toBeDefined()
    expect(await screen.findByRole("button", { name: /start/i })).toBeDefined()
  })
})
