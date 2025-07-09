import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { fetchUrlById, type UrlData } from "@/lib/api/mock"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  const data = await fetchUrlById(params.id!)
  if (!data) throw new Response("Not Found", { status: 404 })
  return data
}

export default function Details() {
  const url = useLoaderData() as UrlData

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{url.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-4">
            <span className="text-muted-foreground">HTML Version:</span>
            <span>{url.htmlVersion}</span>
          </div>

          <div className="flex gap-4">
            <span className="text-muted-foreground">Login Form:</span>
            <Badge variant={url.hasLogin ? "default" : "outline"}>
              {url.hasLogin ? "Yes" : "No"}
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium mb-1">Links</p>
              <ul className="text-sm space-y-1">
                <li>Internal: {url.internalLinks}</li>
                <li>External: {url.externalLinks}</li>
                <li>Broken: {url.brokenLinks}</li>
              </ul>
            </div>

            <div>
              <p className="font-medium mb-1">Headings</p>
              <ul className="text-sm space-y-1">
                {Object.entries(url.headings).map(([tag, count]) => (
                  <li key={tag}>
                    {tag.toUpperCase()}: {count}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
