import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api/client"
import { Loader2 } from "lucide-react"

interface Props {
  urlId: number | null
  onClose: () => void
}

export default function CrawlResultModal({ urlId, onClose }: Props) {
  const { data, isLoading, error } = useQuery({
    enabled: !!urlId,
    queryKey: ["url", urlId],
    queryFn: async () => {
      const { data } = await api.get(`/api/urls/${urlId}`)
      return data
    },
  })

  return (
    <Dialog open={!!urlId} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crawl Results</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : error ? (
          <p className="text-red-500">Failed to load data</p>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Title: {data?.title}</p>
            <p className="text-sm">Address: {data?.address}</p>
            <p className="text-sm capitalize">Status: {data?.status}</p>
            <div className="pt-2">
              <p className="font-semibold mb-1">Links Found:</p>
              <ul className="list-disc pl-5 space-y-1 max-h-64 overflow-y-auto">
                {data?.links?.map((link: string, i: number) => (
                  <li key={i} className="break-all text-sm text-blue-700 hover:underline">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
