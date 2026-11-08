'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, Plus, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { Incident } from '@/lib/types';
import { formatTime } from '@/lib/utils';

const MOCK_INCIDENTS: Incident[] = [
  { id: 'INC-001', timestamp: Date.now() - 300000, message: 'Node EDGE-002 Active Power exceeded 2200W', severity: 'Critical', acknowledged: false },
  { id: 'INC-002', timestamp: Date.now() - 1800000, message: 'High temperature (46°C) detected on SENS-003', severity: 'Warning', acknowledged: true },
  { id: 'INC-003', timestamp: Date.now() - 3600000, message: 'GATE-001 firmware update completed successfully', severity: 'Info', acknowledged: true },
];

export default function AlertsPage() {
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);

  const handleAcknowledge = (id: string) => {
    setIncidents(incidents.map(inc =>
      inc.id === id ? { ...inc, acknowledged: true } : inc
    ));
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'Warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Info': return <Info className="w-5 h-5 text-cyan-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Alert Rules & Incident Log</h1>
          <p className="text-slate-400 text-sm">Monitor threshold breaches and system events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-slate-200">Incident Feed</h2>
          {incidents.map((incident) => (
            <Card key={incident.id} className={`transition-opacity ${incident.acknowledged ? 'opacity-60' : 'opacity-100'}`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="mt-1">{getSeverityIcon(incident.severity)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-slate-200">{incident.message}</h3>
                    <span className="text-xs text-slate-500">{new Date(incident.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant={incident.severity === 'Critical' ? 'destructive' : incident.severity === 'Warning' ? 'warning' : 'outline'}>
                      {incident.severity}
                    </Badge>
                    {!incident.acknowledged ? (
                      <button
                        onClick={() => handleAcknowledge(incident.id)}
                        className="text-xs flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Acknowledge
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Acknowledged
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-200">Active Rules</h2>
            <button className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-emerald-500 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm text-slate-200">Power Overload Protection</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="text-xs text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-800">
                  IF ActivePower &gt; 2200W THEN Alert(Critical)
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm text-slate-200">Thermal Warning</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="text-xs text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-800">
                  IF Temperature &gt; 45°C THEN Alert(Warning)
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
