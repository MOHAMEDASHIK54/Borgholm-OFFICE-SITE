import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Mail, Phone } from 'lucide-react';
import { useApp } from '../context/useApp';

export default function MegaMenu() {
  const { isMegaMenuOpen, setIsMegaMenuOpen } = useApp();
  const navigate = useNavigate();

  if (!isMegaMenuOpen) return null;

  const menuLinks = [
    { to: '/', num: '01', title: 'Agency Home', desc: 'The iconic Borgholm flagship experience (Image 1 Model)' },
    { to: '/starting', num: '02', title: 'Starting Showcase', desc: 'Isometric interactive digital showcase (Image 2 Model)' },
    { to: '/about', num: '03', title: 'Pages & Philosophy', desc: 'Studio history, leadership team & project estimator' },
    { to: '/portfolio', num: '04', title: 'Selected Works', desc: 'Curated editorial, digital & branding case studies' },
    { to: '/blog', num: '05', title: 'Journal & Stories', desc: 'Essays on design, typography, and creative strategy' },
    { to: '/shop', num: '06', title: 'Studio Goods & Kits', desc: 'Typography books, UI kits, and limited prints' },
    { to: '/login', num: '07', title: 'Client Portal / Login', desc: 'Authentication, project dashboards & downloads' }
  ];

  const handleSelect = (to) => {
    navigate(to);
    setIsMegaMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#121214',
      color: '#ffffff',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 60px',
      overflowY: 'auto',
      animation: 'fadeIn 0.25s ease'
    }}>
      {/* Top Bar inside Mega Menu */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#ffffff" strokeWidth="2" />
            <path 
              d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C20.5 26 24 22.5 24 18C24 14.5 21 12 17.5 12C14.5 12 12.5 14 12.5 16.5C12.5 18.5 14 20 16 20C17.5 20 18.5 19 18.5 18" 
              stroke="var(--color-accent)" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
            />
          </svg>
          <span style={{
            fontFamily: "var(--font-serif-heading)",
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#ffffff'
          }}>
            Borgholm
          </span>
          <span className="sans-meta" style={{ color: 'rgba(255,255,255,0.4)', marginLeft: '16px' }}>
            GLOBAL DIRECTORY
          </span>
        </div>

        <button
          onClick={() => setIsMegaMenuOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#ffffff',
            fontSize: '12px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            letterSpacing: '0.15em',
            background: 'rgba(255,255,255,0.06)',
            padding: '10px 18px',
            borderRadius: '40px'
          }}
        >
          <span>CLOSE</span>
          <X size={18} />
        </button>
      </div>

      {/* Main Grid Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '60px',
        marginTop: '50px',
        flex: 1
      }} className="mega-menu-grid">
        {/* Navigation list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuLinks.map((item) => (
            <div
              key={item.to}
              onClick={() => handleSelect(item.to)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '4px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.1em'
                }}>
                  {item.num}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif-heading)',
                    fontSize: '32px',
                    fontWeight: 500,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '4px'
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>

              <ArrowRight 
                size={18} 
                color="rgba(255,255,255,0.4)" 
              />
            </div>
          ))}
        </div>

        {/* Right Info Column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          paddingLeft: '50px'
        }}>
          <div>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
              AGENCY INQUIRIES
            </span>
            <h4 style={{
              fontFamily: 'var(--font-serif-heading)',
              fontSize: '26px',
              fontWeight: 400,
              marginTop: '12px',
              lineHeight: 1.3
            }}>
              Let us craft something extraordinary together.
            </h4>
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.7)' }}>
                <Mail size={16} color="var(--color-accent)" />
                <span>hello@borgholmstudo.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.7)' }}>
                <Phone size={16} color="var(--color-accent)" />
                <span>+46 (0)8 520 89 200</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <span className="sans-meta" style={{ color: 'rgba(255,255,255,0.4)' }}>
              STUDIO LOCATIONS
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#ffffff' }}>Stockholm</strong>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                  Stureplan 4B, 114 35 Stockholm
                </p>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#ffffff' }}>London</strong>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                  24 Redchurch St, Shoreditch
                </p>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#ffffff' }}>New York</strong>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                  520 Broadway, SoHo, NY 10012
                </p>
              </div>
            </div>
          </div>

          <div style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
              © 2026 BORGHOLM DIGITAL ALL RIGHTS RESERVED
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .mega-menu-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}
