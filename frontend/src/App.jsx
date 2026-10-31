import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import DeliverablesPage from './pages/DeliverablesPage';
import PortfolioPage from './pages/PortfolioPage';
import EstimatorPage from './pages/EstimatorPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import InquiryModal from './components/common/InquiryModal';
import ServiceDetailModal from './components/common/ServiceDetailModal';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { fetchServices } from './services/serviceApi';
import { FALLBACK_SERVICES } from './services/serviceDataFallback';

const VALID_PAGES = [
  'home',
  'services',
  'deliverables',
  'portfolio',
  'estimator',
  'about',
  'contact'
];

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return VALID_PAGES.includes(hash) ? hash : 'home';
  });

  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal States
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeServiceDetail, setActiveServiceDetail] = useState(null);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_PAGES.includes(hash)) {
        setActivePage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Load services from API
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchServices('all');
        if (data && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        console.warn('Using fallback service catalog');
      }
    }
    loadData();
  }, []);

  const navigateToPage = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (serviceName = '') => {
    setPreselectedService(serviceName);
    setIsInquiryOpen(true);
  };

  const handleViewServiceDetail = (service) => {
    setActiveServiceDetail(service);
    setIsDetailOpen(true);
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
  };

  const handleBookWithEstimator = (calculation) => {
    setPreselectedService(calculation.names || 'Custom Scope Bundle');
    setIsInquiryOpen(true);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 font-sans selection:bg-terracotta-500 selection:text-white transition-colors duration-300">
          
          {/* Floating Glass Navbar with Dark/Normal Mode Switch */}
          <Navbar
            activePage={activePage}
            setActivePage={navigateToPage}
            onOpenInquiry={() => handleOpenInquiry()}
          />

          {/* Dynamic Multi-Page Router */}
          <main className="flex-1">
            {activePage === 'services' && (
              <ServicesPage
                services={services}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                onViewServiceDetail={handleViewServiceDetail}
                onBookService={handleOpenInquiry}
                onOpenInquiry={() => handleOpenInquiry()}
              />
            )}

            {activePage === 'deliverables' && (
              <DeliverablesPage
                onOpenInquiry={() => handleOpenInquiry()}
              />
            )}

            {activePage === 'portfolio' && (
              <PortfolioPage
                onOpenInquiry={() => handleOpenInquiry()}
              />
            )}

            {activePage === 'estimator' && (
              <EstimatorPage
                onBookWithEstimator={handleBookWithEstimator}
              />
            )}

            {activePage === 'about' && (
              <AboutPage
                onOpenInquiry={() => handleOpenInquiry()}
              />
            )}

            {activePage === 'contact' && (
              <ContactPage />
            )}

            {activePage === 'home' && (
              <HomePage
                services={services}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                onViewServiceDetail={handleViewServiceDetail}
                onBookService={handleOpenInquiry}
                onOpenInquiry={() => handleOpenInquiry()}
                onNavigatePage={navigateToPage}
              />
            )}
          </main>

          {/* Rich Footer with page navigation */}
          <Footer
            onOpenInquiry={() => handleOpenInquiry()}
            onNavigatePage={navigateToPage}
          />

          {/* Inquiry / Consultation Booking Modal */}
          <InquiryModal
            isOpen={isInquiryOpen}
            onClose={() => setIsInquiryOpen(false)}
            preselectedService={preselectedService}
          />

          {/* Full Service Detail Modal */}
          <ServiceDetailModal
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            service={activeServiceDetail}
            onBookService={handleOpenInquiry}
          />

        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
