import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/toaster";

const proximaNova = localFont({
  src: [
    {
      path: "../../public/fonts/ProximaNovaLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/ProximaNovaRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ProximaNovaSemibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ProximaNovaBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/ProximaNovaExtrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-proxima",
});

export const metadata: Metadata = {
  title: {
    default: "TalentX",
    template: "%s | TalentX"
  },
  description: "TalentX is an AI-first talent network platform connecting businesses with verified talent, teams, and agencies through intelligent matching and integrated collaboration tools.",
  keywords: ["talent matching", "AI recruitment", "freelance developers", "verified talent", "hire teams", "hire agencies", "Toptal competitor"],
  authors: [{ name: "Incrosoft" }],
  creator: "Incrosoft",
  publisher: "Incrosoft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://talentx.incrosoft.com",
    siteName: "TalentX",
    title: "TalentX",
    description: "Connect with verified talent, teams, and agencies through AI-powered matching.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TalentX - AI-First Talent Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TalentX",
    description: "Connect with verified talent, teams, and agencies through AI-powered matching.",
    images: ["/og-image.jpg"],
    creator: "@talentx",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

import AuthInitializer from "@/components/auth/AuthInitializer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={proximaNova.variable} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <ClientLayout>
            <AuthInitializer />
            {children}
          </ClientLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
