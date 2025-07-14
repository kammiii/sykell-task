export type Url = {
  id: number
  address: string
  title: string | null
  status: "queued" | "running" | "done" | "stopped" | "error"
  error?: string | null
  created_at: string
  updated_at: string
  html_version?: string | null
  headings?: Record<string, number> | null
  internal_links?: number | null
  external_links?: number | null
  broken_links?: number | null
  has_login_form?: boolean | null
}
