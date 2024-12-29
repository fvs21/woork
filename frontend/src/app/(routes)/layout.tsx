import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";
import "@/styles/globals.scss";
import FlashRenderer from "@/flash-message/components/FlashRenderer";
import JotaiProvider from "@/jotai/JotaiProvider";
import { cookies } from "next/headers";
import ThemeProvider from "@/context/theme/ThemeProvider";
import {Montserrat} from "next/font/google";
import WebSocketsProvider from "@/context/WebSocketsProvider";

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

  const value: string = theme?.value || 'light';
  

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
                <WebSocketsProvider>
                  {children}
                  <FlashRenderer />
                </WebSocketsProvider>
              </JotaiProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
