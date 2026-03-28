import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Alert } from '../components/ui/Alert';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { farmersApi } from '../lib/api';
import { FarmerRequest } from '../types/api';
import { Language, LiteracyLevel } from '../types/enums';
import { ArrowLeft } from 'lucide-react';

const languageOptions = Object.values(Language).map(lang => ({
  value: lang,
  label: lang.replace('_', ' '),
}));

const literacyOptions = Object.values(LiteracyLevel).map(level => ({
  value: level,
  label: level,
}));

export function FarmerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FarmerRequest>({
    name: '',
    language: Language.ENGLISH,
    location: '',
  });

  useEffect(() => {
    if (isEdit) {
      loadFarmer();
    }
  }, [id]);

  const loadFarmer = async () => {
    try {
      const farmer = await farmersApi.getById(Number(id));
      setFormData({
        name: farmer.name,
        language: farmer.language,
        literacyLevel: farmer.literacyLevel,
        contactNumber: farmer.contactNumber,
        location: farmer.location,
      });
    } catch (err) {
      setError('Failed to load farmer details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (isEdit) {
        await farmersApi.update(Number(id), formData);
      } else {
        await farmersApi.create(formData);
      }
      navigate('/farmers');
    } catch (err) {
      setError(`Failed to ${isEdit ? 'update' : 'create'} farmer. Please try again.`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <LoadingSpinner message="Loading farmer details..." />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={isEdit ? 'Edit Farmer' : 'Add New Farmer'}
      subtitle={isEdit ? 'Update farmer information' : 'Create a new farmer profile'}
    >
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/farmers')}
          className="mb-6"
        >
          Back to Farmers
        </Button>

        {error && (
          <Alert variant="error" className="mb-6" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Farmer Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter farmer's full name"
            />

            <Select
              label="Language"
              required
              options={languageOptions}
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value as Language })}
            />

            <Select
              label="Literacy Level"
              options={literacyOptions}
              value={formData.literacyLevel || ''}
              onChange={(e) => setFormData({ ...formData, literacyLevel: e.target.value as LiteracyLevel || undefined })}
              helpText="Optional: Helps customize communication methods"
            />

            <Input
              label="Location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Province or region"
            />

            <Input
              label="Contact Number"
              type="tel"
              value={formData.contactNumber || ''}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value || undefined })}
              placeholder="+27 XX XXX XXXX"
            />

            <div className="flex gap-3 pt-4">
              <Button type="submit" loading={submitting} className="flex-1">
                {isEdit ? 'Update Farmer' : 'Create Farmer'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/farmers')}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
}
