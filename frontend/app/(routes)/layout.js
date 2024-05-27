'use client'

import '../assets/globals.scss'
import Provider from '../utils/Provider';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <noscript>You need to enable Javascript to run this app</noscript>
        <Provider>
          {children}
        </Provider>   
      </body>
    </html>
  );
}
