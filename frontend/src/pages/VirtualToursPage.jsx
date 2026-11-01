import React, { useState, useEffect } from 'react';
import Badge from '../components/common/Badge';
import {
  Compass,
  Eye,
  Maximize2,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Building2,
  Home,
  CheckCircle2,
  Play,
  RotateCw,
  Send,
  ArrowRight
} from 'lucide-react';
import { ENV } from '../config/env';

// Rich fallback showcases if backend is booting or offline
const DEMO_SHOWCASES = [
  {
    _id: 'show-1',
    title: 'The Solitaire Sky Villas – 3D Interactive Walkthrough',
    slug: 'solitaire-sky-villas',
    category: 'residential_3d',
    propertyType: '4 BHK Luxury Penthouse',
    location: 'Gomti Nagar Extension, Lucknow',
    areaSqFt: 4200,
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
    tourUrl: 'https://my.matterport.com/show/?m=JGPnGQ6hosj&play=1',
    tourType: 'interactive_3d',
    description: 'Immersive architectural walkthrough featuring double-height living spaces, panoramic skyline balconies, and Italian marble finishes.',
    highlights: ['Photorealistic Day/Night Lighting', 'Interactive Materials Selector', 'Dolby Spatial Sound Design'],
    isFeatured: true
  },
  {
    _id: 'show-2',
    title: 'Aura Heights – Virtual Apartment Model Flat (3BHK)',
    slug: 'aura-heights-3bhk',
    category: 'apartment_tours',
    propertyType: '3 BHK High-Rise Residence',
    location: 'Sector 128, Expressway, Noida',
    areaSqFt: 1850,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    tourUrl: 'https://my.matterport.com/show/?m=26f9B22oUqG&play=1',
    tourType: '360_panorama',
    description: 'Turnkey 360-degree visual experience crafted for digital NRI buyers and pre-launch sales conversion.',
    highlights: ['360° Panoramic Pan and Zoom', 'Furnished vs Bare-shell Toggle', 'Accurate Sun Path Simulation'],
    isFeatured: true
  },
  {
    _id: 'show-3',
    title: 'The Grand Apex Corporate Towers',
    slug: 'grand-apex-corporate',
    category: 'commercial_3d',
    propertyType: 'Grade-A Commercial Office Floor',
    location: 'Cyber City, Gurugram',
    areaSqFt: 12500,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    tourUrl: 'https://my.matterport.com/show/?m=JGPnGQ6hosj&play=1',
    tourType: 'interactive_3d',
    description: 'Complete commercial visualization showcasing open collaborative bays, executive boardrooms, and smart energy building systems.',
    highlights: ['150+ Workstation Ergonomics', 'LEED Platinum Energy View', 'VR Headset Ready'],
    isFeatured: false
  },
  {
    _id: 'show-4',
    title: 'Palacio Royale Classical Mediterranean Villa',
    slug: 'palacio-royale-villa',
    category: 'house_walkthrough',
    propertyType: '5 BHK Independent Villa',
    location: 'Alibaug, Coastal Maharashtra',
    areaSqFt: 6500,
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80',
    tourUrl: 'https://my.matterport.com/show/?m=26f9B22oUqG&play=1',
    tourType: 'interactive_3d',
    description: 'Exterior landscape and infinity pool 3D walkthrough with cinematic twilight lighting and drone-perspective integration.',
    highlights: ['Infinity Pool Simulation', 'Lush Tropical Landscape', 'Bespoke Lighting Showcase'],
    isFeatured: true
  }
];

