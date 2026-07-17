import type { Metadata } from "next";
  import { Geist, Geist_Mono } from "next/font/google";
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";
  import Sidebar from "@/components/Sidebar";
  import "./globals.css";

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata: Metadata = {
    title: "My Blog",
    description: "Personal blog —thoughts, notes, and experiments.",
  };

  export default function RootLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <html
        lang="zh-CN"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-sky-50 dark:bg-stone-900 text-amber-950 dark:text-amber-100">
          <Header />
          <Sidebar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    );
  }