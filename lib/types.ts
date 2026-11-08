export interface TelemetryData {
  id: string;
  timestamp: number;
  power: {
    voltage: number;
    current: number;
    activePower: number;
    cumulativeKwh: number;
  };
  environmental: {
    temperature: number;
    humidity: number;
    aqi: number;
  };
  spatial: {
    distance: number;
    motionState: 'Moving' | 'Static' | 'Absent';
  };
}

export interface DeviceNode {
  id: string;
  type: string;
  firmware: string;
  ip: string;
  mac: string;
  uptime: number; // in seconds
  status: 'Online' | 'Degraded' | 'Offline';
  ping: number; // ms
  rssi: number; // dBm
  relayActive: boolean;
}

export interface AlertRule {
  id: string;
  metric: string;
  condition: '>' | '<' | '==';
  threshold: number;
}

export interface Incident {
  id: string;
  timestamp: number;
  message: string;
  severity: 'Critical' | 'Warning' | 'Info';
  acknowledged: boolean;
}
