import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "十齋日｜清淨修持", description: "十齋日佛菩薩聖號、日期與修持提醒" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-Hant"><body>{children}</body></html>; }
