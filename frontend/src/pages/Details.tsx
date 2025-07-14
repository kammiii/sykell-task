import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import api from "@/lib/api/client"
import { Url } from "@/components/dashboard/schema"

export default function Details() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: url, isLoading } = useQuery({
    queryKey: ["url", id],
    queryFn: async () => {
      const { data } = await api.get<Url>(`/api/urls/${id}`)
      return data
    },
    enabled: !!id,
  })

  return (
    <Dialog open onOpenChange={() => navigate("/")}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-auto">
        {isLoading || !url ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2 text-sm">
            <h2 className="text-lg font-semibold">URL Details</h2>
            <p><strong>Title:</strong> {url.title || "N/A"}</p>
            <p><strong>Address:</strong> {url.address}</p>
            <p><strong>Status:</strong> {url.status}</p>
            <p><strong>Created:</strong> {new Date(url.created_at).toLocaleString()}</p>
            <p><strong>Updated:</strong> {new Date(url.updated_at).toLocaleString()}</p>
            <hr className="my-2" />
            <p><strong>HTML Version:</strong> {url?.html_version || "Unknown"}</p>
            <div>
              <strong>Headings:</strong>
              <div className="ml-2">
                {Object.entries(url?.headings || {}).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key.toUpperCase()}:</strong> {value}
                  </p>
                ))}
              </div>
            </div>
            <p><strong>Internal Links:</strong> {url?.internal_links}</p>
            <p><strong>External Links:</strong> {url?.external_links}</p>
            <p><strong>Broken Links:</strong> {url?.broken_links}</p>
            <p><strong>Has Login Form:</strong> {url?.has_login_form ? "Yes" : "No"}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