export default function VirtualToursPage() {
  const [showcases, setShowcases] = useState(DEMO_SHOWCASES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTourModal, setActiveTourModal] = useState(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedShowcaseForLead, setSelectedShowcaseForLead] = useState(null);

  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', city: '', notes: '' });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  useEffect(() => {
    async function loadShowcases() {
      try {
        const res = await fetch(`${ENV.API_BASE_URL}/api/real-estate/showcases`);
        if (res.ok) {
          const data = await res.json();
          if (data?.showcases?.length > 0) {
            setShowcases(data.showcases);
          }
        }
      } catch (e) {
        // Fallback maintained
      }
    }
    loadShowcases();
  }, []);

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'residential_3d', label: 'Residential 3D' },
    { id: 'apartment_tours', label: 'Apartment Walkthroughs' },
    { id: 'commercial_3d', label: 'Commercial Spaces' },
    { id: 'house_walkthrough', label: 'Independent Villas' }
  ];

  const filteredShowcases = showcases.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  const handleOpenLeadModal = (showcase) => {
    setSelectedShowcaseForLead(showcase);
    setIsLeadModalOpen(true);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    try {
      const payload = {
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        service: 'virtual_property_tour',
        projectLocation: leadForm.city,
        sourcePage: 'Virtual 3D Tours Page',
        notes: `Interested in project similar to: ${selectedShowcaseForLead?.title || 'General 3D Tour'}. Notes: ${leadForm.notes}`
      };
      const res = await fetch(`${ENV.API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setLeadSuccess(true);
        setTimeout(() => {
          setIsLeadModalOpen(false);
          setLeadSuccess(false);
          setLeadForm({ name: '', phone: '', email: '', city: '', notes: '' });
        }, 2000);
      }
    } catch (err) {
      alert('Error submitting inquiry. Please connect with us directly on WhatsApp.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base transition-colors space-y-12">
      {/* Hero Header */}
      <section className="py-14 bg-gradient-to-b from-cream-100 to-cream-50 dark:from-darkbg-surface dark:to-darkbg-base border-b border-cream-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-4">
          <Badge variant="terracotta" className="text-xs inline-flex">
            <Compass className="w-3.5 h-3.5" />
            <span>Photorealistic Architectural Immersion</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso-900 dark:text-cream-100 tracking-tight font-display">
            Virtual 3D Site & Property Tours
          </h1>
          <p className="text-sm sm:text-base text-espresso-700 dark:text-cream-300 leading-relaxed max-w-2xl mx-auto">
            Pixelix designs interactive 3D property walkthroughs, 360° model flat panoramas, and commercial architectural visualizations that accelerate pre-launch real estate sales.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 text-espresso-700 dark:text-cream-300 hover:border-terracotta-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Showcases Visual Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredShowcases.map((showcase) => (
            <div
              key={showcase._id}
              className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Cover Image & Interactive Tour Trigger */}
              <div className="relative aspect-16/10 overflow-hidden bg-espresso-950">
                <img
                  src={showcase.coverImage}
                  alt={showcase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-terracotta-500 text-white shadow-xs">
                    {showcase.propertyType}
                  </span>
                  {showcase.isFeatured && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-espresso-950">
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Tour Launch Button */}
                <button
                  type="button"
                  onClick={() => setActiveTourModal(showcase)}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 dark:bg-espresso-900/90 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer"
                  title="Launch 3D Walkthrough"
                >
                  <Eye className="w-6 h-6 ml-0.5" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-medium truncate">{showcase.location}</span>
                  {showcase.areaSqFt && (
                    <span className="font-mono font-bold bg-black/40 px-2 py-0.5 rounded-md">
                      {showcase.areaSqFt.toLocaleString()} sq.ft
                    </span>
                  )}
                </div>
              </div>

              {/* Showcase Meta Info */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 font-serif group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                    {showcase.title}
                  </h3>
                  <p className="text-xs text-espresso-600 dark:text-cream-300 leading-relaxed">
                    {showcase.description}
                  </p>
                </div>

                {/* Highlights tags */}
                {showcase.highlights && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {showcase.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-cream-100 dark:bg-darkbg-base text-espresso-700 dark:text-cream-300 border border-cream-200 dark:border-white/5"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action CTA Buttons */}
                <div className="pt-4 border-t border-cream-200 dark:border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTourModal(showcase)}
                    className="px-4 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Launch 3D Tour</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenLeadModal(showcase)}
                    className="px-4 py-2 rounded-xl border border-cream-300 dark:border-white/15 text-espresso-800 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-darkbg-elevated font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 3D Tour Embed Modal */}
      {activeTourModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-espresso-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-espresso-900 border border-white/15 rounded-3xl overflow-hidden max-w-5xl w-full h-[85vh] flex flex-col shadow-2xl">
            <div className="p-4 px-6 border-b border-white/15 flex items-center justify-between bg-espresso-950">
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base font-serif">
                  {activeTourModal.title}
                </h4>
                <p className="text-xs text-cream-300/80">
                  {activeTourModal.propertyType} • {activeTourModal.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {activeTourModal.tourUrl && (
                  <a
                    href={activeTourModal.tourUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
                    title="Open Fullscreen in New Window"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveTourModal(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded 3D Canvas / IFrame / Interactive View */}
            <div className="flex-1 w-full h-full bg-black relative">
              {activeTourModal.tourUrl ? (
                <iframe
                  src={activeTourModal.tourUrl}
                  title={activeTourModal.title}
                  className="w-full h-full border-0"
                  allow="fullscreen; accelerometer; gyroscope; magnetometer; vr"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-cream-300 p-8 text-center space-y-3">
                  <RotateCw className="w-10 h-10 text-terracotta-500 animate-spin" />
                  <p className="text-sm">Connecting to Pixelix 3D Cloud Render...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Lead Modal */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-300 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-white/10">
              <div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 font-serif">
                  Request 3D Walkthrough Quotation
                </h3>
                <p className="text-xs text-espresso-500 dark:text-cream-400">
                  {selectedShowcaseForLead?.title || 'Bespoke Property Visualization'}
                </p>
              </div>
              <button
                onClick={() => setIsLeadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-cream-100 dark:bg-darkbg-elevated text-espresso-600 dark:text-cream-300 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {leadSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-base text-espresso-900 dark:text-cream-100">
                  Inquiry Received!
                </h4>
                <p className="text-xs text-espresso-600 dark:text-cream-400 max-w-xs mx-auto">
                  Our 3D architectural production director will contact you with a project timeline and pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={leadForm.city}
                      onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                      placeholder="e.g. Lucknow, Delhi NCR"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                    Project Details & Floor Plan Status
                  </label>
                  <textarea
                    rows={2}
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                    placeholder="Tell us about the property area, CAD/Revit files ready, or target completion date..."
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-cream-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsLeadModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-cream-300 dark:border-white/10 text-xs font-semibold text-espresso-700 dark:text-cream-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow-sm disabled:opacity-50"
                  >
                    {isSubmittingLead ? 'Submitting...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

