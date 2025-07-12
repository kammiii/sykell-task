import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "@/lib/api/client"
import { useMutation } from "@tanstack/react-query"

export default function AddUrlForm({ onSuccess }: { onSuccess: () => void }) {
  const [url, setUrl] = useState("")
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/urls", { address: url })
      return response.data
    },
    onSuccess: () => {
      toast.success("URL added successfully")
      onSuccess()
      setUrl("")
    },
    onError: () => {
      toast.error("Failed to add URL")
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      mutation.mutate();
    }} className="flex gap-2">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        required
      />
      <Button type="submit" disabled={mutation.isPending} className="disabled:opacity-50">Add</Button>
    </form>
  )
}
