import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Car, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'owner') return '/owner';
    return '/dashboard';
  };

  const navLinks = [
    { to: '/vehicles', label: 'Vehicles' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    ...(user ? [{ to: getDashboardPath(), label: 'Dashboard' }] : []),
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#020617' }}>
      {/* Navbar */}
      <nav
        style={{
          background: 'rgba(2, 6, 23, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-smooth group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 15px rgba(59,130,246,0.35)' }}
              >
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Drive<span className="gradient-text-blue">Rent</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-smooth"
                  style={{
                    color: isActive(link.to) ? '#60a5fa' : '#94a3b8',
                    background: isActive(link.to) ? 'rgba(59,130,246,0.1)' : 'transparent',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isActive(link.to)) {
                      (e.currentTarget as HTMLElement).style.color = '#e2e8f0';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive(link.to)) {
                      (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <Link to="/login" className="btn-primary btn-sm">
                  Sign In
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-300">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-smooth"
                    style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = '#f87171';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-smooth"
              style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden animate-fadeInFast"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(2,6,23,0.97)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium rounded-lg transition-smooth"
                  style={{
                    color: isActive(link.to) ? '#60a5fa' : '#94a3b8',
                    background: isActive(link.to) ? 'rgba(59,130,246,0.1)' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {!user ? (
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                    Sign In
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">{user.name}</span>
                      <span className="badge badge-info ml-auto">{user.role}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-danger w-full justify-center">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="flex-grow w-full overflow-x-hidden animate-fadeIn">
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: '#020617', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="gradient-divider" />
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              >
                <Car className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">
                Drive<span className="gradient-text-blue">Rent</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/vehicles" className="text-sm transition-smooth" style={{ color: '#64748b', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}>
                Vehicles
              </Link>
              <Link to="/about" className="text-sm transition-smooth" style={{ color: '#64748b', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}>
                About
              </Link>
              <Link to="/contact" className="text-sm transition-smooth" style={{ color: '#64748b', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}>
                Contact
              </Link>
            </div>
            <p className="text-xs" style={{ color: '#334155' }}>
              &copy; {new Date().getFullYear()} DriveRent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
