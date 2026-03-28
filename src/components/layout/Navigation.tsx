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
  { path: '/soil-photo-ai', label: 'Soil AI', icon: Sparkles },
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide Navigation completely since bottom bar is always visible
  return null;
}
