import { Dashboard } from './Dashboard';
import { Predictions } from './Predictions';
import { WeatherByProvince } from './WeatherByProvince';
import { useState } from 'react';

export function Insights({ demoMode }: { demoMode?: boolean }) {
  const [tab, setTab] = useState<'dashboard' | 'predictions' | 'weather'>('dashboard');
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Insights</h1>
      <div className="flex gap-2 mb-6">
        <button
          className={`btn ${tab === 'dashboard' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`btn ${tab === 'predictions' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTab('predictions')}
        >
          Predictions
        </button>
        <button
          className={`btn ${tab === 'weather' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTab('weather')}
        >
          Weather by Province
        </button>
      </div>
      {tab === 'dashboard' && <Dashboard demoMode={demoMode} />}
      {tab === 'predictions' && <Predictions demoMode={demoMode} />}
      {tab === 'weather' && <WeatherByProvince />}
    </div>
  );
}
