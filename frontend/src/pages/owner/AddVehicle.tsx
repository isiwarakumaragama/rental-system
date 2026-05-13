import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Car, DollarSign, Hash, Tag, ArrowLeft, PlusCircle, CheckCircle } from 'lucide-react';

export default function AddVehicle() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicle_name: '',
    vehicle_type: '',
    vehicle_number: '',
    price_first_10km: '',
    price_per_km_after: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setError('');
    try {
      await api.addVehicle(formData as any);
      navigate('/owner/my-vehicles');
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Header */}
      <div style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 60%), #020617',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '2.5rem', paddingBottom: '2.5rem',
      }}>
        <div className="max-w-2xl mx-auto px-6">
          <Link
            to="/owner/my-vehicles"
            className="inline-flex items-center gap-2 text-sm mb-4 transition-smooth"
            style={{ color: '#475569', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#475569'}
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Vehicles
          </Link>
          <div className="flex items-center gap-3 mb-2 animate-fadeIn">
            <PlusCircle className="w-5 h-5" style={{ color: '#34d399' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Owner · Add Vehicle</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            List a <span className="gradient-text">New Vehicle</span>
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Info banner */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-8 animate-fadeIn"
          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
        >
          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
          <p className="text-sm" style={{ color: '#d97706' }}>
            Your listing will be reviewed by an admin before going live. This usually takes less than 24 hours.
          </p>
        </div>

        {error && (
          <div
            className="p-4 rounded-xl mb-6 animate-fadeIn"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', fontSize: '0.875rem' }}
          >
            {error}
          </div>
        )}

        <div
          className="rounded-2xl p-8 animate-scaleIn"
          style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle name */}
            <div>
              <label className="form-label flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5" style={{ color: '#60a5fa' }} />
                Vehicle Name / Model
              </label>
              <input
                type="text"
                name="vehicle_name"
                required
                value={formData.vehicle_name}
                onChange={handleChange}
                className="input-dark"
                placeholder="e.g. Toyota Corolla 2022"
              />
            </div>

            {/* Type + Plate */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" style={{ color: '#60a5fa' }} />
                  Vehicle Type
                </label>
                <select
                  name="vehicle_type"
                  required
                  value={formData.vehicle_type}
                  onChange={handleChange}
                  className="input-dark"
                >
                  <option value="">Select type...</option>
                  <option value="Sedan">🚗 Sedan</option>
                  <option value="SUV">🚙 SUV</option>
                  <option value="Hatchback">🚘 Hatchback</option>
                  <option value="Truck">🚛 Truck</option>
                  <option value="Van">🚐 Van</option>
                  <option value="Motorcycle">🏍️ Motorcycle</option>
                </select>
              </div>
              <div>
                <label className="form-label flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" style={{ color: '#60a5fa' }} />
                  Plate Number
                </label>
                <input
                  type="text"
                  name="vehicle_number"
                  required
                  value={formData.vehicle_number}
                  onChange={handleChange}
                  className="input-dark"
                  placeholder="e.g. ABC-1234"
                />
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#475569' }}>
                <DollarSign className="w-4 h-4" style={{ color: '#10b981' }} />
                Pricing
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">First 10 km price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price_first_10km"
                    required
                    value={formData.price_first_10km}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="e.g. 15.00"
                  />
                  <p className="text-xs mt-1" style={{ color: '#334155' }}>Flat rate for the first 10 kilometers</p>
                </div>
                <div>
                  <label className="form-label">Price per km after ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price_per_km_after"
                    required
                    value={formData.price_per_km_after}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="e.g. 2.50"
                  />
                  <p className="text-xs mt-1" style={{ color: '#334155' }}>Rate per km beyond 10 km</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Link to="/owner/my-vehicles" className="btn-outline flex-1 justify-center">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1 justify-center"
                style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                {submitting ? 'Submitting...' : 'Submit Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
