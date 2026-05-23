import type { Metadata } from "next";
import "./globals.css";
import { FloatControls } from "@/components/FloatControls";

export const metadata: Metadata = {
  title: "MemorIAI — UI demo",
  description: "Static UI/UX demo for an AI gateway dashboard. No backend.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-lang="vi" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen">
        {children}
        <FloatControls />
      </body>
    </html>
  );
}
