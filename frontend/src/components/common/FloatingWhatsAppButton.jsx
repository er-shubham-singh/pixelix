import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton({ activePage = 'home' }) {
  const getContextMessage = () => {
    switch (activePage) {
      case 'real-estate-calculator':
      case 'estimator':
        return 'Hello Pixelix! I am on your website and would like to discuss a house construction cost estimate and building materials.';
      case 'virtual-tours':
        return 'Hello Pixelix! I am interested in creating an interactive 3D Virtual Property Tour / Walkthrough for my real estate project.';
      case 'digital-advertising':
        return 'Hello Pixelix! I am looking to run Meta & Google Lead Generation Ads for my real estate project / business.';
      case 'services':
        return 'Hello Pixelix! I was browsing your services and would like to inquire about project scope and timelines.';
      default:
        return 'Hello Pixelix! I visited your website and would like to discuss a project with your team.';
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '919876543210';
    const message = getContextMessage();
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip Pill on Hover */}
      <div className="hidden sm:flex items-center mr-3 px-3.5 py-1.5 rounded-full bg-espresso-900/90 text-white text-xs font-semibold shadow-lg backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <span>Chat with Pixelix on WhatsApp</span>
      </div>

      <button
        type="button"
        onClick={handleWhatsAppClick}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full" />
      </button>
    </div>
  );
}

