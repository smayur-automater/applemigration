import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: { default: "MigrationHub", template: "%s · MigrationHub" },
  description:
    "CRM suite for education and migration agencies — students, applications, commissions, visas and classes in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <div className="flex min-h-svh">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main id="main-content" className="flex-1 px-6 py-6 lg:px-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
