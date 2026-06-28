import "./globals.css";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AskLink3IT from "@/components/AskLink3IT";
import { SITE } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Link3IT — Identity Security & Privileged Access Consulting",
    template: "%s — Link3IT",
  },
  description:
    "Link3IT is an identity security specialist helping mid-market and enterprise organizations with CyberArk (Idira) health checks, PAM deployment, Entra ID and Active Directory security reviews, identity governance, and Zero Trust.",
  openGraph: {
    title: "Link3IT — Identity Security & Privileged Access Consulting",
    description: "Reduce identity risk. Bring privileged access under control. Start with a health check.",
    type: "website",
    url: SITE.url,
    siteName: "Link3IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Link3IT — Identity security, brought under control." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Link3IT — Identity Security & Privileged Access Consulting",
    description: "Reduce identity risk. Bring privileged access under control.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Paste the token from Google Search Console (HTML tag method) between the quotes.
  // It looks like: "abcDEF123..." — just the content value, not the whole meta tag.
  verification: {
    google: "PASTE_GOOGLE_SEARCH_CONSOLE_TOKEN_HERE",
  },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='24' fill='%230a0a0a'/%3E%3Cpath d='M34 30 C34 21 43 19 51 20 C64 21 69 31 67 40 C65 48 57 50 50 50 C57 50 65 52 67 60 C69 69 64 79 51 80 C43 81 34 79 34 70' stroke='%235b8def' stroke-width='7.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='34' cy='29' r='4.6' fill='%237ba4f2'/%3E%3Ccircle cx='34' cy='71' r='4.6' fill='%237ba4f2'/%3E%3Ccircle cx='50' cy='50' r='9.5' fill='%2310e0a0'/%3E%3Cpath d='M45.5 50 L49 53.5 L55 47' stroke='%2304140d' stroke-width='2.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Link3IT",
  description:
    "Identity security and privileged access management consulting — CyberArk, Microsoft Entra ID, Active Directory, identity governance, and Zero Trust.",
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: [
    "Privileged Access Management", "CyberArk", "Idira", "Palo Alto Networks Identity Security", "Microsoft Entra ID",
    "Active Directory", "Identity Governance", "Zero Trust Architecture", "IAM Automation",
  ],
  email: SITE.email,
  provider: { "@type": "Organization", name: SITE.legal },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-cobalt focus:text-white focus:p-4">
          Skip to content
        </a>
        <Nav />
        <ScrollProgress />
        <main id="main" className="relative-z">{children}</main>
        <Footer />
        <AskLink3IT />
      </body>
    </html>
  );
}
