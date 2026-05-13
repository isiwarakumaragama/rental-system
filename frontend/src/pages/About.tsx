import { Shield, DollarSign, Zap, Users, Car, Star, CheckCircle } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trust',
    desc: 'Every user is verified, every vehicle is approved. We ensure safety at every step.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
  },
  {
    icon: DollarSign,
    title: 'Transparency',
    desc: 'Clear pricing, honest communication, and no hidden fees — ever.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
  },
  {
    icon: Zap,
    title: 'Reliability',
    desc: 'Dependable service you can count on, every single trip.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
  },
];

const offerings = [
  'Wide selection of vehicles from trusted owners',
  'Transparent pricing with no hidden fees',
  'Fast and easy booking process',
  'Secure payment and identity verification',
  'Admin-approved listings for quality assurance',
  'Real-time availability tracking',
];

const team = [
  { stat: '500+', label: 'Listed Vehicles' },
  { stat: '1,200+', label: 'Happy Customers' },
  { stat: '300+', label: 'Vehicle Owners' },
  { stat: '4.9★', label: 'Average Rating' },
];

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Hero */}
      <div
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%), #020617',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="section-label mb-4 inline-flex animate-fadeIn">
            <Car className="w-3.5 h-3.5" />
            About DriveRent
          </span>
          <h1 className="text-5xl font-extrabold text-white mt-4 mb-5 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            We Make <span className="gradient-text">Vehicle Rental</span>
            <br />Simple & Affordable
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto animate-fadeIn"
            style={{ color: '#475569', lineHeight: 1.7, animationDelay: '0.2s' }}
          >
            DriveRent connects vehicle owners with customers who need reliable transportation — creating a trusted, peer-to-peer rental marketplace for everyone.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'rgba(15,23,42,0.5)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {team.map(({ stat, label }, i) => (
              <div key={label} className="animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-3xl font-extrabold gradient-text mb-1">{stat}</div>
                <div className="text-sm font-medium" style={{ color: '#475569' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Mission */}
        <section className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
          <div>
            <span className="section-label mb-4 inline-flex">Our Mission</span>
            <h2 className="text-3xl font-extrabold text-white mt-4 mb-5">
              Democratizing <span className="gradient-text">Vehicle Access</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#64748b', lineHeight: 1.8 }}>
              DriveRent is dedicated to making vehicle rental simple, affordable, and accessible to everyone. Whether you need a car for a day or a week, we've built the platform to make it effortless — from browsing to booking to driving.
            </p>
          </div>
          <div
            className="rounded-2xl p-8"
            style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.1)' }}
          >
            <div className="space-y-4">
              {offerings.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10b981' }} />
                  <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider" />

        {/* Values */}
        <section className="animate-fadeIn">
          <div className="text-center mb-12">
            <span className="section-label mb-4 inline-flex">Our Values</span>
            <h2 className="text-3xl font-extrabold text-white mt-4">
              What Drives <span className="gradient-text">Everything We Do</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="glass-card p-8 text-center animate-fadeIn"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: v.bg, border: `1px solid ${v.color}20` }}
                >
                  <v.icon className="w-7 h-7" style={{ color: v.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="gradient-divider" />

        {/* Why Choose Us */}
        <section className="text-center animate-fadeIn">
          <span className="section-label mb-4 inline-flex">
            <Star className="w-3.5 h-3.5" />
            Why Choose Us
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-4 mb-5">
            The Smarter Way to <span className="gradient-text">Rent</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto mb-12" style={{ color: '#64748b', lineHeight: 1.8 }}>
            With DriveRent, you get a curated fleet, transparent prices, and a trustworthy community — whether you're commuting daily or heading on a weekend adventure.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              { icon: Users, title: 'Community-driven', desc: 'Real owners, real reviews, and a real community built on trust.' },
              { icon: Shield, title: 'Verified & Safe', desc: 'All listings go through admin review before appearing on the platform.' },
              { icon: DollarSign, title: 'Fair Pricing', desc: 'No surge pricing, no hidden charges. What you see is what you pay.' },
              { icon: Zap, title: 'Fast & Simple', desc: 'From search to rental request in under 5 minutes — no paperwork.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-2xl animate-fadeIn"
                style={{
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}
                >
                  <item.icon className="w-5 h-5" style={{ color: '#60a5fa' }} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm" style={{ color: '#64748b' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
