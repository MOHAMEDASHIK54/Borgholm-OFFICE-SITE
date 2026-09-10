import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS, BLOG_POSTS, SHOP_PRODUCTS } from '../data/contentData';
import { useApp } from '../context/useApp';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const filteredProjects = query.trim() 
    ? PORTFOLIO_PROJECTS.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredPosts = query.trim()
    ? BLOG_POSTS.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredProducts = query.trim()
    ? SHOP_PRODUCTS.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  const totalMatches = filteredProjects.length + filteredPosts.length + filteredProducts.length;

  const handleSelect = (to) => {
    navigate(to);
    setIsSearchOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(18, 18, 20, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 20px',
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '680px',
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        animation: 'slideInUp 0.25s ease'
      }}>
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '20px 28px',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <Search size={22} color="var(--color-accent)" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, articles, studio goods, typography..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-serif-heading)',
              fontSize: '20px',
              color: '#141416'
            }}
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            style={{ padding: '6px', borderRadius: '50%', color: '#888' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '20px 28px' }}>
          {query.trim() === '' ? (
            <div style={{ padding: '30px 0', textAlign: 'center', color: '#888' }}>
              <p style={{ fontSize: '13px' }}>Type to search through Borgholm cases, journal essays, and design products.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '14px' }}>
                {['Rider', 'Editorial', 'Typography', 'Branding', 'CSS Awards'].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => setQuery(keyword)}
                    style={{
                      fontSize: '11px',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      backgroundColor: '#f4f4f4',
                      color: '#444'
                    }}
                  >
                    #{keyword}
                  </button>
                ))}
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div style={{ padding: '30px 0', textAlign: 'center', color: '#888' }}>
              <p>No results found for "{query}".</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredProjects.length > 0 && (
                <div>
                  <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>WORKS ({filteredProjects.length})</span>
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredProjects.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => handleSelect('/portfolio')}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fafafa' }}
                      >
                        <div>
                          <strong style={{ fontSize: '15px' }}>{p.title}</strong>
                          <span style={{ fontSize: '12px', color: '#777', marginLeft: '12px' }}>{p.category}</span>
                        </div>
                        <ArrowRight size={14} color="#888" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredPosts.length > 0 && (
                <div>
                  <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>JOURNAL ARTICLES ({filteredPosts.length})</span>
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredPosts.map(b => (
                      <div 
                        key={b.id}
                        onClick={() => handleSelect('/blog')}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fafafa' }}
                      >
                        <div>
                          <strong style={{ fontSize: '15px' }}>{b.title}</strong>
                          <span style={{ fontSize: '12px', color: '#777', marginLeft: '12px' }}>{b.category}</span>
                        </div>
                        <ArrowRight size={14} color="#888" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredProducts.length > 0 && (
                <div>
                  <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>STUDIO SHOP ({filteredProducts.length})</span>
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredProducts.map(s => (
                      <div 
                        key={s.id}
                        onClick={() => handleSelect('/shop')}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fafafa' }}
                      >
                        <div>
                          <strong style={{ fontSize: '15px' }}>{s.name}</strong>
                          <span style={{ fontSize: '12px', color: 'var(--color-accent)', marginLeft: '12px' }}>${s.price}</span>
                        </div>
                        <ArrowRight size={14} color="#888" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
