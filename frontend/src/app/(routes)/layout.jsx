import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";
import "@/styles/globals.scss";
import FlashRenderer from "@/flash-message/components/FlashRenderer";
import JotaiProvider from "@/jotai/JotaiProvider";
import { cookies } from "next/headers";
import ThemeProvider from "@/context/theme/ThemeProvider";
import {Montserrat} from "next/font/google";

export const metadata = {
  title: "Woork"
}

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
})

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');

  const value = theme?.value || 'light';
  

  return (
    <html className={`${value} ${montserrat.className}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/woork-logo.png" />
      </head>
      <body>
        <ThemeProvider initialTheme={value}>
          <QueryProvider>
            <AuthProvider>
                <JotaiProvider>
                  {children}
                  <FlashRenderer />
                </JotaiProvider>
              </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
