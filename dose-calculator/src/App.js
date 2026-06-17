import { useState, useMemo } from 'react';
import './App.css';

const DEFAULT_INPUTS = {
  targetMargin: 0.60,
  minLtvCac: 3.00,
  growthMode: 'SCALE',
  monthlyGrowthRate: 0.10,
  arpu: 30,
  churnRate: 0.08,
  startingCash: 50000,
  maxCac: 30,
};

const DEFAULT_PRODUCTS = [
  { name: 'Basic', tier: 'Starter', totalCost: 8, maxCost: 10, price: 19, includes: ['Content Library'] },
  { name: 'Pro', tier: 'Growth', totalCost: 28, maxCost: 35, price: 49, includes: ['Content Library', 'All Courses', 'T-Shirt'] },
  { name: 'Premium', tier: 'Scale', totalCost: 52, maxCost: 60, price: 99, includes: ['Content Library', 'All Courses', 'Hoodie', 'T-Shirt', '1-on-1 Coaching'] },
];

const DEFAULT_SALES = [
  { product: 'Basic', unitsSold: 500, price: 19 },
  { product: 'Pro', unitsSold: 300, price: 49 },
  { product: 'Premium', unitsSold: 100, price: 99 },
];

function InputsPanel({ inputs, setInputs }) {
  const update = (key, raw) => {
    const val = key === 'growthMode' ? raw : Number(raw);
    setInputs(prev => ({ ...prev, [key]: val }));
  };

  return (
    <section className="panel inputs-panel">
      <h2>Inputs</h2>
      <div className="input-grid">
        <label>Target Margin
          <input type="number" step="0.01" value={inputs.targetMargin}
            onChange={e => update('targetMargin', e.target.value)} />
        </label>
        <label>Min LTV:CAC
          <input type="number" step="0.1" value={inputs.minLtvCac}
            onChange={e => update('minLtvCac', e.target.value)} />
        </label>
        <label>Growth Mode
          <select value={inputs.growthMode} onChange={e => update('growthMode', e.target.value)}>
            <option value="SCALE">SCALE</option>
            <option value="HOLD">HOLD</option>
            <option value="CUT">CUT</option>
          </select>
        </label>
        <label>Monthly Growth Rate
          <input type="number" step="0.01" value={inputs.monthlyGrowthRate}
            onChange={e => update('monthlyGrowthRate', e.target.value)} />
        </label>
        <label>ARPU
          <input type="number" step="1" value={inputs.arpu}
            onChange={e => update('arpu', e.target.value)} />
        </label>
        <label>Churn Rate
          <input type="number" step="0.01" value={inputs.churnRate}
            onChange={e => update('churnRate', e.target.value)} />
        </label>
        <label>Starting Cash
          <input type="number" step="1000" value={inputs.startingCash}
            onChange={e => update('startingCash', e.target.value)} />
        </label>
        <label>Max CAC
          <input type="number" step="1" value={inputs.maxCac}
            onChange={e => update('maxCac', e.target.value)} />
        </label>
      </div>
      <div className={`growth-badge growth-${inputs.growthMode.toLowerCase()}`}>
        {inputs.growthMode}
      </div>
    </section>
  );
}

