import { Button } from "@/components/ui/button"
import useAuth from "@/lib/api/useAuth"
import { Outlet } from "react-router-dom"

export default function RootLayout() {
  const { isLoggedIn, signOut } = useAuth() // Assuming useAuth is a custom hook to check authentication status
  return (
    <div className="min-h-screen p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Web Crawler Dashboard</h1>
        {isLoggedIn && (
          <Button variant='secondary' onClick={signOut}>
            Sign Out
          </Button>
        )}
      </header>
      <main className="bg-white shadow-md rounded-lg p-6">
        <Outlet />
      </main>
    </div>
  )
}
