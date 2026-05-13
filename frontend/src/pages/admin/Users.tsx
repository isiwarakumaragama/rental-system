import { useEffect, useState } from 'react';
import { api, User } from '../../services/api';
import { Users as UsersIcon } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await api.getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const roleBadge = (role: string) => {
    if (role === 'admin') return <span className="badge badge-purple">Admin</span>;
    if (role === 'owner') return <span className="badge badge-info">Owner</span>;
    return <span className="badge" style={{ background: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.2)' }}>User</span>;
  };

  const getInitials = (name: string) => name?.charAt(0).toUpperCase() || '?';

  const avatarColor = (role: string) => {
    if (role === 'admin') return 'linear-gradient(135deg, #8b5cf6, #6366f1)';
    if (role === 'owner') return 'linear-gradient(135deg, #3b82f6, #06b6d4)';
    return 'linear-gradient(135deg, #64748b, #475569)';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Header */}
      <div style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 60%), #020617',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '2.5rem', paddingBottom: '2.5rem',
      }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2 animate-fadeIn">
            <UsersIcon className="w-5 h-5" style={{ color: '#22d3ee' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Admin · Users</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Manage <span className="neon-text-cyan">Users</span>
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
        ) : users.length === 0 ? (
          <div className="text-center py-20">
            <UsersIcon className="w-12 h-12 mx-auto mb-4" style={{ color: '#1e293b' }} />
            <p style={{ color: '#475569' }}>No users found.</p>
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden animate-scaleIn"
            style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <table className="premium-table">
              <thead>
                <tr>
                  <th className="text-left">User</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Role</th>
                  <th className="text-left">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: avatarColor(u.role) }}
                        >
                          {getInitials(u.name)}
                        </div>
                        <span className="font-semibold text-white">{u.name}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: '#64748b' }}>{u.email}</span>
                    </td>
                    <td>{roleBadge(u.role)}</td>
                    <td>
                      <span className="text-sm" style={{ color: '#475569' }}>
                        {u.created_at ? new Date(u.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                      </span>
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
