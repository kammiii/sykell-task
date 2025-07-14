import { Url } from "./schema"
import { ColumnDef } from "@tanstack/react-table"
import Actions from "./Actions"

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