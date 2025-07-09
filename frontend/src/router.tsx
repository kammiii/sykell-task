import {
  createBrowserRouter,
} from "react-router-dom"

import RootLayout from "@/layouts/RootLayout"
import Dashboard from "@/pages/Dashboard"
import Details, { detailsLoader } from "@/pages/Details"
// import ErrorPage from "@/pages/ErrorPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "details/:id",
        element: <Details />,
        loader: detailsLoader,
      },
    ],
  },
])
