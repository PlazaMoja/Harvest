import { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { farmsApi, soilDataApi, weatherDataApi } from '../lib/api';
import { demoWeatherByProvince } from '../lib/demo-weather';
import { FarmResponse, SoilDataResponse, WeatherDataResponse } from '../types/api';
import { Database, Download, CheckCircle, XCircle, RefreshCw, Droplets, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';

export function DataSync({ demoMode }: { demoMode?: boolean }) {
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>('Gauteng');
  const [soilData, setSoilData] = useState<SoilDataResponse[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherDataResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncType, setSyncType] = useState<'soil' | 'weather' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!demoMode) loadFarms();
  }, [demoMode]);

  useEffect(() => {
    if (!demoMode && selectedFarmId) {
      loadData();
    }
  }, [selectedFarmId, demoMode]);

  const loadFarms = async () => {
    try {
      const data = await farmsApi.getAll();
      setFarms(data);
      if (data.length > 0 && !selectedFarmId) {
        setSelectedFarmId(data[0].farmId);
      }
    } catch (err) {
      setError('Failed to load farms');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    if (!selectedFarmId) return;

    setLoading(true);
    try {
      const [soil, weather] = await Promise.all([
        soilDataApi.getByFarm(selectedFarmId),
        weatherDataApi.getByFarm(selectedFarmId),
      ]);
      setSoilData(soil);
      setWeatherData(weather);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const syncSoilData = async () => {
    if (!selectedFarmId) return;

    setSyncing(true);
    setSyncType('soil');
    setError(null);
    setSuccess(null);

    try {
      await soilDataApi.fetchForFarm(selectedFarmId);
      setSuccess('Soil data synced successfully!');
      await loadData();
    } catch (err) {
      setError('Failed to sync soil data. Please try again or enter data manually.');
      console.error(err);
    } finally {
      setSyncing(false);
      setSyncType(null);
    }
  };

  const syncWeatherData = async () => {
    if (!selectedFarmId) return;

    setSyncing(true);
    setSyncType('weather');
    setError(null);
    setSuccess(null);

    try {
      await weatherDataApi.fetchForFarm(selectedFarmId);
      setSuccess('Weather data synced successfully!');
      await loadData();
    } catch (err) {
      setError('Failed to sync weather data. Please try again or enter data manually.');
      console.error(err);
    } finally {
      setSyncing(false);
      setSyncType(null);
    }
  };


  const selectedFarm = farms.find(f => f.farmId === selectedFarmId);
  const farmOptions = farms.map(farm => ({
    value: farm.farmId,
    label: `${farm.location} - ${farm.farmer.name}`,
  }));

  // DEMO MODE: Province weather
  const demoWeather = demoWeatherByProvince.find(w => w.province === selectedProvince);

  if (demoMode) {
    return (
      <PageLayout
        title="Weather by Province (Demo)"
        subtitle="View demo temperature, rainfall, humidity, and wind by province"
      >
        <div className="mb-6">
          <label className="block mb-2 font-medium">Select Province</label>
          <select
            className="input"
            value={selectedProvince}
            onChange={e => setSelectedProvince(e.target.value)}
          >
            {demoWeatherByProvince.map(w => (
              <option key={w.province} value={w.province}>{w.province}</option>
            ))}
          </select>
        </div>
        {demoWeather && (
          <div className="bg-white/80 rounded-xl shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">{demoWeather.province}</h2>
            <div className="flex flex-col gap-1 text-gray-700">
              <span>🌡️ Temperature: <b>{demoWeather.temperatureC}°C</b></span>
              <span>🌧️ Rainfall: <b>{demoWeather.rainfallMm} mm</b></span>
              <span>💧 Humidity: <b>{demoWeather.humidityPercent}%</b></span>
              <span>💨 Wind: <b>{demoWeather.windSpeedKmh} km/h</b></span>
              <span className="text-xs text-gray-400 mt-2">Updated: {demoWeather.updated}</span>
            </div>
          </div>
        )}
      </PageLayout>
    );
  }
  return (
    <PageLayout
      title="Data Sync"
      subtitle="Integrate external soil and weather data"
      actions={
        farms.length > 0 && (
          <Select
            options={farmOptions}
            value={selectedFarmId || ''}
            onChange={(e) => setSelectedFarmId(Number(e.target.value))}
            className="min-w-[250px]"
          />
        )
      }
    >
      {error && (
        <Alert variant="error" className="mb-6" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-6" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {loading ? (
        <LoadingSpinner message="Loading data..." />
      ) : !selectedFarm ? (
        <Card className="text-center py-12">
          <Database className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No farms available</h3>
          <p className="text-gray-500">Create a farm first to sync external data</p>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center mr-3">
                      <Mountain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Soil Data</h3>
                      <p className="text-sm text-[hsl(var(--harvest-earth-light))]">
                        {soilData.length} records available
                      </p>
                    </div>
                  </div>
                  {soilData.length > 0 && (
                    <Badge variant="success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Synced
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-[hsl(var(--harvest-earth-light))] mb-4">
                  Fetch soil composition, pH, nutrient levels, and fertility data from external providers.
                </p>

                <Button
                  onClick={syncSoilData}
                  loading={syncing && syncType === 'soil'}
                  disabled={syncing}
                  icon={<Download className="w-4 h-4" />}
                  className="w-full"
                  variant="secondary"
                >
                  Sync Soil Data
                </Button>

                {soilData.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-amber-200">
                    <p className="text-xs text-[hsl(var(--harvest-earth-light))] mb-2">Latest Data:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {soilData[0].pH && (
                        <div>
                          <span className="text-[hsl(var(--harvest-earth-light))]">pH:</span>
                          <span className="ml-1 font-medium">{soilData[0].pH.toFixed(1)}</span>
                        </div>
                      )}
                      {soilData[0].fertilityLevel && (
                        <div>
                          <span className="text-[hsl(var(--harvest-earth-light))]">Fertility:</span>
                          <span className="ml-1 font-medium">{soilData[0].fertilityLevel}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center mr-3">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Weather Data</h3>
                      <p className="text-sm text-[hsl(var(--harvest-earth-light))]">
                        {weatherData.length} records available
                      </p>
                    </div>
                  </div>
                  {weatherData.length > 0 && (
                    <Badge variant="success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Synced
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-[hsl(var(--harvest-earth-light))] mb-4">
                  Fetch temperature, rainfall, humidity, and wind data from weather services.
                </p>

                <Button
                  onClick={syncWeatherData}
                  loading={syncing && syncType === 'weather'}
                  disabled={syncing}
                  icon={<Download className="w-4 h-4" />}
                  className="w-full"
                  variant="secondary"
                >
                  Sync Weather Data
                </Button>

                {weatherData.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-xs text-[hsl(var(--harvest-earth-light))] mb-2">Latest Data:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {weatherData[0].temperatureCelsius && (
                        <div>
                          <span className="text-[hsl(var(--harvest-earth-light))]">Temp:</span>
                          <span className="ml-1 font-medium">{weatherData[0].temperatureCelsius}°C</span>
                        </div>
                      )}
                      {weatherData[0].rainfallMm && (
                        <div>
                          <span className="text-[hsl(var(--harvest-earth-light))]">Rain:</span>
                          <span className="ml-1 font-medium">{weatherData[0].rainfallMm}mm</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

          <Card elevated>
            <h3 className="text-xl font-semibold mb-4">Data Sources</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">SoilGrids / SILGrid Integration</p>
                  <p className="text-sm text-[hsl(var(--harvest-earth-light))]">
                    Global soil information with fallback support for reliability
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">OpenWeather API</p>
                  <p className="text-sm text-[hsl(var(--harvest-earth-light))]">
                    Real-time and forecast weather data for accurate planning
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <RefreshCw className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Automatic Sync</p>
                  <p className="text-sm text-[hsl(var(--harvest-earth-light))]">
                    Data can be refreshed manually or scheduled for regular updates
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </PageLayout>
  );
}
