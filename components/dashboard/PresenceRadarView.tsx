import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { TelemetryData } from '@/lib/types';
import { Activity } from 'lucide-react';

interface PresenceRadarViewProps {
  data: TelemetryData;
}

export function PresenceRadarView({ data }: PresenceRadarViewProps) {
  const { distance, motionState } = data.spatial;

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" />
          Spatial & Motion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-48 h-48 border border-slate-700 rounded-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 rounded-full border border-slate-700/50 m-8"></div>
            <div className="absolute inset-0 rounded-full border border-slate-700/30 m-16"></div>

            {/* Sweep animation */}
            <div className="absolute top-1/2 left-1/2 w-24 h-24 origin-top-left animate-[spin_3s_linear_infinite] bg-gradient-to-br from-emerald-500/20 to-transparent -ml-px -mt-px rounded-br-full border-r border-b border-emerald-500/50"></div>

            {/* Target indicator */}
            {motionState !== 'Absent' && (
              <div
                className={`absolute w-3 h-3 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] ${motionState === 'Moving' ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`}
                style={{
                  transform: `translate(${Math.cos(distance) * (distance / 4)}px, ${Math.sin(distance) * (distance / 4)}px)`
                }}
              />
            )}
            <div className="absolute w-2 h-2 bg-slate-400 rounded-full"></div>
          </div>

          <div className="flex gap-8 text-center">
            <div>
              <div className="text-sm text-slate-400">Distance</div>
              <div className="text-xl font-bold">{distance}cm</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Status</div>
              <div className={`text-xl font-bold ${motionState === 'Absent' ? 'text-slate-500' : motionState === 'Moving' ? 'text-cyan-400' : 'text-emerald-400'}`}>
                {motionState}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
