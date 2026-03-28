import { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { TrendingUp, Bug, AlertTriangle, Lightbulb, Target, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const predictionTypes = [
  {
    icon: TrendingUp,
    title: 'Yield Predictions',
    description: 'Forecast expected crop yields and profitability for better planning',
    link: '/predictions/yield',
    color: 'hsl(145, 63%, 32%)',
    bgColor: 'bg-green-50',
  },
  {
    icon: Bug,
    title: 'Pest & Disease',
    description: 'Identify potential pest and disease risks with prevention strategies',
    link: '/predictions/pest-disease',
    color: 'hsl(0, 65%, 50%)',
    bgColor: 'bg-red-50',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Assessment',
    description: 'Evaluate drought, pest, and market volatility risks',
    link: '/predictions/risk',
    color: 'hsl(38, 70%, 55%)',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Lightbulb,
    title: 'Adaptive Recommendations',
    description: 'Get AI-powered suggestions for crop swaps and interventions',
    link: '/predictions/adaptive',
    color: 'hsl(200, 60%, 50%)',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Target,
    title: 'Crop Suitability',
    description: 'Discover which crops are best suited for your farm conditions',
    link: '/predictions/suitability',
    color: 'hsl(145, 50%, 45%)',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: DollarSign,
    title: 'Market Predictions',
    description: 'Track price forecasts and market trends for informed selling',
    link: '/predictions/market',
    color: 'hsl(25, 35%, 35%)',
    bgColor: 'bg-amber-50',
  },
];

export function Predictions() {
  return (
    <PageLayout
      title="Predictions Hub"
      subtitle="AI-powered insights for data-driven farming decisions"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictionTypes.map((prediction, index) => {
          const Icon = prediction.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={prediction.link}>
                <Card className={`h-full ${prediction.bgColor} hover:shadow-[var(--shadow-elevated)] transition-all duration-300 group border-2 border-transparent hover:border-[${prediction.color}]`}>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: prediction.color }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[hsl(var(--harvest-dark))] mb-2">
                    {prediction.title}
                  </h3>
                  <p className="text-[hsl(var(--harvest-earth-light))]">
                    {prediction.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium" style={{ color: prediction.color }}>
                    View Details →
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card elevated>
          <h3 className="text-2xl font-semibold mb-4">How Predictions Work</h3>
          <div className="space-y-3 text-[hsl(var(--harvest-earth-light))]">
            <p>Our AI-powered prediction system analyzes multiple data sources to provide accurate insights:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">•</span>
                <span>Real-time soil and weather data integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">•</span>
                <span>Historical performance and feedback analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">•</span>
                <span>Local market trends and demand patterns</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">•</span>
                <span>Climate forecasts and risk modeling</span>
              </li>
            </ul>
          </div>
        </Card>

        <Card elevated className="bg-gradient-to-br from-green-50 to-emerald-50">
          <h3 className="text-2xl font-semibold mb-4">Best Practices</h3>
          <div className="space-y-3 text-[hsl(var(--harvest-earth-light))]">
            <p>Get the most accurate predictions by:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">1.</span>
                <span>Keeping farm data up-to-date and accurate</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">2.</span>
                <span>Regularly syncing soil and weather data</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">3.</span>
                <span>Providing feedback on prediction accuracy</span>
              </li>
              <li className="flex items-start">
                <span className="text-[hsl(var(--harvest-green))] mr-2">4.</span>
                <span>Reviewing predictions weekly during growing season</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
