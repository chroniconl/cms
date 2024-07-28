import Post from '@/components/Post'
import { supabase } from '@/utils/supabase'

export const fetchCache = 'force-no-store'

export default async function LegalDocumentPreviewPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data: legalDocument, error: legalDocumentError } = await supabase
    .from('legal_documents')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (legalDocumentError) {
    throw new Error('Error fetching legal document')
  }

  if (!legalDocument) {
    throw new Error('Legal document not found')
  }

  return (
    <div>
      <div>
        <h2 className="ch-heading ch-primary">{params?.slug}</h2>
        <p className="ch-body ch-muted">Manage your legal documents</p>
      </div>
      <div className="">
        <Post
          title={params?.slug}
          date={new Date(legalDocument.created_at).toLocaleDateString()}
          slug={params?.slug}
          category={{
            id: '1',
            name: 'Legal',
            slug: 'legal',
            color: '#FFF',
          }}
          description="This is a test description"
          content={legalDocument.content}
        />
      </div>
    </div>
  )
}
