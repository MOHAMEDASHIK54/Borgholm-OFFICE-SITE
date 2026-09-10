import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VerticalBorders from '../components/VerticalBorders';
import MegaMenu from '../components/MegaMenu';
import ContactDrawer from '../components/ContactDrawer';
import CartDrawer from '../components/CartDrawer';
import SearchModal from '../components/SearchModal';

export default function Layout() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background Architectural Grid Lines */}
      <div className="architectural-grid" aria-hidden="true">
        <div className="grid-col-line" />
        <div className="grid-col-line" />
        <div className="grid-col-line" />
        <div className="grid-col-line" />
        <div className="grid-col-line" />
      </div>

      {/* Header */}
      <Header />

      {/* Left and Right Vertical Margin Rails */}
      <VerticalBorders />

      {/* Main Page Content (Injected by React Router) */}
      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Slide-out Drawers & Modals */}
      <MegaMenu />
      <ContactDrawer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
