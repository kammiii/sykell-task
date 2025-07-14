import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useAuth from "@/lib/api/useAuth"

export default function Login() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login, isLoggedIn } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      await login(name.trim())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn, navigate])

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto space-y-4 min-h-screen flex flex-col justify-center"
    >
      <h2 className="text-xl font-semibold">Welcome enter your name to sign in</h2>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
        required
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Loading..." : "Continue"}
      </Button>
    </form>
  )
}
