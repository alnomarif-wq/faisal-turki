'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { useStore } from '@/store/useStore';
import { TrendingUp, Plus, Scale, Ruler, Target, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ProgressEntry } from '@/lib/types';
import toast from 'react-hot-toast';

export default function ProgressPage() {
  const router = useRouter();
  const { isOnboarded, progress, addProgress, userProfile } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    weight: userProfile?.weight?.toString() ?? '',
    bodyFat: '',
    chest: '',
    waist: '',
    hips: '',
    arms: '',
    notes: '',
  });

  useEffect(() => {
    if (!isOnboarded) router.replace('/onboarding');
  }, [isOnboarded, router]);

  if (!isOnboarded || !userProfile) return null;

  const chartData = progress
    .slice(-14)
    .map(e => ({ date: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), weight: e.weight }));

  const latestEntry = progress[progress.length - 1];
  const firstEntry = progress[0];
  const totalChange = latestEntry && firstEntry ? latestEntry.weight - firstEntry.weight : 0;

  const handleLog = () => {
    if (!form.weight || isNaN(parseFloat(form.weight))) {
      toast.error('Please enter a valid weight');
      return;
    }
    const entry: ProgressEntry = {
      date: new Date().toISOString(),
      weight: parseFloat(form.weight),
      bodyFat: form.bodyFat ? parseFloat(form.bodyFat) : undefined,
      chest: form.chest ? parseFloat(form.chest) : undefined,
      waist: form.waist ? parseFloat(form.waist) : undefined,
      hips: form.hips ? parseFloat(form.hips) : undefined,
      arms: form.arms ? parseFloat(form.arms) : undefined,
      notes: form.notes || undefined,
    };
    addProgress(entry);
    toast.success('Progress logged!');
    setShowForm(false);
    setForm({ weight: '', bodyFat: '', chest: '', waist: '', hips: '', arms: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-dark-900 page-transition">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">Progress</h1>
              </div>
              <p className="text-dark-400">Track your transformation over time</p>
            </div>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setShowForm(!showForm)}
            >
              Log Today
            </Button>
          </div>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
        >
          <div className="p-4 rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800 text-center">
            <Scale className="w-5 h-5 text-gold-400 mx-auto mb-2" />
            <div className="text-xl font-black text-white">{userProfile.weight}kg</div>
            <div className="text-xs text-dark-400">Start Weight</div>
          </div>
          <div className="p-4 rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800 text-center">
            <Scale className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-black text-white">
              {latestEntry ? `${latestEntry.weight}kg` : '—'}
            </div>
            <div className="text-xs text-dark-400">Current Weight</div>
          </div>
          <div className="p-4 rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800 text-center">
            <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
            <div className={`text-xl font-black ${totalChange > 0 ? 'text-gold-400' : totalChange < 0 ? 'text-green-400' : 'text-white'}`}>
              {totalChange > 0 ? '+' : ''}{progress.length > 0 ? totalChange.toFixed(1) : '0'}kg
            </div>
            <div className="text-xs text-dark-400">Total Change</div>
          </div>
          <div className="p-4 rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800 text-center">
            <Calendar className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-black text-white">{progress.length}</div>
            <div className="text-xs text-dark-400">Check-ins</div>
          </div>
        </motion.div>

        {/* Log form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mb-6 p-5 rounded-2xl border border-gold-500/20 bg-gold-500/5"
          >
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-gold-400" />
              Log Progress Entry
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <Input
                label="Weight (kg) *"
                type="number"
                step="0.1"
                placeholder="80.5"
                unit="kg"
                value={form.weight}
                onChange={e => setForm(p => ({ ...p, weight: e.target.value }))}
              />
              <Input
                label="Body Fat %"
                type="number"
                step="0.1"
                placeholder="15.0"
                unit="%"
                value={form.bodyFat}
                onChange={e => setForm(p => ({ ...p, bodyFat: e.target.value }))}
              />
              <Input
                label="Chest"
                type="number"
                step="0.5"
                placeholder="100"
                unit="cm"
                value={form.chest}
                onChange={e => setForm(p => ({ ...p, chest: e.target.value }))}
              />
              <Input
                label="Waist"
                type="number"
                step="0.5"
                placeholder="80"
                unit="cm"
                value={form.waist}
                onChange={e => setForm(p => ({ ...p, waist: e.target.value }))}
              />
              <Input
                label="Hips"
                type="number"
                step="0.5"
                placeholder="95"
                unit="cm"
                value={form.hips}
                onChange={e => setForm(p => ({ ...p, hips: e.target.value }))}
              />
              <Input
                label="Arms"
                type="number"
                step="0.5"
                placeholder="35"
                unit="cm"
                value={form.arms}
                onChange={e => setForm(p => ({ ...p, arms: e.target.value }))}
              />
            </div>
            <Input
              label="Notes (optional)"
              placeholder="How are you feeling? Any observations..."
              value={form.notes}
              onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
              className="mb-4"
            />
            <div className="flex gap-3">
              <Button variant="primary" onClick={handleLog}>Save Entry</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </motion.div>
        )}

        {/* Weight chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800 mb-5"
        >
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Scale className="w-4 h-4 text-gold-400" />
            Weight Trend (Last 14 entries)
          </h3>
          <ProgressChart data={chartData} height={220} />
        </motion.div>

        {/* Progress log table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800"
        >
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-blue-400" />
            Progress Log
          </h3>

          {progress.length === 0 ? (
            <div className="text-center py-10">
              <Target className="w-10 h-10 text-dark-600 mx-auto mb-3" />
              <p className="text-dark-400 text-sm">No entries yet.</p>
              <p className="text-dark-600 text-xs mt-1">Click &quot;Log Today&quot; to start tracking your progress.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {[...progress].reverse().slice(0, 10).map((entry, i) => {
                const prev = progress[progress.length - 2 - i];
                const diff = prev ? entry.weight - prev.weight : 0;
                return (
                  <div
                    key={entry.date}
                    className="flex items-center justify-between p-3 rounded-xl bg-dark-800/60 border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-dark-500">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </div>
                      {entry.notes && (
                        <span className="text-xs text-dark-500 italic truncate max-w-32">{entry.notes}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {entry.waist && (
                        <span className="text-xs text-dark-400">Waist: {entry.waist}cm</span>
                      )}
                      {entry.bodyFat && (
                        <Badge variant="blue" size="sm">{entry.bodyFat}% BF</Badge>
                      )}
                      <div className="text-right">
                        <div className="font-bold text-white text-sm">{entry.weight}kg</div>
                        {diff !== 0 && (
                          <div className={`text-xs ${diff > 0 ? 'text-gold-400' : 'text-green-400'}`}>
                            {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {progress.length > 10 && (
                <p className="text-xs text-dark-500 text-center pt-2">
                  Showing 10 of {progress.length} entries
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* Progress photos section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 p-5 rounded-2xl border border-white/5 bg-dark-800"
        >
          <h3 className="font-bold text-white mb-3">Progress Photos</h3>
          <div className="grid grid-cols-3 gap-3">
            {['Front', 'Side', 'Back'].map(view => (
              <div
                key={view}
                className="aspect-[3/4] rounded-xl border-2 border-dashed border-dark-600 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gold-500/40 hover:bg-gold-500/3 transition-all"
              >
                <Plus className="w-5 h-5 text-dark-500" />
                <span className="text-xs text-dark-500">{view} view</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-dark-500 mt-3 text-center">
            Photo upload coming soon. Take photos every 2-4 weeks for best comparison.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
