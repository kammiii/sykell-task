import { describe, it, expect } from "vitest"
import { Route, Routes } from "react-router-dom"
import Details from "@/pages/Details"
import { axiosMock, renderInCtx } from "@/lib/__tests__/utils"

describe("Details", () => {
  it("renders detail view from API", async () => {
    const url = {
      id: 1,
      address: "https://example.com",
      title: "Example",
      status: "done",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      html_version: "HTML5",
      headings: { h1: 1, h2: 2 },
      internal_links: 5,
      external_links: 3,
      broken_links: 1,
      has_login_form: false,
    };
    axiosMock.onGet("/api/urls/1").reply(200, url)

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
    expect(screen.getByText(url.title)).toBeDefined()
    expect(screen.getByText(url.address)).toBeDefined()
    expect(screen.getByText(url.status)).toBeDefined()
    expect(screen.getByText(url.html_version)).toBeDefined()
    expect(screen.getByText(url?.internal_links)).toBeDefined()
    expect(screen.getByText(url?.external_links)).toBeDefined()
    expect(screen.getByText("No")).toBeDefined()
  })
})
