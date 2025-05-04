import { Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";


const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

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
      <body className={lato.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
