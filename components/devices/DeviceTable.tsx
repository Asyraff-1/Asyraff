import { Server, Wifi, Activity, AlertCircle } from 'lucide-react';
import { DeviceNode } from '@/lib/types';
import { Badge } from '../ui/Badge';
import { formatTime } from '@/lib/utils';

interface DeviceTableProps {
  devices: DeviceNode[];
}

export function DeviceTable({ devices }: DeviceTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-400 uppercase bg-slate-900/80 border-b border-slate-800">
          <tr>
            <th className="px-6 py-4">Device</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Network</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Uptime</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {devices.map((device) => (
            <tr key={device.id} className="hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-emerald-500">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">{device.id}</div>
                    <div className="text-xs text-slate-500">v{device.firmware}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-300">{device.type}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-slate-300">{device.ip}</span>
                  <span className="text-slate-500 font-mono">{device.mac}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge variant={device.status === 'Online' ? 'success' : device.status === 'Degraded' ? 'warning' : 'destructive'}>
                  {device.status}
                </Badge>
              </td>
              <td className="px-6 py-4 text-slate-300">{formatTime(device.uptime)}</td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-emerald-500 transition-colors px-2 py-1 rounded">
                  Configure
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
