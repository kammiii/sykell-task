import {
  createBrowserRouter,
} from "react-router-dom"

import RootLayout from "@/layouts/RootLayout"
import Dashboard from "@/pages/Dashboard"
import Details from "@/pages/Details"
import Login from "./pages/Login"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [{
          path: "url/:id",
          element: <Details />,
        }]
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
])
