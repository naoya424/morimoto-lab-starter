import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "森本研究室 システム開発スターター",
  description: "森本研究室の研究システム開発を始めるための共通ひな形",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body>{children}</body></html>;
}
