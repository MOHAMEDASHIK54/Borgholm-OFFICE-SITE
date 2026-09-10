import { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/contentData';
import { X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/useApp';

export default function PortfolioPage() {
  const { setIsContactOpen } = useApp();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Digital', 'Branding', 'Photography'];

  const filtered = filter === 'All' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.category === filter);

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* Header */}
      <section style={{
        padding: '70px 80px 40px 100px',
        backgroundColor: '#ffffff'
      }} className="portfolio-header">
        <div style={{ maxWidth: '800px' }}>
          <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
            STUDIO ARCHIVES
          </span>
          <h1 className="serif-display" style={{
            fontSize: 'clamp(44px, 5.2vw, 72px)',
            lineHeight: 1.05,
            marginTop: '16px',
            marginBottom: '20px'
          }}>
            Selected Works & Collaborations
          </h1>
          <p className="serif-italic" style={{
            fontSize: 'clamp(18px, 1.8vw, 22px)',
            color: '#555',
            lineHeight: 1.5
          }}>
            A curated index of contemporary brand identities, interactive digital experiences, and editorial commissions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '40px',
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '16px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 18px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderRadius: '30px',
                backgroundColor: filter === cat ? 'var(--color-accent)' : '#f4f4f4',
                color: filter === cat ? '#ffffff' : '#333',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{
        padding: '40px 80px 100px 100px',
        backgroundColor: '#ffffff'
      }} className="portfolio-grid-section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '50px'
        }} className="portfolio-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '100%',
                height: '420px',
                overflow: 'hidden',
                borderRadius: '3px',
                position: 'relative',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(20,20,22,0.7)',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  fontSize: '10px',
                  letterSpacing: '0.1em'
                }}>
                  {item.year}
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="sans-meta" style={{ color: 'var(--color-accent)', fontSize: '10px' }}>
                    {item.category}
                  </span>
                  <span style={{ color: '#ccc' }}>•</span>
                  <span style={{ fontSize: '12px', color: '#777' }}>{item.client}</span>
                </div>
                <h3 className="serif-display" style={{ fontSize: '28px', color: '#141416' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#555', marginTop: '6px', lineHeight: 1.5 }}>
                  {item.summary}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                  <span>EXPLORE CASE STUDY</span>
                  <span>──→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(18, 18, 20, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 20px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            maxWidth: '860px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '4px',
            boxShadow: 'var(--shadow-lg)',
            animation: 'slideInUp 0.3s ease',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                padding: '8px',
                zIndex: 10,
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ height: '440px', overflow: 'hidden' }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
                    {selectedProject.category} • {selectedProject.year}
                  </span>
                  <h2 className="serif-display" style={{ fontSize: '38px', marginTop: '6px' }}>
                    {selectedProject.title}
                  </h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="sans-meta" style={{ color: '#888' }}>CLIENT</span>
                  <p style={{ fontWeight: 600, fontSize: '15px' }}>{selectedProject.client}</p>
                </div>
              </div>

              <div style={{ marginTop: '24px', borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
                <h4 className="sans-meta" style={{ color: '#888', marginBottom: '8px' }}>
                  THE CHALLENGE & SOLUTION
                </h4>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.7 }}>
                  {selectedProject.summary} Borgholm partnered with the founding executive team to formulate a forward-looking visual vernacular. Every breakpoint, micro-interaction, and editorial frame was tested across modern display environments to ensure pristine fidelity.
                </p>
              </div>

              <div style={{ marginTop: '24px', backgroundColor: '#faf9f6', padding: '20px', borderRadius: '4px' }}>
                <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
                  KEY DELIVERABLES
                </span>
                <p style={{ fontSize: '14px', fontWeight: 600, marginTop: '6px', color: '#222' }}>
                  {selectedProject.deliverable}
                </p>
              </div>

              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: '11px', padding: '4px 10px', backgroundColor: '#f0f0f0', borderRadius: '2px', color: '#555' }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsContactOpen(true);
                  }}
                  className="btn-borgholm-accent"
                >
                  <span>COMMISSION SIMILAR WORK</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .portfolio-header, .portfolio-grid-section {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .portfolio-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
