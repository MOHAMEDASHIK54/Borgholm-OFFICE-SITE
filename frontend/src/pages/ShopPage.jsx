import { useState } from 'react';
import { SHOP_PRODUCTS } from '../data/contentData';
import { ShoppingBag, Check, Star } from 'lucide-react';
import { useApp } from '../context/useApp';

export default function ShopPage() {
  const { addToCart, setIsCartOpen } = useApp();
  const [filter, setFilter] = useState('All');
  const [addedItem, setAddedItem] = useState(null);

  const categories = ['All', 'Print & Books', 'Digital Assets', 'Artwork', 'Typography', 'Office Goods'];

  const filtered = filter === 'All'
    ? SHOP_PRODUCTS
    : SHOP_PRODUCTS.filter(p => p.category === filter);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedItem(product.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* Header */}
      <section style={{
        padding: '70px 80px 40px 100px',
        backgroundColor: '#ffffff'
      }} className="shop-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '800px' }}>
            <span className="sans-meta" style={{ color: 'var(--color-accent)' }}>
              BORGHOLM EDITIONS & GOODS
            </span>
            <h1 className="serif-display" style={{
              fontSize: 'clamp(44px, 5.2vw, 72px)',
              lineHeight: 1.05,
              marginTop: '16px',
              marginBottom: '20px'
            }}>
              Curated Physical & Digital Objects
            </h1>
            <p className="serif-italic" style={{
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              color: '#555',
              lineHeight: 1.5
            }}>
              Linen monographs, silk-screen posters, typeface licenses, and professional design systems crafted in Stockholm.
            </p>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-borgholm-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShoppingBag size={16} />
            <span>VIEW CART</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
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
                padding: '8px 16px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: '30px',
                backgroundColor: filter === cat ? '#141416' : '#f4f4f4',
                color: filter === cat ? '#ffffff' : '#444',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section style={{
        padding: '30px 80px 100px 100px',
        backgroundColor: '#ffffff'
      }} className="shop-grid-section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px'
        }} className="shop-grid">
          {filtered.map((product) => {
            const isAdded = addedItem === product.id;
            return (
              <div
                key={product.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(20,20,22,0.85)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  zIndex: 2
                }}>
                  {product.badge}
                </div>

                <div style={{ height: '300px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                  <img
                    src={product.image}
                    alt={product.name}
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

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="sans-meta" style={{ color: 'var(--color-accent)', fontSize: '10px' }}>
                        {product.category}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#666' }}>
                        <Star size={12} fill="#ff9900" color="#ff9900" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="serif-display" style={{ fontSize: '20px', lineHeight: 1.25, color: '#141416' }}>
                      {product.name}
                    </h3>

                    <p style={{ fontSize: '12.5px', color: '#666', marginTop: '8px', lineHeight: 1.5 }}>
                      {product.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#888', display: 'block' }}>PRICE</span>
                      <strong style={{ fontSize: '20px', color: '#141416' }}>
                        ${product.price}.00
                      </strong>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: isAdded ? '#16a34a' : 'var(--color-accent)',
                        color: '#ffffff',
                        padding: '10px 18px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      {isAdded ? (
                        <>
                          <Check size={14} />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          <span>ADD TO BAG</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 1024px) {
          .shop-header, .shop-grid-section {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .shop-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .shop-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
