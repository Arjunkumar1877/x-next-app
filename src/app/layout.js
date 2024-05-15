import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import News from "./components/News";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "X Clone",
  description: "A clone of X website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className={inter.className}>
      <div className="flex justify-between max-w-6xl mx-auto">
        <div className="hidden sm:inline border-r h-screen">
          <Sidebar />
        </div>
        <div className="">
          {children}
        </div>

<div className="">
  <News />
</div>

      </div>
     </body>
    </html>
  );
}
