import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>RMORT - Understand your mortgage</title>
        <meta
          name="description"
          content="Understand how you money can fly away with a mortgage and how much relevant are the periodical amortizations"
        />
        <meta property="og:title" content="RMORT - Understand your mortgage" />
        <meta
          property="og:image"
          content="https://rmort.vercel.app/screenshot.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@emmgfx" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
