import { Outlet } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Header from "@/components/dashboard/Header"
import UrlList from "@/components/dashboard/UrlList"
import AddUrlForm from "@/components/forms/AddUrlForm"
import api from "@/lib/api/client"

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false)
  const queryClient = useQueryClient()

  const { data: urls = [], isLoading, error } = useQuery({
    queryKey: ["urls"],
    queryFn: async () => {
      const { data } = await api.get("/api/urls")
      return data
    },
  })

  return (
    <div className="p-6">
      <Header onAdd={() => setShowForm((v) => !v)} />
      {showForm && (
        <div className="max-w-4xl mx-auto mb-4">
          <AddUrlForm
            onSuccess={() => {
              setShowForm(false)
              queryClient.invalidateQueries({ queryKey: ["urls"] })
            }}
          />
        </div>
      )}
      {isLoading && <p className="text-center mt-4">Loading...</p>}
      {error && (
        <p className="text-red-500 text-center mt-4">
          {(error as Error).message}
        </p>
      )}
      {!isLoading && <UrlList urls={urls} />}
      <Outlet />
    </div>
  )
}
