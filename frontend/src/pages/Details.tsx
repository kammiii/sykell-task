import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import api from "@/lib/api/client"

export default function Details() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: url, isLoading } = useQuery({
    queryKey: ["url", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/urls/${id}`)
      return data
    },
    enabled: !!id,
  })

  return (
    <Dialog open onOpenChange={() => navigate("/")}>
      <DialogContent className="max-w-md">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">URL Details</h2>
            <p><strong>Title:</strong> {url.title || "N/A"}</p>
            <p><strong>Address:</strong> {url.address}</p>
            <p><strong>Status:</strong> {url.status}</p>
            <p><strong>Created:</strong> {new Date(url.created_at).toLocaleString()}</p>
            <p><strong>Updated:</strong> {new Date(url.updated_at).toLocaleString()}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
