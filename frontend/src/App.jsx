import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './layouts/Layout';

// Pages (Each in its own separate file)
import MainPage from './pages/MainPage';
import StartingPage from './pages/StartingPage';
import PagesAbout from './pages/PagesAbout';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Layout containing Header, Footer, and Vertical Rails */}
          <Route path="/" element={<Layout />}>
            {/* 1. Main Page (Exact match to Model Image 1) */}
            <Route index element={<MainPage />} />

            {/* 2. Starting Showcase Page (Exact match to Model Image 2) */}
            <Route path="starting" element={<StartingPage />} />

            {/* 3. About & Studio Heritage Page */}
            <Route path="about" element={<PagesAbout />} />

            {/* 4. Portfolio / Selected Works Page */}
            <Route path="portfolio" element={<PortfolioPage />} />

            {/* 5. Editorial Blog & Journal Page */}
            <Route path="blog" element={<BlogPage />} />

            {/* 6. Studio Shop & Editions Page */}
            <Route path="shop" element={<ShopPage />} />

            {/* 7. Client Login & Register Page */}
            <Route path="login" element={<LoginPage />} />

            {/* 8. Client Portal Dashboard (Active User Session) */}
            <Route path="dashboard" element={<DashboardPage />} />

            {/* 9. Live Database & Inquiries Inspector */}
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
