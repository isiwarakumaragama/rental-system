import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api, Vehicle } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Car, User, Hash, DollarSign, Calendar, ArrowLeft, AlertCircle, CheckCircle, Gauge } from 'lucide-react';

const typeIcons: Record<string, string> = {
  Sedan: '🚗', SUV: '🚙', Hatchback: '🚘', Truck: '🚛', Van: '🚐', Motorcycle: '🏍️',
};

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [renting, setRenting] = useState(false);
  const [rentSuccess, setRentSuccess] = useState(false);
  const [rentError, setRentError] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      if (id) {
        const data = await api.getVehicle(id);
        setVehicle(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'user') {
      setRentError('Only customers can request rentals.');
      return;
    }
    setRenting(true);
    setRentError('');
    try {
      await api.requestRental(vehicle!.id, startDate, endDate);
      setRentSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err: any) {
      setRentError(err.message);
    } finally {
      setRenting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#020617' }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p style={{ color: '#475569' }}>Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#020617' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle className="w-8 h-8" style={{ color: '#f87171' }} />
          </div>
          <p className="text-lg font-semibold text-white mb-2">{error || 'Vehicle not found'}</p>
          <Link to="/vehicles" className="btn-outline btn-sm">Go back to listings</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Header banner */}
      <div
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%), #020617',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 text-sm mb-4 transition-smooth"
            style={{ color: '#475569', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#475569'}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicles
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              {typeIcons[vehicle.vehicle_type] || '🚗'}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold text-white">{vehicle.vehicle_name}</h1>
                <span className={`badge ${vehicle.availability === 'available' ? 'badge-success' : 'badge-danger'}`}>
                  {vehicle.availability.toUpperCase()}
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: '#475569' }}>{vehicle.vehicle_type} · {vehicle.vehicle_number}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Info */}
          <div className="space-y-6 animate-slideInLeft">
            {/* Vehicle info card */}
            <div className="glass-card-static rounded-2xl p-6" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#475569' }}>Vehicle Information</h3>
              <div className="space-y-4">
                {[
                  { icon: Car, label: 'Type', value: vehicle.vehicle_type },
                  { icon: Hash, label: 'Plate Number', value: vehicle.vehicle_number },
                  { icon: User, label: 'Owner', value: vehicle.owner_name },
                ].map(row => (
                  <div key={row.label} className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.12)' }}
                    >
                      <row.icon className="w-4 h-4" style={{ color: '#60a5fa' }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: '#334155' }}>{row.label}</p>
                      <p className="font-semibold text-white">{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(99,102,241,0.08) 100%)',
                border: '1px solid rgba(59,130,246,0.15)',
              }}
            >
              <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#475569' }}>Pricing</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(59,130,246,0.1)' }}
                    >
                      <Gauge className="w-4 h-4" style={{ color: '#60a5fa' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>First 10 km</span>
                  </div>
                  <span className="text-2xl font-extrabold gradient-text-blue">${vehicle.price_first_10km}</span>
                </div>
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(99,102,241,0.1)' }}
                    >
                      <DollarSign className="w-4 h-4" style={{ color: '#818cf8' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>Per km (after 10 km)</span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: '#94a3b8' }}>${vehicle.price_per_km_after}<span className="text-sm font-normal">/km</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Rental form */}
          <div className="animate-slideInRight">
            {vehicle.availability === 'available' ? (
              <div className="glass-card-static rounded-2xl p-6" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="text-lg font-bold text-white mb-1">Request to Rent</h3>
                <p className="text-sm mb-6" style={{ color: '#475569' }}>
                  Select your rental period and submit a request to the owner.
                </p>

                {!user && (
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl mb-5"
                    style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
                    <p className="text-sm" style={{ color: '#fcd34d' }}>
                      You need to{' '}
                      <Link to="/login" style={{ color: '#f59e0b', fontWeight: 700 }}>sign in</Link>
                      {' '}to rent this vehicle.
                    </p>
                  </div>
                )}

                {rentSuccess ? (
                  <div
                    className="flex flex-col items-center gap-4 py-8 rounded-xl"
                    style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
                  >
                    <CheckCircle className="w-12 h-12" style={{ color: '#34d399' }} />
                    <div className="text-center">
                      <p className="font-bold text-white">Request Sent!</p>
                      <p className="text-sm mt-1" style={{ color: '#475569' }}>Redirecting to your dashboard...</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRent} className="space-y-5">
                    {rentError && (
                      <div
                        className="flex items-start gap-3 p-3.5 rounded-xl"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                      >
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#f87171' }} />
                        <span className="text-sm" style={{ color: '#fca5a5' }}>{rentError}</span>
                      </div>
                    )}
                    <div>
                      <label className="form-label flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" style={{ color: '#60a5fa' }} />
                        Start Date
                      </label>
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <label className="form-label flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" style={{ color: '#6366f1' }} />
                        End Date
                      </label>
                      <input
                        type="date"
                        required
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="input-dark"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={renting || !user || user.role !== 'user'}
                      className="btn-primary w-full justify-center"
                      style={{
                        padding: '0.75rem',
                        fontSize: '0.9375rem',
                        opacity: (renting || !user || user.role !== 'user') ? 0.5 : 1,
                        cursor: (renting || !user || user.role !== 'user') ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {renting ? 'Sending Request...' : 'Send Rental Request'}
                    </button>
                    {user && user.role !== 'user' && (
                      <p className="text-center text-xs" style={{ color: '#475569' }}>
                        Only customer accounts can request rentals.
                      </p>
                    )}
                  </form>
                )}
              </div>
            ) : (
              <div
                className="rounded-2xl p-8 flex flex-col items-center justify-center text-center"
                style={{
                  background: 'rgba(239,68,68,0.05)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  minHeight: 220,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <Car className="w-8 h-8" style={{ color: '#f87171' }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Currently Unavailable</h3>
                <p className="text-sm" style={{ color: '#475569' }}>This vehicle is rented out. Check back later or browse other options.</p>
                <Link to="/vehicles" className="btn-outline btn-sm mt-5">Browse Other Vehicles</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
