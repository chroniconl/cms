import DashboardShell from './_dashboard_components/DashboardShell'

export default async function DashboardPage({
	children,
}: {
	children: React.ReactNode
}) {
	return <DashboardShell>{children}</DashboardShell>
}
