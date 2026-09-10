import { useState, useEffect } from 'react';
import { RefreshCw, Database, Mail, Users, ShoppingBag, Send, CheckCircle } from 'lucide-react';
import { getInquiries, getAllUsers, getSubscribers, getAllOrders } from '../services/api';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [inqData, userData, subData, ordData] = await Promise.all([
        getInquiries().catch(() => []),
        getAllUsers().catch(() => []),
        getSubscribers().catch(() => []),
        getAllOrders().catch(() => [])
      ]);
      setInquiries(Array.isArray(inqData) ? inqData : []);
      setUsers(Array.isArray(userData) ? userData : []);
      setSubscribers(Array.isArray(subData) ? subData : []);
      setOrders(Array.isArray(ordData) ? ordData : []);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to load database view:', err);
      setError('Could not connect to PostgreSQL backend. Ensure server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    Promise.all([
      getInquiries().catch(() => []),
      getAllUsers().catch(() => []),
      getSubscribers().catch(() => []),
      getAllOrders().catch(() => [])
    ]).then(([inqData, userData, subData, ordData]) => {
      if (!active) return;
      setInquiries(Array.isArray(inqData) ? inqData : []);
      setUsers(Array.isArray(userData) ? userData : []);
      setSubscribers(Array.isArray(subData) ? subData : []);
      setOrders(Array.isArray(ordData) ? ordData : []);
      setLoading(false);
      setLastRefreshed(new Date().toLocaleTimeString());
    }).catch(err => {
      if (!active) return;
      console.error('Failed to load database view:', err);
      setError('Could not connect to PostgreSQL backend. Ensure server is running on port 5000.');
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div style={{
      padding: '60px 80px 100px 100px',
      maxWidth: '1300px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 160px)'
    }}>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: '28px',
        borderBottom: '1px solid var(--color-border)',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Database size={16} color="var(--color-accent)" />
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
              LIVE POSTGRESQL 18 DATABASE VIEWER
            </span>
          </div>
          <h1 className="serif-display" style={{ fontSize: '38px', letterSpacing: '-0.02em', margin: 0 }}>
            Database Inspector.
          </h1>
          <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
            Direct live synchronization with PostgreSQL (<code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>borgholm_db</code>)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '11px', color: '#888' }}>
            Updated: {lastRefreshed}
          </span>
          <button
            onClick={fetchAllData}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              border: '1px solid var(--color-accent)',
              background: '#fff',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            {loading ? 'REFRESHING...' : 'REFRESH DATABASE'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          padding: '16px 20px',
          background: '#fff5f5',
          border: '1px solid #ffd0d0',
          color: 'var(--color-accent)',
          fontSize: '13px',
          margin: '24px 0'
        }}>
          ?? {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '30px',
        borderBottom: '1px solid var(--color-border)',
        marginTop: '30px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'inquiries', label: 'Say Hello Inquiries', count: inquiries.length, icon: Send },
          { id: 'users', label: 'Registered Users', count: users.length, icon: Users },
          { id: 'subscribers', label: 'Gazette Subscribers', count: subscribers.length, icon: Mail },
          { id: 'orders', label: 'Shop Orders', count: orders.length, icon: ShoppingBag }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 4px',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                color: isActive ? 'var(--color-dark)' : '#888',
                fontWeight: isActive ? 600 : 400,
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={15} color={isActive ? 'var(--color-accent)' : '#888'} />
              <span>{tab.label}</span>
              <span style={{
                background: isActive ? 'var(--color-accent)' : '#eee',
                color: isActive ? '#fff' : '#555',
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '10px'
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Say Hello Inquiries */}
      {activeTab === 'inquiries' && (
        <div style={{ marginTop: '30px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '18px'
          }}>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
              Form submissions sent through the <strong>"Say Hello"</strong> contact drawer.
            </p>
            <span style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace' }}>
              TABLE: public.inquiries
            </span>
          </div>

          {inquiries.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', border: '1px dashed var(--color-border)', background: '#fafafa' }}>
              <p style={{ color: '#888', fontSize: '14px' }}>No inquiries submitted yet.</p>
              <p style={{ color: '#aaa', fontSize: '12px' }}>Open "Say Hello" on any page and submit a message to see it appear here live!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  style={{
                    border: '1px solid var(--color-border)',
                    borderLeft: '4px solid var(--color-accent)',
                    padding: '24px 28px',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h3 className="serif-display" style={{ fontSize: '20px', margin: 0 }}>{inq.name}</h3>
                        <span style={{
                          background: '#f3f3f3',
                          padding: '2px 8px',
                          fontSize: '11px',
                          borderRadius: '3px',
                          fontWeight: 600,
                          color: '#444'
                        }}>
                          {inq.service}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--color-accent)', margin: '4px 0 0', fontWeight: 500 }}>
                        {inq.email}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block',
                        background: '#eef8f2',
                        color: '#1e7e34',
                        padding: '3px 9px',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: '3px'
                      }}>
                        Budget: {inq.budget || 'Custom'}
                      </span>
                      <p style={{ fontSize: '11px', color: '#999', margin: '6px 0 0' }}>
                        {new Date(inq.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #f0f0f0',
                    fontSize: '14px',
                    color: '#444',
                    lineHeight: '1.6',
                    fontStyle: 'italic'
                  }}>
                    "{inq.message}"
                  </div>

                  <div style={{ marginTop: '12px', fontSize: '10px', color: '#bbb', fontFamily: 'monospace' }}>
                    UUID: {inq.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Users */}
      {activeTab === 'users' && (
        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
              Accounts created via the Login / Register screen and stored in PostgreSQL.
            </p>
            <span style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace' }}>
              TABLE: public.users
            </span>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#fafafa', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '14px 18px', fontWeight: 600, color: '#333' }}>Name</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600, color: '#333' }}>Email</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600, color: '#333' }}>Company</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600, color: '#333' }}>Role</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600, color: '#333' }}>Registered</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>{u.name}</td>
                    <td style={{ padding: '14px 18px', color: 'var(--color-accent)' }}>{u.email}</td>
                    <td style={{ padding: '14px 18px', color: '#666' }}>{u.company}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ background: '#f5f5f5', padding: '3px 8px', borderRadius: '3px', fontSize: '11px' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#999', fontSize: '12px' }}>
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Subscribers */}
      {activeTab === 'subscribers' && (
        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
              Newsletter subscriptions submitted from the website footer.
            </p>
            <span style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace' }}>
              TABLE: public.subscribers
            </span>
          </div>

          {subscribers.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', border: '1px dashed var(--color-border)', background: '#fafafa' }}>
              <p style={{ color: '#888', fontSize: '14px' }}>No newsletter subscribers yet.</p>
              <p style={{ color: '#aaa', fontSize: '12px' }}>Scroll to the footer on any page and submit your email!</p>
            </div>
          ) : (
            <div style={{ border: '1px solid var(--color-border)' }}>
              {subscribers.map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={16} color="#1e7e34" />
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{sub.email}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#999' }}>
                    {new Date(sub.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Orders */}
      {activeTab === 'orders' && (
        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
              Shop orders placed through the shopping cart.
            </p>
            <span style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace' }}>
              TABLE: public.orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', border: '1px dashed var(--color-border)', background: '#fafafa' }}>
              <p style={{ color: '#888', fontSize: '14px' }}>No orders placed yet.</p>
              <p style={{ color: '#aaa', fontSize: '12px' }}>Go to the Studio Shop, add an edition to cart, and click checkout to create an order!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  style={{
                    border: '1px solid var(--color-border)',
                    padding: '20px 24px',
                    background: '#fff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '15px' }}>
                        Customer: {ord.customer_email || 'Guest Client'}
                      </span>
                      <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0' }}>
                        Status: <span style={{ color: '#1e7e34', fontWeight: 600 }}>{ord.status}</span> • Total: <strong>${ord.total}</strong>
                      </p>
                    </div>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(ord.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
