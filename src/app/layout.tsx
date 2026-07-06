import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AgroConnect Mobile",
  description: "Tudo para o campo na palma da sua mão. Solicite orçamentos, acompanhe pedidos e consulte produtos da agropecuária diretamente pelo celular.",
  keywords: ["agropecuária", "ração", "sementes", "adubo", "veterinária", "irrigação", "jardinagem", "orçamento whatsapp"],
  authors: [{ name: "AgroConnect" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AgroConnect",
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#113E21",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-stone-900 bg-stone-950">
        {children}
      </body>
    </html>
  );
}
