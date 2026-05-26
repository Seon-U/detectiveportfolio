import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seonu kim | FullStack",
  description: "FullStack Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen transition-colors duration-700 relative overflow-x-hidden flex flex-col">
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
