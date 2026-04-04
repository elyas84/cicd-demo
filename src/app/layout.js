import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Test automation cicd auto project",
  description:
    "This is a test automation cicd auto project for testing the cicd pipeline and developed by digiteawebteam.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`light ${inter.variable} ${manrope.variable}`}>
      <body className="font-body min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
