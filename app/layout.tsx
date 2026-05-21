import type { Metadata } from "next";
import localFont from 'next/font/local';
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
      lang="en"
      className={`${pretendard.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
