import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Car, Mail, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'owner'>('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await api.login(email, password);
      const user = {
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role as 'user' | 'owner' | 'admin',
      };
      login(result.token, user);
      if (result.role === 'admin') navigate('/admin');
      else if (result.role === 'owner') navigate('/owner');
      else navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.register(name, email, password, role);
      setSuccess('Account created! Please log in with your credentials.');
      setTab('login');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const switchTab = (t: 'login' | 'register') => {
    setTab(t);
    setError('');
    setSuccess('');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 60%), #020617',
      }}
    >
      {/* Orbs */}
      <div className="orb orb-blue animate-float" style={{ width: 400, height: 400, top: '-10%', left: '-10%', filter: 'blur(80px)' }} />
      <div className="orb orb-violet animate-float" style={{ width: 300, height: 300, bottom: '-10%', right: '-5%', filter: 'blur(80px)', animationDelay: '3s' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fadeIn">
          <Link to="/" className="inline-flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 20px rgba(59,130,246,0.4)' }}
            >
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Drive<span className="gradient-text-blue">Rent</span></span>
          </Link>
        </div>

        {/* Card */}
        <div
          className="glass-card-static rounded-2xl overflow-hidden animate-scaleIn"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)' }}
        >
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {(['login', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className="flex-1 py-4 text-sm font-semibold transition-smooth relative"
                style={{
                  color: tab === t ? '#60a5fa' : '#475569',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
                {tab === t && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '20%',
                      right: '20%',
                      height: 2,
                      background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
                      borderRadius: 999,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Form body */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-white mb-1 animate-fadeIn">
              {tab === 'login' ? 'Welcome back' : 'Join DriveRent'}
            </h2>
            <p className="text-sm mb-6 animate-fadeIn" style={{ color: '#475569' }}>
              {tab === 'login'
                ? 'Sign in to your account to continue.'
                : 'Create an account to start renting or listing.'}
            </p>

            {/* Alerts */}
            {error && (
              <div
                className="flex items-start gap-3 p-3.5 rounded-xl mb-5 animate-fadeIn"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#f87171' }} />
                <span className="text-sm" style={{ color: '#fca5a5' }}>{error}</span>
              </div>
            )}
            {success && (
              <div
                className="flex items-start gap-3 p-3.5 rounded-xl mb-5 animate-fadeIn"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#34d399' }} />
                <span className="text-sm" style={{ color: '#6ee7b7' }}>{success}</span>
              </div>
            )}

            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-5 animate-fadeIn">
                <div>
                  <label className="form-label">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input-dark"
                      style={{ paddingLeft: '2.5rem' }}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="input-dark"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full" style={{ padding: '0.75rem', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
                  Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5 animate-fadeIn">
                <div>
                  <label className="form-label">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="input-dark"
                      style={{ paddingLeft: '2.5rem' }}
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input-dark"
                      style={{ paddingLeft: '2.5rem' }}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="input-dark"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="form-label">I want to...</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as 'user' | 'owner')}
                    className="input-dark"
                  >
                    <option value="user">Rent vehicles</option>
                    <option value="owner">List my vehicles for rent</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full" style={{ padding: '0.75rem', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
                  Create Account
                </button>
              </form>
            )}

            <p className="text-center text-sm mt-6" style={{ color: '#334155' }}>
              {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => switchTab(tab === 'login' ? 'register' : 'login')}
                className="transition-smooth"
                style={{ color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                {tab === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
