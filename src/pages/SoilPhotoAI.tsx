import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { PageLayout } from '../components/layout/PageLayout';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

const DEMO_ANALYSIS = {
  quality: 'Good',
  recommendations: [
    'Suitable for maize and beans',
    'Maintain organic matter for best results',
    'Monitor pH regularly',
  ],
  details: 'Soil appears loamy with good structure and moderate organic content.'
};

export function SoilPhotoAI() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<typeof DEMO_ANALYSIS | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(DEMO_ANALYSIS);
      setLoading(false);
    }, 1500);
  };

  return (
    <PageLayout title="AI Soil Photo Analysis" subtitle="Upload a soil photo to get instant AI feedback and recommendations">
      <Card className="max-w-md mx-auto p-6 flex flex-col items-center">
        <label className="w-full mb-4 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition">
          <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
          <span className="text-gray-600">Click to upload soil photo</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
        {image && (
          <img src={image} alt="Soil preview" className="w-40 h-40 object-cover rounded-lg mb-4 border" />
        )}
        <Button onClick={handleAnalyze} disabled={!image || loading} loading={loading} className="w-full mb-2">
          <Sparkles className="w-4 h-4 mr-2" /> Analyze Soil
        </Button>
        {error && <Alert variant="error">{error}</Alert>}
        {result && (
          <div className="w-full mt-4">
            <h3 className="text-lg font-semibold mb-2">AI Result: <span className="text-green-700">{result.quality}</span></h3>
            <p className="mb-2 text-gray-700">{result.details}</p>
            <ul className="list-disc ml-5 text-gray-700">
              {result.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </PageLayout>
  );
}
