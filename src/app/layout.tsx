import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <Providers>
          <Navbar />
          <main className="relative flex flex-col min-h-screen mt-12">
            <div className="flex-grow flex-1 mx-auto">{children}</div>
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
