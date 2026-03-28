import { demoWeatherByProvince } from '../lib/demo-weather';

export function WeatherByProvince() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Weather by Province</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {demoWeatherByProvince.map((w) => (
          <div key={w.province} className="bg-white/80 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{w.province}</h2>
            <div className="flex flex-col gap-1 text-gray-700">
              <span>🌡️ Temperature: <b>{w.temperatureC}°C</b></span>
              <span>🌧️ Rainfall: <b>{w.rainfallMm} mm</b></span>
              <span>💧 Humidity: <b>{w.humidityPercent}%</b></span>
              <span>💨 Wind: <b>{w.windSpeedKmh} km/h</b></span>
              <span className="text-xs text-gray-400 mt-2">Updated: {w.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
