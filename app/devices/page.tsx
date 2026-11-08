'use client';

import { useState } from 'react';
import { DeviceTable } from '@/components/devices/DeviceTable';
import { AddDeviceModal } from '@/components/devices/AddDeviceModal';
import { DeviceNode } from '@/lib/types';
import { Plus, Search, Filter } from 'lucide-react';

const MOCK_DEVICES: DeviceNode[] = [
  { id: 'EDGE-001', type: 'ESP32-S3', firmware: '2.1.4', ip: '192.168.1.101', mac: '00:1B:44:11:3A:B7', uptime: 1250000, status: 'Online', ping: 12, rssi: -65, relayActive: true },
  { id: 'EDGE-002', type: 'ESP32-S3', firmware: '2.1.4', ip: '192.168.1.102', mac: '00:1B:44:11:3A:B8', uptime: 86400, status: 'Degraded', ping: 150, rssi: -88, relayActive: false },
  { id: 'GATE-001', type: 'Edge Gateway', firmware: '1.0.5', ip: '192.168.1.10', mac: 'AA:BB:CC:DD:EE:FF', uptime: 5500000, status: 'Online', ping: 5, rssi: -50, relayActive: true },
  { id: 'SENS-003', type: 'PZEM-Monitor', firmware: '1.2.0', ip: '192.168.1.115', mac: '11:22:33:44:55:66', uptime: 0, status: 'Offline', ping: 0, rssi: 0, relayActive: false },
];

export default function DevicesPage() {
  const [devices, setDevices] = useState<DeviceNode[]>(MOCK_DEVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddDevice = (newDevice: any) => {
    const device: DeviceNode = {
      ...newDevice,
      firmware: '1.0.0',
      mac: 'PENDING',
      uptime: 0,
      status: 'Offline',
      ping: 0,
      rssi: 0,
      relayActive: false
    };
    setDevices([...devices, device]);
  };

  const filteredDevices = devices.filter(d =>
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Fleet Management</h1>
          <p className="text-slate-400 text-sm">Manage and provision edge nodes</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium rounded-md transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Register Node
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by hardware ID or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-md pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-md hover:bg-slate-800 transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <DeviceTable devices={filteredDevices} />

      <AddDeviceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddDevice}
      />
    </div>
  );
}
