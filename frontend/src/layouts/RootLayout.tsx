import { Outlet } from "react-router-dom"
// import { Toaster } from "@/components/ui/sonner"

export default function RootLayout() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Web Crawler Dashboard</h1>
      <Outlet />
    </div>
  )
}
