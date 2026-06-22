function AnalyticsTab() {
  const providers = [
    { name: 'Dr. Tack', revenue: 280000, pct: 100 },
    { name: 'PA Johnson', revenue: 180000, pct: 64 },
    { name: 'NP Williams', revenue: 120000, pct: 43 },
    { name: 'MA Garcia', revenue: 70000, pct: 25 },
  ];

  const categories = [
    { name: 'Weight Loss', pct: 35, revenue: 227000, color: 'var(--color-teal)' },
    { name: 'Hormones/TRT', pct: 28, revenue: 182000, color: 'var(--color-orange)' },
    { name: 'Memberships', pct: 15, revenue: 97000, color: 'var(--color-blue)' },
    { name: 'Sexual Health', pct: 12, revenue: 78000, color: 'var(--color-red)' },
    { name: 'Wellness', pct: 10, revenue: 65000, color: 'var(--color-purple)' },
  ];

  const ageDist = [
    { range: '25-34', pct: 15 },
    { range: '35-44', pct: 30 },
    { range: '45-54', pct: 35 },
    { range: '55-64', pct: 15 },
    { range: '65+', pct: 5 },
  ];

  const cohorts = [
    { month: 'Jan 2025', size: 45, retention: [95, 88, 82, 78, 75, 72] },
    { month: 'Feb 2025', size: 52, retention: [94, 87, 81, 77, 74, null] },
    { month: 'Mar 2025', size: 48, retention: [96, 89, 83, 79, null, null] },
    { month: 'Apr 2025', size: 55, retention: [93, 86, 80, null, null, null] },
    { month: 'May 2025', size: 60, retention: [95, 88, null, null, null, null] },
    { month: 'Jun 2025', size: 65, retention: [94, null, null, null, null, null] },
  ];

  const churnReasons = [
    { reason: 'Cost', pct: 25, count: 18 },
    { reason: 'Results', pct: 20, count: 14 },
    { reason: 'Moved', pct: 15, count: 11 },
    { reason: 'Switched Provider', pct: 10, count: 7 },
    { reason: 'Schedule', pct: 15, count: 11 },
    { reason: 'Other', pct: 15, count: 11 },
  ];

  const topServices = [
    { rank: 1, name: 'Semaglutide First 3mo', units: 420, revenue: 157000, margin: 73 },
    { rank: 2, name: 'TRT Every 2 Weeks', units: 360, revenue: 135000, margin: 97 },
    { rank: 3, name: 'WL Level 3', units: 280, revenue: 175000, margin: 92 },
    { rank: 4, name: 'Tirzepatide 5mg', units: 200, revenue: 100000, margin: 70 },
    { rank: 5, name: 'Full Blood Panel', units: 350, revenue: 131000, margin: 65 },
    { rank: 6, name: 'New Patient Consultation', units: 310, revenue: 96000, margin: 84 },
    { rank: 7, name: 'Testosterone Cream', units: 250, revenue: 62000, margin: 78 },
    { rank: 8, name: 'Sildenafil 100mg', units: 200, revenue: 29000, margin: 77 },
    { rank: 9, name: 'Anti-Aging Gel Pump', units: 180, revenue: 31000, margin: 78 },
    { rank: 10, name: 'Naltrexone', units: 150, revenue: 27000, margin: 86 },
  ];

  const kpis = [
    { name: 'Monthly Revenue', target: '$500K', actual: '$649K', trend: 'up' },
    { name: 'Active Members', target: '300', actual: '350', trend: 'up' },
    { name: 'New Patients/Mo', target: '40', actual: '65', trend: 'up' },
    { name: 'Avg Revenue/Patient', target: '$1,200', actual: '$1,857', trend: 'up' },
    { name: 'Membership Churn', target: '<5%', actual: '5%', trend: 'flat' },
    { name: 'NPS Score', target: '>70', actual: '78', trend: 'up' },
    { name: 'Appointment Fill Rate', target: '>85%', actual: '92%', trend: 'up' },
    { name: 'No-Show Rate', target: '<10%', actual: '7%', trend: 'down-good' },
    { name: 'Avg Wait Time', target: '<5 min', actual: '3 min', trend: 'down-good' },
    { name: 'Collection Rate', target: '>95%', actual: '97%', trend: 'up' },
    { name: 'Patient Satisfaction', target: '>4.5', actual: '4.7/5', trend: 'up' },
    { name: 'Provider Utilization', target: '>80%', actual: '88%', trend: 'up' },
  ];

  const cohortClass = (val) => {
    if (val === null) return '';
    if (val >= 80) return 'cohort-good';
    if (val >= 70) return 'cohort-ok';
    return 'cohort-bad';
  };

  const trendArrow = (trend) => {
    if (trend === 'up') return { symbol: '↑', cls: 'trend-up' };
    if (trend === 'down-good') return { symbol: '↓', cls: 'trend-down-good' };
    if (trend === 'down-bad') return { symbol: '↓', cls: 'trend-down-bad' };
    return { symbol: '↔', cls: 'trend-flat' };
  };

  const fmt = (n) => '$' + (n / 1000).toFixed(0) + 'K';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Revenue by Provider */}
      <section className="panel">
        <h2>Revenue by Provider</h2>
        <p className="section-desc">Monthly revenue attribution by provider</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {providers.map(p => (
            <div className="analytics-bar" key={p.name}>
              <span className="analytics-bar-label">{p.name}</span>
              <div className="chart-bar-wrapper">
                <div className="chart-bar" style={{ width: `${p.pct}%` }} />
              </div>
              <span className="analytics-bar-value">{fmt(p.revenue)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue by Category */}
      <section className="panel">
        <h2>Revenue by Category</h2>
        <p className="section-desc">Revenue distribution across service categories</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {categories.map(c => (
            <div className="analytics-bar" key={c.name}>
              <span className="analytics-bar-label">{c.name}</span>
              <div className="chart-bar-wrapper">
                <div className="analytics-bar-fill" style={{ width: `${c.pct}%`, background: c.color }} />
              </div>
              <span className="analytics-bar-value">{c.pct}% &middot; {fmt(c.revenue)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Patient Demographics */}
      <section className="panel">
        <h2>Patient Demographics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-dim)', marginBottom: 12 }}>Age Distribution</h3>
            {ageDist.map(a => (
              <div className="analytics-bar" key={a.range}>
                <span className="analytics-bar-label">{a.range}</span>
                <div className="chart-bar-wrapper">
                  <div className="analytics-bar-fill" style={{ width: `${a.pct}%`, background: 'var(--color-blue)' }} />
                </div>
                <span className="analytics-bar-value">{a.pct}%</span>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-dim)', marginBottom: 12 }}>Gender</h3>
            <div className="metrics-grid">
              <div className="metric-card" style={{ borderColor: 'var(--color-blue)' }}>
                <span className="metric-label">Male</span>
                <span className="metric-value">55%</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>192 patients</span>
              </div>
              <div className="metric-card" style={{ borderColor: 'var(--color-purple)' }}>
                <span className="metric-label">Female</span>
                <span className="metric-value">45%</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>158 patients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retention Cohorts */}
      <section className="panel">
        <h2>Retention Cohorts</h2>
        <p className="section-desc">Monthly retention rates by signup cohort</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Cohort</th>
                <th>Size</th>
                <th>Month 1</th>
                <th>Month 2</th>
                <th>Month 3</th>
                <th>Month 4</th>
                <th>Month 5</th>
                <th>Month 6</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map(c => (
                <tr key={c.month}>
                  <td style={{ fontWeight: 600 }}>{c.month}</td>
                  <td>{c.size}</td>
                  {c.retention.map((r, i) => (
                    <td key={i} className={cohortClass(r)} style={{ fontWeight: 600 }}>
                      {r !== null ? `${r}%` : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Churn Analysis */}
      <section className="panel">
        <h2>Churn Analysis</h2>
        <p className="section-desc">Reasons patients leave the practice</p>
        <div className="metrics-grid">
          {churnReasons.map(r => (
            <div className="metric-card" key={r.reason} style={{ borderColor: 'var(--color-orange)' }}>
              <span className="metric-label">{r.reason}</span>
              <span className="metric-value">{r.pct}%</span>
              <span style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{r.count} patients</span>
            </div>
          ))}
        </div>
      </section>

      {/* Top 10 Services */}
      <section className="panel">
        <h2>Top 10 Services</h2>
        <p className="section-desc">Highest performing services by revenue</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Service</th>
                <th>Units</th>
                <th>Revenue</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>
              {topServices.map(s => (
                <tr key={s.rank}>
                  <td style={{ fontWeight: 700 }}>#{s.rank}</td>
                  <td className="cell-name">{s.name}</td>
                  <td>{s.units}</td>
                  <td className="cell-revenue">{fmt(s.revenue)}</td>
                  <td className={s.margin >= 80 ? 'cell-good' : s.margin >= 70 ? 'cell-warn' : ''}>{s.margin}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* KPI Scorecard */}
      <section className="panel">
        <h2>KPI Scorecard</h2>
        <p className="section-desc">Key performance indicators vs targets</p>
        <div className="kpi-grid">
          {kpis.map(k => {
            const t = trendArrow(k.trend);
            return (
              <div className="kpi-card" key={k.name}>
                <div className="kpi-name">{k.name}</div>
                <div className="kpi-actual">
                  {k.actual} <span className={t.cls} style={{ fontSize: 16 }}>{t.symbol}</span>
                </div>
                <div className="kpi-target">Target: {k.target}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AnalyticsTab;
