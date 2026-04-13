import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import Script from "next/script";
import ClickTracker from "@/components/ClickTracker";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
});

export const metadata: Metadata = {
  title: "The Catholic Herald — Latest Stories",
  description:
    "The latest news and analysis from The Catholic Herald.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "The Catholic Herald — Latest Stories",
    description:
      "The latest news and analysis from The Catholic Herald.",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1024, height: 1024 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={garamond.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CK7F829VY4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CK7F829VY4', {
              page_title: 'Link in Bio',
              content_group: 'link-in-bio'
            });
          `}
        </Script>
      </head>
      <body className="bg-[#f6f4ef] text-[#222]">
        <ClickTracker />
        {children}
      </body>
    </html>
  );
}
