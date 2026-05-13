import { useEffect, useState } from 'react';
import { api, Vehicle } from '../../services/api';
import { Car, CheckCircle, XCircle, ShieldOff } from 'lucide-react';

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const data = await api.getAllVehicles();
    setVehicles(data);
    setLoading(false);
  };

  const handleAction = async (id: string | number, status: 'approved' | 'rejected') => {
    try {
      if (status === 'approved') {
        await api.approveVehicle(id);
      } else {
        await api.rejectVehicle(id);
      }
      fetchVehicles();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const approvalBadge = (status: string) => {
    if (status === 'approved') return <span className="badge badge-success">Approved</span>;
    if (status === 'rejected') return <span className="badge badge-danger">Rejected</span>;
    return <span className="badge badge-warning">Pending</span>;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Header */}
      <div style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 60%), #020617',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '2.5rem', paddingBottom: '2.5rem',
      }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2 animate-fadeIn">
            <Car className="w-5 h-5" style={{ color: '#a78bfa' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Admin · Vehicles</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Manage <span className="neon-text-purple">Vehicles</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'rgba(15,23,42,0.6)' }} />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20">
            <Car className="w-12 h-12 mx-auto mb-4" style={{ color: '#1e293b' }} />
            <p style={{ color: '#475569' }}>No vehicles in the system yet.</p>
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
                  <th className="text-left">Owner</th>
                  <th className="text-left">Availability</th>
                  <th className="text-left">Approval Status</th>
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
                      <div className="font-medium" style={{ color: '#94a3b8' }}>{vehicle.owner_name}</div>
                    </td>
                    <td>
                      <span className={`badge ${vehicle.availability === 'available' ? 'badge-success' : 'badge-danger'}`}>
                        {vehicle.availability}
                      </span>
                    </td>
                    <td>{approvalBadge(vehicle.approval_status)}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {vehicle.approval_status === 'pending' && (
                          <>
                            <button onClick={() => handleAction(vehicle.id, 'approved')} className="btn-success flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button onClick={() => handleAction(vehicle.id, 'rejected')} className="btn-danger flex items-center gap-1.5">
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                          </>
                        )}
                        {vehicle.approval_status === 'rejected' && (
                          <button onClick={() => handleAction(vehicle.id, 'approved')} className="btn-success flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" /> Approve
                          </button>
                        )}
                        {vehicle.approval_status === 'approved' && (
                          <button onClick={() => handleAction(vehicle.id, 'rejected')} className="btn-danger flex items-center gap-1.5">
                            <ShieldOff className="w-3.5 h-3.5" /> Revoke
                          </button>
                        )}
                      </div>
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
