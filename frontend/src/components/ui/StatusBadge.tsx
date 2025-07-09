import { Badge } from "./badge"

export default function StatusBadge({ status }: { status: string }) {
  const color = {
    ok: "success",
    error: "destructive",
    pending: "secondary",
  }[status] || "default"

  return <Badge variant={color}>{status}</Badge>
}
