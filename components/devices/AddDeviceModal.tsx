import React from 'react';
import { X } from 'lucide-react';

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (device: any) => void;
}

export function AddDeviceModal({ isOpen, onClose, onAdd }: AddDeviceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-200">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Register New Edge Device</h2>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          onAdd({
            id: formData.get('id'),
            type: formData.get('type'),
            ip: formData.get('ip'),
          });
          onClose();
        }}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Hardware ID</label>
            <input name="id" required className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" placeholder="e.g. EDGE-004" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Node Type</label>
            <select name="type" className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500">
              <option value="ESP32-S3">ESP32-S3 Sensor Node</option>
              <option value="Edge Gateway">Edge Gateway</option>
              <option value="PZEM-Monitor">PZEM Power Monitor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">IP Address (Optional)</label>
            <input name="ip" className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" placeholder="192.168.1.x" />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-md transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Register Device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
