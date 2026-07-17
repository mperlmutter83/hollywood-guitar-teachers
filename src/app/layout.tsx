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
  return <html lang="en"><body className={`${inter.variable} font-sans antialiased`}><Header /><main>{children}</main><Footer /></body></html>;
}
