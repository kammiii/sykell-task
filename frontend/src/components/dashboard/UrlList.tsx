import UrlCard from "./UrlCard"

export default function UrlList({ urls }: { urls: any[] }) {
  return (
    <div className="grid gap-4 max-w-4xl mx-auto">
      {urls.map(url => <UrlCard key={url.id} url={url} />)}
    </div>
  )
}