import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Mr. CAP — Christian André Pettersen",
  description:
    "Digital CV. Norway's most decorated competition chef. 28 competitions. 15 gold. 2× Bocuse d'Or European Champion. 3× Chef of the Year.",
  openGraph: {
    title: "Mr. CAP — Christian André Pettersen",
    description: "Norway's most decorated competition chef. 15 gold medals. 2× Bocuse d'Or European Champion.",
    type: "profile",
    locale: "en_US",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
