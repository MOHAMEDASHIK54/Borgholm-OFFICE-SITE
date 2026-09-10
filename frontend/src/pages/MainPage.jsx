import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Check, Monitor } from 'lucide-react';
import { HERO_SLIDES, FEATURED_ARTICLES_IMAGE1, AGENCY_SERVICES, PORTFOLIO_PROJECTS, CLIENT_TESTIMONIALS } from '../data/contentData';
import { useApp } from '../context/useApp';

export default function MainPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const navigate = useNavigate();
  const { setIsContactOpen } = useApp();

  // Auto rotate hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* =========================================================
          HERO SECTION (Exact match to Model Image 1)
          ========================================================= */}
      <section style={{
        minHeight: 'calc(100vh - 76px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 80px 40px 100px',
        position: 'relative'
      }} className="hero-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.25fr',
          gap: '60px',
          alignItems: 'center',
          flex: 1
        }} className="hero-grid">
          {/* Left Column: Typography & Action */}
          <div style={{ maxWidth: '540px', paddingRight: '20px' }}>
            <span className="sans-meta" style={{
              display: 'inline-block',
              letterSpacing: '0.28em',
              marginBottom: '20px',
              color: '#8b8b92'
            }}>
              {currentSlide.category}
            </span>

            <h1 className="serif-display" style={{
              fontSize: 'clamp(52px, 5.8vw, 84px)',
              lineHeight: 1.04,
              marginBottom: '24px',
              fontWeight: 600,
              color: '#141416'
            }}>
              {currentSlide.titlePrefix}{' '}
              <span style={{ color: 'var(--color-accent)' }}>
                {currentSlide.titleAccent}
              </span>
            </h1>

            <p className="serif-italic" style={{
              fontSize: 'clamp(17px, 1.8vw, 22px)',
              color: '#4a4a50',
              lineHeight: 1.5,
              marginBottom: '38px',
              maxWidth: '460px'
            }}>
              {currentSlide.subtitle}
            </p>

            <div>
              <button 
                onClick={() => navigate('/about')}
                className="btn-borgholm-light"
                style={{
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <span>{currentSlide.buttonText}</span>
                <span style={{ fontSize: '15px' }}>──→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Shot & Slide Nav */}
          <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '440px', display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '100%',
              height: '480px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.titlePrefix}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              {/* Studio caption badge */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                backgroundColor: 'rgba(20, 20, 22, 0.82)',
                backdropFilter: 'blur(6px)',
                color: '#ffffff',
                padding: '6px 14px',
                fontSize: '11px',
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase'
              }}>
                {currentSlide.imageCaption}
              </div>
            </div>

            {/* Slider Dash Indicators (Bottom Right of Hero, matching Image 1) */}
            <div style={{
              position: 'absolute',
              bottom: '-34px',
              right: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              zIndex: 10
            }}>
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  title={`Slide ${idx + 1}`}
                  style={{
                    width: currentSlideIndex === idx ? '42px' : '26px',
                    height: '2.5px',
                    backgroundColor: currentSlideIndex === idx ? '#141416' : '#c8c8cf',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED 3 CARDS SECTION (Exact match to Model Image 1)
          Left vermilion vertical accent line, category, bold title, excerpt, link
          ========================================================= */}
      <section style={{
        padding: '40px 80px 90px 100px',
        backgroundColor: '#ffffff'
      }} className="featured-cards-section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px'
        }} className="featured-cards-grid">
          {FEATURED_ARTICLES_IMAGE1.map((card) => (
            <div
              key={card.id}
              style={{
                position: 'relative',
                paddingLeft: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px'
              }}
            >
              {/* Signature Red Left Border Line from Image 1 */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '2.5px',
                backgroundColor: 'var(--color-accent)'
              }} />

              <div>
                <span className="sans-meta" style={{
                  color: '#909098',
                  fontSize: '10.5px',
                  display: 'block',
                  marginBottom: '10px'
                }}>
                  {card.tag}
                </span>

                <h3 className="serif-display" style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: '#141416',
                  marginBottom: '14px'
                }}>
                  {card.title}
                </h3>

                <p style={{
                  fontSize: '13.5px',
                  color: '#606067',
                  lineHeight: 1.65,
                  marginBottom: '20px'
                }}>
                  {card.description}
                </p>
              </div>

              <div>
                <button
                  onClick={() => navigate('/blog')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#141416',
                    padding: 0
                  }}
                >
                  <span>{card.linkText}</span>
                  <span style={{ fontSize: '13px' }}>──→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          AGENCY SHOWCASE TEASER (Banner linking to Model 2 Showcase)
          ========================================================= */}
      <section style={{
        padding: '50px 80px',
        backgroundColor: '#faf9f6',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px'
      }} className="showcase-teaser-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-accent-soft)',
            color: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Monitor size={24} />
          </div>
          <div>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>MODEL 2 SHOWCASE READY</span>
            <h4 style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '20px', fontWeight: 600 }}>
              Discover the "Your stunning digital| website" Showcase Page
            </h4>
          </div>
        </div>

        <button
          onClick={() => navigate('/starting')}
          className="btn-borgholm-accent"
        >
          <span>VIEW STARTING PAGE MODEL</span>
          <ArrowRight size={14} />
        </button>
      </section>

      {/* =========================================================
          AGENCY SERVICES & CAPABILITIES
          ========================================================= */}
      <section style={{
        padding: '90px 80px 90px 100px',
        backgroundColor: '#ffffff'
      }} className="services-section">
        <div style={{ maxWidth: '1200px' }}>
          <div style={{ marginBottom: '50px' }}>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>STUDIO CAPABILITIES</span>
            <h2 className="serif-display" style={{ fontSize: '42px', marginTop: '8px' }}>
              Crafted with obsessive precision.
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 2fr',
            gap: '50px'
          }} className="services-grid">
            {/* Service selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {AGENCY_SERVICES.map((srv, index) => {
                const isActive = activeServiceTab === index;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setActiveServiceTab(index)}
                    style={{
                      padding: '20px 24px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      borderLeft: isActive ? '3px solid var(--color-accent)' : '3px solid transparent',
                      backgroundColor: isActive ? '#f8f8f9' : 'transparent',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: isActive ? 'var(--color-accent)' : '#aaa'
                      }}>
                        {srv.id}
                      </span>
                      <strong style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: isActive ? '#141416' : '#666'
                      }}>
                        {srv.title}
                      </strong>
                    </div>
                    <ChevronRight size={16} color={isActive ? 'var(--color-accent)' : '#ccc'} />
                  </div>
                );
              })}
            </div>

            {/* Service Detail Card */}
            <div style={{
              padding: '40px',
              backgroundColor: '#fafafa',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
                  DISCIPLINE {AGENCY_SERVICES[activeServiceTab].id}
                </span>
                <h3 className="serif-display" style={{ fontSize: '32px', marginTop: '12px', marginBottom: '16px' }}>
                  {AGENCY_SERVICES[activeServiceTab].title}
                </h3>
                <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.7, marginBottom: '28px' }}>
                  {AGENCY_SERVICES[activeServiceTab].description}
                </p>

                <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '24px' }}>
                  <span className="sans-meta" style={{ color: '#888', display: 'block', marginBottom: '14px' }}>
                    KEY DELIVERABLES
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {AGENCY_SERVICES[activeServiceTab].deliverables.map((deliv, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#333' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-accent-soft)',
                          color: 'var(--color-accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check size={11} />
                        </div>
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '36px' }}>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="btn-borgholm-outline"
                >
                  <span>INQUIRE ABOUT THIS DISCIPLINE</span>
                  <span>──→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          METRICS & IMPACT STATS
          ========================================================= */}
      <section style={{
        padding: '60px 80px 60px 100px',
        backgroundColor: '#141416',
        color: '#ffffff'
      }} className="metrics-section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px'
        }} className="metrics-grid">
          <div>
            <span style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '54px', fontWeight: 600, color: 'var(--color-accent)' }}>
              14+
            </span>
            <p className="sans-meta" style={{ color: '#ffffff', marginTop: '6px' }}>YEARS OF EXCELLENCE</p>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Founded in Stockholm, 2012</p>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '54px', fontWeight: 600, color: '#ffffff' }}>
              280+
            </span>
            <p className="sans-meta" style={{ color: '#ffffff', marginTop: '6px' }}>PROJECTS DELIVERED</p>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Spanning 24 countries worldwide</p>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '54px', fontWeight: 600, color: 'var(--color-accent)' }}>
              34
            </span>
            <p className="sans-meta" style={{ color: '#ffffff', marginTop: '6px' }}>DESIGN & CSS AWARDS</p>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Awwwards, FWA & Red Dot recognition</p>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '54px', fontWeight: 600, color: '#ffffff' }}>
              99.4%
            </span>
            <p className="sans-meta" style={{ color: '#ffffff', marginTop: '6px' }}>CLIENT SATISFACTION</p>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Long-term creative retainers</p>
          </div>
        </div>
      </section>

      {/* =========================================================
          SELECTED WORKS TEASER
          ========================================================= */}
      <section style={{
        padding: '90px 80px 90px 100px',
        backgroundColor: '#ffffff'
      }} className="works-teaser-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>SELECTED CASE STUDIES</span>
            <h2 className="serif-display" style={{ fontSize: '42px', marginTop: '8px' }}>
              Recent Studio Archives
            </h2>
          </div>
          <button
            onClick={() => navigate('/portfolio')}
            className="btn-borgholm-outline"
          >
            <span>VIEW ALL PORTFOLIO (6)</span>
            <span>──→</span>
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px'
        }} className="works-grid">
          {PORTFOLIO_PROJECTS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('/portfolio')}
              style={{
                cursor: 'pointer',
                borderRadius: '3px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '20px' }}>
                <span className="sans-meta" style={{ color: 'var(--color-accent)', fontSize: '10px' }}>
                  {item.category} • {item.year}
                </span>
                <h4 className="serif-display" style={{ fontSize: '20px', marginTop: '6px', color: '#141416' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: 1.5 }}>
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          CLIENT TESTIMONIAL
          ========================================================= */}
      <section style={{
        padding: '80px 80px 80px 100px',
        backgroundColor: '#faf9f6',
        borderTop: '1px solid var(--color-border)'
      }} className="testimonial-section">
        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
          <span className="sans-meta" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '16px' }}>
            CLIENT VOICES
          </span>
          <blockquote className="serif-italic" style={{
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            color: '#141416',
            lineHeight: 1.4,
            marginBottom: '28px'
          }}>
            "{CLIENT_TESTIMONIALS[testimonialIndex].quote}"
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <img
              src={CLIENT_TESTIMONIALS[testimonialIndex].avatar}
              alt=""
              style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '14px', color: '#141416' }}>
                {CLIENT_TESTIMONIALS[testimonialIndex].author}
              </strong>
              <span style={{ fontSize: '12px', color: '#777' }}>
                {CLIENT_TESTIMONIALS[testimonialIndex].title}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
            {CLIENT_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                style={{
                  width: testimonialIndex === i ? '24px' : '8px',
                  height: '4px',
                  backgroundColor: testimonialIndex === i ? 'var(--color-accent)' : '#d4d4d8',
                  borderRadius: '2px',
                  padding: 0
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-container,
          .featured-cards-section,
          .services-section,
          .metrics-section,
          .works-teaser-section,
          .testimonial-section {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .featured-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .metrics-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
          .works-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
