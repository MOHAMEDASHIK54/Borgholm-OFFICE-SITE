import { MessageSquare, Search, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/useApp';

export default function VerticalBorders() {
  const {
    setIsContactOpen,
    setIsCartOpen,
    setIsSearchOpen,
    totalCartCount
  } = useApp();

  return (
    <>
      {/* Left Vertical Rail */}
      <aside className="sidebar-vertical-left">
        {/* Rotated "Say Hello" with speech icon */}
        <button 
          className="say-hello-vertical-btn"
          onClick={() => setIsContactOpen(true)}
          title="Send a message to our Stockholm studio"
        >
          <MessageSquare size={15} style={{ transform: 'rotate(90deg)' }} />
          <span>Say Hello</span>
        </button>

        {/* Rotated Copyright text */}
        <div className="copyright-vertical">
          © 2026 BORGHOLM STUDIO
        </div>
      </aside>

      {/* Right Vertical Rail (Social Icons from Image 1) */}
      <aside className="sidebar-vertical-right">
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noreferrer" 
          className="sidebar-social-link"
          title="Facebook"
        >
          f
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noreferrer" 
          className="sidebar-social-link"
          title="X (Twitter)"
        >
          𝕏
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noreferrer" 
          className="sidebar-social-link"
          title="LinkedIn"
        >
          in
        </a>
      </aside>

      {/* Floating Action Buttons (from Image 2) */}
      <div className="floating-quick-tools">
        <button 
          className="quick-tool-btn"
          onClick={() => setIsSearchOpen(true)}
          title="Search studio portfolio & articles"
        >
          <Search size={18} />
        </button>

        <button 
          className="quick-tool-btn"
          onClick={() => setIsCartOpen(true)}
          title="View cart"
        >
          <ShoppingBag size={18} />
          {totalCartCount > 0 && (
            <span className="quick-badge-count">{totalCartCount}</span>
          )}
        </button>
      </div>
    </>
  );
}
