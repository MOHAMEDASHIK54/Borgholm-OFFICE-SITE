import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { useApp } from '../context/useApp';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const {
    currentUser,
    logout,
    totalCartCount,
    setIsCartOpen,
    setIsMegaMenuOpen
  } = useApp();

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/starting', label: 'STARTING SHOWCASE' },
    { to: '/about', label: 'PAGES' },
    { to: '/blog', label: 'BLOG' },
    { to: '/portfolio', label: 'PORTFOLIO' },
    { to: '/shop', label: 'SHOP' },
    { to: '/admin', label: 'DATABASE' }
  ];

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 32px 0 40px',
        height: '76px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left: Brand Logo */}
        <Link 
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            userSelect: 'none'
          }}
        >
          {/* Spiral Whirl Icon */}
          <div style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#141416" strokeWidth="2.2" />
              <path 
                d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C20.5 26 24 22.5 24 18C24 14.5 21 12 17.5 12C14.5 12 12.5 14 12.5 16.5C12.5 18.5 14 20 16 20C17.5 20 18.5 19 18.5 18" 
                stroke="#141416" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          <span style={{
            fontFamily: "var(--font-serif-heading)",
            fontSize: '25px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#141416'
          }}>
            Borgholm
          </span>
        </Link>

        {/* Center / Right: Desktop Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          marginRight: '80px' // Space for top-right corner red button
        }} className="desktop-nav">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isActive ? '#141416' : '#68686d',
                textDecoration: 'none',
                padding: '6px 0',
                position: 'relative'
              })}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)',
                      display: 'inline-block'
                    }} />
                  )}
                  {item.label}
                </>
              )}
            </NavLink>
          ))}

          {/* User Auth or Profile Button */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#141416',
                  background: 'rgba(0,0,0,0.04)',
                  padding: '7px 14px',
                  borderRadius: '20px'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  {currentUser.name.charAt(0)}
                </div>
                <span>{currentUser.name.split(' ')[0]}</span>
              </button>

              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  backgroundColor: '#ffffff',
                  boxShadow: 'var(--shadow-lg)',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                  minWidth: '180px',
                  padding: '8px 0',
                  zIndex: 200,
                  animation: 'slideInUp 0.2s ease'
                }}>
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#141416' }}>{currentUser.name}</p>
                    <p style={{ fontSize: '11px', color: '#888' }}>{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setUserMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#333'
                    }}
                  >
                    <User size={14} />
                    Client Portal
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                      navigate('/');
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--color-accent)'
                    }}
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#141416',
                border: '1px solid rgba(0,0,0,0.12)',
                padding: '6px 14px',
                borderRadius: '3px',
                textDecoration: 'none'
              }}
            >
              <User size={13} />
              LOGIN
            </Link>
          )}

          {/* Quick Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            title="View Cart"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '6px',
              color: '#141416'
            }}
          >
            <ShoppingBag size={18} />
            {totalCartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '0px',
                right: '-4px',
                backgroundColor: 'var(--color-accent)',
                color: '#ffffff',
                fontSize: '9px',
                fontWeight: 700,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {totalCartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile menu button */}
        <div style={{ display: 'none' }} className="mobile-toggle-btn">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ padding: '8px', color: '#141416' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Top Right Corner Quarter-Circle Hamburger Button (from Image 1) */}
      <div 
        className="corner-menu-toggle"
        onClick={() => setIsMegaMenuOpen(true)}
        title="Open Agency Directory & Menu"
      >
        <div className="burger-lines">
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '76px',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--color-border)',
          padding: '24px 32px',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#141416',
                textDecoration: 'none',
                letterSpacing: '0.1em'
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to={currentUser ? '/dashboard' : '/login'}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--color-accent)',
              textDecoration: 'none',
              borderTop: '1px solid #f0f0f0',
              paddingTop: '12px'
            }}
          >
            {currentUser ? `PROFILE (${currentUser.name})` : 'LOGIN / REGISTER'}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
            margin-right: 70px;
          }
        }
      `}</style>
    </>
  );
}
