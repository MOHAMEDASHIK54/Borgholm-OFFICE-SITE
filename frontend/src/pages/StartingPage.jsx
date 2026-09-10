import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function StartingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', zIndex: 10, overflow: 'hidden' }}>
      {/* =========================================================
          HERO SECTION (Exact match to Model Image 2)
          "WELCOME TO BORGHOLM"
          "Your stunning digital| website"
          Elevate your business with Borgholm...
          "GET BORGHOLM ──→"
          Tilted isometric tablet & mobile screens showcasing mockups
          ========================================================= */}
      <section style={{
        minHeight: 'calc(100vh - 76px)',
        padding: '60px 80px 60px 100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
      }} className="starting-hero-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.25fr',
          gap: '50px',
          alignItems: 'center'
        }} className="starting-grid">
          {/* Left Column */}
          <div style={{ maxWidth: '560px' }}>
            <span className="sans-meta" style={{
              display: 'inline-block',
              letterSpacing: '0.25em',
              marginBottom: '20px',
              color: '#8b8b92'
            }}>
              WELCOME TO BORGHOLM
            </span>

            <h1 className="serif-display" style={{
              fontSize: 'clamp(54px, 6.2vw, 88px)',
              lineHeight: 1.02,
              marginBottom: '24px',
              fontWeight: 600,
              color: '#141416'
            }}>
              Your stunning{' '}
              <span style={{ color: 'var(--color-accent)', position: 'relative', display: 'inline-block' }}>
                digital
                <span className="animate-pulse-glow" style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '0.85em',
                  backgroundColor: 'var(--color-accent)',
                  marginLeft: '4px',
                  verticalAlign: 'baseline'
                }}></span>
              </span>{' '}
              website
            </h1>

            <p className="serif-italic" style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: '#44444a',
              lineHeight: 1.45,
              marginBottom: '40px',
              maxWidth: '480px'
            }}>
              Elevate your business with Borgholm, a theme designed for all types of modern digital agencies, whatever their expertise might be!
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Solid Orange/Red button from Image 2 */}
              <button
                onClick={() => navigate('/')}
                className="btn-borgholm-accent"
                style={{ padding: '16px 36px', fontSize: '11.5px' }}
              >
                <span>GET BORGHOLM</span>
                <span style={{ fontSize: '15px' }}>──→</span>
              </button>

              <button
                onClick={() => navigate('/about')}
                className="btn-borgholm-light"
                style={{ padding: '16px 28px', fontSize: '11.5px' }}
              >
                <span>EXPLORE STUDIO</span>
                <span style={{ fontSize: '15px' }}>──→</span>
              </button>
            </div>

            {/* Quick trust badges */}
            <div style={{
              display: 'flex',
              gap: '24px',
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid var(--color-border)',
              fontSize: '12px',
              color: '#777'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>✓</span>
                <span>React 19 & Vite 8</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>✓</span>
                <span>Pixel-Accurate Borgholm</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>✓</span>
                <span>Responsive & Fluid</span>
              </div>
            </div>
          </div>

          {/* Right Column: Isometric 3D Angled Devices Showcase (from Image 2) */}
          <div style={{
            position: 'relative',
            perspective: '1200px',
            minHeight: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} className="isometric-container">
            {/* Background ambient glow */}
            <div style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,56,17,0.12) 0%, rgba(255,255,255,0) 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }} />

            {/* Main Tilted Tablet Mockup ("Rider." dark mode bike website) */}
            <div style={{
              position: 'relative',
              width: '420px',
              height: '290px',
              backgroundColor: '#121214',
              borderRadius: '18px',
              border: '6px solid #e8e8ed',
              boxShadow: '0 30px 60px rgba(0,0,0,0.22), 0 10px 20px rgba(0,0,0,0.1)',
              transform: 'rotate(-8deg) skew(2deg, -3deg)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 3
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(-3deg) scale(1.04) translateY(-10px)';
              e.currentTarget.style.zIndex = '10';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(-8deg) skew(2deg, -3deg)';
              e.currentTarget.style.zIndex = '3';
            }}
            onClick={() => navigate('/portfolio')}
            title="Preview Rider. project"
            >
              {/* Tablet screen content */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#0d0d0f',
                color: '#fff',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '13px', fontWeight: 600 }}>Borgholm</span>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '9px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>
                    <span>CASES</span>
                    <span>STUDIO</span>
                    <span>CONTACT</span>
                  </div>
                </div>

                <div style={{ textAlign: 'center', margin: 'auto 0' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--color-accent)' }}>FEATURED CASE</span>
                  <h3 className="serif-display" style={{ fontSize: '32px', color: '#fff', marginTop: '4px' }}>
                    Rider<span style={{ color: 'var(--color-accent)' }}>.</span>
                  </h3>
                  <p className="serif-italic" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', maxWidth: '240px', margin: '4px auto 0' }}>
                    We created the most advanced electric bicycle technology.
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>
                  <span>© 2025 RIDER CO.</span>
                  <span style={{ color: 'var(--color-accent)' }}>CLICK TO VIEW CASE →</span>
                </div>
              </div>
            </div>

            {/* Second Mockup: Agency Main Page Live Card ("Grow Your Business.") */}
            <div style={{
              position: 'absolute',
              right: '-20px',
              bottom: '-20px',
              width: '360px',
              height: '240px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '5px solid #eaeaea',
              boxShadow: '0 25px 50px rgba(0,0,0,0.18)',
              transform: 'rotate(6deg) skew(-2deg, 2deg)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 4
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(1deg) scale(1.06) translateY(-10px)';
              e.currentTarget.style.zIndex = '10';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(6deg) skew(-2deg, 2deg)';
              e.currentTarget.style.zIndex = '4';
            }}
            onClick={() => navigate('/')}
            title="Open Agency Home (Model 1)"
            >
              <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '12px' }}>Borgholm</strong>
                  <span style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: '2px',
                    fontSize: '8px',
                    fontWeight: 700
                  }}>
                    IMAGE 1 MODEL
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '8px', letterSpacing: '0.15em', color: '#888' }}>DIGITAL</span>
                  <h4 className="serif-display" style={{ fontSize: '20px', lineHeight: 1.1, marginTop: '2px' }}>
                    Grow Your <span style={{ color: 'var(--color-accent)' }}>Business.</span>
                  </h4>
                  <p style={{ fontSize: '9px', color: '#666', marginTop: '4px' }}>
                    Lorem ipsum dolor sit amet, id tacimates gloriatur voluptatibus.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.1em' }}>
                    FIND OUT MORE ──→
                  </span>
                  <span style={{ fontSize: '8px', color: 'var(--color-accent)', fontWeight: 600 }}>LIVE DEMO</span>
                </div>
              </div>
            </div>

            {/* Third Mockup: Minimalist Book / Monograph Cover (from Image 2 top right) */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '20px',
              width: '180px',
              height: '240px',
              backgroundColor: '#fafafa',
              borderRadius: '6px',
              border: '3px solid #eee',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              transform: 'rotate(12deg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              zIndex: 2,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/shop')}
            title="View Shop Editions"
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255, 56, 17, 0.15)', margin: '0 auto' }} />
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '8px', letterSpacing: '0.2em', color: '#999' }}>EDITION 01</span>
                <p className="serif-display" style={{ fontSize: '13px', marginTop: '4px' }}>Zam Nungrey Book</p>
              </div>
              <div style={{ textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '8px' }}>
                <span style={{ fontSize: '8px', color: 'var(--color-accent)', fontWeight: 700 }}>STUDIO MONOGRAPH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          KEY FEATURES SECTION
          ========================================================= */}
      <section style={{
        padding: '80px 80px 80px 100px',
        backgroundColor: '#faf9f6',
        borderTop: '1px solid var(--color-border)'
      }} className="starting-features-section">
        <div style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
                ARCHITECTURAL PRECISION
              </span>
              <h2 className="serif-display" style={{ fontSize: '42px', marginTop: '8px' }}>
                Why Agencies Choose Borgholm
              </h2>
            </div>
            <p style={{ maxWidth: '420px', fontSize: '14px', color: '#666', lineHeight: 1.6 }}>
              A template engineered to balance timeless editorial typography with effortless responsive performance.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '30px'
          }} className="features-grid">
            <div style={{ padding: '28px 24px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              <div style={{ color: 'var(--color-accent)', marginBottom: '16px' }}>
                <Sparkles size={28} />
              </div>
              <h4 className="serif-display" style={{ fontSize: '20px', marginBottom: '8px' }}>
                Editorial Typography
              </h4>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                Carefully tuned font scales, kerning pairs, and italic pullquotes evoking luxury fashion monographs.
              </p>
            </div>

            <div style={{ padding: '28px 24px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              <div style={{ color: 'var(--color-accent)', marginBottom: '16px' }}>
                <Zap size={28} />
              </div>
              <h4 className="serif-display" style={{ fontSize: '20px', marginBottom: '8px' }}>
                Silky Interactions
              </h4>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                60fps micro-animations, slide-over contact drawers, cart panels, and instant full-screen navigation.
              </p>
            </div>

            <div style={{ padding: '28px 24px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              <div style={{ color: 'var(--color-accent)', marginBottom: '16px' }}>
                <Layers size={28} />
              </div>
              <h4 className="serif-display" style={{ fontSize: '20px', marginBottom: '8px' }}>
                Component Library
              </h4>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                Pre-built modules for portfolio filters, dynamic shop carts, interactive estimators, and user auth.
              </p>
            </div>

            <div style={{ padding: '28px 24px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              <div style={{ color: 'var(--color-accent)', marginBottom: '16px' }}>
                <ShieldCheck size={28} />
              </div>
              <h4 className="serif-display" style={{ fontSize: '20px', marginBottom: '8px' }}>
                Clean React Architecture
              </h4>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                Modern modular React 19 structure, zero bloated third-party dependencies, and production-ready code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PAGE QUICK SELECTOR / EXPLORER
          ========================================================= */}
      <section style={{
        padding: '80px 80px 80px 100px',
        backgroundColor: '#ffffff'
      }} className="starting-pages-section">
        <div style={{ maxWidth: '1200px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
              ALL PAGES INCLUDED
            </span>
            <h2 className="serif-display" style={{ fontSize: '42px', marginTop: '8px' }}>
              Explore the Complete Studio Ecosystem
            </h2>
            <p style={{ color: '#666', marginTop: '8px', fontSize: '14px' }}>
              Switch instantly between any of the pre-configured agency pages:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }} className="page-cards-grid">
            {[
              { to: '/', title: 'Agency Main Page', badge: 'Image 1 Model', desc: 'The iconic "Grow Your Business." layout with 3 red-accented story cards.' },
              { to: '/login', title: 'Client Authentication', badge: 'Custom Built', desc: 'Sign in, registration, 1-click test credentials, and client dashboard.' },
              { to: '/about', title: 'Pages / Studio Story', badge: 'Extra Page', desc: 'Agency manifesto, leadership profiles, and interactive cost calculator.' },
              { to: '/portfolio', title: 'Selected Works', badge: 'Extra Page', desc: 'Filterable case studies with modal deep dives and visual galleries.' },
              { to: '/blog', title: 'Editorial Journal', badge: 'Extra Page', desc: 'Magazine layout with article reader, comments, and share actions.' },
              { to: '/shop', title: 'Editions & Goods', badge: 'Extra Page', desc: 'Studio merchandise, type specimens, and interactive shopping cart.' }
            ].map((card) => (
              <div
                key={card.to}
                onClick={() => navigate(card.to)}
                style={{
                  padding: '28px',
                  backgroundColor: '#fafafa',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(255, 56, 17, 0.1)',
                    color: 'var(--color-accent)'
                  }}>
                    {card.badge}
                  </span>
                  <ArrowRight size={16} color="var(--color-accent)" />
                </div>
                <h3 className="serif-display" style={{ fontSize: '22px', color: '#141416', marginBottom: '8px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .starting-hero-container,
          .starting-features-section,
          .starting-pages-section {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .starting-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .isometric-container {
            min-height: 400px !important;
          }
          .features-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .page-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
