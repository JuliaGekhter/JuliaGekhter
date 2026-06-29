import { useState } from 'react';

function StrategyTab() {
  const [roiInputs, setRoiInputs] = useState({
    spend: 5000,
    channel: 'Google Ads',
  });

  const channelDefaults = {
    'Google Ads':       { impressions: 50000, ctr: 0.035, consultRate: 0.20, conversionRate: 0.30, revenuePerPatient: 3000 },
    'Facebook':         { impressions: 80000, ctr: 0.012, consultRate: 0.15, conversionRate: 0.25, revenuePerPatient: 2800 },
    'Instagram':        { impressions: 100000, ctr: 0.010, consultRate: 0.12, conversionRate: 0.25, revenuePerPatient: 2500 },
    'Referral Program': { impressions: 500, ctr: 0.60, consultRate: 0.80, conversionRate: 0.50, revenuePerPatient: 3500 },
  };

  const ch = channelDefaults[roiInputs.channel];
  const scaleFactor = roiInputs.spend / 5000;
  const impressions = Math.round(ch.impressions * scaleFactor);
  const clicks = Math.round(impressions * ch.ctr);
  const consultations = Math.round(clicks * ch.consultRate);
  const newPatients = Math.round(consultations * ch.conversionRate);
  const totalRevenue = newPatients * ch.revenuePerPatient;
  const roi = roiInputs.spend > 0 ? ((totalRevenue - roiInputs.spend) / roiInputs.spend) * 100 : 0;
  const paybackMonths = roiInputs.spend > 0 ? (roiInputs.spend / (totalRevenue / 12)).toFixed(1) : 0;

  return (
    <div className="dashboard-grid">
      {/* ROI Calculator */}
      <section className="panel">
        <h2>ROI Calculator</h2>
        <div className="form-grid" style={{ marginBottom: 20 }}>
          <label>Marketing Spend ($)
            <input type="number" value={roiInputs.spend}
              onChange={e => setRoiInputs(prev => ({ ...prev, spend: Number(e.target.value) }))} />
          </label>
          <label>Channel
            <select value={roiInputs.channel}
              onChange={e => setRoiInputs(prev => ({ ...prev, channel: e.target.value }))}>
              <option>Google Ads</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Referral Program</option>
            </select>
          </label>
        </div>
        <div className="metrics-grid">
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
            <span className="metric-label">Expected Impressions</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>{impressions.toLocaleString()}</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-teal)' }}>
            <span className="metric-label">Click-Through Rate</span>
            <span className="metric-value" style={{ color: 'var(--color-teal)' }}>{(ch.ctr * 100).toFixed(1)}%</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-purple)' }}>
            <span className="metric-label">New Consultations</span>
            <span className="metric-value" style={{ color: 'var(--color-purple)' }}>{consultations}</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-orange)' }}>
            <span className="metric-label">Conversion Rate</span>
            <span className="metric-value" style={{ color: 'var(--color-orange)' }}>{(ch.conversionRate * 100).toFixed(0)}%</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-green)' }}>
            <span className="metric-label">New Patients</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>{newPatients}</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
            <span className="metric-label">Revenue per Patient (LTV)</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>${ch.revenuePerPatient.toLocaleString()}</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-teal)' }}>
            <span className="metric-label">Total Revenue</span>
            <span className="metric-value" style={{ color: 'var(--color-teal)' }}>${totalRevenue.toLocaleString()}</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: roi > 0 ? 'var(--color-green)' : 'var(--color-red)' }}>
            <span className="metric-label">ROI %</span>
            <span className="metric-value" style={{ color: roi > 0 ? 'var(--color-green)' : 'var(--color-red)' }}>{roi.toFixed(0)}%</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-purple)' }}>
            <span className="metric-label">Payback Period</span>
            <span className="metric-value" style={{ color: 'var(--color-purple)' }}>{paybackMonths} months</span>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="panel">
        <h2>Competitor Comparison</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Shape The Wave</th>
                <th>Competitor A</th>
                <th>Competitor B</th>
                <th>Competitor C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="cell-name">Monthly Membership</td>
                <td className="cell-good">$59-$499</td>
                <td>$75-$300</td>
                <td>$100-$250</td>
                <td>No membership</td>
              </tr>
              <tr>
                <td className="cell-name">Semaglutide</td>
                <td className="cell-good">$374/mo</td>
                <td>$450/mo</td>
                <td>$500/mo</td>
                <td>$399/mo</td>
              </tr>
              <tr>
                <td className="cell-name">TRT</td>
                <td className="cell-good">$374/mo</td>
                <td>$400/mo</td>
                <td>$350/mo</td>
                <td>$450/mo</td>
              </tr>
              <tr>
                <td className="cell-name">Tirzepatide</td>
                <td className="cell-good">$499/mo</td>
                <td>$599/mo</td>
                <td>N/A</td>
                <td>$550/mo</td>
              </tr>
              <tr>
                <td className="cell-name">Blood Panel</td>
                <td className="cell-good">$374</td>
                <td>$500</td>
                <td>$450</td>
                <td>$400</td>
              </tr>
              <tr>
                <td className="cell-name">Telehealth</td>
                <td className="cell-good">$99</td>
                <td>$150</td>
                <td>$125</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td className="cell-name">CPT Billing</td>
                <td className="cell-good">Yes</td>
                <td>Yes</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Referral Program</td>
                <td className="cell-good">Yes</td>
                <td>No</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Market Sizing */}
      <section className="panel">
        <h2>Market Sizing</h2>
        <div className="strategy-cards">
          <div className="strategy-card">
            <span className="metric-label">Lake County IL Population</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>714,000</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">Target Demo (25-65)</span>
            <span className="metric-value" style={{ color: 'var(--color-teal)' }}>~380,000</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">TAM (Total Market)</span>
            <span className="metric-value" style={{ color: 'var(--color-purple)' }}>$285M</span>
            <span style={{ fontSize: 10, color: 'var(--color-text-dim)' }}>Concierge health + weight loss + HRT</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">SAM (Serviceable)</span>
            <span className="metric-value" style={{ color: 'var(--color-orange)' }}>$42M</span>
            <span style={{ fontSize: 10, color: 'var(--color-text-dim)' }}>Gurnee + surrounding 15mi</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">SOM (Obtainable Year 1)</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>$2.1M</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">Current Revenue Run Rate</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>$7.8M</span>
            <span style={{ fontSize: 10, color: 'var(--color-text-dim)' }}>$649K/mo ARR</span>
          </div>
        </div>
      </section>

      {/* Unit Economics */}
      <section className="panel">
        <h2>Unit Economics</h2>
        <div className="strategy-cards">
          <div className="strategy-card">
            <span className="metric-label">CAC</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>$80</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">LTV</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>$3,000</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">LTV:CAC</span>
            <span className="metric-value" style={{ color: 'var(--color-teal)' }}>37.5x</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">Payback Period</span>
            <span className="metric-value" style={{ color: 'var(--color-purple)' }}>0.5 mo</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">Monthly Churn</span>
            <span className="metric-value" style={{ color: 'var(--color-orange)' }}>5%</span>
          </div>
          <div className="strategy-card">
            <span className="metric-label">Gross Margin</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>98%</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StrategyTab;
