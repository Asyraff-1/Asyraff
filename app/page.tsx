'use client';

import { useEffect, useState } from 'react';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { TelemetryChart } from '@/components/dashboard/TelemetryChart';
import { PresenceRadarView } from '@/components/dashboard/PresenceRadarView';
import { DeviceNodeCard } from '@/components/dashboard/DeviceNodeCard';
import { telemetryGenerator } from '@/lib/mock-telemetry';
import { TelemetryData } from '@/lib/types';

export default function Dashboard() {
  const [data, setData] = useState<TelemetryData[]>([]);

  useEffect(() => {
    // Initial data fill
    const initialData = Array.from({ length: 30 }, () => telemetryGenerator.generateDataPoint('EDGE-001'));
    setData(initialData);

    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), telemetryGenerator.generateDataPoint('EDGE-001')];
        return newData;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const latestData = data[data.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Executive Dashboard</h1>
          <p className="text-slate-400 text-sm">Real-time fleet overview and metrics</p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-slate-900 border border-slate-800 rounded-md p-1">
          <button className="px-3 py-1 bg-slate-800 rounded text-slate-200">1m</button>
          <button className="px-3 py-1 hover:bg-slate-800 rounded text-slate-400 transition-colors">5m</button>
          <button className="px-3 py-1 hover:bg-slate-800 rounded text-slate-400 transition-colors">15m</button>
        </div>
      </div>

      <MetricsGrid data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <TelemetryChart data={data} />
        {latestData && <PresenceRadarView data={latestData} />}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Active Node Quick Grid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DeviceNodeCard id="EDGE-001" ping={12} rssi={-65} relayActive={true} />
          <DeviceNodeCard id="EDGE-002" ping={18} rssi={-72} relayActive={false} />
          <DeviceNodeCard id="SENS-003" ping={45} rssi={-85} relayActive={true} />
          <DeviceNodeCard id="GATE-001" ping={8} rssi={-50} relayActive={true} />
        </div>
      </div>
    </div>
  );
}
