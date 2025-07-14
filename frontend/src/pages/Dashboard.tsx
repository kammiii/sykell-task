import { Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import UrlTable from "@/components/dashboard/UrlTable"
import api from "@/lib/api/client"
import { Url } from "@/components/dashboard/schema"

export default function Dashboard() {
  const { data: urls = [], isLoading, error } = useQuery({
    queryKey: ["urls"],
    queryFn: async () => {
      const { data } = await api.get<Url[]>("/api/urls")
      return data
    },
    refetchInterval: (data) => {
      return data.state.data?.some(url => url.status === 'running') ? 2000 : false
    }
  })

  return (
    <div className="lg:p-6 p-0 space-y-6">
      {isLoading && <p className="text-center mt-4">Loading...</p>}
      {error && (
        <p className="text-red-500 text-center mt-4">
          {(error as Error).message}
        </p>
      )}
      {!isLoading && <UrlTable data={urls} />}
      <Outlet />
    </div>
  )
}
