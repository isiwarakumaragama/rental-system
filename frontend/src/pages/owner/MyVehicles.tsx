import { useEffect, useState } from 'react';
import { api, Vehicle } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Car, Trash2, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyVehicles() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchVehicles();
  }, [user]);

  const fetchVehicles = async () => {
    try {
      const data = await api.getVehicles();
      setVehicles(data.filter(v => v.owner_id === user!.id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await api.deleteVehicle(id);
        fetchVehicles();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Header */}
      <div style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%), #020617',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '2.5rem', paddingBottom: '2.5rem',
      }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2 animate-fadeIn">
              <Car className="w-5 h-5" style={{ color: '#60a5fa' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Owner · Fleet</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              My <span className="gradient-text-blue">Vehicles</span>
            </h1>
          </div>
          <Link to="/owner/add-vehicle" className="btn-primary btn-sm animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <PlusCircle className="w-4 h-4" /> Add Vehicle
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'rgba(15,23,42,0.6)' }} />)}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
              <Car className="w-8 h-8" style={{ color: '#3b82f6' }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No vehicles yet</h3>
            <p className="mb-6" style={{ color: '#475569' }}>List your first vehicle to start earning.</p>
            <Link to="/owner/add-vehicle" className="btn-primary">
              <PlusCircle className="w-4 h-4" /> Add Your First Vehicle
            </Link>
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden animate-scaleIn"
            style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <table className="premium-table">
              <thead>
                <tr>
                  <th className="text-left">Vehicle</th>
                  <th className="text-left">Pricing</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Approval</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(vehicle => (
                  <tr key={vehicle.id}>
                    <td>
                      <div className="font-semibold text-white">{vehicle.vehicle_name}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{vehicle.vehicle_type} · {vehicle.vehicle_number}</div>
                    </td>
                    <td>
                      <div className="font-semibold" style={{ color: '#60a5fa' }}>${vehicle.price_first_10km} / 10km</div>
                      <div className="text-xs mt-0.5" style={{ color: '#475569' }}>+${vehicle.price_per_km_after}/km after</div>
                    </td>
                    <td>
                      <span className={`badge ${vehicle.availability === 'available' ? 'badge-success' : 'badge-danger'}`}>
                        {vehicle.availability}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${vehicle.approval_status === 'approved' ? 'badge-success' : vehicle.approval_status === 'rejected' ? 'badge-danger' : 'badge-warning'}`}>
                        {vehicle.approval_status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button onClick={() => handleDelete(vehicle.id)} className="btn-danger flex items-center gap-1.5 ml-auto">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
