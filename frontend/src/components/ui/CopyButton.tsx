import { Button } from "./button"
import { ClipboardCopy } from "lucide-react"
import { toast } from "sonner"

export default function CopyButton({ value }: { value: string }) {
  return (
    <Button variant="ghost" size="icon" onClick={() => {
      navigator.clipboard.writeText(value)
      toast.success("Copied to clipboard!")
    }}>
      <ClipboardCopy className="w-4 h-4" />
    </Button>
  )
}
