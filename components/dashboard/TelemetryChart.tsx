'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TelemetryData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface TelemetryChartProps {
  data: TelemetryData[];
}

export function TelemetryChart({ data }: TelemetryChartProps) {
  const chartData = data.map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString(),
    power: d.power.activePower,
    temperature: d.environmental.temperature
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Live Telemetry Stream</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#06b6d4" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="power" name="Power (W)" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Line yAxisId="right" type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#06b6d4" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
