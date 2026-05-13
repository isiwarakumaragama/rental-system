import { Link } from 'react-router-dom';
import { Car, Shield, DollarSign, Zap, ArrowRight, Star, Users, MapPin, CheckCircle } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Vehicles Listed', icon: Car },
  { value: '1,200+', label: 'Happy Customers', icon: Users },
  { value: '50+', label: 'Cities Covered', icon: MapPin },
  { value: '4.9★', label: 'Average Rating', icon: Star },
];

const steps = [
  {
    step: '01',
    title: 'Browse & Discover',
    desc: 'Explore hundreds of vehicles from trusted owners. Filter by type, availability, and price.',
    color: '#3b82f6',
  },
  {
    step: '02',
    title: 'Request a Rental',
    desc: 'Choose your dates, send a rental request, and wait for the owner to confirm.',
    color: '#8b5cf6',
  },
  {
    step: '03',
    title: 'Hit the Road',
    desc: 'Once approved, pick up your vehicle and enjoy your journey with confidence.',
    color: '#06b6d4',
  },
];

const features = [
  {
    icon: Car,
    title: 'Wide Selection',
    desc: 'Sedans, SUVs, trucks, motorcycles — find the perfect vehicle for every occasion.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    desc: 'No hidden fees. Clear pricing structure with per-km rates you can trust.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
  },
  {
    icon: Shield,
    title: 'Verified Owners',
    desc: 'Every vehicle listing is reviewed and approved by our admin team before going live.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    desc: 'Simple, fast request flow. Get a response from the owner within hours.',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.08)',
  },
];

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero-bg relative overflow-hidden" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
        {/* Decorative orbs */}
        <div className="orb orb-blue animate-float" style={{ width: 600, height: 600, top: '-20%', left: '-10%', animationDelay: '0s' }} />
        <div className="orb orb-violet animate-float" style={{ width: 400, height: 400, bottom: '-10%', right: '-5%', animationDelay: '2s' }} />
        <div className="orb orb-cyan animate-float" style={{ width: 300, height: 300, top: '30%', right: '20%', animationDelay: '4s' }} />

        <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Label */}
            <div className="flex justify-center mb-8 animate-fadeIn">
              <span className="section-label">
                <Car className="w-3.5 h-3.5" />
                Premium Vehicle Rental Platform
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-extrabold tracking-tight mb-6 animate-fadeIn"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.08, animationDelay: '0.1s' }}
            >
              <span style={{ color: '#f1f5f9' }}>Find Your Perfect</span>
              <br />
              <span className="gradient-text">Ride Today</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg leading-relaxed mb-10 animate-fadeIn"
              style={{ color: '#64748b', maxWidth: 560, margin: '0 auto 2.5rem', animationDelay: '0.2s' }}
            >
              Connect with trusted vehicle owners, choose from hundreds of listings, and hit the road — reliable, simple, and affordable.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <Link to="/vehicles" className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                Browse Vehicles
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="btn-outline" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                Get Started Free
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              {['No hidden fees', 'Admin-verified listings', 'Easy cancellation'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
                  <span className="text-sm font-medium" style={{ color: '#64748b' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: 'linear-gradient(to bottom, transparent, #020617)',
            pointerEvents: 'none',
          }}
        />
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#020617' }}>
        <div
          style={{
            background: 'rgba(15,23,42,0.6)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map(({ value, label, icon: Icon }, i) => (
                <div
                  key={label}
                  className="text-center animate-fadeIn"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex justify-center mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#60a5fa' }} />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold gradient-text mb-1">{value}</div>
                  <div className="text-sm font-medium" style={{ color: '#475569' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24" style={{ background: '#020617' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-4 inline-flex">How It Works</span>
            <h2 className="text-4xl font-extrabold text-white mt-4 mb-4">
              Rent in <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p style={{ color: '#475569' }}>No complexity. Just find, request, and drive.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="relative glass-card p-8 text-center animate-fadeIn"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30`, color: s.color }}
                >
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{s.desc}</p>

                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                    style={{ color: '#1e293b', zIndex: 10 }}
                  >
                    <ArrowRight className="w-6 h-6" style={{ color: '#1e3a5f' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24" style={{ background: 'rgba(15,23,42,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-4 inline-flex">Why DriveRent</span>
            <h2 className="text-4xl font-extrabold text-white mt-4 mb-4">
              Built for <span className="gradient-text">Drivers & Owners</span>
            </h2>
            <p style={{ color: '#475569' }}>Everything you need for a seamless rental experience.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card p-6 animate-fadeIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: f.bg, border: `1px solid ${f.color}20` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24" style={{ background: '#020617' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div
            className="glass-card-static p-12 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)',
              border: '1px solid rgba(59,130,246,0.15)',
            }}
          >
            <div className="orb orb-blue" style={{ width: 300, height: 300, top: '-50%', left: '-20%', filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Ready to hit the road?
              </h2>
              <p className="mb-8" style={{ color: '#64748b' }}>
                Join thousands of satisfied customers and owners on the DriveRent platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/vehicles" className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                  Browse Vehicles
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/login" className="btn-outline" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
