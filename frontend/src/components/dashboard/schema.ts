export interface Url {
  id: number
  address: string
  title: string
  status: "queued" | "running" | "done" | "error" | "stopped"
  created_at: string
}