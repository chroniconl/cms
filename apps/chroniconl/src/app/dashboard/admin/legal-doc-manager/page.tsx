export const fetchCache = 'force-no-store'
import { supabase } from '@/utils/supabase'
import { formatDate } from '@/utils/dates'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/table'
import { NewLegalDocModal } from './__legal_doc_manager_components/NewLegalDocModal'
import BorderBottom from '@/components/BorderBottom'
import Link from 'next/link'

export default async function LegalDocManagerPage() {
	const { data: legalDocumentsData, error: legalDocumentsError } = await supabase
		.from('legal_documents')
		.select('*')

	if (legalDocumentsError) {	
		throw new Error('Error fetching legal documents')
	}

  return (
    <div className="px-4">
			<div className="mb-4">
				<section className='flex flex-col gap-4 md:flex-row md:justify-between mb-4 pb-2'>
					<div>
						<h2 className="ch-heading ch-primary">Legal Document Manager</h2>
						<p className="ch-text ch-muted">Manage your legal documents</p>
					</div>
					<div>
						<NewLegalDocModal />
					</div>
				</section>
				<BorderBottom height={1} borderColor="#FFF" />
			</div>
			{legalDocumentsData.length > 0 && (
			 	<Table>
				 	<TableHeader>
					 	<TableRow>
							<TableHead>Document Name</TableHead>
							<TableHead className='w-[150px]'>Created on</TableHead>
							<TableHead className='w-[150px]'>Last Updated</TableHead>						
						</TableRow>	
					</TableHeader>
			 		<TableBody>
				 		{legalDocumentsData.map((legalDocument: {
							id: string
							title: string
							created_at: Date
							last_updated: Date
							slug: string
				 		}) => (
					 		<TableRow key={legalDocument.id}>
								<TableCell>
									<Link
										href={`/dashboard/admin/legal-doc-manager/${legalDocument.slug}`}
										prefetch={false}
									>
										{legalDocument.title}							
									</Link>									
								</TableCell>
						 		<TableCell className='w-[150px]'>
									{formatDate(new Date(legalDocument?.created_at)?.toISOString())}
								</TableCell>
						 		<TableCell className='w-[150px]'>
									{formatDate(new Date(legalDocument?.last_updated)?.toISOString())}
								</TableCell>
					 		</TableRow>
				 		))}
			 		</TableBody>
		 		</Table>
			)}

			{legalDocumentsData.length === 0 && (
				<div className="mt-4 flex items-center justify-center">
					<p className="ch-text ch-muted">No documents found</p>
				</div>
			)}
    </div>
  )
}
