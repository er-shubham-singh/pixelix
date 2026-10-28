import React from 'react';
import ContactSection from '../components/sections/ContactSection';
import Badge from '../components/common/Badge';
import { CONTACT_INFO } from '../config/contact';
import { Sparkles } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base space-y-0 transition-colors">
      {/* Header Banner */}
      <section className="py-14 bg-cream-100 dark:bg-darkbg-surface border-b border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <Badge variant="terracotta" className="text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Pixelix Leadership</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            Start a Conversation Today
          </h1>
          <p className="text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            Direct communication with co-founders Vikas Chauhan ({CONTACT_INFO.founders[0].phone}) & Shubham Singh ({CONTACT_INFO.founders[1].phone}). We respond to every inquiry within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Contact Section with direct cards and form */}
      <ContactSection />
    </div>
  );
}
