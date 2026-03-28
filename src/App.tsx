import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { Home } from './pages/Home';
import { Farmers } from './pages/Farmers';
import { FarmerForm } from './pages/FarmerForm';
import { Dashboard } from './pages/Dashboard';
import { Predictions } from './pages/Predictions';
import { DataSync } from './pages/DataSync';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[hsl(var(--harvest-cream))]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/farmers/new" element={<FarmerForm />} />
          <Route path="/farmers/:id" element={<FarmerForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/data-sync" element={<DataSync />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
