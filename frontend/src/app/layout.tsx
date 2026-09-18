import type { Metadata } from "next";
import "../styles/globals.css";
import { StoreProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MediSync 360 | Healthcare Platform",
  description: "Multi-Tenant Hospital Operations & AI-Assisted Patient Digital Health Record",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-slate-50">
        <StoreProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
