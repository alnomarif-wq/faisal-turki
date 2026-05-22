'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { AIChat } from '@/components/coach/AIChat';
import { useStore } from '@/store/useStore';
import { Bot, Zap } from 'lucide-react';

export default function CoachPage() {
  const router = useRouter();
  const { isOnboarded } = useStore();

  useEffect(() => {
    if (!isOnboarded) router.replace('/onboarding');
  }, [isOnboarded, router]);

  if (!isOnboarded) return null;

  return (
    <div className="min-h-screen bg-dark-900 page-transition flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-24 pb-6 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex-shrink-0"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-purple-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">AI Coach</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-green-400">Online</span>
            </div>
          </div>
          <p className="text-dark-400 text-sm">
            Your personal AI trainer. Ask anything about your workout, nutrition, or recovery.
          </p>

          {/* Model notice */}
          <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-dark-800 border border-white/5">
            <Zap className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <p className="text-xs text-dark-400">
              Powered by GPT-4o mini. Responses are personalized to your profile and goals.
              Requires OPENAI_API_KEY in .env.local to activate.
            </p>
          </div>
        </motion.div>

        {/* Chat interface */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 min-h-0"
        >
          <AIChat />
        </motion.div>
      </main>
    </div>
  );
}
