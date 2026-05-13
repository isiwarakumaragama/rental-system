import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Car, Users, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Header */}
      <div
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 60%), #020617',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '3rem',
          paddingBottom: '3rem',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3 animate-fadeIn">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', boxShadow: '0 4px 15px rgba(139,92,246,0.3)' }}
            >
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="section-label" style={{ background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.25)', color: '#a78bfa' }}>
              Admin Panel
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Admin <span className="neon-text-purple">Dashboard</span>
          </h1>
          <p className="animate-fadeIn" style={{ color: '#475569', animationDelay: '0.2s' }}>
            Welcome back, <span style={{ color: '#a78bfa', fontWeight: 600 }}>{user?.name}</span>. Manage your platform below.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Quick actions */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-4 h-4" style={{ color: '#64748b' }} />
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#64748b' }}>Quick Actions</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <Link
              to="/admin/vehicles"
              className="group p-6 rounded-2xl flex items-center gap-5 transition-smooth animate-slideInLeft"
              style={{
                background: 'rgba(139,92,246,0.06)',
                border: '1px solid rgba(139,92,246,0.2)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.35)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(139,92,246,0.15)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.2)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-smooth group-hover:scale-110"
                style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}
              >
                <Car className="w-7 h-7" style={{ color: '#a78bfa' }} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-1">Manage Vehicles</h2>
                <p className="text-sm" style={{ color: '#64748b' }}>Approve or reject owner listings</p>
              </div>
              <ArrowRight className="w-5 h-5 transition-smooth group-hover:translate-x-1" style={{ color: '#64748b' }} />
            </Link>

            <Link
              to="/admin/users"
              className="group p-6 rounded-2xl flex items-center gap-5 transition-smooth animate-slideInRight"
              style={{
                background: 'rgba(6,182,212,0.06)',
                border: '1px solid rgba(6,182,212,0.2)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.35)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(6,182,212,0.12)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.2)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-smooth group-hover:scale-110"
                style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)' }}
              >
                <Users className="w-7 h-7" style={{ color: '#22d3ee' }} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-1">Manage Users</h2>
                <p className="text-sm" style={{ color: '#64748b' }}>View registered users and owners</p>
              </div>
              <ArrowRight className="w-5 h-5 transition-smooth group-hover:translate-x-1" style={{ color: '#64748b' }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
