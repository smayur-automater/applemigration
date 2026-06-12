import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Apple Education & Immigration — Australian Visa & Education Experts",
    template: "%s | Apple Education & Immigration",
  },
  description:
    "MARA-registered migration agents helping with Australian student visas, skilled migration, partner and family visas, employer sponsorship, and education consulting.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
