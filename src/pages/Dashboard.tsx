import { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { farmsApi, dashboardApi, yieldPredictionsApi, riskAssessmentsApi } from '../lib/api';
import { FarmResponse, DashboardOutputResponse } from '../types/api';
import { TrendingUp, TrendingDown, AlertTriangle, Droplets, DollarSign, Sprout, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [dashboard, setDashboard] = useState<DashboardOutputResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFarms();
  }, []);

  useEffect(() => {
    if (selectedFarmId) {
      loadDashboard();
    }
  }, [selectedFarmId]);

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

  const loadDashboard = async () => {
    if (!selectedFarmId) return;

    setLoading(true);
    try {
      const data = await dashboardApi.getLatestByFarm(selectedFarmId);
      setDashboard(data);
      setError(null);
    } catch (err) {
      setDashboard(null);
      setError('No dashboard data available for this farm yet');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedFarm = farms.find(f => f.farmId === selectedFarmId);

  const farmOptions = farms.map(farm => ({
    value: farm.farmId,
    label: `${farm.location} - ${farm.farmer.name}`,
  }));

  return (
    <PageLayout
      title="Farm Dashboard"
      subtitle="Comprehensive insights and recommendations"
      actions={
        farms.length > 0 && (
          <div className="flex gap-3 items-center">
            <Select
              options={farmOptions}
              value={selectedFarmId || ''}
              onChange={(e) => setSelectedFarmId(Number(e.target.value))}
              className="min-w-[250px]"
            />
            <Button
              variant="outline"
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={loadDashboard}
            >
              Refresh
            </Button>
          </div>
        )
      }
    >
      {error && (
        <Alert variant="info" className="mb-6">
          {error}
        </Alert>
      )}

      {loading ? (
        <LoadingSpinner message="Loading dashboard data..." />
      ) : !selectedFarm ? (
        <Card className="text-center py-12">
          <Sprout className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No farms available</h3>
          <p className="text-gray-500">Create a farm first to view dashboard insights</p>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card elevated className="gradient-green text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedFarm.location}</h2>
                <p className="text-green-100">Farmer: {selectedFarm.farmer.name}</p>
                {selectedFarm.sizeInHectares && (
                  <p className="text-green-100">{selectedFarm.sizeInHectares} hectares</p>
                )}
              </div>
              <div className="text-right">
                {selectedFarm.soilType && (
                  <Badge className="bg-white/20 text-white mb-2">
                    {selectedFarm.soilType.replace('_', ' ')}
                  </Badge>
                )}
                {selectedFarm.irrigationMethod && (
                  <Badge className="bg-white/20 text-white">
                    {selectedFarm.irrigationMethod.replace('_', ' ')}
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          {dashboard && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboard.predictedYieldTons !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[hsl(var(--harvest-earth-light))] mb-1">Predicted Yield</p>
                          <p className="text-2xl font-bold text-[hsl(var(--harvest-dark))]">
                            {dashboard.predictedYieldTons.toFixed(1)} tons
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {dashboard.expectedProfitZAR !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[hsl(var(--harvest-earth-light))] mb-1">Expected Profit</p>
                          <p className="text-2xl font-bold text-[hsl(var(--harvest-dark))]">
                            R {dashboard.expectedProfitZAR.toLocaleString()}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-yellow-600" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {dashboard.climateAlerts && dashboard.climateAlerts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[hsl(var(--harvest-earth-light))] mb-1">Climate Alerts</p>
                          <p className="text-2xl font-bold text-[hsl(var(--harvest-dark))]">
                            {dashboard.climateAlerts.length}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Droplets className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {dashboard.pestWarnings && dashboard.pestWarnings.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[hsl(var(--harvest-earth-light))] mb-1">Pest Warnings</p>
                          <p className="text-2xl font-bold text-[hsl(var(--harvest-dark))]">
                            {dashboard.pestWarnings.length}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dashboard.recommendedCrops && dashboard.recommendedCrops.length > 0 && (
                  <Card title="Recommended Crops" subtitle="Based on current conditions">
                    <div className="space-y-2">
                      {dashboard.recommendedCrops.map((crop) => (
                        <div
                          key={crop.cropId}
                          className="flex items-center justify-between p-3 bg-[hsl(var(--harvest-cream))] rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{crop.name}</p>
                            {crop.category && (
                              <p className="text-sm text-[hsl(var(--harvest-earth-light))]">
                                {crop.category}
                              </p>
                            )}
                          </div>
                          {crop.typicalYieldPerHectare && (
                            <Badge variant="success">
                              {crop.typicalYieldPerHectare} tons/ha
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {dashboard.climateAlerts && dashboard.climateAlerts.length > 0 && (
                  <Card title="Climate Alerts" subtitle="Weather conditions to monitor">
                    <div className="space-y-2">
                      {dashboard.climateAlerts.map((alert, index) => (
                        <Alert key={index} variant="warning" className="text-sm">
                          {alert}
                        </Alert>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              {dashboard.pestWarnings && dashboard.pestWarnings.length > 0 && (
                <Card title="Pest & Disease Warnings" subtitle="Take preventive action">
                  <div className="space-y-2">
                    {dashboard.pestWarnings.map((warning, index) => (
                      <Alert key={index} variant="error" className="text-sm">
                        {warning}
                      </Alert>
                    ))}
                  </div>
                </Card>
              )}

              {dashboard.seasonalPlan && (
                <Card title="Seasonal Plan" subtitle="Recommended activities">
                  <div className="prose max-w-none">
                    <p className="text-[hsl(var(--harvest-earth))] whitespace-pre-wrap">
                      {dashboard.seasonalPlan}
                    </p>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      )}
    </PageLayout>
  );
}
