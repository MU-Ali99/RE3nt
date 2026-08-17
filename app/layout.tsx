import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Ghar — Rent management, made human", description: "A calm, beautifully designed property and rent manager for independent landlords in India." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
