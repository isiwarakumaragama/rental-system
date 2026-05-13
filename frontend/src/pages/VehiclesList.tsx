import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, Vehicle } from '../services/api';
import { Car, User, Search, SlidersHorizontal, ArrowRight, Gauge } from 'lucide-react';

const typeIcons: Record<string, string> = {
  Sedan: '🚗',
  SUV: '🚙',
  Hatchback: '🚘',
  Truck: '🚛',
  Van: '🚐',
  Motorcycle: '🏍️',
};

export default function VehiclesList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, [filterType, filterAvailability]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const data = await api.getVehicles();
      let filtered = data;
      if (filterType) {
        filtered = filtered.filter(v => v.vehicle_type.toLowerCase().includes(filterType.toLowerCase()));
      }
      if (filterAvailability) {
        filtered = filtered.filter(v => v.availability === filterAvailability);
      }
      setVehicles(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Header */}
      <div
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%), #020617',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '3rem',
          paddingBottom: '3rem',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-label mb-4 inline-flex animate-fadeIn">
            <Car className="w-3.5 h-3.5" />
            Browse Fleet
          </span>
          <h1 className="text-4xl font-extrabold text-white mt-3 mb-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Available <span className="gradient-text">Vehicles</span>
          </h1>
          <p className="animate-fadeIn" style={{ color: '#475569', animationDelay: '0.2s' }}>
            Find the perfect vehicle for your next journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div
          className="flex flex-wrap gap-4 items-end mb-10 p-5 rounded-2xl animate-fadeIn"
          style={{
            background: 'rgba(15,23,42,0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-2 mr-2">
            <SlidersHorizontal className="w-4 h-4" style={{ color: '#60a5fa' }} />
            <span className="text-sm font-semibold" style={{ color: '#94a3b8' }}>Filters</span>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="form-label">Vehicle Type</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} />
              <input
                type="text"
                placeholder="e.g. Sedan, SUV, Truck..."
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="input-dark"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          <div className="min-w-[160px]">
            <label className="form-label">Availability</label>
            <select
              value={filterAvailability}
              onChange={e => setFilterAvailability(e.target.value)}
              className="input-dark"
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
            </select>
          </div>
          {(filterType || filterAvailability) && (
            <button
              onClick={() => { setFilterType(''); setFilterAvailability(''); }}
              className="btn-outline btn-sm self-end"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl h-56 animate-pulse"
                style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
              />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-24 animate-fadeIn">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
            >
              <Car className="w-8 h-8" style={{ color: '#3b82f6' }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No vehicles found</h3>
            <p style={{ color: '#475569' }}>Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <>
            <p className="text-sm mb-6 animate-fadeIn" style={{ color: '#475569' }}>
              Showing <span style={{ color: '#60a5fa', fontWeight: 600 }}>{vehicles.length}</span> vehicle{vehicles.length !== 1 ? 's' : ''}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="glass-card group animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Card header */}
                  <div
                    className="p-5 rounded-t-2xl flex items-center justify-between"
                    style={{ background: 'rgba(59,130,246,0.04)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}
                      >
                        {typeIcons[vehicle.vehicle_type] || '🚗'}
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: '#475569' }}>{vehicle.vehicle_type}</p>
                        <p className="text-xs" style={{ color: '#334155' }}>{vehicle.vehicle_number}</p>
                      </div>
                    </div>
                    <span className={`badge ${vehicle.availability === 'available' ? 'badge-success' : 'badge-danger'}`}>
                      {vehicle.availability}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-smooth">
                      {vehicle.vehicle_name}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-5">
                      <User className="w-3.5 h-3.5" style={{ color: '#334155' }} />
                      <span className="text-sm" style={{ color: '#475569' }}>{vehicle.owner_name}</span>
                    </div>

                    {/* Pricing */}
                    <div
                      className="flex items-center justify-between p-3 rounded-xl mb-5"
                      style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <div>
                        <div className="flex items-center gap-1 mb-0.5">
                          <Gauge className="w-3.5 h-3.5" style={{ color: '#475569' }} />
                          <span className="text-xs" style={{ color: '#475569' }}>First 10 km</span>
                        </div>
                        <span className="text-xl font-extrabold gradient-text-blue">${vehicle.price_first_10km}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs mb-0.5" style={{ color: '#475569' }}>Per km after</p>
                        <span className="text-sm font-semibold" style={{ color: '#64748b' }}>${vehicle.price_per_km_after}/km</span>
                      </div>
                    </div>

                    <Link
                      to={`/vehicles/${vehicle.id}`}
                      className="btn-primary w-full justify-center"
                      style={{ fontSize: '0.875rem' }}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
