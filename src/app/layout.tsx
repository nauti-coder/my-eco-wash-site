import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import "@fontsource-variable/source-serif-4";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MembershipDrawerProvider } from "@/components/MembershipDrawer";
import { nautilusCheckout, nautilusCheckoutEnabled, site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "My Eco Wash | Eco-Friendly Express Car Wash in Pembroke Pines, FL",
    template: "%s | My Eco Wash",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "My Eco Wash | Eco-Friendly Express Car Wash in Pembroke Pines, FL",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#2E3083",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles only hide content when they can reveal it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Nautilus embed loader: loaded once for the whole site, only when the Nautilus checkout is switched on. Plain <script>, not next/script. */}
        {nautilusCheckoutEnabled ? <script defer src={nautilusCheckout.loaderSrc} /> : null}
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-primary px-5 py-3 font-heading font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MembershipDrawerProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MembershipDrawerProvider>
      </body>
    </html>
  );
}
