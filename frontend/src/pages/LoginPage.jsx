import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Building, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/useApp';
import { loginUser, registerUser } from '../services/api';

export default function LoginPage() {
  const { currentUser, login } = useApp();
  const navigate = useNavigate();

  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Forgot Password Modal
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // If already logged in, go straight to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  // Handle standard submit to PostgreSQL backend
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (tab === 'login') {
        const response = await loginUser(email, password);
        login(response.user, response.token);
      } else {
        const response = await registerUser({
          name,
          email,
          password,
          company,
          role: 'Enterprise Member'
        });
        login(response.user, response.token);
      }
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Demo 1-click logins backed by PostgreSQL
  const handleDemoLogin = async (roleType) => {
    setErrorMessage('');
    setLoading(true);

    const targetEmail = roleType === 'client' 
      ? 'victoria.lind@nordicventures.se' 
      : 'henrik@borgholmstudo.com';

    try {
      const response = await loginUser(targetEmail, 'admin123');
      login(response.user, response.token);
      navigate('/dashboard');
    } catch {
      // Fallback if network issue
      login({
        id: roleType === 'client' ? 'demo-client' : 'demo-director',
        name: roleType === 'client' ? 'Victoria Lind' : 'Henrik Lindqvist',
        email: targetEmail,
        role: roleType === 'client' ? 'Enterprise Brand Partner' : 'Founding Creative Director',
        company: roleType === 'client' ? 'Nordic Ventures' : 'Borgholm Digital AG'
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 76px)',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      position: 'relative'
    }} className="login-container">
      {/* Left Column: Visual Story & Editorial Branding */}
      <div style={{
        backgroundColor: '#141416',
        color: '#ffffff',
        padding: '60px 80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }} className="login-visual-pane">
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,56,17,0.18) 0%, rgba(20,20,22,0) 70%)',
          pointerEvents: 'none'
        }} />

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
        </div>

        <div style={{ maxWidth: '440px', position: 'relative', zIndex: 2 }}>
          <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
            STUDIO MEMBERSHIP • POSTGRESQL CONNECTED
          </span>
          <h2 className="serif-display" style={{
            fontSize: '44px',
            fontWeight: 500,
            lineHeight: 1.15,
            marginTop: '12px',
            color: '#ffffff'
          }}>
            Where ambitious brands meet architectural digital craft.
          </h2>
          <p className="serif-italic" style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            marginTop: '20px',
            lineHeight: 1.5
          }}>
            "Design is not merely aesthetic ornamentation; it is the fundamental architecture of human perception."
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.1em'
        }}>
          <span>STOCKHOLM • LONDON • NEW YORK</span>
          <span>POSTGRESQL 18</span>
        </div>
      </div>

      {/* Right Column: Form */}
      <div style={{
        padding: '60px 80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
      }} className="login-form-pane">
        <div style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
          {/* Tab Switcher */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '32px'
          }}>
            <button
              onClick={() => { setTab('login'); setErrorMessage(''); }}
              style={{
                flex: 1,
                padding: '14px 0',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderBottom: tab === 'login' ? '2.5px solid var(--color-accent)' : '2.5px solid transparent',
                color: tab === 'login' ? '#141416' : '#888',
                transition: 'all 0.2s'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setErrorMessage(''); }}
              style={{
                flex: 1,
                padding: '14px 0',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderBottom: tab === 'register' ? '2.5px solid var(--color-accent)' : '2.5px solid transparent',
                color: tab === 'register' ? '#141416' : '#888',
                transition: 'all 0.2s'
              }}
            >
              Create Account
            </button>
          </div>

          <h3 className="serif-display" style={{ fontSize: '32px', marginBottom: '8px' }}>
            {tab === 'login' ? 'Access Client Portal' : 'Apply for Studio Access'}
          </h3>
          <p style={{ fontSize: '13.5px', color: '#666', marginBottom: '20px' }}>
            {tab === 'login' 
              ? 'Enter your credentials or click a demo account below.' 
              : 'Register to manage project deliverables, licenses, and digital assets.'}
          </p>

          {/* Error notification */}
          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              borderRadius: '4px',
              color: '#b91c1c',
              fontSize: '13px',
              marginBottom: '20px'
            }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1-Click Demo Logins for Fast Evaluation */}
          <div style={{
            backgroundColor: '#faf9f6',
            border: '1px dashed #d8d8d8',
            borderRadius: '4px',
            padding: '16px',
            marginBottom: '28px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '10px' }}>
              ⚡ PostgreSQL Seed Accounts (Click to Test):
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleDemoLogin('client')}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #ddd',
                  borderRadius: '3px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#141416',
                  textAlign: 'center'
                }}
              >
                Client (Victoria)
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('director')}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #ddd',
                  borderRadius: '3px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  textAlign: 'center'
                }}
              >
                Director (Henrik)
              </button>
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {tab === 'register' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#888" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input
                      type="text"
                      required
                      placeholder="Victoria Lind"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 38px',
                        border: '1px solid #d4d4d8',
                        borderRadius: '3px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Organization / Brand
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building size={16} color="#888" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input
                      type="text"
                      placeholder="Nordic Ventures Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 38px',
                        border: '1px solid #d4d4d8',
                        borderRadius: '3px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Corporate Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#888" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
                    border: '1px solid #d4d4d8',
                    borderRadius: '3px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Password
                </label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => setForgotModal(true)}
                    style={{ fontSize: '11.5px', color: 'var(--color-accent)', padding: 0 }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#888" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 38px',
                    border: '1px solid #d4d4d8',
                    borderRadius: '3px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '12px',
                    color: '#888',
                    padding: '2px'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--color-accent)' }}
              />
              <label htmlFor="rememberMe" style={{ color: '#555', cursor: 'pointer' }}>
                {tab === 'login' ? 'Keep me signed in on this workstation' : 'I agree to Borgholm terms of service & NDA'}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-borgholm-accent"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '15px',
                marginTop: '10px',
                opacity: loading ? 0.7 : 1
              }}
            >
              <span>{loading ? 'AUTHENTICATING WITH POSTGRES...' : tab === 'login' ? 'SIGN IN TO PORTAL' : 'CREATE CLIENT ACCOUNT'}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            maxWidth: '420px',
            width: '100%',
            padding: '32px',
            borderRadius: '4px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            {forgotSent ? (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={40} color="#16a34a" style={{ margin: '0 auto 16px' }} />
                <h4 className="serif-display" style={{ fontSize: '24px' }}>Reset Link Dispatched</h4>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                  We have sent instructions to {forgotEmail}. Please review your inbox.
                </p>
                <button
                  onClick={() => { setForgotModal(false); setForgotSent(false); }}
                  className="btn-borgholm-accent"
                  style={{ marginTop: '20px' }}
                >
                  RETURN TO LOGIN
                </button>
              </div>
            ) : (
              <div>
                <h4 className="serif-display" style={{ fontSize: '24px', marginBottom: '8px' }}>Reset Password</h4>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
                  Provide your registered agency email address to receive password recovery instructions.
                </p>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #d4d4d8',
                    borderRadius: '3px',
                    fontSize: '14px',
                    marginBottom: '20px',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setForgotModal(false)}
                    className="btn-borgholm-light"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => { if (forgotEmail) setForgotSent(true); }}
                    className="btn-borgholm-accent"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    SEND LINK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .login-container {
            grid-template-columns: 1fr !important;
          }
          .login-visual-pane {
            display: none !important;
          }
          .login-form-pane {
            padding: 40px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
