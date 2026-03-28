import { Link, useLocation } from 'react-router-dom';
import { Home, Tractor, BarChart3, User, CreditCard, Sparkles } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/farm-management', label: 'Farm Mgmt', icon: Tractor },
  { path: '/insights', label: 'Insights', icon: BarChart3 },
  { path: '/soil-photo-ai', label: 'Soil AI', icon: Sparkles },
  { path: '/pricing', label: 'Pricing', icon: CreditCard },
  { path: '/profile', label: 'Profile', icon: User },
];

export function BottomNavigation() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-xs px-2 py-1 transition-colors duration-200 ${
              isActive
                ? 'text-[hsl(var(--harvest-green))]'
                : 'text-[hsl(var(--harvest-earth))] hover:text-[hsl(var(--harvest-green))]'
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