function ProductsTable({ products, setProducts, targetMargin }) {
  const updateProduct = (idx, key, raw) => {
    setProducts(prev => prev.map((p, i) =>
      i === idx ? { ...p, [key]: Number(raw) } : p
    ));
  };

  return (
    <section className="panel">
      <h2>Memberships</h2>
      <div className="membership-cards">
        {products.map((p, i) => {
          const margin = (p.price - p.totalCost) / p.price;
          const ok = margin >= targetMargin;
          return (
            <div key={p.name} className={`membership-card tier-${p.tier.toLowerCase()}`}>
              <div className="membership-header">
                <span className={`tier-tag tier-tag-${p.tier.toLowerCase()}`}>{p.tier}</span>
                <span className="cell-status">{ok ? '✅' : '⚠️'}</span>
              </div>
              <h3 className="membership-name">{p.name}</h3>
              <div className="membership-price">
                <span className="price-amount">${p.price}</span>
                <span className="price-period">/mo</span>
              </div>
              <ul className="membership-includes">
                {p.includes.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="membership-financials">
                <div className="financial-row">
                  <span>Cost</span>
                  <input type="number" value={p.totalCost}
                    onChange={e => updateProduct(i, 'totalCost', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Max Cost</span>
                  <input type="number" value={p.maxCost}
                    onChange={e => updateProduct(i, 'maxCost', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Price</span>
                  <input type="number" value={p.price}
                    onChange={e => updateProduct(i, 'price', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Margin</span>
                  <span className={ok ? 'cell-good' : 'cell-warn'}>{(margin * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SalesTable({ sales, setSales }) {
  const updateSale = (idx, key, raw) => {
    setSales(prev => prev.map((s, i) =>
      i === idx ? { ...s, [key]: Number(raw) } : s
    ));
  };

  return (
    <section className="panel">
      <h2>Sales</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Units Sold</th>
              <th>Price</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s, i) => {
              const revenue = s.unitsSold * s.price;
              return (
                <tr key={s.product}>
                  <td className="cell-name">{s.product}</td>
                  <td>
                    <input type="number" value={s.unitsSold}
                      onChange={e => updateSale(i, 'unitsSold', e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={s.price}
                      onChange={e => updateSale(i, 'price', e.target.value)} />
                  </td>
                  <td className="cell-revenue">${revenue.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SummaryPanel({ summary }) {
  const metrics = [
    { label: 'Total Revenue', value: `$${summary.totalRevenue.toLocaleString()}`, color: 'var(--color-blue)' },
    { label: 'Total Costs', value: `$${summary.totalCosts.toLocaleString()}`, color: 'var(--color-orange)' },
    { label: 'Profit', value: `$${summary.profit.toLocaleString()}`, color: summary.profit >= 0 ? 'var(--color-green)' : 'var(--color-red)' },
    { label: 'Margin', value: `${(summary.margin * 100).toFixed(1)}%`, color: summary.margin >= 0.6 ? 'var(--color-green)' : 'var(--color-orange)' },
    { label: 'LTV', value: `$${summary.ltv.toFixed(2)}`, color: 'var(--color-blue)' },
    { label: 'LTV:CAC', value: summary.ltvCac.toFixed(2), color: summary.ltvCac >= 3 ? 'var(--color-green)' : 'var(--color-red)' },
    { label: 'Burn Rate', value: `$${summary.burnRate.toLocaleString()}`, color: summary.burnRate <= 0 ? 'var(--color-green)' : 'var(--color-red)' },
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

function RevenueChart({ sales }) {
  const revenues = sales.map(s => ({ product: s.product, revenue: s.unitsSold * s.price }));
  const maxRev = Math.max(...revenues.map(r => r.revenue));

  return (
    <section className="panel">
      <h2>Revenue by Membership</h2>
      <div className="chart">
        {revenues.map(r => (
          <div key={r.product} className="chart-row">
            <span className="chart-label">{r.product}</span>
            <div className="chart-bar-wrapper">
              <div
                className="chart-bar"
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

function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [sales, setSales] = useState(DEFAULT_SALES);

  const summary = useMemo(() => {
    const totalRevenue = sales.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const totalCosts = products.reduce((sum, p) => sum + p.totalCost, 0);
    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? profit / totalRevenue : 0;
    const ltv = inputs.churnRate > 0 ? inputs.arpu / inputs.churnRate : 0;
    const ltvCac = inputs.maxCac > 0 ? ltv / inputs.maxCac : 0;
    const burnRate = totalCosts - totalRevenue;
    const runway = burnRate > 0 ? inputs.startingCash / burnRate : Infinity;

    return { totalRevenue, totalCosts, profit, margin, ltv, ltvCac, burnRate, runway };
  }, [inputs, products, sales]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <span className="subtitle">Membership & Revenue Analysis</span>
      </header>
      <div className="dashboard-grid">
        <InputsPanel inputs={inputs} setInputs={setInputs} />
        <SummaryPanel summary={summary} />
        <ProductsTable products={products} setProducts={setProducts} targetMargin={inputs.targetMargin} />
        <SalesTable sales={sales} setSales={setSales} />
        <RevenueChart sales={sales} />
      </div>
    </div>
  );
}

export default App;
