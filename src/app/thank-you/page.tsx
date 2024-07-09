import PublicLayout from '@/components/general/PublicLayout'
import FullScreenMessage from '@/components/general/FullScreenMessage'

export default function ThankYou({ searchParams }: {
	searchParams: {
		newsletter: string
	}
}) {
	return (
		<PublicLayout>
			<FullScreenMessage
				eyebrow="Message sent"
				title="Thank you for reaching out"
				description="Our team received your message. We'll be in touch shortly."
				actionLabel="Go back home"
				actionHref="/"
			/>
		</PublicLayout>
	)
}
