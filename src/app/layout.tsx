// RootLayout.tsx
import React from 'react';
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import Navbar from "./Components/Navbar";
import AppProvider from "./Components/AppContentext.tsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Support App management system",
  description: "Support App management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
