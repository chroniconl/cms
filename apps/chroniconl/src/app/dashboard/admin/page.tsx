import { Card } from '@repo/ui/card'
import { BriefcaseIcon, FlaskConicalIcon } from 'lucide-react'
import Link from 'next/link'

export const fetchCache = 'force-no-store'

export default async function DashboardPage() {
  return (
    <div>
      <div>
        <h2 className="ch-heading ch-primary">Admin Dashboard</h2>
        <p className="ch-body ch-muted">Welcome to the admin dashboard</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/admin/legal-doc-manager">
          <Card className="p-6 hover:bg-accent hover:text-accent-foreground">
            <div className="mb-2 flex w-fit items-center rounded-sm border border-stone-700 p-2 outline outline-stone-900">
              <BriefcaseIcon className="h-4 w-4" />
            </div>
            <h3 className="ch-body ch-primary">Legal Document Manager</h3>
            <p className="ch-body ch-muted">Manage your legal documents</p>
          </Card>
        </Link>

        <Link href="/dashboard/form-submissions">
          <Card className="p-6 hover:bg-accent hover:text-accent-foreground">
            <div className="mb-2 flex w-fit items-center rounded-sm border border-stone-700 p-2 outline outline-stone-900">
              <FlaskConicalIcon className="h-4 w-4" />
            </div>
            <h3 className="ch-body ch-primary">Form Submissions</h3>
            <p className="ch-body ch-muted">User submitted forms</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
