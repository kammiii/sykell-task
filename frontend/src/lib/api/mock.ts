export type UrlData = {
  id: string
  title: string
  htmlVersion: string
  internalLinks: number
  externalLinks: number
  brokenLinks: number
  headings: Record<string, number>
  hasLogin: boolean
}

export async function fetchUrls(): Promise<UrlData[]> {
  return [
    {
      id: "1",
      title: "Example Site",
      htmlVersion: "HTML5",
      internalLinks: 8,
      externalLinks: 3,
      brokenLinks: 1,
      headings: { h1: 1, h2: 2 },
      hasLogin: false,
    },
    {
      id: "2",
      title: "Another Page",
      htmlVersion: "HTML4",
      internalLinks: 5,
      externalLinks: 5,
      brokenLinks: 2,
      headings: { h1: 1, h2: 1, h3: 1 },
      hasLogin: true,
    },
  ]
}

export async function fetchUrlById(id: string): Promise<UrlData | undefined> {
  const urls = await fetchUrls()
  return urls.find((u) => u.id === id)
}
