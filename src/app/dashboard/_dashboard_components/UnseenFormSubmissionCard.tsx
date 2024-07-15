import { LinkAsButton } from '@/components/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@chroniconl/ui/card'

export default function UnseenFormSubmissionCard({
  count = 0,
}: {
  count?: number
}) {
  const message =
    count > 0
      ? `You have ${count} unread user-submitted forms that need your attention.`
      : 'Great job! You have no unread forms at the moment.'

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Unread Forms</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{count > 0 ? count : '🎉'}</div>
      </CardContent>
      <CardFooter>
        <LinkAsButton href="/dashboard/form-submissions">
          Take a look
        </LinkAsButton>
      </CardFooter>
    </Card>
  )
}
