import { describe, it, expect } from "vitest"
import { Route, Routes } from "react-router-dom"
import Details from "@/pages/Details"
import { axiosMock, renderInCtx } from "@/lib/__tests__/utils"

describe("Details", () => {
  it("renders detail view from API", async () => {
    axiosMock.onGet("/api/urls/1").reply(200, {
      id: 1,
      address: "https://example.com",
      title: "Example",
      status: "done",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    const screen = renderInCtx(
      <Routes>
        <Route path="/url/:id" element={<Details />} />
      </Routes>,
      {
        withRouter: true,
        initialEntries: ["/url/1"],
      }
    )

    await screen.findByText("URL Details")
    expect(screen.getByText("Example")).toBeDefined()
    expect(screen.getByText("https://example.com")).toBeDefined()
    expect(screen.getByText("done")).toBeDefined()
  })
})
