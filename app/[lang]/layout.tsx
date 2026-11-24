import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Script from "next/script";
import { DictionaryProvider } from "@/components/i18n/DictionaryProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import JsonLd from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
// 집계 허용 호스트. 로컬 테스트 시에만 .env.local에서 "portfolio.devslab.uk,localhost"로 덮어쓴다.
const UMAMI_DOMAINS =
  process.env.NEXT_PUBLIC_UMAMI_DOMAINS ?? "portfolio.devslab.uk";

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
        {UMAMI_WEBSITE_ID && (
          // 쿠키 없는 Umami — next.config rewrites로 /stats/* 를 Umami로 중계
          // data-host-url: 없으면 스크립트가 gateway.umami.is로 직접 전송하므로 반드시 지정
          // data-domains: 허용 호스트에서만 집계(기본은 운영 도메인만, localhost·프리뷰 제외)
          <Script
            src="/stats/script.js"
            data-website-id={UMAMI_WEBSITE_ID}
            data-host-url="/stats"
            data-domains={UMAMI_DOMAINS}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
