import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ABChecker",
  description: "Track the progress of the games you play.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            {/* <SiteFooter /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
