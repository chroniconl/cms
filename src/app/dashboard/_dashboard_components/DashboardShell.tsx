import { supabase } from '@/utils/supabase'
import { currentUser } from '@clerk/nextjs/server'
import DashboardHeader from './DashboardHeader'

export default async function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    return <div>Please sign in</div>
  }

  const { error: upsertError } = await supabase.from('users').upsert(
    {
      user_id: user?.id,
      provider: 'clerk',
    },
    { onConflict: 'user_id' },
  )

  if (upsertError) {
    return <div>Error creating or fetching user</div>
  }

  return (
    <div className="flex min-h-svh w-full flex-col bg-white dark:bg-[#1a1a1a]">
      <DashboardHeader />
      <main className="flex flex-1 flex-col pb-3">
        <div className="grow py-6">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  )
}
