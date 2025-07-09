import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"
import CopyButton from "@/components/ui/CopyButton"

export default function UrlCard({ url }: { url: any }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle>{url.address}</CardTitle>
          <StatusBadge status={url.status || "pending"} />
        </div>
        <CopyButton value={url.address} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{url.title || "No title available"}</p>
        <a
          href={url.address}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm mt-2 text-blue-500 hover:underline"
        >
          Open <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </CardContent>
    </Card>
  )
}
