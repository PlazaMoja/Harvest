import { Link } from 'react-router-dom';

export function Pricing() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pricing</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/80 rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Free</h2>
          <p className="mb-4 text-gray-600">Basic features for smallholder farmers and demo users.</p>
          <ul className="mb-6 text-gray-700 text-sm list-disc list-inside">
            <li>Up to 5 farmers</li>
            <li>Basic predictions</li>
            <li>Community support</li>
          </ul>
          <span className="text-3xl font-bold mb-4">R0</span>
          <span className="text-xs text-gray-500 mb-4">Forever</span>
          <button className="btn btn-outline w-full" disabled>Current Plan</button>
        </div>
        <div className="bg-white/90 rounded-xl shadow-2xl p-8 flex flex-col items-center border-2 border-[hsl(var(--harvest-gold))]">
          <h2 className="text-2xl font-bold mb-2 text-[hsl(var(--harvest-gold))]">Pro</h2>
          <p className="mb-4 text-gray-600">For agri-businesses and advanced users who need more.</p>
          <ul className="mb-6 text-gray-700 text-sm list-disc list-inside">
            <li>Unlimited farmers</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
            <li>Early access to new features</li>
          </ul>
          <span className="text-3xl font-bold mb-4">R99</span>
          <span className="text-xs text-gray-500 mb-4">per month</span>
          <Link to="/upgrade">
            <button className="btn btn-primary w-full">Upgrade to Pro</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
