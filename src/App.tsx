import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { Home } from './pages/Home';
import { Farmers } from './pages/Farmers';
import { FarmerForm } from './pages/FarmerForm';
import { Dashboard } from './pages/Dashboard';
import { Predictions } from './pages/Predictions';
import { DataSync } from './pages/DataSync';
import { AuthPage } from './pages/Auth';
import { useAuthState } from './lib/useAuthState';
import { Profile } from './pages/Profile';
import { SoilPhotoAI } from './pages/SoilPhotoAI';
import { Pricing } from './pages/Pricing';
import { FarmManagement } from './pages/FarmManagement';
import { Insights } from './pages/Insights';

function App() {
  const user = useAuthState();
  const demoMode = typeof window !== 'undefined' && localStorage.getItem('demoMode') === 'true';
  if (!demoMode && user === undefined) return null; // loading
  if (!demoMode && !user) {
    return <AuthPage onAuthSuccess={() => window.location.reload()} />;
  }
  return (
    <Router>
      <div className="min-h-screen bg-[hsl(var(--harvest-cream))] pb-16">
        <Routes>
          <Route path="/" element={<Home demoMode={demoMode} />} />
          <Route path="/farm-management" element={<FarmManagement demoMode={demoMode} />} />
          <Route path="/farmers/new" element={<FarmerForm demoMode={demoMode} />} />
          <Route path="/farmers/:id" element={<FarmerForm demoMode={demoMode} />} />
          <Route path="/insights" element={<Insights demoMode={demoMode} />} />
          <Route path="/profile" element={<Profile demoMode={demoMode} />} />
          <Route path="/soil-photo-ai" element={<SoilPhotoAI />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <BottomNavigation />
        {demoMode && (
          <div className="fixed top-2 right-2 z-50">
            <button
              className="btn btn-secondary text-xs px-3 py-1 shadow-lg"
              onClick={() => { localStorage.removeItem('demoMode'); window.location.reload(); }}
            >
              Exit Demo Mode
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
