import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { DictionaryProvider } from "@/components/i18n/DictionaryProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import JsonLd from "@/components/seo/JsonLd";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getSiteConfig } from "@/lib/seo/config";
import { buildPersonJsonLd } from "@/lib/seo/jsonld";
import "../globals.css";
import { getDictionary } from "./dictionaries";

const pretendard = localFont({
  src: "../fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export async function generateMetadata({
  params,
}: Omit<LayoutProps<"/[lang]">, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const site = getSiteConfig(lang);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.defaultTitle,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    verification: {
      google: [
        "DIcGirR6-sr2MvZmatLRqpPZ19wEs0XIJUmPhranb-4",
        "fAuVmbog-3nZCpYyyUNhOnfLeLG3mQGUSu9WQiZyWJw",
      ],
    },
    openGraph: {
      siteName: site.name,
      locale: site.ogLocale,
      type: "website",
      images: [{ url: site.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      images: [site.ogImage],
    },
  };
}

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
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${pretendard.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen transition-colors duration-700 relative overflow-x-hidden flex flex-col">
        <JsonLd data={buildPersonJsonLd(lang)} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <DictionaryProvider lang={lang} dict={dict}>
            <Header
              lang={lang}
              className="fixed top-0 left-0 right-0 h-16 z-50"
            />
            <main className="pt-16 pb-16 flex-1">{children}</main>
            <Footer className="fixed bottom-0 left-0 right-0 h-16 z-50" />
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
