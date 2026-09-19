import { useMemo } from 'react';
import {
  VENDOR_DATES, VENDOR_CONTACTS, VENDOR_SUBSCRIPTION, ZPAY_RATES,
  ESCALATION_LEVELS, LEVERAGE_WINDOWS, NEGOTIATION_ASKS, RED_FLAGS,
  VENDOR_OBLIGATIONS,
} from '../data/vendors';

function daysUntil(dateStr) {
  const ms = new Date(dateStr) - new Date();
  return Math.ceil(ms / 86400000);
}

export default function VendorsTab() {
  const monthlyTotal = useMemo(
    () => VENDOR_SUBSCRIPTION.reduce((sum, s) => sum + s.price, 0),
    []
  );

  const upcoming = useMemo(
    () => VENDOR_DATES
      .map(d => ({ ...d, days: daysUntil(d.date) }))
      .filter(d => d.days >= 0)
      .sort((a, b) => a.days - b.days),
    []
  );

  return (
    <div>
      {/* Countdown metrics */}
      <section className="panel">
        <h2>Zenoti — Vendor Management</h2>
        <div className="metrics-grid">
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
            <span className="metric-label">Monthly Subscription</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>${monthlyTotal}/mo</span>
          </div>
          {upcoming.slice(0, 3).map(d => (
            <div key={d.event} className="metric-card"
              style={{ borderLeftColor: d.days < 90 ? 'var(--color-orange)' : 'var(--color-teal)' }}>
              <span className="metric-label">{d.event}</span>
              <span className="metric-value"
                style={{ color: d.days < 90 ? 'var(--color-orange)' : 'var(--color-teal)' }}>
                {d.days} days
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Critical dates */}
      <section className="panel">
        <h2>Critical Dates</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>Event</th><th>Date</th><th>Action Required</th></tr>
            </thead>
            <tbody>
              {VENDOR_DATES.map(d => (
                <tr key={d.event}>
                  <td className="cell-name">{d.event}</td>
                  <td>{d.date}</td>
                  <td>{d.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Subscription breakdown */}
      <section className="panel">
        <h2>Subscription Line Items</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>Item</th><th>Price</th><th>Quantity</th><th>Notes</th></tr>
            </thead>
            <tbody>
              {VENDOR_SUBSCRIPTION.map(s => (
                <tr key={s.item}>
                  <td className="cell-name">{s.item}</td>
                  <td>{s.price > 0 ? `$${s.price}/mo` : 'Included'}</td>
                  <td>{s.qty}</td>
                  <td>{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ZPay rates */}
      <section className="panel">
        <h2>ZPay Processing Rates</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>Transaction Type</th><th>Rate</th></tr>
            </thead>
            <tbody>
              {ZPAY_RATES.map(r => (
                <tr key={r.type}>
                  <td className="cell-name">{r.type}</td>
                  <td>{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contacts */}
      <section className="panel">
        <h2>Key Contacts</h2>
        <div className="vendor-cards">
          {VENDOR_CONTACTS.map(c => (
            <div key={c.name} className="vendor-card">
              <div className="vendor-card-title">{c.name}</div>
              <div className="vendor-card-sub">{c.role}</div>
              <div className="vendor-card-line">{c.reach}</div>
              <div className="vendor-card-use">{c.useFor}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Escalation path */}
      <section className="panel">
        <h2>Escalation Path</h2>
        {ESCALATION_LEVELS.map(l => (
          <div key={l.level} className="escalation-row">
            <div className="escalation-level">L{l.level}</div>
            <div>
              <div className="vendor-card-title">{l.name}</div>
              <div className="vendor-card-line">{l.how}</div>
              <div className="vendor-card-sub">Use for: {l.useFor}</div>
              <div className="vendor-card-use">{l.next}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Leverage windows */}
      <section className="panel">
        <h2>Leverage Windows</h2>
        <div className="vendor-cards">
          {LEVERAGE_WINDOWS.map(w => (
            <div key={w.period} className="vendor-card">
              <span className={w.level === 'HIGH' ? 'leverage-high' : 'leverage-low'}>
                {w.level}
              </span>
              <div className="vendor-card-title">{w.period}</div>
              <div className="vendor-card-sub">{w.why}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Negotiation asks */}
      <section className="panel">
        <h2>Negotiation Framework</h2>
        <div className="vendor-cards">
          {NEGOTIATION_ASKS.map(n => (
            <div key={n.area} className="vendor-card">
              <div className="vendor-card-title">{n.area}</div>
              <ul className="vendor-list">
                {n.asks.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Obligations */}
      <section className="panel">
        <h2>Contractual Obligations</h2>
        <div className="vendor-cards">
          <div className="vendor-card">
            <div className="vendor-card-title obligation-owed">What Zenoti Owes Us</div>
            <ul className="vendor-list">
              {VENDOR_OBLIGATIONS.owed.map(o => <li key={o}>{o}</li>)}
            </ul>
          </div>
          <div className="vendor-card">
            <div className="vendor-card-title obligation-not">What They Do NOT Owe Us</div>
            <ul className="vendor-list">
              {VENDOR_OBLIGATIONS.notOwed.map(o => <li key={o}>{o}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Red flags */}
      <section className="panel">
        <h2>Red Flags</h2>
        <div className="vendor-cards">
          {RED_FLAGS.map(r => (
            <div key={r.category} className="vendor-card">
              <div className="vendor-card-title obligation-not">{r.category}</div>
              <ul className="vendor-list">
                {r.flags.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="vendor-footnote">
          Multiple red flags = start evaluating alternatives (Mindbody, Boulevard, Vagaro,
          Patientnow, Aesthetic Record). Get a competitive quote every 18 months. Document
          every commitment in writing.
        </p>
      </section>
    </div>
  );
}
