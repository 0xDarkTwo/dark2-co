import "./globals.css";
import { Roboto_Mono } from "@next/font/google";

const inter = Roboto_Mono({subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
