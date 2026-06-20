function SummaryPanel({ summary }) {
  const metrics = [
    { label: 'Membership MRR', value: `$${summary.membershipRevenue.toLocaleString()}`, color: 'var(--color-blue)' },
    { label: 'Bundle Revenue', value: `$${summary.bundleRevenue.toLocaleString()}`, color: 'var(--color-teal)' },
    { label: 'Package Revenue', value: `$${summary.packageRevenue.toLocaleString()}`, color: 'var(--color-purple)' },
    { label: 'Starter Fee Revenue', value: `$${summary.starterFeeRevenue.toLocaleString()}`, color: 'var(--color-purple)' },
    { label: 'Total Revenue', value: `$${summary.totalRevenue.toLocaleString()}`, color: 'var(--color-blue)' },
    { label: 'Total Costs', value: `$${summary.totalCosts.toLocaleString()}`, color: 'var(--color-orange)' },
    { label: 'Profit', value: `$${summary.profit.toLocaleString()}`, color: summary.profit >= 0 ? 'var(--color-green)' : 'var(--color-red)' },
    { label: 'Margin', value: `${(summary.margin * 100).toFixed(1)}%`, color: summary.margin >= 0.6 ? 'var(--color-green)' : 'var(--color-orange)' },
    { label: 'LTV', value: `$${summary.ltv.toFixed(2)}`, color: 'var(--color-blue)' },
    { label: 'LTV:CAC', value: summary.ltvCac.toFixed(2), color: summary.ltvCac >= 3 ? 'var(--color-green)' : 'var(--color-red)' },
    { label: 'Runway', value: summary.burnRate >= 0 ? 'Profitable' : `${summary.runway.toFixed(1)} months`, color: summary.burnRate >= 0 ? 'var(--color-green)' : 'var(--color-orange)' },
  ];

  return (
    <section className="panel summary-panel">
      <h2>Summary</h2>
      <div className="metrics-grid">
        {metrics.map(m => (
          <div key={m.label} className="metric-card" style={{ borderLeftColor: m.color }}>
            <span className="metric-label">{m.label}</span>
            <span className="metric-value" style={{ color: m.color }}>{m.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SummaryPanel;
