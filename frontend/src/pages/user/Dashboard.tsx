import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Car, Clock, ArrowRight, LayoutDashboard } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();

  const cards = [
    {
      to: '/vehicles',
      title: 'Find a Vehicle',
      desc: 'Browse and rent from hundreds of available vehicles.',
      icon: Car,
      color: '#3b82f6',
      bg: 'rgba(59,130,246,0.08)',
      border: 'rgba(59,130,246,0.2)',
      hoverBg: 'rgba(59,130,246,0.12)',
      hoverBorder: 'rgba(59,130,246,0.35)',
      hoverShadow: 'rgba(59,130,246,0.15)',
    },
    {
      to: '/my-rentals',
      title: 'My Rentals',
      desc: 'View your rental requests and booking history.',
      icon: Clock,
      color: '#10b981',
      bg: 'rgba(16,185,129,0.08)',
      border: 'rgba(16,185,129,0.2)',
      hoverBg: 'rgba(16,185,129,0.12)',
      hoverBorder: 'rgba(16,185,129,0.35)',
      hoverShadow: 'rgba(16,185,129,0.12)',
    },
  ];

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
            <span className="section-label">My Dashboard</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="animate-fadeIn" style={{ color: '#475569', animationDelay: '0.2s' }}>
            Your personal rental hub — find vehicles and track your bookings.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
          {cards.map((card, i) => (
            <Link
              key={card.to}
              to={card.to}
              className="group flex flex-col p-7 rounded-2xl transition-smooth animate-fadeIn"
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                textDecoration: 'none',
                animationDelay: `${i * 0.12}s`,
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
                className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 transition-smooth group-hover:scale-110"
                style={{ width: 52, height: 52, background: `${card.color}18`, border: `1px solid ${card.color}25` }}
              >
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">{card.title}</h2>
              <p className="text-sm flex-1 leading-relaxed" style={{ color: '#64748b' }}>{card.desc}</p>
              <div className="flex items-center gap-1.5 mt-5">
                <span className="text-sm font-semibold" style={{ color: card.color }}>Go there</span>
                <ArrowRight className="w-4 h-4 transition-smooth group-hover:translate-x-1" style={{ color: card.color }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
