import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div id="scroll-sentinel" aria-hidden="true" style={{ height: 1, marginTop: -1 }} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
