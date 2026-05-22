'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  date: string;
  weight: number;
}

interface ProgressChartProps {
  data: DataPoint[];
  height?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-700 border border-white/10 rounded-xl px-3 py-2 shadow-xl">
        <p className="text-xs text-dark-400 mb-0.5">{label}</p>
        <p className="text-sm font-bold text-white">{payload[0].value} kg</p>
      </div>
    );
  }
  return null;
}

export function ProgressChart({ data, height = 200 }: ProgressChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-dark-500 text-sm"
        style={{ height }}
      >
        No progress data yet. Start logging your weight!
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#9494ab', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#9494ab', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={['dataMin - 1', 'dataMax + 1']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#F59E0B"
          strokeWidth={2.5}
          dot={{ fill: '#F59E0B', r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#F59E0B', stroke: '#0A0A0F', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
