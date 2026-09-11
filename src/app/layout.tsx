import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Hollywood Guitar Teacher | Professional Guitar Lessons in Los Angeles", template: "%s | Hollywood Guitar Teacher" },
  description: "Unlock your musical potential with personalized guitar lessons from experienced professionals. Call (818) 873-6719.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en">
      <head>
        {/* RFM site data - pushed before GTM loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  rfm: {
    schema_version: "1.0",
    site_id: "hollywood_guitar_teachers",
    provider_id: "f84e1be9-9233-4586-bb98-f1d253030667",
    provider_name: "Hollywood Guitar Teachers",
    service_category: "guitar_lessons",
    market: "hollywood"
  }
});`,
          }}
        />
      </head><body className={`${inter.variable} font-sans antialiased`}><Header /><main>{children}</main><Footer /></body></html>;
}
