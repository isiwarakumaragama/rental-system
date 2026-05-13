import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Car, Clock, PlusCircle, ArrowRight, LayoutDashboard } from 'lucide-react';

const cards = [
  {
    to: '/owner/my-vehicles',
    title: 'My Vehicles',
    desc: 'View and manage your fleet',
    icon: Car,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
    hoverBg: 'rgba(59,130,246,0.12)',
    hoverBorder: 'rgba(59,130,246,0.35)',
    hoverShadow: 'rgba(59,130,246,0.15)',
  },
  {
    to: '/owner/add-vehicle',
    title: 'Add Vehicle',
    desc: 'List a new vehicle for rent',
    icon: PlusCircle,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    hoverBg: 'rgba(16,185,129,0.12)',
    hoverBorder: 'rgba(16,185,129,0.35)',
    hoverShadow: 'rgba(16,185,129,0.12)',
  },
  {
    to: '/owner/rent-requests',
    title: 'Rent Requests',
    desc: 'Approve or reject rental requests',
    icon: Clock,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    hoverBg: 'rgba(139,92,246,0.12)',
    hoverBorder: 'rgba(139,92,246,0.35)',
    hoverShadow: 'rgba(139,92,246,0.12)',
  },
];

export default function OwnerDashboard() {
  const { user } = useAuth();

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
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3 animate-fadeIn">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}
            >
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="section-label">Owner Dashboard</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="animate-fadeIn" style={{ color: '#475569', animationDelay: '0.2s' }}>
            Manage your fleet and handle rental requests from your dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <Link
              key={card.to}
              to={card.to}
              className="group flex flex-col p-6 rounded-2xl transition-smooth animate-fadeIn"
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                textDecoration: 'none',
                animationDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = card.hoverBg;
                el.style.borderColor = card.hoverBorder;
                el.style.boxShadow = `0 8px 30px ${card.hoverShadow}`;
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = card.bg;
                el.style.borderColor = card.border;
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-smooth group-hover:scale-110"
                style={{ background: `${card.color}18`, border: `1px solid ${card.color}25` }}
              >
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <h2 className="text-lg font-bold text-white mb-1.5">{card.title}</h2>
              <p className="text-sm flex-1" style={{ color: '#64748b' }}>{card.desc}</p>
              <div className="flex items-center gap-1.5 mt-4">
                <span className="text-sm font-semibold transition-smooth group-hover:mr-1" style={{ color: card.color }}>Open</span>
                <ArrowRight className="w-4 h-4 transition-smooth group-hover:translate-x-1" style={{ color: card.color }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
