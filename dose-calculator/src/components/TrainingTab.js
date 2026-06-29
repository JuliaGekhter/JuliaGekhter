import { useState } from 'react';

function TrainingTab() {
  const [selectedStaff, setSelectedStaff] = useState('Dr. Tack');
  const [expandedSops, setExpandedSops] = useState({
    'Front Desk': false,
    'Clinical': false,
    'Pharmacy': false,
    'Billing': false,
  });

  const staffMembers = ['Dr. Tack', 'PA Johnson', 'NP Williams', 'MA Garcia'];

  const onboardingItems = [
    'Zenoti Account Created',
    'Athena EHR Access',
    'HIPAA Training Complete',
    'CPR/BLS Certification',
    'Background Check',
    'Credentialing Complete',
    'DEA Registration (if applicable)',
    'Malpractice Insurance',
    'Shadow Day 1 (Front Desk)',
    'Shadow Day 2 (Clinical)',
    'Injection Training',
    'Blood Draw Training',
    'Emergency Protocol Review',
    'Equipment Training',
    'First Solo Day Approved',
  ];

  const sops = {
    'Front Desk': [
      { title: 'Patient Check-in Procedure', detail: 'Verify ID, insurance card, update demographics, collect copay, print encounter form' },
      { title: 'Insurance Verification', detail: 'Check eligibility, verify benefits, note auth requirements, update Athena' },
      { title: 'Appointment Scheduling', detail: 'Check provider availability, match service duration, send confirmation email+SMS' },
      { title: 'Payment Collection', detail: 'Process at checkout, offer payment plans for packages, issue receipt, reconcile EOD' },
      { title: 'No-Show Protocol', detail: 'Mark no-show in Zenoti, charge $75 fee, send follow-up message, reschedule within 48hrs' },
    ],
    'Clinical': [
      { title: 'Injection Protocol (TRT)', detail: 'Verify order, check dose, draw medication, select site, administer IM, document in Athena, schedule next' },
      { title: 'Injection Protocol (Semaglutide)', detail: 'Verify dose escalation schedule, check for side effects, administer SubQ, document, adjust if needed' },
      { title: 'Injection Protocol (B-12)', detail: 'Verify order, draw 1000mcg, administer IM deltoid, document' },
      { title: 'Blood Draw Procedure', detail: 'Verify orders, label tubes, tourniquet, find vein, draw required tubes, ship to HealthLab' },
      { title: 'Vitals & Intake', detail: 'Weight, BP, heart rate, O2 sat, temperature, update in Athena, flag abnormals' },
    ],
    'Pharmacy': [
      { title: 'Medication Ordering (Empower)', detail: 'Log into portal, select medications, verify quantities, submit order, track shipping' },
      { title: 'Medication Ordering (Robard)', detail: 'Email order form, specify shake box quantities, confirm pricing tier, track delivery' },
      { title: 'Inventory Count', detail: 'Weekly count of all medications, update Zenoti inventory, flag items below reorder point' },
      { title: 'Controlled Substance Log', detail: 'Record all dispensing of phentermine, verify DEA compliance, monthly reconciliation' },
      { title: 'Shipping Protocol', detail: 'Package with cold packs (Semaglutide/HCG), include instructions, charge $44 shipping, track delivery' },
    ],
    'Billing': [
      { title: 'Insurance Claim Submission', detail: 'Enter CPT codes, attach diagnosis codes, submit via Athena, track status' },
      { title: 'Denial Management', detail: 'Review denial reason, gather documentation, submit appeal within 30 days, follow up' },
      { title: 'Patient Billing', detail: 'Generate statement, apply membership discounts, process payment, set up payment plan if needed' },
      { title: 'Collections Protocol', detail: 'Send 30-day notice, 60-day follow-up, 90-day final notice, refer to collections' },
      { title: 'Superbill Generation', detail: 'Auto-populate CPT codes, provider info, diagnosis, print/email for patient insurance filing' },
    ],
  };

  const trainingModules = [
    { name: 'Zenoti Platform', hours: 2, progress: { 'Dr. Tack': 100, 'PA Johnson': 100, 'NP Williams': 85, 'MA Garcia': 90 } },
    { name: 'Athena EHR', hours: 3, progress: { 'Dr. Tack': 100, 'PA Johnson': 100, 'NP Williams': 100, 'MA Garcia': 100 } },
    { name: 'HIPAA/Privacy', hours: 1, progress: { 'Dr. Tack': 100, 'PA Johnson': 100, 'NP Williams': 100, 'MA Garcia': 100 } },
    { name: 'Injection Technique', hours: 4, progress: { 'Dr. Tack': 100, 'PA Johnson': 100, 'NP Williams': 100, 'MA Garcia': 75 } },
    { name: 'Weight Loss Protocols', hours: 2, progress: { 'Dr. Tack': 100, 'PA Johnson': 90, 'NP Williams': 80, 'MA Garcia': 60 } },
    { name: 'Hormone Therapy', hours: 3, progress: { 'Dr. Tack': 100, 'PA Johnson': 95, 'NP Williams': 85, 'MA Garcia': 50 } },
    { name: 'Patient Communication', hours: 1, progress: { 'Dr. Tack': 100, 'PA Johnson': 100, 'NP Williams': 100, 'MA Garcia': 100 } },
    { name: 'Emergency Procedures', hours: 2, progress: { 'Dr. Tack': 100, 'PA Johnson': 100, 'NP Williams': 100, 'MA Garcia': 100 } },
  ];

  const competencyData = {
    'Dr. Tack': [
      { cert: 'MD License', status: 'Current', expiry: '2026', action: 'Renew Q4 2025' },
      { cert: 'DEA Registration', status: 'Current', expiry: '2026', action: 'Renew Q4 2025' },
      { cert: 'BLS Certification', status: 'Current', expiry: 'Dec 2025', action: 'Renew Nov 2025' },
      { cert: 'HIPAA Training', status: 'Current', expiry: 'Jun 2026', action: 'Annual renewal' },
    ],
    'PA Johnson': [
      { cert: 'PA-C License', status: 'Current', expiry: '2027', action: 'No action needed' },
      { cert: 'DEA Registration', status: 'Current', expiry: '2026', action: 'Renew Q4 2025' },
      { cert: 'BLS Certification', status: 'Expiring', expiry: 'Jul 2025', action: 'Renew immediately' },
      { cert: 'HIPAA Training', status: 'Current', expiry: 'Jun 2026', action: 'Annual renewal' },
    ],
    'NP Williams': [
      { cert: 'NP License', status: 'Current', expiry: '2026', action: 'Renew Q4 2025' },
      { cert: 'DEA Registration', status: 'Current', expiry: '2027', action: 'No action needed' },
      { cert: 'BLS Certification', status: 'Current', expiry: 'Mar 2026', action: 'Renew Feb 2026' },
      { cert: 'HIPAA Training', status: 'Current', expiry: 'Jun 2026', action: 'Annual renewal' },
    ],
    'MA Garcia': [
      { cert: 'CMA Certification', status: 'Current', expiry: '2027', action: 'No action needed' },
      { cert: 'BLS Certification', status: 'Current', expiry: 'Sep 2025', action: 'Renew Aug 2025' },
      { cert: 'HIPAA Training', status: 'Current', expiry: 'Jun 2026', action: 'Annual renewal' },
      { cert: 'Phlebotomy Cert', status: 'Current', expiry: '2026', action: 'Renew Q4 2025' },
    ],
  };

  const toggleSop = (dept) => {
    setExpandedSops(prev => ({ ...prev, [dept]: !prev[dept] }));
  };

  const getProgressColor = (pct) => {
    if (pct === 100) return 'var(--color-green)';
    if (pct >= 75) return 'var(--color-blue)';
    return 'var(--color-orange)';
  };

  const getStatusClass = (status) => {
    if (status === 'Current') return 'cell-good';
    if (status === 'Expiring') return 'cell-warn';
    return '';
  };

  return (
    <div className="dashboard-grid">
      {/* Onboarding Checklist */}
      <section className="panel">
        <h2>Onboarding Checklist</h2>
        <div className="form-grid" style={{ marginBottom: 16 }}>
          <label>Staff Member
            <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)}>
              {staffMembers.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="metrics-grid">
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-green)' }}>
            <span className="metric-label">Completed</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>15 / 15</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
            <span className="metric-label">Status</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>Complete</span>
          </div>
        </div>
        <div className="table-wrapper" style={{ marginTop: 16 }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {onboardingItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item}</td>
                  <td className="cell-good">&#10003; Complete</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SOPs */}
      <section className="panel">
        <h2>Standard Operating Procedures</h2>
        {Object.keys(sops).map(dept => (
          <div className="sop-section" key={dept} style={{ marginBottom: 12 }}>
            <div
              onClick={() => toggleSop(dept)}
              style={{
                cursor: 'pointer',
                padding: '12px 16px',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              <span>{dept}</span>
              <span style={{ color: 'var(--color-text-dim)', fontSize: 13 }}>
                {expandedSops[dept] ? '▼' : '▶'} {sops[dept].length} SOPs
              </span>
            </div>
            {expandedSops[dept] && (
              <div style={{ padding: '8px 0' }}>
                {sops[dept].map((sop, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 16px',
                      borderBottom: idx < sops[dept].length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                      {idx + 1}. {sop.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-dim)', lineHeight: 1.5 }}>
                      {sop.detail}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Training Modules */}
      <section className="panel">
        <h2>Training Modules</h2>
        <div className="metrics-grid">
          {trainingModules.map((mod, idx) => (
            <div className="training-module" key={idx} style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              padding: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{mod.name}</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{mod.hours} hrs</span>
              </div>
              {staffMembers.map(staff => (
                <div key={staff} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: 'var(--color-text-dim)' }}>{staff}</span>
                    <span style={{ color: getProgressColor(mod.progress[staff]), fontWeight: 600 }}>
                      {mod.progress[staff]}%
                    </span>
                  </div>
                  <div style={{ height: 8, background: '#2a2d3a', borderRadius: 4 }}>
                    <div style={{
                      height: '100%',
                      borderRadius: 4,
                      width: mod.progress[staff] + '%',
                      background: getProgressColor(mod.progress[staff]),
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Competency Tracking */}
      <section className="panel">
        <h2>Competency Tracking</h2>
        {staffMembers.map(staff => (
          <div key={staff} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: 'var(--color-blue)' }}>{staff}</h3>
            <div className="table-wrapper">
              <table className="competency-table">
                <thead>
                  <tr>
                    <th>Certification</th>
                    <th>Status</th>
                    <th>Expiry</th>
                    <th>Renewal Action</th>
                  </tr>
                </thead>
                <tbody>
                  {competencyData[staff].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{row.cert}</td>
                      <td className={getStatusClass(row.status)}
                        style={row.status === 'Expired' ? { color: 'var(--color-red)', fontWeight: 600 } : undefined}
                      >
                        {row.status}
                      </td>
                      <td>{row.expiry}</td>
                      <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default TrainingTab;
