import { supabase } from '@/utils/supabase'
import { currentUser } from '@clerk/nextjs/server'
import DashboardHeader from './DashboardHeader'

interface UserEmailInterface {	
	id: string;
	emailAddress: string;
}

interface UserInterface {
	emailAddresses: UserEmailInterface[]
	id: string;
	primaryEmailAddressId: string;
}

const tryToGetEmail = (user: UserInterface) => {
	try {
		const userEmailData: UserEmailInterface | undefined = user.emailAddresses.find((addy: UserEmailInterface) => addy.id === user.primaryEmailAddressId)
		return userEmailData?.emailAddress;
	} catch (e) {
		console.log(e)

		return '';
	}
}


export default async function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    throw new Error("Please sign in")
  }

	// its the same, just what we need
	const email = tryToGetEmail(user as any as UserInterface);
	
  const { error: upsertError } = await supabase.from('users').upsert(
    {
      user_id: user?.id,
      provider: 'clerk',
			email: email
    },
    { onConflict: 'user_id' },
  )

  if (upsertError) {
		throw new Error("Something went wrong")
  }

  return (
    <div className="flex min-h-svh w-full flex-col bg-white dark:bg-[#0f0f0f]">
      <DashboardHeader />
      <main className="flex flex-1 flex-col pb-3">
        <div className="grow py-6">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  )
}
