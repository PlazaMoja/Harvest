import { Farmers } from './Farmers';
import { Farms } from './Farms';
import { useState } from 'react';

export function FarmManagement({ demoMode }: { demoMode?: boolean }) {
  const [tab, setTab] = useState<'farmers' | 'farms'>('farmers');
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Farm Management</h1>
      <div className="flex gap-2 mb-6">
        <button
          className={`btn ${tab === 'farmers' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTab('farmers')}
        >
          Farmers
        </button>
        <button
          className={`btn ${tab === 'farms' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTab('farms')}
        >
          Farms
        </button>
      </div>
      {tab === 'farmers' ? <Farmers demoMode={demoMode} /> : <Farms demoMode={demoMode} />}
    </div>
  );
}
