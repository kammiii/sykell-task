import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import api from "@/lib/api/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function AddUrlModal() {
  const [url, setUrl] = useState("")
  const queryClient = useQueryClient()

  const createUrl = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/urls/", { address: url })
      return response.data
    },
    onSuccess: () => {
      toast.success("URL created successfully")
      queryClient.invalidateQueries({ queryKey: ["urls"] })
      setUrl("")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create URL")
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add URL</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new URL</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={(e) => {
          e.preventDefault();
          createUrl.mutate()
        }}>
          <Label htmlFor="url">Website URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            type="submit"
            disabled={createUrl.isPending || !url.trim()}
          >
            {createUrl.isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
