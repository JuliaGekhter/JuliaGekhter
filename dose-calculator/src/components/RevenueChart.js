function RevenueChart({ sales }) {
  const all = [
    ...sales.memberships.map(s => ({ name: s.name, revenue: s.unitsSold * s.price, type: 'membership' })),
    ...sales.bundles.map(s => ({ name: s.name, revenue: s.unitsSold * s.price, type: 'bundle' })),
    ...sales.packages.map(s => ({ name: s.name, revenue: s.unitsSold * s.price, type: 'package' })),
  ];
  const maxRev = Math.max(...all.map(r => r.revenue));

  return (
    <section className="panel">
      <h2>Revenue Breakdown</h2>
      <div className="chart">
        {all.map(r => (
          <div key={r.name} className="chart-row">
            <span className="chart-label">{r.name}</span>
            <div className="chart-bar-wrapper">
              <div
                className={`chart-bar ${r.type === 'package' ? 'chart-bar-package' : r.type === 'bundle' ? 'chart-bar-bundle' : ''}`}
                style={{ width: `${(r.revenue / maxRev) * 100}%` }}
              />
            </div>
            <span className="chart-value">${r.revenue.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RevenueChart;
