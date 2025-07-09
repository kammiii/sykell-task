import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "@/lib/api/client"

export default function AddUrlForm({ onSuccess }: { onSuccess: () => void }) {
  const [url, setUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post("/api/urls", { address: url })
      toast.success("URL added!")
      onSuccess()
      setUrl("")
    } catch {
      toast.error("Failed to add URL")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        required
      />
      <Button type="submit">Add</Button>
    </form>
  )
}
