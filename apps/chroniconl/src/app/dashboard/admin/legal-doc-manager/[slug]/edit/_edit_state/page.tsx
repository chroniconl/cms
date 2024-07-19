export const fetchCache = 'force-no-store'

export default async function LegalDocManagerPage({
	params
}: {
	params: {
		slug: string
	}
}) {
  return (
    <div>
      <div>
        <h2 className="ch-heading ch-primary">{params.slug}/edit</h2>
        <p className="ch-text ch-muted">...</p>
      </div>     
    </div>
  )
}
