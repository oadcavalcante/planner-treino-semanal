import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'GymPlanner',
  description: 'Seu planejador de treinos de academia',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    viewportFit: 'cover',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} antialiased font-poppins`}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
