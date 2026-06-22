import { useState } from 'react';

const AFFILIATES = [
  { partner: 'Lake County Fitness', referrals: 45, conversions: 12, rate: '27%', commission: '$3,600', status: 'Active' },
  { partner: 'Gurnee Chiropractic', referrals: 32, conversions: 8, rate: '25%', commission: '$2,400', status: 'Active' },
  { partner: 'North Shore Nutrition', referrals: 28, conversions: 6, rate: '21%', commission: '$1,800', status: 'Active' },
  { partner: 'Dr. Smith Family Med', referrals: 15, conversions: 5, rate: '33%', commission: '$1,500', status: 'Active' },
  { partner: 'Wellness Blog Partner', referrals: 120, conversions: 4, rate: '3%', commission: '$1,200', status: 'Pending Review' },
];

const FRANCHISE_ITEMS = [
  { item: 'Initial Setup Fee', details: '$50,000' },
  { item: 'Monthly Royalty', details: '6% of gross revenue' },
  { item: 'Marketing Fund', details: '2% of gross revenue' },
  { item: 'Territory', details: '15-mile exclusive radius' },
  { item: 'Training', details: '4-week comprehensive (included)' },
  { item: 'Zenoti License', details: 'Included in royalty' },
  { item: 'Minimum Term', details: '5 years' },
  { item: 'Renewal', details: '5-year option, $10,000 fee' },
];

const MILESTONES = [
  { quarter: 'Q3 2025', title: 'Lake Forest Buildout', desc: 'Lease signed, construction, hiring' },
  { quarter: 'Q4 2025', title: 'Lake Forest Opens', desc: 'Grand opening, 50 member target' },
  { quarter: 'Q1 2026', title: 'Waukegan Buildout', desc: 'Site selection, permits, construction' },
  { quarter: 'Q2 2026', title: 'Waukegan Opens', desc: 'Launch, 30 member target' },
  { quarter: 'Q4 2026', title: 'Franchise Program', desc: 'Documentation complete, first franchisee' },
];

