import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";
import ThemeProvider from "@/context/ThemeProvider";
import "@/styles/globals.scss";
import FlashRenderer from "@/flash-message/components/FlashRenderer";

export const metadata = {
  title: "Woork"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/woork-logo.png" />
      </head>
      <body>
        <QueryProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
              <FlashRenderer />
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
