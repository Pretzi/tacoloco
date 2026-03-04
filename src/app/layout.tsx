import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "TacoLoco | Authentic Street Food in Kensington Market, Toronto",
  description:
    "TacoLoco serves authentic Mexican street food in Toronto's Kensington Market. Fresh tacos, birria, pastor, chorizo & tortas. Open daily 12–8:30pm at 160 Baldwin St.",
  keywords: [
    "TacoLoco",
    "tacos Toronto",
    "Kensington Market",
    "Mexican street food",
    "birria tacos",
    "Toronto tacos",
    "160 Baldwin Street",
  ],
  authors: [{ name: "TacoLoco", url: "https://tacoloco.to" }],
  creator: "TacoLoco",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "TacoLoco Street Food",
    title: "TacoLoco | Street Food in Kensington Market, Toronto",
    description:
      "Authentic Mexican street food in Toronto. Tacos, birria, tortas & more. 160 Baldwin St.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TacoLoco | Street Food Toronto",
    description: "Authentic Mexican street food in Kensington Market.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tacoloco.to",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0e172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
