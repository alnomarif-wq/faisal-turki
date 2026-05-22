import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0F" />
        <title>FitAI Pro – AI-Powered Fitness & Nutrition</title>
        <meta name="description" content="Your premium AI-powered personal trainer and nutrition coach. Science-based workout plans, personalized meal plans, and 24/7 AI coaching." />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </head>
      <body className="bg-dark-900 text-white antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color: '#F8F8FA',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#F59E0B', secondary: '#0A0A0F' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#0A0A0F' },
            },
          }}
        />
      </body>
    </html>
  );
}
