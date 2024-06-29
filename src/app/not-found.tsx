import FullScreenMessage from '@/components/general/FullScreenMessage'
import PublicLayout from '@/components/general/PublicLayout'

export default function NotFound() {
  return (
    <PublicLayout>
      <FullScreenMessage
        eyebrow="Page not found"
        title="Page not found"
        description="Sorry, we couldn’t find the page you’re looking for."
        actionLabel="Go back home"
        actionHref="/"
      />
    </PublicLayout>
  )
}
