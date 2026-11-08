import { Wifi, Power, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface DeviceNodeCardProps {
  id: string;
  ping: number;
  rssi: number;
  relayActive: boolean;
}

export function DeviceNodeCard({ id, ping, rssi, relayActive }: DeviceNodeCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Node {id}</CardTitle>
        <Badge variant={relayActive ? "success" : "default"}>
          {relayActive ? "Active" : "Standby"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mt-4 text-sm text-slate-400">
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-500" />
            {ping}ms
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-4 h-4 text-cyan-500" />
            {rssi}dBm
          </div>
          <div className="flex items-center gap-1.5">
            <Power className={`w-4 h-4 ${relayActive ? 'text-emerald-500' : 'text-slate-600'}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
