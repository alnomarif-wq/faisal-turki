'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Zap, Brain, Dumbbell, Apple, TrendingUp, Users,
  ChevronRight, Star, CheckCircle, BarChart2, Target, Clock
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Coaching',
    description: 'Chat with your AI coach 24/7. Get answers to any fitness or nutrition question, personalized to your goals.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Dumbbell,
    title: 'Smart Workout Plans',
    description: 'Science-based training programs customized to your experience, goals, and available equipment.',
    color: 'text-gold-400',
    bg: 'bg-gold-500/10',
    border: 'border-gold-500/20',
  },
  {
    icon: Apple,
    title: 'Precision Nutrition',
    description: 'Calorie-calculated meal plans with macro tracking. Includes Arabic, high-protein, vegetarian options.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Visual charts for weight, body measurements, and performance. See your transformation over time.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: BarChart2,
    title: 'Science-Based Calculations',
    description: 'Mifflin-St Jeor BMR formula, TDEE calculation, and macro splits backed by research.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    icon: Target,
    title: 'Goal-Specific Plans',
    description: 'Whether bulking, cutting, recomp, or maintenance — get a plan precisely calibrated for your target.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '95%', label: 'Success Rate' },
  { value: '500+', label: 'Exercises' },
  { value: '24/7', label: 'AI Coaching' },
];

const testimonials = [
  {
    name: 'Ahmed Al-Rashid',
    goal: 'Lost 15kg in 4 months',
    text: 'The AI coach understood exactly what I needed. The Arabic meal plans made it so easy to stick to my diet.',
    rating: 5,
  },
  {
    name: 'Sara M.',
    goal: 'Gained 8kg muscle mass',
    text: 'Best workout program I have ever followed. The progressive overload system actually works.',
    rating: 5,
  },
  {
    name: 'Khalid F.',
    goal: 'Body recomposition',
    text: 'The macro calculations are spot-on. I have more energy than ever and my physique completely changed.',
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-dark-900" />
              </div>
              <span className="text-lg font-bold text-white">FitAI <span className="text-gold-400">Pro</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-dark-300">
              <a href="#features" className="hover:text-gold-400 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-gold-400 transition-colors">How It Works</a>
              <a href="#testimonials" className="hover:text-gold-400 transition-colors">Reviews</a>
            </div>
            <Link
              href="/onboarding"
              className="px-5 py-2.5 rounded-xl bg-gold-500 text-dark-900 font-semibold text-sm hover:bg-gold-400 transition-all duration-200 shadow-gold"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 hero-bg overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/5 blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>AI-Powered Fitness Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
          >
            <span className="text-white">Your Personal</span>
            <br />
            <span className="text-gold-gradient">AI Trainer</span>
            <br />
            <span className="text-white">& Nutritionist</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Science-based workout programs, precision nutrition plans, and 24/7 AI coaching.
            Everything you need to transform your physique — personalized for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/onboarding"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-bold text-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-200 shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5"
            >
              <span>Build My Plan</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-dark-700 border border-dark-600 text-white font-semibold text-lg hover:bg-dark-600 hover:border-dark-500 transition-all duration-200"
            >
              View Demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-6 text-dark-400 text-sm"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Free to use · No credit card required · Setup in 3 minutes</span>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-dark-800/60 border border-white/5 backdrop-blur-sm"
            >
              <div className="text-3xl font-black text-gold-400 mb-1">{stat.value}</div>
              <div className="text-dark-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium border border-gold-500/20 mb-4">
              Everything You Need
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Built for <span className="text-gold-gradient">Results</span>
            </h2>
            <p className="text-dark-300 text-lg max-w-2xl mx-auto">
              Every feature is designed with one goal in mind: your transformation.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`p-6 rounded-2xl border ${feature.border} ${feature.bg} hover:scale-[1.02] transition-all duration-300 cursor-default`}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 bg-dark-800/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Ready in <span className="text-gold-gradient">3 Steps</span>
            </h2>
            <p className="text-dark-300 text-lg">From zero to a complete personalized plan in minutes.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: Users, title: 'Complete Onboarding', desc: 'Tell us your goals, stats, experience level, and food preferences. Takes about 3 minutes.' },
              { step: '02', icon: Brain, title: 'AI Generates Your Plan', desc: 'Our AI calculates your exact calories, macros, and creates a tailored workout + meal plan.' },
              { step: '03', icon: TrendingUp, title: 'Train, Eat, Progress', desc: 'Follow your plan, track progress, and chat with your AI coach whenever you need guidance.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-flex w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-gold-400" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold-500 text-dark-900 text-xs font-black flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Real <span className="text-gold-gradient">Transformations</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-dark-800 border border-white/5 hover:border-gold-500/20 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-dark-200 text-sm leading-relaxed mb-4">&quot;{t.text}&quot;</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-gold-400 text-xs">{t.goal}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gold-500 flex items-center justify-center mx-auto mb-6 shadow-gold">
                <Zap className="w-8 h-8 text-dark-900" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Start Your Transformation Today
              </h2>
              <p className="text-dark-300 text-lg mb-8 max-w-xl mx-auto">
                Join thousands who have already transformed their physique with FitAI Pro.
                Your personalized plan is waiting.
              </p>
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gold-500 text-dark-900 font-bold text-lg hover:bg-gold-400 transition-all duration-200 shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5"
              >
                <span>Build My Free Plan</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center justify-center gap-6 mt-6 text-dark-400 text-sm">
                {['100% Free', '3-Min Setup', 'No Account Needed'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-dark-900" />
            </div>
            <span className="font-bold text-white">FitAI <span className="text-gold-400">Pro</span></span>
          </div>
          <p className="text-dark-400 text-sm text-center">
            &copy; {new Date().getFullYear()} FitAI Pro. Built for achievers.
          </p>
          <div className="flex items-center gap-1 text-dark-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>Updated with latest research</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
