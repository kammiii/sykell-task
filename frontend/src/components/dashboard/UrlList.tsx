import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Eye } from "lucide-react"
import api from "@/lib/api/client"
import { Url } from "./schema"

export default function UrlList({ urls }: { urls: Url[] }) {
  const queryClient = useQueryClient()

  const startCrawl = useMutation({
    mutationFn: (id: number) => api.post(`/api/urls/${id}/start`),
    onSuccess: () => {
      toast.success("Crawl started")
      queryClient.invalidateQueries({ queryKey: ["urls"] })
    },
    onError: () => toast.error("Failed to start crawl"),
  })

  const stopCrawl = useMutation({
    mutationFn: (id: number) => api.post(`/api/urls/${id}/stop`),
    onSuccess: () => {
      toast.success("Crawl stopped")
      queryClient.invalidateQueries({ queryKey: ["urls"] })
    },
    onError: () => toast.error("Failed to stop crawl"),
  })

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {urls.map((url) => (
        <div
          key={url.id}
          className="border rounded-xl p-4 flex items-center justify-between"
        >
          <div>
            <p className="font-semibold">
              {url.title ? `${url.title} (${url.address})` : url.address}
            </p>
            <p className="text-sm text-gray-500 capitalize">{url.status}</p>
          </div>
          <div className="space-x-2 flex items-center">
            {(url.status === "queued" || url.status === "error" || url.status === "stopped") && (
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-md disabled:opacity-50"
                onClick={() => startCrawl.mutate(url.id)}
                disabled={startCrawl.isPending}
              >
                Start
              </button>
            )}
            {url.status === "running" && (
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md disabled:opacity-50"
                onClick={() => stopCrawl.mutate(url.id)}
                disabled={stopCrawl.isPending}
              >
                Stop
              </button>
            )}
              <Link
                to={`/url/${url.id}`}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <Eye className="w-4 h-4" /> View
              </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
