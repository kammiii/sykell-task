export interface Url {
  id: number
  address: string
  title: string
  status: "queued" | "running" | "done" | "error" | "stopped"
}