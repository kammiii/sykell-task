import {
  createBrowserRouter,
} from "react-router-dom"

import RootLayout from "@/layouts/RootLayout"
import Dashboard from "@/pages/Dashboard"
import Details from "@/pages/Details"

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
])
