import { useState } from 'react';

const INITIAL_HIPAA_ITEMS = [
  { id: 1, item: 'Privacy Officer Designated', status: 'Compliant', owner: 'Dr. Tack' },
  { id: 2, item: 'Notice of Privacy Practices Posted', status: 'Compliant', owner: 'Front Desk' },
  { id: 3, item: 'Patient Authorization Forms', status: 'Compliant', owner: 'All Staff' },
  { id: 4, item: 'Business Associate Agreements', status: 'In Progress', owner: 'Admin' },
  { id: 5, item: 'Employee HIPAA Training', status: 'Compliant', owner: 'All Staff' },
  { id: 6, item: 'Physical Safeguards (locked files)', status: 'Compliant', owner: 'Office Manager' },
  { id: 7, item: 'Technical Safeguards (encrypted EHR)', status: 'Compliant', owner: 'IT' },
  { id: 8, item: 'Access Controls (role-based)', status: 'Compliant', owner: 'IT' },
  { id: 9, item: 'Audit Controls (access logging)', status: 'Compliant', owner: 'IT' },
  { id: 10, item: 'Breach Notification Plan', status: 'Compliant', owner: 'Dr. Tack' },
  { id: 11, item: 'Risk Assessment (annual)', status: 'Action Needed', owner: 'Admin' },
  { id: 12, item: 'Sanctions Policy', status: 'Compliant', owner: 'HR' },
  { id: 13, item: 'Contingency Plan (backup)', status: 'In Progress', owner: 'IT' },
  { id: 14, item: 'Device Security (laptops, phones)', status: 'Compliant', owner: 'IT' },
  { id: 15, item: 'Social Media Policy', status: 'Compliant', owner: 'Marketing' },
];

const CONSENT_FORMS = [
  { title: 'HIPAA Privacy Notice', version: 'v3.2', updated: 'Jan 2025', status: 'Active' },
  { title: 'Treatment Consent Form', version: 'v2.1', updated: 'Mar 2025', status: 'Active' },
  { title: 'Financial Responsibility Agreement', version: 'v1.5', updated: 'Jan 2025', status: 'Active' },
  { title: 'Telehealth Consent', version: 'v1.3', updated: 'Feb 2025', status: 'Active' },
  { title: 'Photo/Video Release', version: 'v1.1', updated: 'Jan 2025', status: 'Active' },
  { title: 'Controlled Substance Agreement', version: 'v2.0', updated: 'Mar 2025', status: 'Active' },
];

const BAA_DATA = [
  { partner: 'Zenoti', type: 'Software BAA', status: 'Signed', signed: 'Jan 2025', expiry: 'Jan 2026' },
  { partner: 'Athena Health', type: 'EHR BAA', status: 'Signed', signed: 'Jan 2025', expiry: 'Jan 2026' },
  { partner: 'Stripe', type: 'Payment BAA', status: 'Signed', signed: 'Feb 2025', expiry: 'Feb 2026' },
  { partner: 'Twilio', type: 'Communication BAA', status: 'Signed', signed: 'Feb 2025', expiry: 'Feb 2026' },
  { partner: 'SendGrid', type: 'Email BAA', status: 'Pending', signed: '—', expiry: '—' },
];

const AUDIT_TRAIL = [
  { date: 'Jun 22, 3:15 PM', action: 'Patient Record Accessed', user: 'Dr. Tack', detail: 'Patient #1042' },
  { date: 'Jun 22, 2:45 PM', action: 'Lab Results Viewed', user: 'PA Johnson', detail: 'Patient #1038' },
  { date: 'Jun 22, 1:30 PM', action: 'Consent Form Signed', user: 'Patient #1045', detail: 'Treatment Consent' },
  { date: 'Jun 21, 4:00 PM', action: 'Prescription Written', user: 'Dr. Tack', detail: 'Patient #1040' },
  { date: 'Jun 21, 11:00 AM', action: 'Insurance Verified', user: 'Front Desk', detail: 'Patient #1043' },
  { date: 'Jun 20, 3:30 PM', action: 'Medical Record Updated', user: 'NP Williams', detail: 'Patient #1035' },
  { date: 'Jun 20, 2:00 PM', action: 'HIPAA Training Completed', user: 'MA Garcia', detail: 'Annual Renewal' },
  { date: 'Jun 20, 10:00 AM', action: 'Policy Updated', user: 'Admin', detail: 'Privacy Policy v3.2' },
];

const INITIAL_OSHA_ITEMS = [
  { id: 1, item: 'Bloodborne Pathogen Plan', status: 'Compliant' },
  { id: 2, item: 'Sharps Disposal Protocol', status: 'Compliant' },
  { id: 3, item: 'PPE Inventory', status: 'Action Needed', note: 'Reorder gloves' },
  { id: 4, item: 'Hazard Communication', status: 'Compliant' },
  { id: 5, item: 'Emergency Action Plan', status: 'Compliant' },
  { id: 6, item: 'Injury Log', status: 'Compliant' },
];

