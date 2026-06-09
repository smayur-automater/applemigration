import type { Metadata } from "next";
import "./globals.css";
import { inter, playfairDisplay } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://applemigration.com.au"
  ),
  title: {
    default: "Apple Education & Immigration | Registered Migration Agents",
    template: "%s | Apple Education & Immigration",
  },
  description:
    "Apple Education & Immigration — trusted registered migration agents helping with student visas, skilled migration, partner visas, and education consulting in Australia.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Apple Education & Immigration",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
