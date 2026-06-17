import { useState, useMemo } from 'react';
import './App.css';

const DEFAULT_INPUTS = {
  targetMargin: 0.60,
  minLtvCac: 3.00,
  growthMode: 'SCALE',
  monthlyGrowthRate: 0.10,
  arpu: 150,
  churnRate: 0.05,
  startingCash: 50000,
  maxCac: 80,
};

const DEFAULT_SERVICES = [
  { name: 'Office Visit', category: 'Primary Care', cost: 25, price: 75 },
  { name: 'Telehealth Visit', category: 'Primary Care', cost: 10, price: 50 },
  { name: 'Vitamin B-12 Injection', category: 'IV & Vitamins', cost: 8, price: 30 },
  { name: 'IV Vitamin Therapy', category: 'IV & Vitamins', cost: 40, price: 150 },
  { name: 'Botox (per area)', category: 'Aesthetics', cost: 80, price: 250 },
  { name: 'Dermal Fillers', category: 'Aesthetics', cost: 120, price: 400 },
  { name: 'RF Microneedling (Morpheus8)', category: 'Aesthetics', cost: 150, price: 500 },
  { name: 'IPL / Lumecca', category: 'Aesthetics', cost: 90, price: 300 },
  { name: 'Laser Hair Removal', category: 'Aesthetics', cost: 60, price: 200 },
  { name: 'Chemical Peel', category: 'Aesthetics', cost: 35, price: 120 },
  { name: 'Facial', category: 'Aesthetics', cost: 30, price: 100 },
  { name: 'Body Contouring', category: 'Aesthetics', cost: 100, price: 350 },
  { name: 'HRT Consultation', category: 'Hormones', cost: 30, price: 100 },
  { name: 'Testosterone Replacement', category: 'Hormones', cost: 45, price: 150 },
  { name: 'BHRT / Menopause Treatment', category: 'Hormones', cost: 50, price: 175 },
  { name: 'GLP-1 Medication', category: 'Weight Loss', cost: 80, price: 250 },
  { name: 'Nutritionist Consultation', category: 'Weight Loss', cost: 25, price: 85 },
  { name: 'Personal Training Session', category: 'Weight Loss', cost: 20, price: 65 },
  { name: 'Body Composition Analysis', category: 'Weight Loss', cost: 15, price: 50 },
  { name: 'Sexual Health / ED Treatment', category: 'Hormones', cost: 35, price: 125 },
];

const DEFAULT_PACKAGES = [
  {
    name: 'Weight Loss Kickstart',
    cost: 280,
    price: 699,
    services: [
      'GLP-1 Medication (1 month)',
      '4x Accountability consultations',
      '2x Nutritionist meal planning sessions',
      '4x Personal training sessions',
      'Body composition analysis',
      'Weight loss supplement bundle',
    ],
  },
  {
    name: 'Weight Loss Accelerator',
    cost: 520,
    price: 1299,
    services: [
      'GLP-1 Medication (3 months)',
      '12x Weekly accountability consultations',
      '6x Bi-weekly check-in meetings',
      '6x Nutritionist sessions',
      '12x Personal training sessions',
      '3x Progress labs & body comp',
      'Weight loss supplement bundle',
    ],
  },
  {
    name: 'Glow Up',
    cost: 350,
    price: 899,
    services: [
      '2x Botox sessions',
      '1x Dermal filler session',
      '2x Chemical peels',
      '2x Facials',
    ],
  },
  {
    name: 'Total Body Reset',
    cost: 680,
    price: 1699,
    services: [
      'GLP-1 Medication (3 months)',
      '12x Accountability consultations',
      '6x Personal training sessions',
      '3x Body contouring sessions',
      '3x Progress labs & body comp',
      'Nutritionist meal plan',
    ],
  },
];

const DEFAULT_MEMBERSHIPS = [
  {
    name: 'Wellness',
    tier: 'Starter',
    starterFee: 99,
    totalCost: 45,
    maxCost: 55,
    price: 149,
    credits: 2,
    services: [
      'Appointments within 3 days',
      'Telehealth via Zoom',
      '24/7 communication access',
      'Patient portal access',
    ],
    products: [
      'Monthly Vitamin B-12 injection',
      '15% off IV Therapy & supplements',
    ],
  },
  {
    name: 'Vitality',
    tier: 'Growth',
    starterFee: 149,
    totalCost: 95,
    maxCost: 115,
    price: 249,
    credits: 4,
    services: [
      'Everything in Wellness',
      'HRT & hormone management',
      'Rx refills & referral support',
      'Sexual health treatments',
    ],
    products: [
      'Monthly Vitamin B-12 injection',
      'Monthly IV Vitamin Therapy session',
      '20% off all aesthetics',
    ],
  },
  {
    name: 'Elite',
    tier: 'Scale',
    starterFee: 199,
    totalCost: 160,
    maxCost: 190,
    price: 399,
    credits: 8,
    services: [
      'Everything in Vitality',
      'Monthly facial or chemical peel',
      'Quarterly Botox or filler session',
      'Direct physician line',
    ],
    products: [
      'Monthly Vitamin B-12 injection',
      'Monthly IV Vitamin Therapy session',
      'Monthly supplement bundle',
      '30% off all aesthetics & lasers',
    ],
  },
  {
    name: 'Concierge',
    tier: 'VIP',
    starterFee: 249,
    totalCost: 240,
    maxCost: 280,
    price: 599,
    credits: 'Unlimited',
    services: [
      'Everything in Elite',
      'RF Microneedling (Morpheus8)',
      'Laser treatments (IPL / Diolaze)',
      'Body contouring sessions',
    ],
    products: [
      'All products included',
      'Priority scheduling',
      'Complimentary guest passes (2/mo)',
    ],
  },
];

