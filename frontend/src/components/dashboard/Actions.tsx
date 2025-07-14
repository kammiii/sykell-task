import { Eye, PauseCircle, PlayCircle } from "lucide-react"
import { Button } from "../ui/button"
import { useCrawlActions } from "./useCrawlActions"
import { Link } from "react-router-dom"
import { Url } from "./schema"

const Actions = ({ row }: { row: Url }) => {
  const { startCrawl, stopCrawl } = useCrawlActions()
  return (
    <div className="flex items-center space-x-2">
      {row.status !== "running" ? (
        <Button variant="ghost" size="sm" title="Start" onClick={() => startCrawl.mutate(row.id)}>
          <PlayCircle className="w-4 h-4" />
        </Button>
      ) : (
        <Button variant="ghost" size="sm" title="Stop" onClick={() => stopCrawl.mutate(row.id)}>
          <PauseCircle className="w-4 h-4" />
        </Button>
      )}
      <Link to={`/url/${row.id}`} className="text-black-500 hover:underline" title="View Details">
        <Eye className="w-4 h-4" />
      </Link>
    </div>
  )
}

export default Actions