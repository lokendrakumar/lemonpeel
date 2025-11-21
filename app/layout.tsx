"use client";

import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import WorkspaceNavbar from "../components/WorkspaceNavbar";
import { AuthProvider, useAuth } from "../context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const publicRoutes = ['/login', '/signup'];

function RootContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();

  const isPublicPage = publicRoutes.includes(pathname);

  if (loading) {
    return (
      <div
        className="h-screen w-screen flex items-center justify-center"
        style={{
          background: '#0A0D0F'
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#181C1F] border-t-[#FAD406] animate-spin" />
          <div
            className="text-white text-sm"
            style={{
              fontFamily: 'Inter',
              fontWeight: '400'
            }}
          >
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <WorkspaceNavbar />}
      <main className="flex-1">
        {(isAuthenticated || isPublicPage) ? children : null}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        <AuthProvider>
          <RootContent>{children}</RootContent>
        </AuthProvider>
      </body>
    </html>
  );
}
