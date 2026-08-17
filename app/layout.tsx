import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Rent Manager", description: "Simple property and rent management for independent landlords in India." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
