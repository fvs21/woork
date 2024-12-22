import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";
import "@/styles/globals.scss";
import FlashRenderer from "@/flash-message/components/FlashRenderer";
import JotaiProvider from "@/jotai/JotaiProvider";
import { cookies } from "next/headers";
import ThemeProvider from "@/context/theme/ThemeProvider";

export const metadata = {
  title: "Woork"
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');

  return (
    <html className={theme.value}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/woork-logo.png" />
      </head>
      <body>
        <ThemeProvider initialTheme={theme.value}>
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
