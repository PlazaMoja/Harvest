import { useAuthState } from '../lib/useAuthState';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { DataSync } from './DataSync';

export function Profile({ demoMode }: { demoMode?: boolean }) {
  const user = useAuthState();

  const [showSync, setShowSync] = useState(false);
  if (demoMode) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white/80 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Demo User</h2>
        <p className="mb-4 text-gray-600">You are in Demo Mode. No real account info is shown.</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/80 rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-2">Profile</h2>
      <p className="mb-2 text-gray-700">Email: <span className="font-mono">{user.email}</span></p>
      <button
        className="btn btn-outline mt-4"
        onClick={() => signOut(auth)}
      >
        Log out
      </button>
      <div className="mt-8">
        <button
          className="btn btn-secondary w-full"
          onClick={() => setShowSync((v) => !v)}
        >
          {showSync ? 'Hide' : 'Show'} Data Sync
        </button>
        {showSync && (
          <div className="mt-4">
            <DataSync demoMode={demoMode} />
          </div>
        )}
      </div>
    </div>
  );
}
