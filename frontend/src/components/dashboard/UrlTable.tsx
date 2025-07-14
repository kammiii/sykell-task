import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { Url } from "./schema"
import { columns } from "./columns"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import AddUrlForm from "@/components/forms/AddUrlForm"
import { queryClient } from "@/main"

export default function UrlTable({ data }: { data: Url[] }) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([{
    desc: true,
    id: "created_at",
  }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const statusFilter = String(columnFilters.find(f => f.id === "status")?.value ?? "all")

  const table = useReactTable({
    data: useMemo(() => data, [data]),
    columns,
    state: {
      globalFilter,
      columnFilters,
      sorting,
    },
    globalFilterFn: 'includesString',
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <Input
          placeholder="Search by title"
          value={globalFilter}
          className="w-full md:w-1/3"
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setColumnFilters((prev) => {
                const others = prev.filter(f => f.id !== "status")
                return value === "all" ? others : [...others, { id: "status", value }]
              })
            }}
          >
            <SelectTrigger className="w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="queued">Queued</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="stopped">Stopped</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sorting?.[0]?.id || ""}
            onValueChange={(value) =>
              value
                ? setSorting([{ id: value, desc: value === "created_at" }])
                : setSorting([])
            }
          >
            <SelectTrigger className="w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at">Most recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
          <AddUrlForm onSuccess={() => queryClient.invalidateQueries({ queryKey: ["urls"] })} />
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id}>
                {hg.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0
              ? table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Prev
        </Button>
        <Button size="sm" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
