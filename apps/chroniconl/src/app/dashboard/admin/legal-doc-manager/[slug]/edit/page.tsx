import { Card } from '@repo/ui/card'
import { BriefcaseIcon, FlaskConicalIcon } from 'lucide-react'
import Link from 'next/link'

export const fetchCache = 'force-no-store'

export default async function LegalDocumentEditPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div>
      <div>
        <h2 className="ch-heading ch-primary">{params?.slug}/edit</h2>
        <p className="ch-body ch-muted">Manage your legal documents</p>
      </div>   
    </div>
  )
}
