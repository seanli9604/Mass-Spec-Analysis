import type { Metadata } from "next";
import NavBar from "./components/NavBar";
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
          <NavBar />

          <main className="mx-auto px-4 py-10 text-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
