import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morimoto Lab Starter",
  description: "研究室共通の最小開発用ひな形",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body>{children}</body></html>;
}