function statusClass(status) {
  if (status === 'Compliant' || status === 'Signed' || status === 'Active') return 'status-badge status-compliant';
  if (status === 'In Progress' || status === 'Pending') return 'status-badge status-in-progress';
  if (status === 'Action Needed') return 'status-badge status-action-needed';
  return '';
}

function ComplianceTab() {
  const [hipaaItems, setHipaaItems] = useState(INITIAL_HIPAA_ITEMS);
  const [oshaItems, setOshaItems] = useState(INITIAL_OSHA_ITEMS);

  const updateHipaaStatus = (id, newStatus) => {
    setHipaaItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const updateOshaStatus = (id, newStatus) => {
    setOshaItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const hipaaCompliant = hipaaItems.filter(i => i.status === 'Compliant').length;
  const hipaaTotal = hipaaItems.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="panel">
        <h2>HIPAA Compliance Checklist</h2>
        <p className="section-desc">
          {hipaaCompliant} of {hipaaTotal} items compliant ({Math.round((hipaaCompliant / hipaaTotal) * 100)}%)
        </p>
        <div className="compliance-checklist">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {hipaaItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ color: 'var(--color-text-dim)' }}>{item.id}</td>
                    <td className="cell-name">{item.item}</td>
                    <td>
                      <span className={statusClass(item.status)}>{item.status}</span>
                    </td>
                    <td style={{ color: 'var(--color-text-dim)' }}>{item.owner}</td>
                    <td>
                      <select
                        value={item.status}
                        onChange={(e) => updateHipaaStatus(item.id, e.target.value)}
                        style={{
                          background: 'var(--color-bg)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 4,
                          color: 'var(--color-text)',
                          padding: '4px 8px',
                          fontSize: 12,
                          fontFamily: 'inherit',
                        }}
                      >
                        <option value="Compliant">Compliant</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Action Needed">Action Needed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>Consent Forms</h2>
        <p className="section-desc">Active consent and authorization documents</p>
        <div className="consent-cards">
          {CONSENT_FORMS.map((form) => (
            <div key={form.title} className="consent-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700 }}>{form.title}</h3>
                <span className="status-badge status-compliant">{form.status}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginBottom: 12 }}>
                {form.version} &middot; Updated {form.updated}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="form-btn" style={{ marginTop: 0, fontSize: 12, padding: '6px 14px' }}>Preview</button>
                <button className="form-btn" style={{ marginTop: 0, fontSize: 12, padding: '6px 14px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2>BAA Status</h2>
        <p className="section-desc">Business Associate Agreement tracking</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Partner</th>
                <th>Agreement Type</th>
                <th>Status</th>
                <th>Signed Date</th>
                <th>Expiry</th>
              </tr>
            </thead>
            <tbody>
              {BAA_DATA.map((baa) => (
                <tr key={baa.partner}>
                  <td className="cell-name">{baa.partner}</td>
                  <td style={{ color: 'var(--color-text-dim)' }}>{baa.type}</td>
                  <td>
                    <span className={statusClass(baa.status)}>{baa.status}</span>
                  </td>
                  <td style={{ color: 'var(--color-text-dim)' }}>{baa.signed}</td>
                  <td style={{ color: 'var(--color-text-dim)' }}>{baa.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>Audit Trail</h2>
        <p className="section-desc">Recent compliance and access events</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date/Time</th>
                <th>Action</th>
                <th>User</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_TRAIL.map((entry, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--color-text-dim)', whiteSpace: 'nowrap' }}>{entry.date}</td>
                  <td className="cell-name">{entry.action}</td>
                  <td>{entry.user}</td>
                  <td style={{ color: 'var(--color-text-dim)' }}>{entry.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>OSHA Compliance</h2>
        <p className="section-desc">Workplace safety compliance tracking</p>
        <div className="compliance-checklist">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {oshaItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ color: 'var(--color-text-dim)' }}>{item.id}</td>
                    <td className="cell-name">{item.item}</td>
                    <td>
                      <span className={statusClass(item.status)}>{item.status}</span>
                    </td>
                    <td style={{ color: 'var(--color-text-dim)', fontSize: 12 }}>{item.note || '—'}</td>
                    <td>
                      <select
                        value={item.status}
                        onChange={(e) => updateOshaStatus(item.id, e.target.value)}
                        style={{
                          background: 'var(--color-bg)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 4,
                          color: 'var(--color-text)',
                          padding: '4px 8px',
                          fontSize: 12,
                          fontFamily: 'inherit',
                        }}
                      >
                        <option value="Compliant">Compliant</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Action Needed">Action Needed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceTab;
