import { useState } from 'react';
import { X, Send, CheckCircle, MapPin, Mail, AlertCircle } from 'lucide-react';
import { useApp } from '../context/useApp';
import { sendInquiry } from '../services/api';

export default function ContactDrawer() {
  const { isContactOpen, setIsContactOpen } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Digital Design',
    budget: '$20k - $50k',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isContactOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sendInquiry(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setError(err.message || 'Failed to submit inquiry to PostgreSQL database');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError('');
    setFormData({
      name: '',
      email: '',
      service: 'Digital Design',
      budget: '$20k - $50k',
      message: ''
    });
    setIsContactOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '540px',
        backgroundColor: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        padding: '40px',
        overflowY: 'auto',
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <div>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
              DIRECT COMMUNICATION • POSTGRESQL SYNCED
            </span>
            <h3 style={{
              fontFamily: 'var(--font-serif-heading)',
              fontSize: '32px',
              fontWeight: 600,
              marginTop: '4px'
            }}>
              Say Hello.
            </h3>
          </div>

          <button 
            onClick={resetForm}
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 20px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 56, 17, 0.1)',
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <CheckCircle size={36} />
            </div>
            <h4 style={{
              fontFamily: 'var(--font-serif-heading)',
              fontSize: '28px',
              fontWeight: 600
            }}>
              Tack! Stored in PostgreSQL.
            </h4>
            <p style={{
              color: 'var(--color-text-secondary)',
              marginTop: '12px',
              fontSize: '14px',
              lineHeight: 1.6
            }}>
              Your inquiry has been safely stored in the PostgreSQL database table <code>inquiries</code>. Our Stockholm strategy team has been notified.
            </p>
            <button
              onClick={resetForm}
              className="btn-borgholm-accent"
              style={{ marginTop: '28px' }}
            >
              SEND ANOTHER MESSAGE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p className="serif-italic" style={{ fontSize: '15px', color: '#555' }}>
              "Every iconic collaboration begins with a candid dialogue on ambition, craft, and timing."
            </p>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Victoria Lind"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #d4d4d8',
                  borderRadius: '3px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = '#d4d4d8'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="victoria@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #d4d4d8',
                  borderRadius: '3px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Service of Interest
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Brand Identity', 'Digital Design', 'Creative Engineering', 'Editorial / Print'].map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setFormData({ ...formData, service: srv })}
                    style={{
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '2px',
                      border: formData.service === srv ? '1px solid var(--color-accent)' : '1px solid #e0e0e0',
                      backgroundColor: formData.service === srv ? 'var(--color-accent-soft)' : '#fafafa',
                      color: formData.service === srv ? 'var(--color-accent)' : '#444'
                    }}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Approximate Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #d4d4d8',
                  borderRadius: '3px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  background: '#ffffff'
                }}
              >
                <option>$10k - $25k</option>
                <option>$25k - $50k</option>
                <option>$50k - $100k</option>
                <option>$100k+</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Project Overview & Vision
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your brand challenges, deliverables, and target launch timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #d4d4d8',
                  borderRadius: '3px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-borgholm-accent"
              style={{ justifyContent: 'center', marginTop: '10px', opacity: loading ? 0.7 : 1 }}
            >
              <span>{loading ? 'STORING IN POSTGRESQL...' : 'SEND INQUIRY'}</span>
              <Send size={14} />
            </button>
          </form>
        )}

        {/* Footer info in drawer */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '28px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '12px',
          color: 'var(--color-text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={14} color="var(--color-accent)" />
            <span>Stureplan 4B, 114 35 Stockholm, Sweden</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={14} color="var(--color-accent)" />
            <span>inquiries@borgholmstudo.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
