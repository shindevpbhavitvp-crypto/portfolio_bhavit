import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhavit Shinde | Backend Developer Portfolio",
  description: "Portfolio showcasing backend development, AI applications, Flask projects, REST APIs, and software engineering skills.",
  keywords: ["Bhavit Shinde", "Backend Developer", "Python", "Flask", "AI Integration", "REST APIs", "SQL", "Portfolio"],
  authors: [{ name: "Bhavit Shinde" }],
  openGraph: {
    title: "Bhavit Shinde | Backend Developer Portfolio",
    description: "Portfolio showcasing backend development, AI applications, Flask projects, REST APIs, and software engineering skills.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-[#121212] text-gray-100 antialiased selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
