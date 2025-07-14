import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "./client"
import { useNavigate } from "react-router-dom"

type User = { id: number; name: string; created_at: string }

export default function useAuth() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<User>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await api.get<{ user: User }>("/api/auth/me")
      return data.user
    },
    staleTime: Infinity,
    retry: false,
    enabled: !!localStorage.getItem("token"),
  })

  const loginMutation = useMutation({
    mutationFn: async (name: string) => {
      const { data } = await api.post<{ token: string; user: User }>("/api/auth/login", { name })
      localStorage.setItem("token", data.token)
      await queryClient.setQueryData(["auth", "me"], data.user)
      return data.user
    },
    onSuccess: () => {
      refetch()
    },
  })

  const signOut = () => {
    localStorage.removeItem("token")
    queryClient.removeQueries({ queryKey: ["auth", "me"] })
    navigate("/login")
  }

  return {
    user,
    isLoggedIn: !!user,
    login: loginMutation.mutateAsync,
    signOut,
    isLoading,
    isError,
  }
}
