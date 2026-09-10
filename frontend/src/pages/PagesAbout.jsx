import { useState } from 'react';
import { TEAM_MEMBERS } from '../data/contentData';
import { ArrowRight, Calculator, Check } from 'lucide-react';
import { useApp } from '../context/useApp';

export default function PagesAbout() {
  const { setIsContactOpen } = useApp();

  // Interactive Project Cost Estimator state
  const [platform, setPlatform] = useState('Web & Mobile');
  const [complexity, setComplexity] = useState('Custom Design & 3D');
  const [timeline, setTimeline] = useState('8-12 Weeks');

  const calculateEstimate = () => {
    let base = 25000;
    if (platform === 'Mobile App') base += 10000;
    if (platform === 'Full Ecosystem (Web + App)') base += 20000;
    if (complexity === 'Custom Design & 3D') base += 12000;
    if (complexity === 'Enterprise Platform') base += 24000;
    if (timeline === 'Accelerated (4-6 Weeks)') base += 8000;
    return base;
  };

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* Hero */}
      <section style={{
        padding: '70px 80px 60px 100px',
        backgroundColor: '#ffffff'
      }} className="about-hero">
        <div style={{ maxWidth: '900px' }}>
          <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
            STUDIO PHILOSOPHY & HERITAGE
          </span>
          <h1 className="serif-display" style={{
            fontSize: 'clamp(44px, 5.2vw, 76px)',
            lineHeight: 1.05,
            marginTop: '16px',
            marginBottom: '28px'
          }}>
            We build digital architecture for brands that refuse to blend into the background.
          </h1>
          <p className="serif-italic" style={{
            fontSize: 'clamp(18px, 2vw, 24px)',
            color: '#44444a',
            lineHeight: 1.5,
            maxWidth: '720px'
          }}>
            Founded in Stockholm in 2012, Borgholm is an independent creative collective uniting typographic rigor, spatial composition, and advanced software engineering.
          </p>
        </div>
      </section>

      {/* Philosophy Columns */}
      <section style={{
        padding: '60px 80px 80px 100px',
        backgroundColor: '#faf9f6',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }} className="about-values">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px'
        }} className="values-grid">
          <div>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>01. CLARITY</span>
            <h3 className="serif-display" style={{ fontSize: '24px', margin: '12px 0 10px' }}>
              Subtraction as Virtue
            </h3>
            <p style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.65 }}>
              True luxury in the modern digital landscape is clarity of thought. We distill complex business realities into intuitive, unforgettable interactions.
            </p>
          </div>

          <div>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>02. DISCIPLINE</span>
            <h3 className="serif-display" style={{ fontSize: '24px', margin: '12px 0 10px' }}>
              Typographic Heritage
            </h3>
            <p style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.65 }}>
              Rooted in Swiss grid systems and classical European typesetting, our digital compositions exhibit structural permanence that outlives fleeting web fads.
            </p>
          </div>

          <div>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>03. PRECISION</span>
            <h3 className="serif-display" style={{ fontSize: '24px', margin: '12px 0 10px' }}>
              Performant Engineering
            </h3>
            <p style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.65 }}>
              Artistic vision without technical capability is merely decoration. Our engineers build lightning-fast, accessible frontends using React 19 and modern web standards.
            </p>
          </div>
        </div>
      </section>

      {/* Team Roster */}
      <section style={{
        padding: '90px 80px 90px 100px',
        backgroundColor: '#ffffff'
      }} className="about-team">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
          <div>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>STUDIO LEADERSHIP</span>
            <h2 className="serif-display" style={{ fontSize: '42px', marginTop: '8px' }}>
              The Minds Behind Borgholm
            </h2>
          </div>
          <button onClick={() => setIsContactOpen(true)} className="btn-borgholm-outline">
            <span>JOIN OUR PRACTICE</span>
            <span>──→</span>
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '30px'
        }} className="team-grid">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '320px', overflow: 'hidden', borderRadius: '2px', marginBottom: '16px' }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <h4 className="serif-display" style={{ fontSize: '20px', color: '#141416' }}>
                {member.name}
              </h4>
              <span className="sans-meta" style={{ color: 'var(--color-accent)', fontSize: '10px', marginTop: '4px' }}>
                {member.role}
              </span>
              <p style={{ fontSize: '12.5px', color: '#666', marginTop: '10px', lineHeight: 1.5 }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Cost Estimator */}
      <section style={{
        padding: '90px 80px 90px 100px',
        backgroundColor: '#141416',
        color: '#ffffff'
      }} className="about-estimator">
        <div style={{
          maxWidth: '1100px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }} className="estimator-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)' }}>
              <Calculator size={18} />
              <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
                TRANSPARENT COLLABORATION
              </span>
            </div>
            <h2 className="serif-display" style={{ fontSize: '42px', marginTop: '12px' }}>
              Interactive Project Investment Estimator
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '12px', lineHeight: 1.6 }}>
              Select your requirements to gauge approximate investment parameters for a bespoke Borgholm engagement.
            </p>

            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Platform */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#aaa' }}>
                  Platform Scope
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Web Experience', 'Mobile App', 'Full Ecosystem (Web + App)'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      style={{
                        padding: '8px 14px',
                        fontSize: '12px',
                        borderRadius: '3px',
                        border: platform === p ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: platform === p ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)',
                        color: '#ffffff'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#aaa' }}>
                  Aesthetic & Technical Complexity
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Editorial Identity', 'Custom Design & 3D', 'Enterprise Platform'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setComplexity(c)}
                      style={{
                        padding: '8px 14px',
                        fontSize: '12px',
                        borderRadius: '3px',
                        border: complexity === c ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: complexity === c ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)',
                        color: '#ffffff'
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#aaa' }}>
                  Target Delivery Window
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Accelerated (4-6 Weeks)', '8-12 Weeks', 'Quarterly Engagement'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeline(t)}
                      style={{
                        padding: '8px 14px',
                        fontSize: '12px',
                        borderRadius: '3px',
                        border: timeline === t ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: timeline === t ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)',
                        color: '#ffffff'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '6px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <span className="sans-meta" style={{ color: 'rgba(255,255,255,0.5)' }}>ESTIMATED PARAMETERS</span>
            <div style={{ margin: '20px 0' }}>
              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>FROM</span>
              <h3 style={{
                fontFamily: 'var(--font-serif-heading)',
                fontSize: '56px',
                color: 'var(--color-accent)',
                fontWeight: 600,
                lineHeight: 1
              }}>
                ${calculateEstimate().toLocaleString()}
              </h3>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>USD • Complete Studio Retainer</span>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '24px', textAlign: 'left', fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="var(--color-accent)" />
                <span>Dedicated partner-level creative direction</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="var(--color-accent)" />
                <span>Bespoke typography licensing & responsive tokens</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="var(--color-accent)" />
                <span>Production React codebase & deployment audit</span>
              </div>
            </div>

            <button
              onClick={() => setIsContactOpen(true)}
              className="btn-borgholm-accent"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>LOCK IN THIS SCOPE</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .about-hero, .about-values, .about-team, .about-estimator {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .values-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .team-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .estimator-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .team-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
