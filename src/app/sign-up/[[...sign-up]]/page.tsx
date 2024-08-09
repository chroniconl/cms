import PublicLayout from '@/components/PublicLayout'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <PublicLayout>
      <Heading>Thank you for your interest in Chroniconl</Heading>
      <Text>
        We're actively working on this project. Please check back soon.
      </Text>
      <SignUp path="/sign-up" />
    </PublicLayout>
  )
}
