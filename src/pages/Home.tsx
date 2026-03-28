import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TrendingUp, Users, MapPin, Database, BarChart3, Sprout, CloudRain, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Users,
    title: 'Farmer Management',
    description: 'Manage farmer profiles, literacy levels, and communication preferences',
    link: '/farmers',
    color: 'hsl(145, 63%, 32%)',
  },
  {
    icon: MapPin,
    title: 'Farm Tracking',
    description: 'Track farm locations, soil types, irrigation methods, and crop history',
    link: '/farms',
    color: 'hsl(38, 70%, 55%)',
  },
  {
    icon: TrendingUp,
    title: 'Smart Predictions',
    description: 'AI-powered yield, pest, and market predictions for informed decisions',
    link: '/predictions',
    color: 'hsl(200, 60%, 50%)',
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Real-time soil and weather data from external providers',
    link: '/data-sync',
    color: 'hsl(25, 35%, 35%)',
  },
  {
    icon: BarChart3,
    title: 'Farm Dashboard',
    description: 'Comprehensive insights, alerts, and seasonal planning tools',
    link: '/dashboard',
    color: 'hsl(145, 50%, 45%)',
  },
];

const stats = [
  { icon: Sprout, label: 'Active Crops', value: '12+', color: 'text-green-600' },
  { icon: CloudRain, label: 'Weather Sources', value: '3', color: 'text-blue-600' },
  { icon: DollarSign, label: 'Profit Optimization', value: '30%', color: 'text-yellow-600' },
];

export function Home() {
  return (
    <div>
      <div className="gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Empowering South African Farmers
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto text-balance">
              AI-powered agricultural insights for better yields, reduced risks, and sustainable farming practices
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/farmers">
                <Button size="lg" className="bg-white text-[hsl(var(--harvest-green))] hover:bg-gray-100 shadow-lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-green-100">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <PageLayout
        title="Core Features"
        subtitle="Comprehensive tools for modern agricultural management"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={feature.link}>
                  <Card className="h-full hover:shadow-[var(--shadow-elevated)] transition-all duration-300 group">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: feature.color }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[hsl(var(--harvest-dark))] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[hsl(var(--harvest-earth-light))]">
                      {feature.description}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card elevated className="bg-gradient-to-br from-green-50 to-emerald-50">
            <h3 className="text-2xl font-semibold mb-4">Why HarvesterAI?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">✓</span>
                <span>Multilingual support for diverse farming communities</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">✓</span>
                <span>Real-time data integration from trusted sources</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">✓</span>
                <span>AI-powered predictions for informed decision-making</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">✓</span>
                <span>Adaptive recommendations based on local conditions</span>
              </li>
            </ul>
          </Card>

          <Card elevated className="bg-gradient-to-br from-amber-50 to-yellow-50">
            <h3 className="text-2xl font-semibold mb-4">Quick Start Guide</h3>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-gold))] font-bold mr-3">1.</span>
                <span>Register farmers and add farm details</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-gold))] font-bold mr-3">2.</span>
                <span>Sync soil and weather data for accurate insights</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-gold))] font-bold mr-3">3.</span>
                <span>Generate predictions and recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-gold))] font-bold mr-3">4.</span>
                <span>Monitor your dashboard and provide feedback</span>
              </li>
            </ol>
          </Card>
        </div>
      </PageLayout>
    </div>
  );
}
