import type { Metadata } from "next";
import "../index.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Food Index BD | Organic Grocery",
  description:
    "Shop pure honey, ghee, roasted nuts, dates, and organic groceries from Food Index BD.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
      <Toaster />
    </html>
  );
}
