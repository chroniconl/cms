import Header from '@/components/header/Header'
import Footer from '@/components/Footer'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <main className="mx-auto mb-20 mt-8 max-w-7xl px-2 md:mt-10 md:px-6">
        {children}
      </main>
      <Footer />
    </div>
  )
}
