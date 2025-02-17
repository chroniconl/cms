import { supabase } from '@/utils/supabase'
import { currentUser } from '@clerk/nextjs/server'
import DashboardHeader from './DashboardHeader'
import { redirect } from 'next/navigation'

interface UserEmailInterface {
  id: string
  emailAddress: string
}

interface UserInterface {
  emailAddresses: UserEmailInterface[]
  id: string
  primaryEmailAddressId: string
}

const tryToGetEmailFromClerkResponse = (user: UserInterface) => {
  try {
    const userEmailData: UserEmailInterface | undefined =
      user.emailAddresses.find(
        (addy: UserEmailInterface) => addy.id === user.primaryEmailAddressId,
      )
    return userEmailData?.emailAddress
  } catch (e) {
    // console.log(e)

    return ''
  }
}

export default async function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // its the same, just what we need
  const email = tryToGetEmailFromClerkResponse(user as any as UserInterface)

  const { error: upsertError } = await supabase.from('users').upsert(
    {
      user_id: user?.id,
      provider: 'clerk',
      email: email,
    },
    { onConflict: 'user_id' },
  )

  if (upsertError) {
    throw new Error('Something went wrong')
  }

  return (
    <div className="flex min-h-svh w-full flex-col bg-white dark:bg-[#0f0f0f]">
      <DashboardHeader />
      <div className="px-4 py-4">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </div>
  )
}
