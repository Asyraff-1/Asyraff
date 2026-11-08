import { Zap, Activity, Wifi, AlertTriangle } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { TelemetryData } from '@/lib/types';

interface MetricsGridProps {
  data: TelemetryData[];
}

export function MetricsGrid({ data }: MetricsGridProps) {
  const latestData = data[data.length - 1];

  const totalPower = latestData ? latestData.power.activePower : 0;
  const avgTemp = latestData ? latestData.environmental.temperature : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Aggregate Power Load"
        value={`${totalPower}W`}
        icon={Zap}
        delta={2.4}
        description="vs last 5m"
      />
      <StatCard
        title="System Health"
        value="Optimal"
        icon={Activity}
        description="All nodes reporting"
      />
      <StatCard
        title="Active Nodes"
        value="42"
        icon={Wifi}
        delta={0}
        description="0 offline"
      />
      <StatCard
        title="Active Alerts"
        value="1"
        icon={AlertTriangle}
        description="Warning level"
      />
    </div>
  );
}
