import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock } from 'lucide-react';

const contactItems = [
  {
    icon: Mail,
    title: 'Email Us',
    primary: 'support@driverent.com',
    secondary: "We'll respond within 24 hours",
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
  },
  {
    icon: Phone,
    title: 'Call Us',
    primary: '+1 (555) 123-4567',
    secondary: 'Mon–Fri, 9am–6pm EST',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    primary: '123 Main Street',
    secondary: 'New York, NY 10001',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      {/* Header */}
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
            <MessageSquare className="w-3.5 h-3.5" />
            Contact Us
          </span>
          <h1 className="text-5xl font-extrabold text-white mt-4 mb-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto animate-fadeIn" style={{ color: '#475569', animationDelay: '0.2s' }}>
            Have a question or need help? Our team is here for you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Contact info */}
          <div className="space-y-6 animate-slideInLeft">
            <h2 className="text-2xl font-bold text-white mb-6">Ways to Reach Us</h2>

            {contactItems.map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-2xl transition-smooth animate-fadeIn"
                style={{
                  background: 'rgba(15,23,42,0.7)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  animationDelay: `${i * 0.1}s`,
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${item.color}30`;
                  (e.currentTarget as HTMLElement).style.background = item.bg;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(15,23,42,0.7)';
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, border: `1px solid ${item.color}20` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>{item.primary}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{item.secondary}</p>
                </div>
              </div>
            ))}

            {/* Response time card */}
            <div
              className="flex items-start gap-4 p-5 rounded-2xl animate-fadeIn"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.06) 100%)',
                border: '1px solid rgba(59,130,246,0.12)',
                animationDelay: '0.3s',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(59,130,246,0.1)' }}
              >
                <Clock className="w-5 h-5" style={{ color: '#60a5fa' }} />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Quick Response Guaranteed</h3>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  We aim to reply to all inquiries within 24 hours. For urgent matters, please call during business hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div
            className="rounded-2xl p-8 animate-slideInRight"
            style={{
              background: 'rgba(15,23,42,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <h2 className="text-xl font-bold text-white mb-1">Send us a Message</h2>
            <p className="text-sm mb-7" style={{ color: '#475569' }}>Fill out the form and we'll get back to you shortly.</p>

            {submitted && (
              <div
                className="flex items-center gap-3 p-4 rounded-xl mb-6 animate-fadeIn"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#34d399' }} />
                <div>
                  <p className="font-semibold text-sm text-white">Message sent!</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6ee7b7' }}>We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-dark"
                >
                  <option value="">Select a topic...</option>
                  <option value="rental">Rental Inquiry</option>
                  <option value="owner">Owner / Listing</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="input-dark"
                  style={{ resize: 'vertical' }}
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center" style={{ padding: '0.75rem', fontSize: '0.9375rem' }}>
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
