import type { Metadata } from "next";
import { Mitr } from 'next/font/google';
import "./globals.css";
import ClientProvider from "./clientProvider";

const mitr = Mitr({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'], // Include all available weights
});

export const metadata: Metadata = {
  title: "EN Smart Queue",
  description: "EN smart queue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mitr.className} antialiased`}>
          <ClientProvider>
            {children}
          </ClientProvider>
      </body>
    </html>
  );
}
