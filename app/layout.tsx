import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Arts Commerce",
  description: "A modern e-commerce platform",
};

export function generateStaticParams() {
  return [];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/montserrat.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/css/app.css"
          as="style"
        />
      </head>
      <body className={`${montserrat.variable} font-sans min-h-screen flex flex-col bg-white text-gray-800`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 bg-white">
          {children}
        </main>
        <footer className="bg-gray-50 py-6 border-t border-gray-100">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Arts Commerce. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
