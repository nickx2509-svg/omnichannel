import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: " AI Omnichannel",
  description: "Enterprise AI powered automation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030303] text-zinc-200 selection:bg-white/10`}
      >
        {/* Raycast-style Corner Glow */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div 
            className="absolute -top-[10%] -left-[1%] w-[40%] h-[10%] rounded-full opacity-20 blur-[120px]"
            style={{ background: 'radial-gradient(circle, #1F1C1C 0%, transparent 80%)' }}
          />
        </div>

        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}