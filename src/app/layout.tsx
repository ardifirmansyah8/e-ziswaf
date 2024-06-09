import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import AppProvider from "@/components/Provider/AppProvider";
import ReactQueryProvider from "@/components/Provider/ReactQueryProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Ziswaf",
  description: "Donate your zakat, infaq, and wakaf easily with E-Ziswaf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AppProvider>
            <Layout>{children}</Layout>
          </AppProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
