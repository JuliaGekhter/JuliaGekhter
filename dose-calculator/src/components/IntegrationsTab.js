import { useState } from 'react';

const INTEGRATIONS = [
  {
    name: 'Zenoti',
    status: 'Connected',
    lastSync: '2 hours ago',
    syncItems: [
      { label: 'Services', count: 50 },
      { label: 'Memberships', count: 5 },
      { label: 'Packages', count: 25 },
      { label: 'Bundles', count: 22 },
      { label: 'Inventory', count: 12 },
    ],
    buttons: ['Sync Now', 'Configure'],
  },
  {
    name: 'Athena Health',
    status: 'Connected',
    lastSync: '1 hour ago',
    syncItems: [
      { label: 'Patient Records', count: 345 },
      { label: 'Lab Results', count: 890 },
      { label: 'CPT Codes', count: 78 },
    ],
    buttons: ['Sync Now', 'Configure'],
  },
  {
    name: 'Stripe',
    status: 'Connected',
    lastSync: null,
    mode: 'Live',
    details: [
      { label: 'Payment Methods', value: 'Credit Card, HSA/FSA' },
      { label: 'Auto-billing', value: 'Active (350 members)' },
    ],
    buttons: ['View Dashboard', 'Configure'],
  },
  {
    name: 'Twilio',
    status: 'Connected',
    lastSync: null,
    details: [
      { label: 'SMS Sent (this month)', value: '1,240' },
      { label: 'Appointment Reminders', value: 'Active' },
      { label: 'No-show Alerts', value: 'Active' },
    ],
    buttons: ['View Logs', 'Configure'],
  },
  {
    name: 'SendGrid',
    status: 'Connected',
    lastSync: null,
    details: [
      { label: 'Emails Sent (this month)', value: '3,450' },
      { label: 'Campaigns Active', value: '3' },
      { label: 'Open Rate', value: '42%' },
    ],
    buttons: ['View Analytics', 'Configure'],
  },
  {
    name: 'Google Analytics',
    status: 'Connected',
    lastSync: null,
    details: [
      { label: 'Property', value: 'UA-XXXXXXX' },
      { label: 'Events Tracked', value: 'Booking, Registration, Purchase' },
    ],
    buttons: ['View Reports', 'Configure'],
  },
];

const API_KEYS = [
  { integration: 'Zenoti', key: 'sk-...3f8x', environment: 'Live', lastUsed: '2 hours ago' },
  { integration: 'Athena Health', key: 'sk-...9k2m', environment: 'Live', lastUsed: '1 hour ago' },
  { integration: 'Stripe', key: 'sk-...7p4q', environment: 'Live', lastUsed: '30 min ago' },
  { integration: 'Twilio', key: 'sk-...2n8v', environment: 'Live', lastUsed: '1 hour ago' },
  { integration: 'SendGrid', key: 'sk-...5j1w', environment: 'Live', lastUsed: '3 hours ago' },
  { integration: 'Google Analytics', key: 'sk-...8t6r', environment: 'Live', lastUsed: '6 hours ago' },
];

const SYNC_HISTORY = [
  { timestamp: 'Jun 22, 3:00 PM', integration: 'Zenoti', items: 114, status: 'Success' },
  { timestamp: 'Jun 22, 2:30 PM', integration: 'Athena Health', items: 1313, status: 'Success' },
  { timestamp: 'Jun 22, 1:00 PM', integration: 'Stripe', items: 350, status: 'Success' },
  { timestamp: 'Jun 21, 6:00 PM', integration: 'SendGrid', items: 3, status: 'Success' },
  { timestamp: 'Jun 21, 4:00 PM', integration: 'Twilio', items: 45, status: 'Failed' },
];

function IntegrationsTab() {
  const [envToggles, setEnvToggles] = useState(
    API_KEYS.reduce((acc, k) => ({ ...acc, [k.integration]: k.environment }), {})
  );

  const toggleEnv = (integration) => {
    setEnvToggles(prev => ({
      ...prev,
      [integration]: prev[integration] === 'Live' ? 'Test' : 'Live',
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="panel">
        <h2>Platform Integrations</h2>
        <p className="section-desc">Connected services and sync status</p>
        <div className="integration-cards">
          {INTEGRATIONS.map((integ) => (
            <div key={integ.name} className="integration-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{integ.name}</h3>
                <span className="status-badge status-connected">{integ.status}</span>
              </div>
              {integ.lastSync && (
                <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginBottom: 8 }}>
                  Last Sync: {integ.lastSync}
                </div>
              )}
              {integ.mode && (
                <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginBottom: 8 }}>
                  Mode: <span className="cell-good">{integ.mode}</span>
                </div>
              )}
              {integ.syncItems && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                  {integ.syncItems.map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: 'var(--color-text-dim)' }}>{item.label}</span>
                      <span style={{ fontWeight: 600 }}>{item.count}</span>
                    </div>
                  ))}
                </div>
              )}
              {integ.details && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                  {integ.details.map((d) => (
                    <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, flexWrap: 'wrap', gap: 4 }}>
                      <span style={{ color: 'var(--color-text-dim)' }}>{d.label}</span>
                      <span style={{ fontWeight: 600 }}>{d.value}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                {integ.buttons.map((btn) => (
                  <button key={btn} className="form-btn" style={{ marginTop: 0, fontSize: 12, padding: '6px 14px' }}>
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2>API Keys</h2>
        <p className="section-desc">Manage integration API keys and environments</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Integration</th>
                <th>Key</th>
                <th>Environment</th>
                <th>Last Used</th>
              </tr>
            </thead>
            <tbody>
              {API_KEYS.map((k) => (
                <tr key={k.integration}>
                  <td className="cell-name">{k.integration}</td>
                  <td><code style={{ fontSize: 13, color: 'var(--color-text-dim)' }}>{k.key}</code></td>
                  <td>
                    <button
                      className="form-btn"
                      style={{
                        marginTop: 0,
                        fontSize: 11,
                        padding: '4px 12px',
                        background: envToggles[k.integration] === 'Live' ? 'var(--color-green)' : 'var(--color-orange)',
                      }}
                      onClick={() => toggleEnv(k.integration)}
                    >
                      {envToggles[k.integration]}
                    </button>
                  </td>
                  <td style={{ color: 'var(--color-text-dim)' }}>{k.lastUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>Sync History</h2>
        <p className="section-desc">Recent synchronization events</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Integration</th>
                <th>Items Synced</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SYNC_HISTORY.map((s, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--color-text-dim)' }}>{s.timestamp}</td>
                  <td className="cell-name">{s.integration}</td>
                  <td>{s.items.toLocaleString()}</td>
                  <td className={s.status === 'Success' ? 'cell-good' : 'cell-warn'}>{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IntegrationsTab;
