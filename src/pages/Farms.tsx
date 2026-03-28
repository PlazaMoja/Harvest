import { demoFarms } from '../lib/demo-data';
import { Card } from '../components/ui/Card';
import { Tractor, MapPin, Sprout } from 'lucide-react';

export function Farms({ demoMode }: { demoMode?: boolean }) {
  if (demoMode) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {demoFarms.map(farm => (
          <Card key={farm.farmId} className="h-full">
            <div className="flex items-center gap-3 mb-2">
              <Tractor className="w-6 h-6 text-[hsl(var(--harvest-green))]" />
              <h3 className="text-xl font-semibold">{farm.name}</h3>
            </div>
            <div className="text-sm text-gray-700 mb-1 flex items-center"><MapPin className="w-4 h-4 mr-1" />{farm.location}</div>
            <div className="text-sm text-gray-700 mb-1 flex items-center"><Sprout className="w-4 h-4 mr-1" />{farm.crop}</div>
            <div className="text-xs text-gray-500">Size: {farm.size}</div>
          </Card>
        ))}
      </div>
    );
  }
  return <div className="text-center text-gray-400 py-12">Farms feature coming soon.</div>;
}
