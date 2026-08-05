import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "SIZEN | Professional Video Editor Portfolio",
  description:
    "Cinematic video edits — documentary, gaming montage, wedding films, teasers & more. Hire SIZEN for your next project.",
  keywords: [
    "video editor",
    "portfolio",
    "documentary",
    "gaming montage",
    "wedding video",
    "teaser",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className={`${body.className} grain antialiased`}>
        {children}
      </body>
    </html>
  );
}
