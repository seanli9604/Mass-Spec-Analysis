import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoleClue",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white font-roboto min-w-screen">
          <header className="bg-white border-b border-gray-300">
            <div className="px-4 py-4 flex justify-between items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 mr-3"></div>
                <h1 className="text-xl font-bold">MoleClue</h1>
              </Link>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/about" className="text-gray-700 hover:text-gray-900">
                        About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <main className="mx-auto px-4 py-10 text-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
