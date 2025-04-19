import { Inter } from "next/font/google";
import { Lato } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tech Interview Prep",
  description: "Tech interview prep web_app is a platform to help tech guys in the industry prepare for any tech interview based on their (role, field, experience, category and difficulty)",
  icons: {
    icon: '/tip.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}