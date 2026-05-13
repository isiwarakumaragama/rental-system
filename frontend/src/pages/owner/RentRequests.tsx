import { useEffect, useState } from 'react';
import { api, RentalRequest } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, CheckCircle, XCircle, CalendarDays } from 'lucide-react';

export default function RentRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    try {
      const data = await api.getRentals();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string | number, status: 'approved' | 'rejected') => {
    try {
      await api.updateRentalStatus(id, status);
      fetchRequests();
    } catch (err: any) {
      alert(err.message);
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
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 60%), #020617',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '2.5rem', paddingBottom: '2.5rem',
      }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2 animate-fadeIn">
            <Clock className="w-5 h-5" style={{ color: '#a78bfa' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Owner · Requests</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Rent <span className="gradient-text">Requests</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'rgba(15,23,42,0.6)' }} />)}
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
              <Clock className="w-8 h-8" style={{ color: '#8b5cf6' }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No rental requests</h3>
            <p style={{ color: '#475569' }}>Requests from customers will appear here.</p>
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
                  <th className="text-left">Customer</th>
                  <th className="text-left">Dates</th>
                  <th className="text-left">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id}>
                    <td>
                      <div className="font-semibold text-white">{req.vehicle_name || 'N/A'}</div>
                    </td>
                    <td>
                      <div className="font-medium" style={{ color: '#94a3b8' }}>{(req as any).customer_name || 'Unknown'}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#475569' }} />
                        <span className="text-sm" style={{ color: '#64748b' }}>{req.start_date} → {req.end_date}</span>
                      </div>
                    </td>
                    <td>{statusBadge(req.status)}</td>
                    <td className="text-right">
                      {req.status === 'pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleAction(req.id, 'approved')} className="btn-success flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button onClick={() => handleAction(req.id, 'rejected')} className="btn-danger flex items-center gap-1.5">
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      )}
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
