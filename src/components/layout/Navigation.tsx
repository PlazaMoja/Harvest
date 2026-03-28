import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MapPin, TrendingUp, Database, BarChart3, MessageSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/farmers', label: 'Farmers', icon: Users },
  { path: '/farms', label: 'Farms', icon: MapPin },
  { path: '/predictions', label: 'Predictions', icon: TrendingUp },
  { path: '/data-sync', label: 'Data Sync', icon: Database },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { path: '/feedback', label: 'Feedback', icon: MessageSquare },
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-green rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[hsl(var(--harvest-green))]" style={{ fontFamily: "'Playfair Display', serif" }}>
              HarvesterAI
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[hsl(var(--harvest-green))] text-white'
                      : 'text-[hsl(var(--harvest-earth))] hover:bg-[hsl(var(--harvest-cream))] hover:text-[hsl(var(--harvest-green))]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[hsl(var(--harvest-cream))] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-[hsl(var(--harvest-green))] text-white'
                        : 'text-[hsl(var(--harvest-earth))] hover:bg-[hsl(var(--harvest-cream))] hover:text-[hsl(var(--harvest-green))]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
