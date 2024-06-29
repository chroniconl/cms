import PublicLayout from '@/components/general/PublicLayout'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <PublicLayout>
      <div className="mx-auto my-20 w-fit">
        <SignIn path="/sign-in" />
      </div>
    </PublicLayout>
  )
}
