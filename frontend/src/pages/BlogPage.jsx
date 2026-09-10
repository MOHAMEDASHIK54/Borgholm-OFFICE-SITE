import { useState } from 'react';
import { BLOG_POSTS } from '../data/contentData';
import { X, Clock, User, MessageCircle } from 'lucide-react';

export default function BlogPage({ selectedArticle, setSelectedArticle }) {
  const [activeArticle, setActiveArticle] = useState(selectedArticle || null);
  const [comments, setComments] = useState([
    { id: 1, name: 'Sven Lindgren', text: 'The depth of typographic precision in this study is phenomenal. Truly sets the bar.', date: '2 days ago' },
    { id: 2, name: 'Maria Rossi', text: 'Completely agree on modern operational discipline. Balancing creativity with timeline rigidity is crucial.', date: 'Yesterday' }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newCommentName && newCommentText) {
      setComments([
        ...comments,
        { id: Date.now(), name: newCommentName, text: newCommentText, date: 'Just now' }
      ]);
      setNewCommentName('');
      setNewCommentText('');
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* Blog Hero */}
      <section style={{
        padding: '70px 80px 40px 100px',
        backgroundColor: '#ffffff'
      }} className="blog-hero">
        <div style={{ maxWidth: '800px' }}>
          <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
            THE STUDIO GAZETTE
          </span>
          <h1 className="serif-display" style={{
            fontSize: 'clamp(44px, 5.2vw, 72px)',
            lineHeight: 1.05,
            marginTop: '16px',
            marginBottom: '20px'
          }}>
            Dispatches on Design, Craft & Code
          </h1>
          <p className="serif-italic" style={{
            fontSize: 'clamp(18px, 1.8vw, 22px)',
            color: '#555',
            lineHeight: 1.5
          }}>
            Curated perspectives from our partners on typography, brand strategy, engineering rigor, and studio culture.
          </p>
        </div>
      </section>

      {/* Featured Lead Story */}
      <section style={{
        padding: '0 80px 60px 100px',
        backgroundColor: '#ffffff'
      }} className="blog-featured-section">
        <div 
          onClick={() => setActiveArticle(BLOG_POSTS[0])}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            backgroundColor: '#faf9f6',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s ease'
          }}
          className="featured-post-grid"
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
          <div style={{ height: '420px', overflow: 'hidden' }}>
            <img
              src={BLOG_POSTS[0].image}
              alt={BLOG_POSTS[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ padding: '40px 40px 40px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
                {BLOG_POSTS[0].category}
              </span>
              <span style={{ color: '#ccc' }}>•</span>
              <span style={{ fontSize: '11px', color: '#888' }}>{BLOG_POSTS[0].date}</span>
            </div>

            <h2 className="serif-display" style={{ fontSize: '36px', lineHeight: 1.2, color: '#141416' }}>
              {BLOG_POSTS[0].title}
            </h2>

            <p style={{ fontSize: '14px', color: '#555', marginTop: '16px', lineHeight: 1.65 }}>
              {BLOG_POSTS[0].excerpt}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#777' }}>
                <Clock size={14} />
                <span>{BLOG_POSTS[0].readTime}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#777' }}>
                <User size={14} />
                <span>{BLOG_POSTS[0].author}</span>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                READ COMPLETE DISPATCH ──→
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Other Articles */}
      <section style={{
        padding: '0 80px 100px 100px',
        backgroundColor: '#ffffff'
      }} className="blog-grid-section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px'
        }} className="blog-cards-grid">
          {BLOG_POSTS.slice(1).map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveArticle(post)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '30px'
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', borderRadius: '3px', marginBottom: '18px' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="sans-meta" style={{ color: 'var(--color-accent)', fontSize: '10px' }}>
                  {post.category}
                </span>
                <span style={{ color: '#ccc' }}>•</span>
                <span style={{ fontSize: '11px', color: '#888' }}>{post.date}</span>
              </div>

              <h3 className="serif-display" style={{ fontSize: '22px', lineHeight: 1.25, color: '#141416' }}>
                {post.title}
              </h3>

              <p style={{ fontSize: '13px', color: '#666', marginTop: '10px', lineHeight: 1.6 }}>
                {post.excerpt}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '11px', color: '#888' }}>
                <span>{post.readTime}</span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>READ ARTICLE ──→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
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
            maxWidth: '780px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '4px',
            boxShadow: 'var(--shadow-lg)',
            padding: '40px',
            animation: 'slideInUp 0.3s ease',
            position: 'relative'
          }}>
            <button
              onClick={() => {
                setActiveArticle(null);
                if (setSelectedArticle) setSelectedArticle(null);
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '50%',
                padding: '8px'
              }}
            >
              <X size={20} />
            </button>

            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
              {activeArticle.category || activeArticle.tag} • {activeArticle.date}
            </span>

            <h1 className="serif-display" style={{ fontSize: '38px', lineHeight: 1.15, marginTop: '12px' }}>
              {activeArticle.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '20px 0 24px', fontSize: '12px', color: '#777', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
              <span>By {activeArticle.author || 'Studio Editor'}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>

            {activeArticle.image && (
              <img
                src={activeArticle.image}
                alt=""
                style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '3px', marginBottom: '28px' }}
              />
            )}

            <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#333' }}>
              <p className="serif-italic" style={{ fontSize: '20px', color: '#111', marginBottom: '24px' }}>
                "{activeArticle.excerpt || activeArticle.description}"
              </p>
              <p style={{ marginBottom: '20px' }}>
                {activeArticle.content || "When shaping human perception through interactive systems, our agency adheres to the principle that visual economy generates psychological trust. Every line of typographic spacing, every contrast ratio, and every subtle hover state must participate in an overarching aesthetic harmony."}
              </p>
              <p>
                As digital interfaces expand into spatial computing and ambient computing platforms, the fundamental imperatives of graphic clarity remain immutable. By honoring classical Swiss grid structures while embracing contemporary reactive component architectures, we build systems that endure far beyond the temporal horizon of current design trends.
              </p>
            </div>

            {/* Comments Section */}
            <div style={{ marginTop: '40px', borderTop: '1px solid var(--color-border)', paddingTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <MessageCircle size={18} color="var(--color-accent)" />
                <h4 style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '20px' }}>
                  Discussion & Remarks ({comments.length})
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                {comments.map((c) => (
                  <div key={c.id} style={{ backgroundColor: '#fafafa', padding: '14px 18px', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <strong style={{ color: '#141416' }}>{c.name}</strong>
                      <span style={{ color: '#999' }}>{c.date}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#555' }}>{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Add comment */}
              <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  required
                  placeholder="Your Name / Studio"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    border: '1px solid #d4d4d8',
                    borderRadius: '3px',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
                <textarea
                  rows={2}
                  required
                  placeholder="Contribute to this discussion..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    border: '1px solid #d4d4d8',
                    borderRadius: '3px',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn-borgholm-accent"
                  style={{ alignSelf: 'flex-start', padding: '10px 20px', fontSize: '11px' }}
                >
                  POST COMMENT
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .blog-hero, .blog-featured-section, .blog-grid-section {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .featured-post-grid {
            grid-template-columns: 1fr !important;
          }
          .blog-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
