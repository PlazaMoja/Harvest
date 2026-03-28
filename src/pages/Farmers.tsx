import { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Alert } from '../components/ui/Alert';
import { farmersApi } from '../lib/api';
import { demoFarmers } from '../lib/demo-data';
import { FarmerResponse } from '../types/api';
import { Plus, Users, Phone, MapPin, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


export function Farmers({ demoMode }: { demoMode?: boolean }) {
  const [farmers, setFarmers] = useState<FarmerResponse[]>(demoMode ? demoFarmers : []);
  const [loading, setLoading] = useState(!demoMode);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!demoMode) loadFarmers();
  }, [demoMode]);

  const loadFarmers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await farmersApi.getAll();
      setFarmers(data);
    } catch (err) {
      setError('Failed to load farmers. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFarmer = async (id: number) => {
    if (!confirm('Are you sure you want to delete this farmer?')) return;

    try {
      await farmersApi.delete(id);
      setFarmers(farmers.filter(f => f.farmerId !== id));
    } catch (err) {
      setError('Failed to delete farmer. Please try again.');
      console.error(err);
    }
  };

  return (
    <PageLayout
      title="Farmers"
      subtitle="Manage farmer profiles and information"
      actions={
        <Link to="/farmers/new">
          <Button icon={<Plus className="w-5 h-5" />}>
            Add Farmer
          </Button>
        </Link>
      }
    >
      {error && (
        <Alert variant="error" className="mb-6" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <LoadingSpinner message="Loading farmers..." />
      ) : farmers.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No farmers yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first farmer profile</p>
          <Link to="/farmers/new">
            <Button icon={<Plus className="w-5 h-5" />}>
              Add Your First Farmer
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.map((farmer, index) => (
            <motion.div
              key={farmer.farmerId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-[hsl(var(--harvest-green))]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[hsl(var(--harvest-green))]" />
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/farmers/${farmer.farmerId}`}>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteFarmer(farmer.farmerId)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[hsl(var(--harvest-dark))] mb-4">
                  {farmer.name}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-[hsl(var(--harvest-earth-light))]">
                    <Languages className="w-4 h-4 mr-2" />
                    <span>{farmer.language.replace('_', ' ')}</span>
                  </div>

                  <div className="flex items-center text-[hsl(var(--harvest-earth-light))]">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{farmer.location}</span>
                  </div>

                  {farmer.contactNumber && (
                    <div className="flex items-center text-[hsl(var(--harvest-earth-light))]">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{farmer.contactNumber}</span>
                    </div>
                  )}

                  {farmer.literacyLevel && (
                    <div className="mt-3">
                      <span className="badge badge-info">
                        Literacy: {farmer.literacyLevel}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link to={`/farms?farmerId=${farmer.farmerId}`}>
                    <Button size="sm" variant="outline" className="w-full">
                      View Farms
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
