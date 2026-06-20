import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Computer Shop",
  description:
    "Shop premium custom PCs, gaming laptops, mechanical keyboards, and pro audio. Engineered for gamers, creators, and AI builders. Build your perfect rig today.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0c12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            {children}
          </CartProvider>
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}
