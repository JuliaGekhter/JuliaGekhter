import { useMemo } from 'react';

function ProjectionsPanel({ inputs, sales, memberships }) {
  const projections = useMemo(() => {
    const totalMembers = sales.memberships.reduce((s, m) => s + m.unitsSold, 0);
    const avgMemberPrice = totalMembers > 0
      ? sales.memberships.reduce((s, m) => s + m.unitsSold * m.price, 0) / totalMembers
      : 0;
    const avgStarterFee = memberships.length > 0
      ? memberships.reduce((s, m) => s + m.starterFee, 0) / memberships.length
      : 0;

    const growthMod = inputs.growthMode === 'SCALE' ? 1 : inputs.growthMode === 'HOLD' ? 0 : -0.5;
    const effectiveGrowth = inputs.monthlyGrowthRate * growthMod;

    const bundleRevBase = sales.bundles.reduce((s, b) => s + b.unitsSold * b.price, 0);
    const packageRevBase = sales.packages.reduce((s, p) => s + p.unitsSold * p.price, 0);

    const months = [];
    let members = totalMembers;
    let cash = inputs.startingCash;

    for (let i = 1; i <= 12; i++) {
      const prevMembers = members;
      const retained = prevMembers * (1 - inputs.churnRate);
      const newMembers = prevMembers * effectiveGrowth;
      members = Math.round(retained + newMembers);
      const actualNew = Math.max(0, members - retained);

      const mrr = members * avgMemberPrice;
      const starterRev = actualNew * avgStarterFee;
      const bundleRev = bundleRevBase * (1 + effectiveGrowth * i * 0.5);
      const packageRev = packageRevBase * (1 + effectiveGrowth * i * 0.5);
      const totalRev = mrr + starterRev + bundleRev + packageRev;
      const costs = totalRev * 0.33;
      const profit = totalRev - costs;
      cash += profit;

      months.push({
        month: i,
        members,
        newMembers: Math.round(actualNew),
        mrr: Math.round(mrr),
        starterRev: Math.round(starterRev),
        bundleRev: Math.round(bundleRev),
        packageRev: Math.round(packageRev),
        totalRev: Math.round(totalRev),
        costs: Math.round(costs),
        profit: Math.round(profit),
        cash: Math.round(cash),
      });
    }

    const breakEven = months.findIndex(m => m.cash > 0 && months[0].cash <= 0);

    return {
      months,
      breakEven: breakEven >= 0 ? breakEven + 1 : null,
      projectedArr: Math.round(months[11].mrr * 12),
      totalStarterFees: Math.round(months.reduce((s, m) => s + m.starterRev, 0)),
    };
  }, [inputs, sales, memberships]);

  const maxCash = Math.max(...projections.months.map(m => Math.abs(m.cash)));

  return (
    <section className="panel">
      <h2>Financial Projections</h2>
      <p className="section-desc">12-month forward projections based on current inputs and sales data</p>
      <div className="projections-metrics">
        <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
          <span className="metric-label">Month 12 Members</span>
          <span className="metric-value" style={{ color: 'var(--color-blue)' }}>{projections.months[11].members}</span>
        </div>
        <div className="metric-card" style={{ borderLeftColor: 'var(--color-teal)' }}>
          <span className="metric-label">Projected ARR</span>
          <span className="metric-value" style={{ color: 'var(--color-teal)' }}>${projections.projectedArr.toLocaleString()}</span>
        </div>
        <div className="metric-card" style={{ borderLeftColor: 'var(--color-purple)' }}>
          <span className="metric-label">Total Starter Fees</span>
          <span className="metric-value" style={{ color: 'var(--color-purple)' }}>${projections.totalStarterFees.toLocaleString()}</span>
        </div>
        <div className="metric-card" style={{ borderLeftColor: 'var(--color-green)' }}>
          <span className="metric-label">Break-Even Month</span>
          <span className="metric-value" style={{ color: 'var(--color-green)' }}>{projections.breakEven ? `Month ${projections.breakEven}` : 'N/A'}</span>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="projections-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Members</th>
              <th>New</th>
              <th>MRR</th>
              <th>Starter</th>
              <th>Bundles</th>
              <th>Packages</th>
              <th>Total Rev</th>
              <th>Costs</th>
              <th>Profit</th>
              <th>Cash</th>
            </tr>
          </thead>
          <tbody>
            {projections.months.map(m => (
              <tr key={m.month}>
                <td>{m.month}</td>
                <td>{m.members}</td>
                <td>{m.newMembers}</td>
                <td>${m.mrr.toLocaleString()}</td>
                <td>${m.starterRev.toLocaleString()}</td>
                <td>${m.bundleRev.toLocaleString()}</td>
                <td>${m.packageRev.toLocaleString()}</td>
                <td className="cell-good">${m.totalRev.toLocaleString()}</td>
                <td className="cell-warn">${m.costs.toLocaleString()}</td>
                <td className={m.profit >= 0 ? 'cell-good' : 'cell-warn'}>${m.profit.toLocaleString()}</td>
                <td className={m.cash >= 0 ? 'cell-good' : 'cell-warn'}>${m.cash.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 style={{ fontSize: 13, color: 'var(--color-text-dim)', marginTop: 16, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Cash Flow</h3>
      <div className="cash-chart">
        {projections.months.map(m => (
          <div key={m.month} className="chart-row">
            <span className="chart-label">M{m.month}</span>
            <div className="chart-bar-wrapper">
              <div
                className={`chart-bar ${m.cash < 0 ? 'chart-bar-bundle' : 'chart-bar-package'}`}
                style={{ width: `${(Math.abs(m.cash) / maxCash) * 100}%` }}
              />
            </div>
            <span className="chart-value">${m.cash.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectionsPanel;
