import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Partner Registry",
  description: "Partner administration console",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          pauseOnHover
          closeOnClick
          theme="dark"
        />

      </body>
    </html>
  );
}