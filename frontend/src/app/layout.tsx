import type { Metadata } from "next";
import { Outfit, Syne, Cairo } from "next/font/google";
import "../styles/globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });
const syne = Syne({ subsets: ["latin"], variable: '--font-syne' });
const cairo = Cairo({ subsets: ["arabic"], variable: '--font-cairo' });

import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";
import ScrollNavigation from '@/components/layout/ScrollNavigation/ScrollNavigation';
import LogoPreloader from '@/components/layout/Preloader/LogoPreloader';
import ClientWrappers from "@/components/layout/ClientWrappers";

export const metadata: Metadata = {
  title: "Qudrat National Company (QNC)",
  description: "Total Integrated Facility Management (TIFM) partner in Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${syne.variable} ${cairo.variable}`}>
        <LogoPreloader />
        <SettingsProvider>
          <ThemeProvider>
            <LanguageProvider>
              <ClientWrappers>
                <ScrollNavigation />
                {children}
              </ClientWrappers>
            </LanguageProvider>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
