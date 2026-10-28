# Pixelix · Creative Partner & Business Growth Systems

A full-stack modern **MERN** web application built for **Pixelix**, combining tactile terracotta & sunset dimensional aesthetics (derived from `theme.pdf`) with end-to-end digital engineering and marketing services (derived from `details.pdf`).

---

## 🎨 Theme & Visual Identity (Extracted from `theme.pdf`)

- **Palette**:
  - **Terracotta Accent**: `#C84523` / `#D9532F` (Warm Sunset Coral)
  - **Warm Cream Base**: `#FAF6EE` / `#FDFBF7`
  - **Golden Horizon Accent**: `#D4A373` / `#E9C46A`
  - **Sage Sunset Bloom**: `#7F9C8D`
  - **Warm Slate/Espresso**: `#1C1917` / `#292524`
- **5 Curated Brand Concepts**:
  1. `Sunset Pixel` — Rounded PX mark with gentle cream-to-terracotta gradient and soft dimensional edge.
  2. `Golden Horizon` — Minimal horizon line rising into a pixel sun with refined wordmark.
  3. `Terracotta Orbit` — Smooth rounded orbit wrapping a golden pixel spark (rendered in interactive 3D Three.js).
  4. `Cream Glass PX` — Translucent glassmorphism with sand, cream, and dusty blue highlights.
  5. `Sage Sunset Bloom` — Rounded pixel bloom combining sage, warm cream, and sunset accents.

---

## 💼 Complete Services Catalog (Extracted from `details.pdf`)

1. **Website Development** — High-speed, responsive web platforms built with Vite, React, and Tailwind CSS.
2. **Mobile App Development** — Cross-platform iOS & Android apps with offline synchronization.
3. **AI Integration & Automation** — Custom LLMs, automated data workflows, and operational intelligence.
4. **Intelligent Chatbot Solutions** — 24/7 autonomous bilingual conversational care (Web & WhatsApp).
5. **SEO & Search Growth** — Technical audits, Core Web Vitals optimization, and keyword momentum.
6. **Brand Identity & Logo Systems** — *Deliverable: 5 custom vector logos in professional PDF format*, plus letterheads, business cards, and digital ID cards.
7. **Marketplace Growth (Catalog to Checkout)** — Catalog management and listing support on **Amazon**, **Meesho**, and **Flipkart**.
8. **Product Visuals & Retouching** — Background removal, clean cut-outs, color retouching, high-res upscaling, and packaging specs.
9. **Campaigns (Screen & Paper)** — *Deliverable: 5 professional flyers, brochures, and offline banners in high-resolution PDF*.
10. **Content Systems & Social Media** — *Deliverable: 5 social media creative PDFs*, Facebook covers, and profile graphics.

---

## 📁 Architecture & Folder Structure

```
d:/pixelix/
├── backend/                  # Node.js + Express (ES Modules)
│   ├── config/               # db.js (Mongoose + resilient fallback), env.js
│   ├── models/               # Mongoose schemas: Service, Inquiry, Project, Newsletter
│   ├── controllers/          # serviceController, inquiryController, projectController, newsletterController
│   ├── routes/               # Modular Express API routes
│   ├── middleware/           # errorHandler.js, notFound
│   ├── data/                 # seedData.js (All 10 services & case studies)
│   ├── server.js             # Server entry point
│   └── package.json          # "type": "module"
│
└── frontend/                 # Vite + React + Tailwind CSS
    ├── src/
    │   ├── config/           # env.js, theme.js, contact.js
    │   ├── components/
    │   │   ├── 3d/           # HeroSunsetScene (Three.js), TerracottaOrbitCanvas, Floating3DCard
    │   │   ├── common/       # Navbar, Footer, PixelixLogo, Badge, Modal, InquiryModal, ServiceDetailModal
    │   │   └── sections/     # HeroSection, ApproachSection, ServicesSection, DeliverablesShowcase,
    │   │                     # WhyPixelixSection, InteractiveEstimatorSection, ProjectShowcaseSection, ContactSection
    │   ├── pages/            # HomePage, ServicesPage, AboutPage
    │   ├── services/         # apiClient, serviceApi, inquiryApi, fallback dataset
    │   ├── context/          # LanguageContext (English & Hindi bilingual support)
    │   ├── index.css         # Custom Tailwind tokens, glassmorphism, sunset mesh
    │   ├── App.jsx
    │   └── main.jsx
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 Running the Project

### 1. Backend Server
```bash
cd backend
npm install
npm run dev
# Starts on http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### 2. Frontend Application
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
# Starts on http://localhost:5173
```

---

## 📞 Leadership & Contact Coordinates

- **Domain**: `pixelix.co.in`
- **Vikas Chauhan**: `+91 7056063863`
- **Shubham Singh**: `+91 95595 06650`
- **Tagline**: *"Creative & Digital Solutions for Growing Businesses · बढ़ते व्यवसायों के लिए क्रिएटिव और डिजिटल समाधान"*
