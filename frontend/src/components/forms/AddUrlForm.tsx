import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "@/lib/api/client"
import { useMutation } from "@tanstack/react-query"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function AddUrlForm({ onSuccess }: { onSuccess: () => void }) {
  const [url, setUrl] = useState("")
  const [open, setOpen] = useState(false)
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/urls", { address: url })
      return response.data
    },
    onSuccess: () => {
      toast.success("URL added successfully")
      onSuccess()
      setUrl("")
      setOpen(false)
    },
    onError: () => {
      toast.error("Failed to add URL")
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add URL</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new URL</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="flex flex-col gap-4"
        >
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            required
          />
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending} className="disabled:opacity-50">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
