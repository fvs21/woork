'use client'

import '../assets/globals.scss'
import Provider from '../context/Provider';
import { AuthProvider } from '../context/AuthProvider'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Woork</title>
        <link rel="icon" href="/woork-logo.jpg" />
      </head>
      <body>
        <noscript>You need to enable Javascript to run this app</noscript>
        <Provider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Provider>   
      </body>
    </html>
  );
}
