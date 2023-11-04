import type { Metadata } from "next";
import { Jura } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/hooks/providers";
import ToasterContext from "@/context/ToasterContext";

const inter = Jura({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ToasterContext />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
