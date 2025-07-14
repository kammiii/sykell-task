import { Url } from "./schema"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { Eye, PauseCircle, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCrawlActions } from "./useCrawlActions"

export const columns: ColumnDef<Url>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.title || "N/A"}</div>
        <div className="text-xs text-muted-foreground">{row.original.address}</div>
      </div>
    ),
  enableGlobalFilter: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="capitalize text-sm w-[150px]">{row.original.status}</span>
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <span className="text-sm">
        {new Date(row.original.created_at).toLocaleString()}
      </span>
    ),
    enableSorting: true,
    sortingFn: "datetime",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions row={row.original} />,
  },
]

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
