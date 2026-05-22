import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'FitAI Pro – AI-Powered Fitness & Nutrition',
  description: 'Your premium AI-powered personal trainer and nutrition coach. Science-based workout plans, personalized meal plans, and 24/7 AI coaching.',
  keywords: 'fitness, AI trainer, nutrition, workout plan, meal plan, bodybuilding, fat loss',
  openGraph: {
    title: 'FitAI Pro – AI-Powered Fitness & Nutrition',
    description: 'Science-based personalized fitness & nutrition powered by AI.',
    type: 'website',
  },
};

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
