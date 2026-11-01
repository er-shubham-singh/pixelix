import React, { useState } from 'react';
import {
  Printer,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Award,
  Users,
  Calendar,
  Mail,
  MapPin,
  Sparkles,
  FileText,
  Clock,
  Download
} from 'lucide-react';

export default function EquityOfferLetterTab() {
  const [recipientName, setRecipientName] = useState("[Recipient's Full Legal Name]");
  const [recipientAddress, setRecipientAddress] = useState("[Recipient's Complete Residential Address]");
  const [recipientEmail, setRecipientEmail] = useState("[Recipient's Email Address]");
  const [issuanceDate, setIssuanceDate] = useState('31 October 2026');
  const [deadlineDate, setDeadlineDate] = useState('15 November 2026');
  const [refNumber, setRefNumber] = useState('PIX/EO/2026/001');
  const [vestingSchedule, setVestingSchedule] = useState(
    'Four-year vesting schedule with a one-year cliff (25% vesting after 12 months, followed by equal quarterly vesting over 36 months)'
  );

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleOpenStandalone = () => {
    window.open('/equityShareLetter.html', '_blank');
  };

  const handleCopyText = () => {
    const textToCopy = `
PIXELIX
CREATIVE PARTNER
EQUITY PARTNERSHIP & STRATEGIC OWNERSHIP OFFER LETTER

Date: ${issuanceDate}
Reference No.: ${refNumber}

To:
${recipientName}
${recipientAddress}
${recipientEmail}

Subject: Formal Offer for 15% Equity Partnership in Pixelix

Dear ${recipientName},

On behalf of the founding team of Pixelix, we are pleased to formally offer you the opportunity to join our organization as a Strategic Equity Partner, with a proposed ownership interest of 15% in Pixelix, subject to definitive legal agreements.

PROPOSED OWNERSHIP: 15% (Fifteen Percent) of Fully Diluted Post-Issue Equity Share Capital.
FOUNDERS / PROMOTERS:
1. Vikas Chauhan (Founder) - Business vision & leadership
2. Shubham Singh (Co-Founder) - Technology architecture & operations

Proposed Vesting Framework: ${vestingSchedule}
Acceptance Deadline: ${deadlineDate}

For full details, please refer to the attached formal offer instrument.

Authorized Signatories for Pixelix:
1. Vikas Chauhan (Founder)
2. Shubham Singh (Co-Founder)
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header & Controls Bar (Hidden during Print) */}
      <div className="print:hidden bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-terracotta-500 to-amber-500 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                15% Strategic Equity Partnership Offer Letter
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  Legal Instrument
                </span>
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Official offer letter with letterhead, logo, 13 commercial clauses, promoter signatures, and recipient acceptance
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border text-xs font-bold text-espresso-800 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors"
          >
            {isEditing ? 'Hide Edit Form' : '✏️ Edit Recipient Info'}
          </button>

          <button
            onClick={handleCopyText}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border text-xs font-bold text-espresso-800 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Summary Copied' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleOpenStandalone}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border text-xs font-bold text-espresso-800 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors flex items-center justify-center gap-1.5"
            title="Open standalone print document in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Tab</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-terracotta-600 to-amber-600 hover:from-terracotta-700 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-terracotta-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Recipient Customizer Drawer (Hidden during Print) */}
      {isEditing && (
        <div className="print:hidden p-6 rounded-3xl bg-cream-50 dark:bg-darkbg-elevated border border-cream-300 dark:border-darkbg-border space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-darkbg-border">
            <h4 className="font-bold text-sm text-espresso-900 dark:text-cream-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-terracotta-500" />
              Customize Recipient & Offer Parameters
            </h4>
            <span className="text-xs text-espresso-500 dark:text-cream-400">
              Changes reflect live in the letter preview below
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold text-espresso-700 dark:text-cream-300 uppercase block mb-1">
                Recipient Full Legal Name:
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none"
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-espresso-700 dark:text-cream-300 uppercase block mb-1">
                Recipient Email Address:
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none"
                placeholder="e.g. partner@example.com"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-espresso-700 dark:text-cream-300 uppercase block mb-1">
                Date of Issuance:
              </label>
              <input
                type="text"
                value={issuanceDate}
                onChange={(e) => setIssuanceDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none"
                placeholder="e.g. 31 October 2026"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-espresso-700 dark:text-cream-300 uppercase block mb-1">
                Offer Acceptance Deadline:
              </label>
              <input
                type="text"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none"
                placeholder="e.g. 15 November 2026"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-espresso-700 dark:text-cream-300 uppercase block mb-1">
                Reference Number:
              </label>
              <input
                type="text"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none"
                placeholder="PIX/EO/2026/001"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <label className="text-[11px] font-bold text-espresso-700 dark:text-cream-300 uppercase block mb-1">
                Complete Residential Address:
              </label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none"
                placeholder="City, State, Country"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. The Letterhead Document Canvas */}
      <div className="bg-white text-espresso-950 rounded-3xl border border-cream-200 shadow-md p-8 sm:p-14 max-w-4xl mx-auto space-y-6 print:p-0 print:border-none print:shadow-none print:rounded-none">
        
        {/* Executive Letterhead */}
        <div className="pb-6 border-b-2 border-espresso-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative">
          <div className="flex flex-col gap-1">
            <img
              src="/light-mode-logo.png"
              alt="Pixelix Logo"
              className="h-12 w-auto object-contain self-start"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-terracotta-600">
              Creative Partner & Business Growth Systems
            </span>
          </div>
          <div className="text-left sm:text-right text-[11px] text-espresso-600 leading-tight space-y-0.5">
            <div className="font-bold text-espresso-950">PIXELIX TECHNOLOGIES & CREATIVE AGENCY</div>
            <div>Web: <strong className="text-espresso-900">pixelix.co.in</strong></div>
            <div>Founders: Vikas (+91 7056063863) & Shubham (+91 95595 06650)</div>
            <div className="text-espresso-500">Brand Identity • Web & AI • Marketplace Growth</div>
          </div>
        </div>

        {/* Title Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-terracotta-50 to-amber-50/60 border border-terracotta-200/70 border-l-4 border-l-terracotta-600 space-y-1">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-terracotta-100 text-terracotta-800 border border-terracotta-300 inline-block">
            Confidential & Privileged Corporate Instrument
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-espresso-950 tracking-tight uppercase">
            Equity Partnership & Strategic Ownership Offer Letter
          </h2>
          <p className="text-xs font-semibold text-terracotta-700">
            Formal In-Principle Commercial Offer for 15% Post-Issue Equity Capital
          </p>
        </div>

        {/* Metadata & Recipient Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Metadata Card */}
          <div className="p-4 rounded-xl bg-cream-50/70 border border-cream-300 space-y-1.5">
            <div>
              <span className="text-[10px] font-bold uppercase text-espresso-500 block">Reference Number:</span>
              <span className="font-mono font-bold text-espresso-900">{refNumber}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-espresso-500 block">Date of Issuance:</span>
              <span className="font-semibold text-espresso-900">{issuanceDate}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-espresso-500 block">Offer Validity Deadline:</span>
              <span className="font-bold text-terracotta-700">{deadlineDate}</span>
            </div>
          </div>

          {/* Recipient Card */}
          <div className="p-4 rounded-xl bg-cream-50/70 border border-cream-300 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-terracotta-600 block">
              To Proposed Equity Partner:
            </span>
            <div className="font-black text-sm text-espresso-950">{recipientName}</div>
            <div className="text-espresso-600">{recipientAddress}</div>
            <div className="text-espresso-600 font-mono text-[11px]">{recipientEmail}</div>
          </div>
        </div>

        {/* Subject & Salutation */}
        <div className="space-y-3 pt-2 text-xs leading-relaxed text-espresso-900">
          <p className="font-bold text-sm">
            Subject: Formal Offer for 15% Equity Partnership in Pixelix
          </p>

          <p>Dear {recipientName},</p>

          <p>
            On behalf of the founding team of <strong>Pixelix</strong>, we are pleased to formally offer you the opportunity to join our organization as a <strong>Strategic Equity Partner</strong>, with a proposed ownership interest of <strong>15% in Pixelix</strong>, subject to the terms, conditions, corporate approvals and definitive legal agreements described in this letter.
          </p>

          <p>
            We believe that your skills, commitment, professional contribution and vision can play an important role in the long-term growth and development of Pixelix.
          </p>

          <p>
            This partnership is intended to establish a long-term business relationship in which all partners contribute towards building, expanding and strengthening the organization.
          </p>
        </div>

        {/* 15% Ownership Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
          <div className="p-3.5 rounded-xl bg-terracotta-50 border border-terracotta-300 text-center">
            <div className="text-2xl font-black text-terracotta-600 font-mono">15.0%</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-espresso-600 mt-0.5">Proposed Ownership</div>
          </div>
          <div className="p-3.5 rounded-xl bg-cream-100 border border-cream-300 text-center">
            <div className="text-sm font-black text-espresso-900 pt-1">Strategic Partner</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-espresso-500 mt-1">Designation</div>
          </div>
          <div className="p-3.5 rounded-xl bg-cream-100 border border-cream-300 text-center">
            <div className="text-sm font-black text-espresso-900 pt-1">Fully Diluted</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-espresso-500 mt-1">Capital Basis</div>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-center">
            <div className="text-sm font-black text-amber-700 pt-1">Commercial Offer</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mt-1">Legal Instrument</div>
          </div>
        </div>

        {/* SECTION 1 */}
        <div className="space-y-2 pt-2">
          <h3 className="font-black text-sm uppercase tracking-wide text-espresso-950 pb-1 border-b border-cream-300 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-terracotta-100 text-terracotta-700 font-mono text-xs flex items-center justify-center">1</span>
            About Pixelix
          </h3>
          <p className="text-xs text-espresso-800 leading-relaxed">
            Pixelix is a creative and digital solutions company focused on helping businesses establish their brand identity, strengthen their digital presence, improve business operations and achieve sustainable growth.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-espresso-700 pl-4 list-disc">
            <div>• Brand Identity & Creative Design</div>
            <div>• Website & Application Development</div>
            <div>• AI Integration & Business Automations</div>
            <div>• E-commerce & Marketplace Management</div>
            <div>• Amazon, Flipkart & Meesho Operations</div>
            <div>• Social Media Management & Marketing</div>
            <div>• Graphic Design & Vector Logo Suites</div>
            <div>• 3D Web Experiences & Digital Products</div>
            <div>• Business Growth & Tech Consulting</div>
            <div>• Logistics, Order & Catalogue Management</div>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-2 pt-3">
          <h3 className="font-black text-sm uppercase tracking-wide text-espresso-950 pb-1 border-b border-cream-300 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-terracotta-100 text-terracotta-700 font-mono text-xs flex items-center justify-center">2</span>
            Founding Team
          </h3>
          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 space-y-2 text-xs">
            <div>
              <strong className="text-terracotta-700">Founder / Promoter 1: Vikas Chauhan</strong> — <em>Founder</em><br />
              <span className="text-espresso-600 text-[11px]">Responsibilities: Business vision, strategic planning, leadership, business development and organizational growth.</span>
            </div>
            <div>
              <strong className="text-terracotta-700">Co-Founder / Promoter 2: Shubham Singh</strong> — <em>Co-Founder</em><br />
              <span className="text-espresso-600 text-[11px]">Responsibilities: Technology development, digital solutions, product development, technical operations and business execution.</span>
            </div>
            <div>
              <strong className="text-terracotta-700">Proposed Equity Partner: {recipientName}</strong> — <em>Strategic Equity Partner (15% Ownership)</em><br />
              <span className="text-espresso-600 text-[11px]">Responsibilities: Strategic business development, departmental leadership, and mutually agreed operational milestones.</span>
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-2 pt-3">
          <h3 className="font-black text-sm uppercase tracking-wide text-espresso-950 pb-1 border-b border-cream-300 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-terracotta-100 text-terracotta-700 font-mono text-xs flex items-center justify-center">3</span>
            Equity Ownership Offer – 15%
          </h3>
          <div className="p-3.5 rounded-xl bg-terracotta-50/80 border-l-4 border-l-terracotta-600 font-bold text-xs text-terracotta-900">
            15% (Fifteen Percent) of the Company's Fully Diluted Post-Issue Equity Share Capital.
          </div>
          <p className="text-xs text-espresso-800 leading-relaxed">
            The proposed 15% equity participation shall be subject to: (1) Acceptance of this offer; (2) Agreement on responsibilities and expected contribution; (3) Applicable company valuation and share-allotment process; (4) Board and shareholder approvals; (5) Execution of the Shareholders' Agreement (SHA); and (6) Statutory filings. Ownership takes effect upon registration in the Register of Members.
          </p>
        </div>

        {/* SECTION 4, 5, 6, 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 space-y-1.5">
            <h4 className="font-bold text-xs uppercase text-terracotta-700">4. Role & Responsibilities</h4>
            <p className="text-[11px] text-espresso-700 leading-relaxed">
              Supporting business development, generating client relationships, contributing to operational planning, and maintaining professional accountability across company objectives.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 space-y-1.5">
            <h4 className="font-bold text-xs uppercase text-terracotta-700">5. Vesting & Contribution</h4>
            <p className="text-[11px] text-espresso-700 leading-relaxed">
              Structured under a mutually agreed framework: <em>{vestingSchedule}</em>, or milestone-based vesting documented in definitive agreements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 space-y-1.5">
            <h4 className="font-bold text-xs uppercase text-terracotta-700">6. Shareholder Rights</h4>
            <p className="text-[11px] text-espresso-700 leading-relaxed">
              Customary rights attached to equity: Pro-rata dividend rights, statutory voting rights, strategic business participation, and financial transparency reports.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 space-y-1.5">
            <h4 className="font-bold text-xs uppercase text-terracotta-700">7. Funding & Dilution</h4>
            <p className="text-[11px] text-espresso-700 leading-relaxed">
              Future venture funding or equity issuance will be subject to proportionate, equitable dilution with customary pre-emptive subscription rights.
            </p>
          </div>
        </div>

        {/* SECTION 8, 9, 10, 11 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 space-y-1.5">
            <h4 className="font-bold text-xs uppercase text-terracotta-700">8. Confidentiality & IP</h4>
            <p className="text-[11px] text-espresso-700 leading-relaxed">
              Strict fiduciary duty regarding client data, source code, strategies, and trade secrets. All intellectual property vests exclusively in Pixelix.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 space-y-1.5">
            <h4 className="font-bold text-xs uppercase text-terracotta-700">9. Transfer Restrictions & ROFR</h4>
            <p className="text-[11px] text-espresso-700 leading-relaxed">
              Shares cannot be pledged or transferred without following statutory Right of First Refusal (ROFR) provisions in favor of existing promoters.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 space-y-1.5">
            <h4 className="font-bold text-xs uppercase text-terracotta-700">10. Remuneration</h4>
            <p className="text-[11px] text-espresso-700 leading-relaxed">
              Equity is separate from any salary, consulting stipend, or expense reimbursements, which are governed by independent operational agreements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300 space-y-1.5">
            <h4 className="font-bold text-xs uppercase text-terracotta-700">11. Governance</h4>
            <p className="text-[11px] text-espresso-700 leading-relaxed">
              Major strategic decisions and reserved matters follow affirmative voting covenants in accordance with company Articles of Association.
            </p>
          </div>
        </div>

        {/* SECTION 12 & 13 */}
        <div className="space-y-2 pt-2 text-xs">
          <h3 className="font-black text-sm uppercase tracking-wide text-espresso-950 pb-1 border-b border-cream-300 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-terracotta-100 text-terracotta-700 font-mono text-xs flex items-center justify-center">12</span>
            Offer Acceptance Process & Closing
          </h3>
          <p className="text-espresso-800 leading-relaxed">
            To proceed, please review and return the signed acceptance before <strong>{deadlineDate}</strong> accompanied by KYC documentation (PAN card, residential address proof) to initiate execution of the definitive Shareholders' Agreement.
          </p>
          <div className="p-3 text-center font-bold text-terracotta-700 bg-terracotta-50/50 rounded-xl">
            Together, Let's Create. Innovate. Grow.
          </div>
        </div>

        {/* Signatures Block */}
        <div className="pt-6 border-t-2 border-espresso-900 space-y-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-espresso-600">
            Authorized Signatories — For and on behalf of PIXELIX
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Founder 1 */}
            <div className="p-4 rounded-xl bg-cream-50/80 border border-cream-300 space-y-2">
              <span className="text-[10px] font-black uppercase text-terracotta-600 block">Founder / Promoter 1</span>
              <div className="font-black text-sm text-espresso-950">Vikas Chauhan</div>
              <div className="text-[11px] text-espresso-500">Founder & Director, Pixelix</div>
              <div className="h-10 border-b border-dashed border-espresso-400"></div>
              <div className="text-[10px] text-espresso-600 flex justify-between">
                <span>Signature</span>
                <span>Date: ___/___/2026</span>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="p-4 rounded-xl bg-cream-50/80 border border-cream-300 space-y-2">
              <span className="text-[10px] font-black uppercase text-terracotta-600 block">Co-Founder / Promoter 2</span>
              <div className="font-black text-sm text-espresso-950">Shubham Singh</div>
              <div className="text-[11px] text-espresso-500">Co-Founder & Director, Pixelix</div>
              <div className="h-10 border-b border-dashed border-espresso-400"></div>
              <div className="text-[10px] text-espresso-600 flex justify-between">
                <span>Signature</span>
                <span>Date: ___/___/2026</span>
              </div>
            </div>
          </div>

          {/* Recipient Acceptance Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cream-100/70 to-amber-50/60 border border-amber-300 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900">
              Acceptance & Acknowledgement by Proposed Equity Partner
            </h4>
            <p className="text-[11px] text-espresso-800 leading-relaxed">
              I, <strong>{recipientName}</strong>, hereby acknowledge that I have read and understood the terms of this in-principle 15% equity partnership offer and confirm my willingness to proceed with definitive legal documentation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <span className="text-[10px] text-espresso-500 uppercase block mb-1">Full Legal Name:</span>
                <div className="border-b border-espresso-700 h-6 font-bold text-espresso-900">{recipientName}</div>
              </div>
              <div>
                <span className="text-[10px] text-espresso-500 uppercase block mb-1">Signature of Acceptance:</span>
                <div className="border-b border-espresso-700 h-6"></div>
              </div>
              <div>
                <span className="text-[10px] text-espresso-500 uppercase block mb-1">Date of Signing:</span>
                <div className="border-b border-espresso-700 h-6">____ / ____ / 2026</div>
              </div>
              <div>
                <span className="text-[10px] text-espresso-500 uppercase block mb-1">Place of Execution:</span>
                <div className="border-b border-espresso-700 h-6">________________________</div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="pt-4 border-t border-cream-300 flex items-center justify-between text-[10px] text-espresso-500">
          <div>
            <strong>PIXELIX • CREATIVE PARTNER</strong> — Building Brands. Creating Opportunities. Growing Businesses.
          </div>
          <div>
            Ref: {refNumber} • Private & Confidential
          </div>
        </div>

      </div>
    </div>
  );
}

