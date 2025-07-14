import { Button } from "@/components/ui/button"
import useAuth from "@/lib/api/useAuth"
import { Outlet } from "react-router-dom"

export default function RootLayout() {
  const { user, signOut } = useAuth()
  return (
    <div className="min-h-screen p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <Button variant='secondary' onClick={signOut}>
            Sign Out
          </Button>
        </header>
      <main className="bg-white shadow-md rounded-lg p-6">
        <Outlet />
      </main>
    </div>
  )
}