function MultiLocationTab() {
  const [whiteLabel, setWhiteLabel] = useState({
    practiceName: 'Shape The Wave',
    logoUrl: '',
    primaryColor: '#4c8dff',
    secondaryColor: '#30d5c8',
    domain: 'shapethewave.com',
    phone: '(847) 555-0100',
    email: 'info@shapethewave.com',
    address: '123 Main St, Gurnee, IL 60031',
  });

  const updateField = (field, value) => {
    setWhiteLabel(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Location Dashboard */}
      <section className="panel">
        <h2>Location Dashboard</h2>
        <p className="section-desc">Multi-location overview and expansion tracking</p>
        <div className="location-cards">
          <div className="location-card location-active">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Gurnee</h3>
              <span className="location-badge badge-active">Active</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginBottom: 4 }}>Flagship Location</div>
            <div className="metrics-grid" style={{ marginTop: 12 }}>
              <div className="metric-card" style={{ borderColor: 'var(--color-blue)' }}>
                <span className="metric-label">Members</span>
                <span className="metric-value">350</span>
              </div>
              <div className="metric-card" style={{ borderColor: 'var(--color-green)' }}>
                <span className="metric-label">Revenue/Mo</span>
                <span className="metric-value">$649K</span>
              </div>
              <div className="metric-card" style={{ borderColor: 'var(--color-purple)' }}>
                <span className="metric-label">Providers</span>
                <span className="metric-value">4</span>
              </div>
              <div className="metric-card" style={{ borderColor: 'var(--color-teal)' }}>
                <span className="metric-label">Services</span>
                <span className="metric-value">50</span>
              </div>
            </div>
            <button className="form-btn" style={{ marginTop: 12 }}>View Details</button>
          </div>

          <div className="location-card location-planned">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Lake Forest</h3>
              <span className="location-badge badge-planned">Planned</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginBottom: 4 }}>Target: Q4 2025 Open</div>
            <div className="metrics-grid" style={{ marginTop: 12 }}>
              <div className="metric-card" style={{ borderColor: 'var(--color-orange)' }}>
                <span className="metric-label">Members</span>
                <span className="metric-value">0</span>
              </div>
              <div className="metric-card" style={{ borderColor: 'var(--color-orange)' }}>
                <span className="metric-label">Projected Rev (Mo 12)</span>
                <span className="metric-value">$200K</span>
              </div>
            </div>
            <button className="form-btn" style={{ marginTop: 12, background: 'var(--color-orange)' }}>Plan Details</button>
          </div>

          <div className="location-card location-planned">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Waukegan</h3>
              <span className="location-badge badge-planned">Planned</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginBottom: 4 }}>Target: Q2 2026 Open</div>
            <div className="metrics-grid" style={{ marginTop: 12 }}>
              <div className="metric-card" style={{ borderColor: 'var(--color-orange)' }}>
                <span className="metric-label">Members</span>
                <span className="metric-value">0</span>
              </div>
              <div className="metric-card" style={{ borderColor: 'var(--color-orange)' }}>
                <span className="metric-label">Projected Rev (Mo 12)</span>
                <span className="metric-value">$150K</span>
              </div>
            </div>
            <button className="form-btn" style={{ marginTop: 12, background: 'var(--color-orange)' }}>Plan Details</button>
          </div>
        </div>
      </section>

      {/* Franchise Model */}
      <section className="panel">
        <h2>Franchise Model</h2>
        <p className="section-desc">Shape The Wave franchise partnership details</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {FRANCHISE_ITEMS.map((f, i) => (
                <tr key={i}>
                  <td className="cell-name">{f.item}</td>
                  <td>{f.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* White-Label Configuration */}
      <section className="panel">
        <h2>White-Label Configuration</h2>
        <p className="section-desc">Customize branding for franchise locations</p>
        <div className="white-label-form">
          <label>
            Practice Name
            <input value={whiteLabel.practiceName} onChange={(e) => updateField('practiceName', e.target.value)} />
          </label>
          <label>
            Logo URL
            <input value={whiteLabel.logoUrl} onChange={(e) => updateField('logoUrl', e.target.value)} placeholder="https://..." />
          </label>
          <label>
            Primary Color
            <input type="color" value={whiteLabel.primaryColor} onChange={(e) => updateField('primaryColor', e.target.value)} />
          </label>
          <label>
            Secondary Color
            <input type="color" value={whiteLabel.secondaryColor} onChange={(e) => updateField('secondaryColor', e.target.value)} />
          </label>
          <label>
            Domain
            <input value={whiteLabel.domain} onChange={(e) => updateField('domain', e.target.value)} />
          </label>
          <label>
            Phone
            <input value={whiteLabel.phone} onChange={(e) => updateField('phone', e.target.value)} />
          </label>
          <label>
            Email
            <input value={whiteLabel.email} onChange={(e) => updateField('email', e.target.value)} />
          </label>
          <label>
            Address
            <input value={whiteLabel.address} onChange={(e) => updateField('address', e.target.value)} />
          </label>
        </div>
        <div className="white-label-preview">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: whiteLabel.primaryColor }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{whiteLabel.practiceName}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{whiteLabel.domain}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 60, height: 8, borderRadius: 4, background: whiteLabel.primaryColor }} />
            <div style={{ width: 60, height: 8, borderRadius: 4, background: whiteLabel.secondaryColor }} />
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-text-dim)' }}>
            {whiteLabel.phone} | {whiteLabel.email}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginTop: 4 }}>
            {whiteLabel.address}
          </div>
        </div>
      </section>

      {/* Affiliate Program */}
      <section className="panel">
        <h2>Affiliate Program</h2>
        <p className="section-desc">Partner referral tracking and commissions</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Partner</th>
                <th>Referrals</th>
                <th>Conversions</th>
                <th>Conv. Rate</th>
                <th>Commission</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {AFFILIATES.map((a, i) => (
                <tr key={i}>
                  <td className="cell-name">{a.partner}</td>
                  <td>{a.referrals}</td>
                  <td>{a.conversions}</td>
                  <td>{a.rate}</td>
                  <td className="cell-revenue">{a.commission}</td>
                  <td>
                    <span className={`status-badge ${a.status === 'Active' ? 'status-connected' : 'status-in-progress'}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Expansion Timeline */}
      <section className="panel">
        <h2>Expansion Timeline</h2>
        <p className="section-desc">Multi-location growth roadmap</p>
        <div className="timeline">
          {MILESTONES.map((m, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-date">{m.quarter}</div>
              <div className="timeline-title">{m.title}</div>
              <div className="timeline-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MultiLocationTab;
