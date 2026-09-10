import { useNavigate } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';
import { useApp } from '../context/useApp';

export default function DashboardPage() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  // If not logged in, redirect to login
  if (!currentUser) {
    return (
      <div style={{
        padding: '100px 40px',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2 className="serif-display" style={{ fontSize: '32px' }}>Authentication Required</h2>
        <p style={{ color: '#666', margin: '14px 0 24px', fontSize: '14px' }}>
          Please sign in with your agency credentials to access the client portal.
        </p>
        <button onClick={() => navigate('/login')} className="btn-borgholm-accent">
          GO TO SIGN IN
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '60px 80px 100px 100px',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 160px)'
    }} className="dashboard-container">
      {/* User Welcome Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '30px',
        borderBottom: '1px solid var(--color-border)',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
            BORGHOLM CLIENT PORTAL
          </span>
          <h1 className="serif-display" style={{ fontSize: '38px', marginTop: '6px' }}>
            Welcome back, {currentUser.name}
          </h1>
          <p style={{ fontSize: '13px', color: '#666' }}>
            {currentUser.role} • {currentUser.company} ({currentUser.email})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/shop')}
            className="btn-borgholm-light"
          >
            STUDIO SHOP
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="btn-borgholm-outline"
            style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
          >
            SIGN OUT
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '40px',
        marginTop: '40px'
      }} className="dashboard-grid">
        {/* Active Projects */}
        <div>
          <h3 className="serif-display" style={{ fontSize: '24px', marginBottom: '20px' }}>
            Active Client Retainers & Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              padding: '24px',
              backgroundColor: '#fafafa',
              border: '1px solid var(--color-border)',
              borderLeft: '4px solid var(--color-accent)',
              borderRadius: '3px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="sans-meta" style={{ color: 'var(--color-accent)', fontSize: '10px' }}>
                    IN PROGRESS • MILESTONE 3 OF 4
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '20px', marginTop: '4px' }}>
                    Rider 3D Configurator & Design System
                  </h4>
                  <p style={{ fontSize: '13px', color: '#666', marginTop: '6px' }}>
                    Interactive WebGL bicycle customizer with real-time frame geometry rendering.
                  </p>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255, 56, 17, 0.1)',
                  color: 'var(--color-accent)'
                }}>
                  85% Completed
                </span>
              </div>
              <div style={{
                height: '4px',
                backgroundColor: '#e5e5e5',
                borderRadius: '2px',
                marginTop: '16px',
                overflow: 'hidden'
              }}>
                <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--color-accent)' }} />
              </div>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: '#fafafa',
              border: '1px solid var(--color-border)',
              borderLeft: '4px solid #16a34a',
              borderRadius: '3px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="sans-meta" style={{ color: '#16a34a', fontSize: '10px' }}>
                    COMPLETED & DELIVERED
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '20px', marginTop: '4px' }}>
                    Zam Nungrey Editorial Monograph (Print Run)
                  </h4>
                  <p style={{ fontSize: '13px', color: '#666', marginTop: '6px' }}>
                    240-page clothbound typography volume with custom slipcase.
                  </p>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#16a34a'
                }}>
                  Archived
                </span>
              </div>
            </div>
          </div>

          {/* Invoices */}
          <h3 className="serif-display" style={{ fontSize: '24px', margin: '40px 0 20px' }}>
            Statements & Invoices
          </h3>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '3px', overflow: 'hidden' }}>
            {[
              { id: 'INV-2025-089', date: 'FEB 12, 2026', amount: '$14,500.00', status: 'PAID' },
              { id: 'INV-2025-072', date: 'JAN 15, 2026', amount: '$22,000.00', status: 'PAID' },
              { id: 'INV-2025-045', date: 'DEC 01, 2025', amount: '$8,500.00', status: 'PAID' }
            ].map((inv) => (
              <div 
                key={inv.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: '13px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={16} color="#888" />
                  <strong>{inv.id}</strong>
                  <span style={{ color: '#888' }}>({inv.date})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <strong>{inv.amount}</strong>
                  <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '11px' }}>{inv.status}</span>
                  <button style={{ color: '#888', padding: '4px' }} title="Download Invoice">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Downloads & Studio Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            padding: '28px',
            backgroundColor: '#141416',
            color: '#ffffff',
            borderRadius: '4px'
          }}>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
              CLIENT DOWNLOADS
            </span>
            <h4 className="serif-display" style={{ fontSize: '20px', marginTop: '8px' }}>
              Licensed Assets
            </h4>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
              Instant access to your studio deliverable files.
            </p>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '3px'
              }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px' }}>Borgholm_Serif_v2.zip</strong>
                  <span style={{ fontSize: '11px', color: '#888' }}>OTF, WOFF2 (14.2 MB)</span>
                </div>
                <Download size={16} color="var(--color-accent)" style={{ cursor: 'pointer' }} />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '3px'
              }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px' }}>Design_Tokens_Figma.fig</strong>
                  <span style={{ fontSize: '11px', color: '#888' }}>Figma Library (48.6 MB)</span>
                </div>
                <Download size={16} color="var(--color-accent)" style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          <div style={{
            padding: '28px',
            backgroundColor: '#fafafa',
            border: '1px solid var(--color-border)',
            borderRadius: '4px'
          }}>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>DEDICATED PRODUCER</span>
            <h4 style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '18px', marginTop: '6px' }}>
              Astrid Bergström
            </h4>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              Head of Interactive Delivery
            </p>
            <p style={{ fontSize: '12px', color: '#555', marginTop: '12px' }}>
              Direct: astrid@borgholmstudo.com
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .dashboard-container {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
