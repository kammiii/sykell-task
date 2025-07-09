import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Header({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto py-4">
      <h1 className="text-2xl font-bold">Monitored URLs</h1>
      <Button onClick={onAdd}>
        <Plus className="w-4 h-4 mr-2" />
        Add URL
      </Button>
    </div>
  )
}