// Vendor management data — source: Zenoti Vendor Management Cheat Sheet
// (prepared for Julia Tack, Clinical Director & COO). Update after each renewal cycle.

export const VENDOR_DATES = [
  { event: 'Initial contract signed', date: '2025-03-27', action: '12-month initial term' },
  { event: 'Initial term ended', date: '2026-03-27', action: 'Auto-renewed for 12 months' },
  { event: 'Renewal evaluation window opens', date: '2026-12-27', action: 'Start vendor review 90 days prior to renewal' },
  { event: 'Annual fee increase notice window', date: '2027-01-26', action: 'Zenoti must give 60 days notice; up to 20% increase allowed' },
  { event: 'Non-renewal notice deadline', date: '2027-01-27', action: 'MUST give 60 days written notice if leaving' },
  { event: 'Current renewal year ends', date: '2027-03-27', action: 'Decision point: renew, renegotiate, or leave' },
];

export const VENDOR_CONTACTS = [
  { name: 'Jessica Bader', role: 'Senior Account Executive', reach: 'jessicab@zenoti.com', useFor: 'Sales / account expansion' },
  { name: 'Standard Support', role: 'Ticket queue', reach: 'Zenoti portal', useFor: 'Operational issues post-go-live' },
  { name: 'Legal Department', role: 'BAA, contract issues', reach: 'legal@zenoti.com', useFor: 'Compliance, breach notification' },
  { name: 'Professional Services', role: 'Implementation team', reach: 'Via Jessica', useFor: 'Configuration and migration' },
  { name: "Jessica's Manager", role: 'Escalation', reach: 'Request via Jessica', useFor: 'If Jessica becomes unresponsive' },
];

export const VENDOR_SUBSCRIPTION = [
  { item: 'Zenoti Core', price: 255, qty: '1 Center', notes: 'Lite tier — features may need upgrade' },
  { item: 'Photo Manager', price: 125, qty: '1 Center', notes: 'For aesthetic before/after' },
  { item: 'HyperConnect Converse', price: 250, qty: '1 Center', notes: '10K ezConnect SMS + 2K SmartBot SMS/mo' },
  { item: 'ePrescribe EPCS', price: 70, qty: '1 Provider', notes: 'Dr. Tack only — additional providers cost more' },
  { item: 'Marketing Email', price: 0, qty: '7,500/mo', notes: 'No rollover; overage pricing applies' },
  { item: 'Marketing SMS', price: 0, qty: '1,000/mo', notes: 'No rollover; $0.025/segment overage' },
  { item: 'Storage', price: 0, qty: '5GB', notes: '$10/mo per additional 5GB' },
];

export const ZPAY_RATES = [
  { type: 'Cards Present (excl. Amex)', rate: '2.45% + 10c' },
  { type: 'Cards Not Present (excl. Amex)', rate: '2.95% + 10c' },
  { type: 'Amex Card Present', rate: '2.95% + 10c' },
  { type: 'Amex Not Present', rate: '3.25% + 10c' },
  { type: 'Non-Amex Downgrade (online w/o AVS)', rate: '3.35% + $0.30' },
  { type: 'BNPL — Sunbit', rate: '5%' },
  { type: 'BNPL — Affirm / Klarna / Afterpay', rate: '5.9%' },
];

export const ESCALATION_LEVELS = [
  { level: 1, name: 'Standard Support Ticket', how: 'Zenoti support portal', useFor: 'Bugs, configuration, how-to', next: 'No response in 48 hours → Level 2' },
  { level: 2, name: 'Email Jessica Bader', how: 'jessicab@zenoti.com — include severity in subject', useFor: 'Stalled tickets, account questions', next: 'No satisfactory response in 5 business days → Level 3' },
  { level: 3, name: "Request Jessica's Manager", how: '"I\'d like to escalate this to your manager"', useFor: 'Pattern of unresponsiveness, account-level issues', next: 'Still unsatisfied → Level 4' },
  { level: 4, name: 'Legal Department', how: 'legal@zenoti.com — cc your own counsel', useFor: 'BAA breaches, contract disputes ONLY', next: 'Document everything → record for Level 5' },
  { level: 5, name: 'Termination for Cause', how: 'T&Cs 13.2(b): written notice, 30 days to cure', useFor: 'Uncured material breach', next: 'Trigger data export within 7 days of notice (30-day window)' },
];

export const LEVERAGE_WINDOWS = [
  { period: 'Year one of renewal (now)', level: 'HIGH', why: 'Dependency still shallow; switching costs manageable. Push for SOW additions, training credits, fee freezes.' },
  { period: 'Dec 2026 – Jan 2027 (90 days pre-renewal)', level: 'HIGH', why: 'Credible non-renewal threat. Renegotiate pricing, add modules at favorable rates.' },
  { period: 'Any upgrade/expansion request', level: 'HIGH', why: 'They want more revenue — attach conditions to every yes.' },
  { period: 'Mid-term (Apr–Nov any year)', level: 'LOW', why: 'Locked in; little reason for concessions.' },
  { period: 'After year 2', level: 'LOW', why: 'Data, training, and patient workflows entrenched — they know it.' },
  { period: 'After announcing expansion', level: 'LOW', why: 'They know you need them more, not less.' },
];

export const NEGOTIATION_ASKS = [
  { area: 'Financial', asks: ['Fee freeze next term (vs. 20% max increase)', 'Waive ePrescribe fees on added providers', 'SMS overage credits', 'Storage above 5GB', 'Multi-year discount'] },
  { area: 'Implementation', asks: ['Named Implementation Manager', '30-day post-go-live support (vs. 3 days)', 'Live trainer hours', 'Multi-source migration SOW at favorable terms', 'Treatment record migration included'] },
  { area: 'Service Levels', asks: ['Service credits below 99.5% uptime', '4-hour response SLA on critical tickets', 'Named Account Manager', 'Quarterly business reviews'] },
  { area: 'Risk Reduction', asks: ['Advance notice of workflow-affecting changes', 'Extended data export window past 30 days', 'Terminate without penalty if features removed', 'HIPAA/security audit rights'] },
];

export const RED_FLAGS = [
  { category: 'Service', flags: ['Tickets open >5 business days unacknowledged', 'Multiple unscheduled outages in a month', 'Features changed without notice', 'Persistent bugs in critical functionality'] },
  { category: 'Account', flags: ['Jessica unresponsive >1 week', 'Different answers from different contacts', 'Verbal commitments never confirmed in writing', 'Pressure to sign SOWs without review time'] },
  { category: 'Financial', flags: ['Increases above the 20% contractual cap', 'Invoice charges that don\'t match agreements', 'Undisclosed new fees', 'Aggressive collections on disputed amounts'] },
  { category: 'Compliance', flags: ['Late or incomplete breach notification', 'HIPAA disclosure accounting delays', 'Subcontractor changes without notice', 'T&Cs changed without proper notification'] },
];

export const VENDOR_OBLIGATIONS = {
  owed: [
    '99.5% uptime monthly (no service credits if missed)',
    'Updates and patches to all customers',
    'Breach notification within 60 days (BAA)',
    'Accounting of disclosures within 30 days of request',
    'Forward patient requests within 10 days',
    'Amend ePHI within 45 days of instruction',
  ],
  notOwed: [
    'Named Implementation Manager',
    'Live or in-person training',
    'Multi-source data migration without SOW',
    'Image/EMR/photo migration without SOW',
    'Service credits for SLA misses',
    'Support response time SLA after first 3 days',
    'More than $1,000 liability per incident',
  ],
};
