import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sinuca Ideal | Mesas de Sinuca Premium",
    template: "%s | Sinuca Ideal",
  },
  description:
    "A maior plataforma brasileira de mesas de sinuca profissionais. Configure sua mesa 3D, visualize em AR e receba em casa.",
  keywords: ["sinuca", "bilhar", "mesa de sinuca", "snooker", "configurador 3D"],
  openGraph: {
    title: "Sinuca Ideal | Mesas de Sinuca Premium",
    description: "Configure sua mesa ideal em 3D e visualize no seu ambiente com AR.",
    siteName: "Sinuca Ideal",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="min-h-screen bg-bilhar-dark font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
