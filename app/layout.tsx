import { Nunito } from "next/font/google";
import clsx from "clsx";
import Providers from "@/components/providers";
import { Config } from "@/config";
import "./globals.css";

const nunito = Nunito({
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  subsets: ["latin-ext"],
});

export const metadata = {
  title: Config.APP_NAME,
  description: Config.APP_NAME,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(nunito.variable, "font-nunito")}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
