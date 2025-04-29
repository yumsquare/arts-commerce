import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Arts Commerce",
  description: "A modern e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 py-6">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Arts Commerce. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
