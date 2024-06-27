import Header from "@/components/general/header/Header";
import Footer from "@/components/general/Footer";

export default async function PublicLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="px-2 md:px-4 mt-8 md:mt-10 mb-20 max-w-7xl mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
