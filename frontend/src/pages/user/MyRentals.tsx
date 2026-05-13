import { useEffect, useState } from 'react';
import { api, RentalRequest } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, CalendarDays, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyRentals() {
  const { user } = useAuth();
  const [rentals, setRentals] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchRentals();
  }, [user]);

  const fetchRentals = async () => {
    try {
      const data = await api.getRentals();
      setRentals(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status: string) => {
    if (status === 'approved') return <span className="badge badge-success">Approved</span>;
    if (status === 'rejected') return <span className="badge badge-danger">Rejected</span>;
    return <span className="badge badge-warning">Pending</span>;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Header */}
      <div style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%), #020617',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '2.5rem', paddingBottom: '2.5rem',
      }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2 animate-fadeIn">
            <Clock className="w-5 h-5" style={{ color: '#60a5fa' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>My Account</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            My <span className="gradient-text">Rentals</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'rgba(15,23,42,0.6)' }} />)}
          </div>
        ) : rentals.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
              <Car className="w-8 h-8" style={{ color: '#3b82f6' }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No rentals yet</h3>
            <p className="mb-6" style={{ color: '#475569' }}>You haven't made any rental requests yet.</p>
            <Link to="/vehicles" className="btn-primary">Browse Vehicles</Link>
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
                  <th className="text-left">Rental Period</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map(rental => (
                  <tr key={rental.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}
                        >
                          <Car className="w-4 h-4" style={{ color: '#60a5fa' }} />
                        </div>
                        <span className="font-semibold text-white">{rental.vehicle_name || 'Vehicle'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#475569' }} />
                        <span className="text-sm" style={{ color: '#64748b' }}>{rental.start_date} → {rental.end_date}</span>
                      </div>
                    </td>
                    <td>{statusBadge(rental.status)}</td>
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
