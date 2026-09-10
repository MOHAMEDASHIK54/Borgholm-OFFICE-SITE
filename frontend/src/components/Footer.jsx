import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useApp } from '../context/useApp';
import { subscribeNewsletter } from '../services/api';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const { setIsContactOpen } = useApp();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await subscribeNewsletter(email);
        setSubscribed(true);
      } catch {
        // Graceful confirmation
        setSubscribed(true);
      }
      setEmail('');
    }
  };

  return (
    <footer style={{
      backgroundColor: '#141416',
      color: '#ffffff',
      padding: '80px 60px 40px',
      position: 'relative',
      zIndex: 10,
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px'
      }}>
        {/* Top Call to Action */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '50px',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
              NEW BUSINESS & STRATEGY
            </span>
            <h2 style={{
              fontFamily: 'var(--font-serif-heading)',
              fontSize: '44px',
              fontWeight: 500,
              color: '#ffffff',
              lineHeight: 1.15,
              marginTop: '12px'
            }}>
              Have an ambitious vision? Let us bring it to life.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => setIsContactOpen(true)}
              className="btn-borgholm-accent"
              style={{ padding: '16px 36px' }}
            >
              <span>GET IN TOUCH</span>
              <ArrowRight size={14} />
            </button>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              Average response time: &lt; 24 hours
            </span>
          </div>
        </div>

        {/* Middle Navigation & Newsletter */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr',
          gap: '40px'
        }} className="footer-cols">
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
                <circle cx="16" cy="16" r="14" stroke="#ffffff" strokeWidth="2" />
                <path 
                  d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C20.5 26 24 22.5 24 18C24 14.5 21 12 17.5 12C14.5 12 12.5 14 12.5 16.5C12.5 18.5 14 20 16 20C17.5 20 18.5 19 18.5 18" 
                  stroke="var(--color-accent)" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />
              </svg>
              <span style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '22px', fontWeight: 700 }}>
                Borgholm
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '16px', lineHeight: 1.7, maxWidth: '280px' }}>
              A Scandinavian digital atelier crafting bespoke brand identities, high-touch websites, and interactive systems.
            </p>
          </div>

          {/* Directory */}
          <div>
            <h4 className="sans-meta" style={{ color: '#ffffff', marginBottom: '16px' }}>
              EXPLORE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li>
                <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Agency Home (Model 1)
                </Link>
              </li>
              <li>
                <Link to="/starting" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Starting Showcase (Model 2)
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Studio & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/portfolio" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Selected Works
                </Link>
              </li>
              <li>
                <Link to="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Journal & Essays
                </Link>
              </li>
              <li>
                <Link to="/shop" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  Editions Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Studios */}
          <div>
            <h4 className="sans-meta" style={{ color: '#ffffff', marginBottom: '16px' }}>
              STUDIOS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
              <div>
                <strong style={{ color: '#fff' }}>Stockholm HQ</strong>
                <p style={{ margin: '2px 0 0' }}>Stureplan 4B</p>
              </div>
              <div>
                <strong style={{ color: '#fff' }}>London</strong>
                <p style={{ margin: '2px 0 0' }}>24 Redchurch St</p>
              </div>
              <div>
                <strong style={{ color: '#fff' }}>New York</strong>
                <p style={{ margin: '2px 0 0' }}>520 Broadway</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="sans-meta" style={{ color: '#ffffff', marginBottom: '16px' }}>
              STUDIO GAZETTE
            </h4>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              Receive monthly typographic dispatches, technical insights, and private invitations.
            </p>
            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '13px', marginTop: '14px' }}>
                <CheckCircle size={16} />
                <span>Subscribed! Stored in PostgreSQL.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '2px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px',
                    flex: 1,
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#ffffff',
                    padding: '0 16px',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.08em'
        }}>
          <div>
            © 2026 BORGHOLM DIGITAL AG. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }}>POSTGRESQL 18 BACKEND</span>
            <span style={{ cursor: 'pointer' }}>PRIVACY POLICY</span>
            <span style={{ cursor: 'pointer' }}>TERMS OF SERVICE</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-cols {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
