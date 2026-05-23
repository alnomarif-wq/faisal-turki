'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Zap } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ChatMessage } from '@/lib/types';
import { clsx } from 'clsx';

const QUICK_QUESTIONS = [
  'How many calories should I eat today?',
  'Is my workout plan good for muscle gain?',
  'What should I eat before training?',
  'How do I break through a plateau?',
  'Should I do cardio on rest days?',
  'How much protein is optimal for me?',
];

export function AIChat() {
  const { userProfile, calorieData, macroData, chatHistory, addChatMessage } = useStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    addChatMessage(userMsg);
    setLoading(true);

    try {
      const context = userProfile ? `
User profile: ${userProfile.gender}, ${userProfile.age} years old, ${userProfile.weight}kg, ${userProfile.height}cm.
Goal: ${userProfile.goal}. Experience: ${userProfile.experience}. Activity: ${userProfile.activityLevel}.
Goal calories: ${calorieData?.goalCalories} kcal. Protein: ${macroData?.protein}g, Carbs: ${macroData?.carbs}g, Fats: ${macroData?.fats}g.
      `.trim() : '';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...chatHistory.slice(-8).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
          context,
        }),
      });

      if (!response.ok) throw new Error('API error');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      addChatMessage(aiMsg);
      setLoading(false);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
          for (const line of lines) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content || '';
              fullContent += delta;
              aiMsg.content = fullContent;
              addChatMessage({ ...aiMsg });
            } catch {}
          }
        }
      }
    } catch {
      setLoading(false);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Make sure your ANTHROPIC_API_KEY is added in Vercel → Project Settings → Environment Variables. In the meantime, here's what I know: focus on progressive overload, hit your protein target, and get adequate sleep. Those three factors drive 80% of results.",
        timestamp: new Date(),
      };
      addChatMessage(errorMsg);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {chatHistory.length === 0 && (
          <div className="text-center py-8">
            <div className="inline-flex p-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 mb-4">
              <Zap className="w-8 h-8 text-gold-500" fill="currentColor" />
            </div>
            <h3 className="font-bold text-white mb-2">Your AI Coach is Ready</h3>
            <p className="text-sm text-white/40 max-w-xs mx-auto mb-6">
              Ask anything about your training, nutrition, or progress. I&apos;m here 24/7.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-sm mx-auto">
              {QUICK_QUESTIONS.slice(0, 4).map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-2 rounded-xl bg-dark-700 border border-white/10 text-white/60 hover:border-gold-500/30 hover:text-white hover:bg-dark-600 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {chatHistory.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              <div className={clsx(
                'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center',
                msg.role === 'assistant' ? 'bg-gold-500/20' : 'bg-accent-blue/20'
              )}>
                {msg.role === 'assistant'
                  ? <Bot className="w-4 h-4 text-gold-400" />
                  : <User className="w-4 h-4 text-accent-blue" />
                }
              </div>
              <div className={clsx(
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'assistant'
                  ? 'bg-dark-700 border border-white/5 text-white/90'
                  : 'bg-gold-500/15 border border-gold-500/20 text-white'
              )}>
                {msg.content || <span className="text-white/30 italic">...</span>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gold-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-gold-400" />
            </div>
            <div className="bg-dark-700 border border-white/5 rounded-2xl px-4 py-3">
              <Loader2 className="w-4 h-4 text-gold-400 animate-spin" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick questions (when chat has messages) */}
      {chatHistory.length > 0 && chatHistory.length < 6 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-white/5">
          {QUICK_QUESTIONS.slice(0, 3).map(q => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-dark-700 border border-white/10 text-white/50 hover:border-gold-500/30 hover:text-white transition-all whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-white/5">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask your AI coach anything..."
            className="flex-1 bg-dark-800/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/30 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 rounded-xl bg-gold-500 text-black font-bold hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
