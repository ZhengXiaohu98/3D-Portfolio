import { Inter } from 'next/font/google';
import './globals.css';
import 'animate.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Portfolio - Xiaohu Zheng</title>
        <meta name="description" content="Portfolio -- Xiaohu Zheng. Using next.js with three.js." />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
