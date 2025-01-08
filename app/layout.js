import { Inter } from "next/font/google";
import "./globals.css";
import "@/css/reset.css";

import NavBar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "edu's three js journey",
  description: "edu's path to mastering webgl.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
