import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import JsonLd from "@/components/seo/JsonLd";
import { hasLocale, locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/seo/config";
import { buildPersonJsonLd } from "@/lib/seo/jsonld";
import "../globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardStdVariable.woff2",
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

// ko/en만 정적 생성하고, 그 외 lang 세그먼트는 404 처리
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
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
          <Header
            lang={lang}
            className="fixed top-0 left-0 right-0 h-16 z-50"
          />
          <main className="pt-16 pb-16 flex-1">{children}</main>
          <Footer className="fixed bottom-0 left-0 right-0 h-16 z-50" />
        </ThemeProvider>
      </body>
    </html>
  );
}
