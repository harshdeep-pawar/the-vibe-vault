import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "The Vibe Vault | Where Fashion Meets Energy",
  description: "Premium men's fashion brand. Bold streetwear, tailored layers, and everyday essentials curated in Indore.",
  keywords: ["mens fashion", "streetwear", "tailored clothing", "premium fashion", "Indore", "The Vibe Vault"],
  openGraph: {
    type: "website",
    title: "The Vibe Vault | Where Fashion Meets Energy",
    description: "Premium men's fits curated in Indore. Bold streetwear, tailored layers, and everyday essentials.",
    url: "https://the-vibe-vault.vercel.app/",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "The Vibe Vault Logo",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${poppins.variable} font-body bg-luxury-black text-text noise-overlay antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
