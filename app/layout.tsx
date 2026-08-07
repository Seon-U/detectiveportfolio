import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo/config";
import { buildPersonJsonLd } from "@/lib/seo/jsonld";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  verification: {
    google: [
      "DIcGirR6-sr2MvZmatLRqpPZ19wEs0XIJUmPhranb-4",
      "fAuVmbog-3nZCpYyyUNhOnfLeLG3mQGUSu9WQiZyWJw",
    ],
  },
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen transition-colors duration-700 relative overflow-x-hidden flex flex-col">
        <JsonLd data={buildPersonJsonLd()} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header className="fixed top-0 left-0 right-0 h-16 z-50" />
          <main className="h-full overflow-y-auto p-16 flex-1">{children}</main>
          <Footer className="fixed bottom-0 left-0 right-0 h-16 z-50" />
        </ThemeProvider>
      </body>
    </html>
  );
}