const DEFAULT_SALES = {
  memberships: [
    { name: 'Wellness', unitsSold: 180, price: 149 },
    { name: 'Vitality', unitsSold: 90, price: 249 },
    { name: 'Elite', unitsSold: 50, price: 399 },
    { name: 'Concierge', unitsSold: 25, price: 599 },
  ],
  packages: [
    { name: 'Weight Loss Kickstart', unitsSold: 40, price: 699 },
    { name: 'Weight Loss Accelerator', unitsSold: 25, price: 1299 },
    { name: 'Glow Up', unitsSold: 30, price: 899 },
    { name: 'Total Body Reset', unitsSold: 15, price: 1699 },
  ],
};

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

function ServicesTable({ services, setServices, targetMargin }) {
  const updateService = (idx, key, raw) => {
    setServices(prev => prev.map((s, i) =>
      i === idx ? { ...s, [key]: Number(raw) } : s
    ));
  };

  const categories = [...new Set(services.map(s => s.category))];

  return (
    <section className="panel">
      <h2>Services</h2>
      <p className="section-desc">Individual a la carte services</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Margin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, i) => {
              const margin = s.price > 0 ? (s.price - s.cost) / s.price : 0;
              const ok = margin >= targetMargin;
              return (
                <tr key={s.name}>
                  <td className="cell-name">{s.name}</td>
                  <td><span className={`category-tag cat-${s.category.toLowerCase().replace(/[^a-z]/g, '')}`}>{s.category}</span></td>
                  <td>
                    <input type="number" value={s.cost}
                      onChange={e => updateService(i, 'cost', e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={s.price}
                      onChange={e => updateService(i, 'price', e.target.value)} />
                  </td>
                  <td className={ok ? 'cell-good' : 'cell-warn'}>{(margin * 100).toFixed(1)}%</td>
                  <td className="cell-status">{ok ? '✅' : '⚠️'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PackagesSection({ packages, setPackages, targetMargin }) {
  const updatePackage = (idx, key, raw) => {
    setPackages(prev => prev.map((p, i) =>
      i === idx ? { ...p, [key]: Number(raw) } : p
    ));
  };

  return (
    <section className="panel">
      <h2>Packages</h2>
      <p className="section-desc">Bundles of services — sold separately, not tied to memberships</p>
      <div className="package-cards">
        {packages.map((p, i) => {
          const margin = p.price > 0 ? (p.price - p.cost) / p.price : 0;
          const ok = margin >= targetMargin;
          return (
            <div key={p.name} className="package-card">
              <div className="package-header">
                <h3>{p.name}</h3>
                <span className="cell-status">{ok ? '✅' : '⚠️'}</span>
              </div>
              <div className="package-price">${p.price.toLocaleString()}</div>
              <ul className="package-services">
                {p.services.map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="membership-financials">
                <div className="financial-row">
                  <span>Cost</span>
                  <input type="number" value={p.cost}
                    onChange={e => updatePackage(i, 'cost', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Price</span>
                  <input type="number" value={p.price}
                    onChange={e => updatePackage(i, 'price', e.target.value)} />
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

function MembershipsSection({ memberships, setMemberships, targetMargin }) {
  const updateMembership = (idx, key, raw) => {
    setMemberships(prev => prev.map((m, i) =>
      i === idx ? { ...m, [key]: Number(raw) } : m
    ));
  };

  return (
    <section className="panel">
      <h2>Memberships</h2>
      <p className="section-desc">Monthly recurring — includes credits, services, and products</p>
      <div className="membership-cards">
        {memberships.map((m, i) => {
          const margin = (m.price - m.totalCost) / m.price;
          const ok = margin >= targetMargin;
          return (
            <div key={m.name} className={`membership-card tier-${m.tier.toLowerCase()}`}>
              <div className="membership-header">
                <span className={`tier-tag tier-tag-${m.tier.toLowerCase()}`}>{m.tier}</span>
                <span className="cell-status">{ok ? '✅' : '⚠️'}</span>
              </div>
              <h3 className="membership-name">{m.name}</h3>
              <div className="membership-pricing">
                <div className="membership-price">
                  <span className="price-amount">${m.price}</span>
                  <span className="price-period">/mo</span>
                </div>
                <div className="starter-fee">+ ${m.starterFee} starter fee</div>
              </div>
              <div className="credits-badge">{m.credits} credits/mo</div>
              <div className="membership-section">
                <span className="membership-section-label">Services</span>
                <ul className="membership-includes">
                  {m.services.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="membership-section">
                <span className="membership-section-label">Products</span>
                <ul className="membership-products">
                  {m.products.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="membership-financials">
                <div className="financial-row">
                  <span>Starter Fee</span>
                  <input type="number" value={m.starterFee}
                    onChange={e => updateMembership(i, 'starterFee', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Monthly Cost</span>
                  <input type="number" value={m.totalCost}
                    onChange={e => updateMembership(i, 'totalCost', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Monthly Price</span>
                  <input type="number" value={m.price}
                    onChange={e => updateMembership(i, 'price', e.target.value)} />
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
  const updateSale = (section, idx, key, raw) => {
    setSales(prev => ({
      ...prev,
      [section]: prev[section].map((s, i) =>
        i === idx ? { ...s, [key]: Number(raw) } : s
      ),
    }));
  };

  const renderTable = (title, data, section) => (
    <div className="sales-group">
      <h3 className="sales-group-title">{title}</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Units Sold</th>
              <th>Price</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => {
              const revenue = s.unitsSold * s.price;
              return (
                <tr key={s.name}>
                  <td className="cell-name">{s.name}</td>
                  <td>
                    <input type="number" value={s.unitsSold}
                      onChange={e => updateSale(section, i, 'unitsSold', e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={s.price}
                      onChange={e => updateSale(section, i, 'price', e.target.value)} />
                  </td>
                  <td className="cell-revenue">${revenue.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <section className="panel">
      <h2>Sales</h2>
      {renderTable('Membership Sales', sales.memberships, 'memberships')}
      {renderTable('Package Sales', sales.packages, 'packages')}
    </section>
  );
}

function SummaryPanel({ summary }) {
  const metrics = [
    { label: 'Membership MRR', value: `$${summary.membershipRevenue.toLocaleString()}`, color: 'var(--color-blue)' },
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

function RevenueChart({ sales }) {
  const all = [
    ...sales.memberships.map(s => ({ name: s.name, revenue: s.unitsSold * s.price, type: 'membership' })),
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
                className={`chart-bar ${r.type === 'package' ? 'chart-bar-package' : ''}`}
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
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [memberships, setMemberships] = useState(DEFAULT_MEMBERSHIPS);
  const [sales, setSales] = useState(DEFAULT_SALES);

  const summary = useMemo(() => {
    const membershipRevenue = sales.memberships.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const packageRevenue = sales.packages.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const starterFeeRevenue = sales.memberships.reduce((sum, s) => {
      const m = memberships.find(mem => mem.name === s.name);
      return sum + (m ? s.unitsSold * m.starterFee : 0);
    }, 0);
    const totalRevenue = membershipRevenue + packageRevenue + starterFeeRevenue;
    const totalCosts = memberships.reduce((sum, m) => sum + m.totalCost, 0)
      + packages.reduce((sum, p) => sum + p.cost, 0);
    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? profit / totalRevenue : 0;
    const ltv = inputs.churnRate > 0 ? inputs.arpu / inputs.churnRate : 0;
    const ltvCac = inputs.maxCac > 0 ? ltv / inputs.maxCac : 0;
    const burnRate = totalCosts - totalRevenue;
    const runway = burnRate > 0 ? inputs.startingCash / burnRate : Infinity;

    return { membershipRevenue, packageRevenue, starterFeeRevenue, totalRevenue, totalCosts, profit, margin, ltv, ltvCac, burnRate, runway };
  }, [inputs, memberships, packages, sales]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Shape the Wave</h1>
        <span className="subtitle">Services, Packages & Memberships</span>
      </header>
      <div className="dashboard-grid">
        <InputsPanel inputs={inputs} setInputs={setInputs} />
        <SummaryPanel summary={summary} />
        <MembershipsSection memberships={memberships} setMemberships={setMemberships} targetMargin={inputs.targetMargin} />
        <PackagesSection packages={packages} setPackages={setPackages} targetMargin={inputs.targetMargin} />
        <ServicesTable services={services} setServices={setServices} targetMargin={inputs.targetMargin} />
        <SalesTable sales={sales} setSales={setSales} />
        <RevenueChart sales={sales} />
      </div>
    </div>
  );
}

export default App;
