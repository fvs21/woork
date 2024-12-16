import AuthProvider from "@/Context/AuthProvider";
import QueryProvider from "@/Context/QueryProvider";
import ThemeProvider from "@/Context/ThemeProvider";
import "@/css/globals.scss";

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
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
