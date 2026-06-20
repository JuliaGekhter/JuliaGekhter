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
  // Visits (2025 Rounded Self Pay prices)
  { name: 'New Patient Consultation', category: 'Visits', cost: 50, price: 311 },
  { name: '1 Visit Per Month', category: 'Visits', cost: 40, price: 186 },
  { name: 'Telehealth Visit', category: 'Visits', cost: 15, price: 99 },
  { name: 'Additional Visit (same month)', category: 'Visits', cost: 30, price: 124 },
  { name: '1 Visit Every 2 Months', category: 'Visits', cost: 40, price: 186 },
  { name: '1 Visit Every 3-11 Months', category: 'Visits', cost: 40, price: 249 },
  { name: 'Annual Wellness Visit', category: 'Visits', cost: 50, price: 311 },
  // Bloodwork
  { name: 'Full Blood Panel', category: 'Bloodwork', cost: 148, price: 374 },
  { name: 'Single Blood Test', category: 'Bloodwork', cost: 30, price: 81 },
  { name: 'Additional Test (after single)', category: 'Bloodwork', cost: 20, price: 56 },
  // Weight Loss (2025 Self Pay)
  { name: 'WL Level 1 - Maintenance (4 boxes)', category: 'Weight Loss', cost: 25, price: 186 },
  { name: 'WL Level 2 - Phentermine Only', category: 'Weight Loss', cost: 15, price: 275 },
  { name: 'WL Level 3 - 8 boxes + phent', category: 'Weight Loss', cost: 47, price: 624 },
  { name: 'WL Level 4 - 16 boxes + phent', category: 'Weight Loss', cost: 92, price: 749 },
  { name: 'WL Level 5 - 24 boxes + 2 inj + phent', category: 'Weight Loss', cost: 146, price: 874 },
  { name: 'WL Level 6 - 32 boxes + 2 inj + phent', category: 'Weight Loss', cost: 191, price: 999 },
  // Semaglutide
  { name: 'Semaglutide - First 3 Months', category: 'Weight Loss', cost: 100, price: 374 },
  { name: 'Semaglutide - 3 Mo Upfront', category: 'Weight Loss', cost: 100, price: 299 },
  { name: 'Semaglutide - After 3 Months', category: 'Weight Loss', cost: 200, price: 686 },
  // Tirzepatide
  { name: 'Tirzepatide 2.5 mg', category: 'Weight Loss', cost: 150, price: 499 },
  { name: 'Tirzepatide 5 mg', category: 'Weight Loss', cost: 150, price: 499 },
  { name: 'Tirzepatide 7.5 mg', category: 'Weight Loss', cost: 180, price: 625 },
  { name: 'Tirzepatide 10-15 mg', category: 'Weight Loss', cost: 200, price: 960 },
  // TRT
  { name: 'TRT - Every 2 Weeks', category: 'Hormones', cost: 11, price: 374 },
  { name: 'TRT - Every 10 Days', category: 'Hormones', cost: 11, price: 499 },
  { name: 'TRT - Weekly In Office', category: 'Hormones', cost: 14, price: 624 },
  { name: 'TRT - Weekly Take Home', category: 'Hormones', cost: 14, price: 499 },
  { name: 'HCG Vial - At Home Injections', category: 'Hormones', cost: 100, price: 825 },
  { name: 'Clomid - Oral Medication', category: 'Hormones', cost: 47, price: 249 },
  // Sermorelin
  { name: 'Sermorelin - Up to 15mg', category: 'Hormones', cost: 115, price: 436 },
  { name: 'Sermorelin - 21mg', category: 'Hormones', cost: 170, price: 685 },
  { name: 'Sermorelin - 30mg', category: 'Hormones', cost: 229, price: 781 },
  // Other Medications
  { name: 'Anastrozole', category: 'Hormones', cost: 10, price: 44 },
  { name: 'Naltrexone (all doses)', category: 'Medications', cost: 25, price: 181 },
  // BHRT Creams
  { name: 'Estradiol / Progesterone Cream', category: 'Hormones', cost: 78, price: 249 },
  { name: 'DHEA / Pregnenolone Cream', category: 'Hormones', cost: 78, price: 249 },
  { name: 'Testosterone Cream', category: 'Hormones', cost: 55, price: 249 },
  // Sexual Health
  { name: 'Sildenafil 20mg (90ct)', category: 'Sexual Health', cost: 20, price: 86 },
  { name: 'Sildenafil 50mg (30ct)', category: 'Sexual Health', cost: 20, price: 86 },
  { name: 'Sildenafil 100mg (30ct)', category: 'Sexual Health', cost: 33, price: 144 },
  { name: 'Tadalafil 5mg (30ct)', category: 'Sexual Health', cost: 9, price: 86 },
  { name: 'Tadalafil 6-19mg (30ct)', category: 'Sexual Health', cost: 35, price: 124 },
  { name: 'Tadalafil 20mg Fast Acting (30ct)', category: 'Sexual Health', cost: 21, price: 161 },
  { name: 'Tadalafil 25mg Time Released (30ct)', category: 'Sexual Health', cost: 50, price: 406 },
  { name: 'Arousal Cream M/F (30ml)', category: 'Sexual Health', cost: 55, price: 161 },
  // Other Products
  { name: 'Finasteride 1.25mg (30ct)', category: 'Products', cost: 12, price: 74 },
  { name: 'Hair Restore Cream', category: 'Products', cost: 50, price: 211 },
  { name: 'Anti-Aging Gel Pump', category: 'Products', cost: 39, price: 174 },
  { name: 'Ultra Anti-Aging Gel Cream', category: 'Products', cost: 56, price: 211 },
  { name: 'Tretinoin Acne Cream', category: 'Products', cost: 30, price: 138 },
];

const DEFAULT_BUNDLES = [
  // Weight Loss Product Bundles
  {
    name: 'WL Level 1 - Maintenance',
    category: 'Weight Loss',
    cost: 25,
    price: 186,
    items: ['4 boxes shakes'],
  },
  {
    name: 'WL Level 2 - Phentermine',
    category: 'Weight Loss',
    cost: 15,
    price: 275,
    items: ['Phentermine (food sold separately)'],
  },
  {
    name: 'WL Level 3',
    category: 'Weight Loss',
    cost: 47,
    price: 624,
    items: ['8 boxes shakes', 'Phentermine'],
  },
  {
    name: 'WL Level 4',
    category: 'Weight Loss',
    cost: 92,
    price: 749,
    items: ['16 boxes shakes', 'Phentermine'],
  },
  {
    name: 'WL Level 5',
    category: 'Weight Loss',
    cost: 146,
    price: 874,
    items: ['24 boxes shakes', '2 injections', 'Phentermine'],
  },
  {
    name: 'WL Level 6',
    category: 'Weight Loss',
    cost: 191,
    price: 999,
    items: ['32 boxes shakes', '2 injections', 'Phentermine'],
  },
  // Sexual Health Bundles
  {
    name: 'Mens Vitality Bundle',
    category: 'Sexual Health',
    cost: 100,
    price: 449,
    items: ['Sildenafil OR Tadalafil (30ct)', 'Arousal Cream M/F (30ml)'],
  },
  {
    name: 'ED Essentials',
    category: 'Sexual Health',
    cost: 64,
    price: 249,
    items: ['Tadalafil 5mg (30ct)', 'Arousal Cream M/F (30ml)'],
  },
  {
    name: 'ED Performance',
    category: 'Sexual Health',
    cost: 90,
    price: 399,
    items: ['Sildenafil 100mg (30ct)', 'Tadalafil 20mg Fast Acting (30ct)', 'Arousal Cream M/F (30ml)'],
  },
  // Anti-Aging & Skin Bundles
  {
    name: 'Anti-Aging Skin Bundle',
    category: 'Skin & Hair',
    cost: 125,
    price: 449,
    items: ['Anti-Aging Gel Pump', 'Ultra Anti-Aging Gel Cream', 'Tretinoin Acne Cream'],
  },
  {
    name: 'Hair Restoration Bundle',
    category: 'Skin & Hair',
    cost: 62,
    price: 275,
    items: ['Finasteride 1.25mg (30ct)', 'Hair Restore Cream'],
  },
  // Hormone Bundles
  {
    name: 'BHRT Starter (Women)',
    category: 'Hormones',
    cost: 156,
    price: 449,
    items: ['Estradiol/Progesterone Cream', 'DHEA/Pregnenolone Cream'],
  },
  {
    name: 'BHRT Complete (Women)',
    category: 'Hormones',
    cost: 211,
    price: 599,
    items: ['Estradiol/Progesterone Cream', 'DHEA/Pregnenolone Cream', 'Testosterone Cream'],
  },
  {
    name: 'TRT + Support (Men)',
    category: 'Hormones',
    cost: 65,
    price: 299,
    items: ['Testosterone Cream', 'Anastrozole'],
  },
  {
    name: 'Growth Hormone Starter',
    category: 'Hormones',
    cost: 115,
    price: 449,
    items: ['Sermorelin vial up to 15mg'],
  },
  {
    name: 'Growth Hormone Max',
    category: 'Hormones',
    cost: 229,
    price: 799,
    items: ['Sermorelin vial 30mg'],
  },
];

const DEFAULT_PACKAGES = [
  // Weight Loss Packages (multi-month programs with visits)
  {
    name: 'Semaglutide 3-Month Kickstart',
    category: 'Weight Loss',
    cost: 300,
    price: 899,
    duration: '3 months',
    services: [
      'Semaglutide - 3 months supply ($374/mo value)',
      'New Patient Consultation',
      'Full Blood Panel',
      '3x Monthly check-in visits',
    ],
  },
  {
    name: 'Semaglutide 6-Month Commitment',
    category: 'Weight Loss',
    cost: 700,
    price: 3500,
    duration: '6 months',
    services: [
      'Semaglutide - 6 months',
      'New Patient Consultation',
      '2x Full Blood Panels',
      '6x Monthly check-in visits',
      'Dose management throughout',
    ],
  },
  {
    name: 'Tirzepatide 3-Month (2.5-5mg)',
    category: 'Weight Loss',
    cost: 550,
    price: 1499,
    duration: '3 months',
    services: [
      'Tirzepatide 2.5-5mg - 3 months',
      'New Patient Consultation',
      'Full Blood Panel',
      '3x Monthly visits + dose escalation',
    ],
  },
  {
    name: 'Tirzepatide 3-Month (7.5mg)',
    category: 'Weight Loss',
    cost: 640,
    price: 2103,
    duration: '3 months',
    services: [
      'Tirzepatide 7.5mg - 3 months',
      'New Patient Consultation',
      'Full Blood Panel',
      '3x Monthly visits + dose management',
    ],
  },
  {
    name: 'WL Level 3 Program - 3 Month',
    category: 'Weight Loss',
    cost: 142,
    price: 1750,
    duration: '3 months',
    services: [
      'WL Level 3 bundle x 3 months',
      '3x Monthly visits',
      '3x Accountability check-ins',
    ],
  },
  {
    name: 'WL Level 4 Program - 6 Month',
    category: 'Weight Loss',
    cost: 552,
    price: 4100,
    duration: '6 months',
    services: [
      'WL Level 4 bundle x 6 months',
      '6x Monthly visits',
      '2x Full Blood Panels',
      '6x Accountability check-ins',
    ],
  },
  {
    name: 'WL Level 5 Program - 6 Month',
    category: 'Weight Loss',
    cost: 878,
    price: 4775,
    duration: '6 months',
    services: [
      'WL Level 5 bundle x 6 months',
      '6x Monthly visits',
      '2x Full Blood Panels',
      '6x Accountability check-ins',
    ],
  },
  // TRT Packages
  {
    name: 'TRT Quarterly (Every 2 Weeks)',
    category: 'TRT',
    cost: 42,
    price: 1275,
    duration: '3 months',
    services: [
      'TRT injection every 2 weeks (6 shots)',
      'Full Blood Panel',
      'Follow-up consultation',
    ],
  },
  {
    name: 'TRT 6-Month (Every 2 Weeks)',
    category: 'TRT',
    cost: 84,
    price: 2550,
    duration: '6 months',
    services: [
      'TRT injection every 2 weeks (12 shots)',
      '2x Full Blood Panels',
      '2x Follow-up consultations',
    ],
  },
  {
    name: 'TRT Weekly In Office - 3 Month',
    category: 'TRT',
    cost: 56,
    price: 1750,
    duration: '3 months',
    services: [
      'Weekly TRT in office (12 shots)',
      'Full Blood Panel',
      'Follow-up consultation',
    ],
  },
  {
    name: 'TRT Take Home Quarterly',
    category: 'TRT',
    cost: 56,
    price: 1497,
    duration: '3 months',
    services: [
      'Weekly take home TRT - 3 months',
      'Monthly office visit for monitoring',
      'Full Blood Panel',
    ],
  },
  // Hormone & Peptide Packages
  {
    name: 'Sermorelin 3-Month (15mg)',
    category: 'Hormones',
    cost: 344,
    price: 1275,
    duration: '3 months',
    services: [
      'Sermorelin vial up to 15mg x 3',
      'Initial consultation',
      'Follow-up visit',
    ],
  },
  {
    name: 'Sermorelin 6-Month (15mg)',
    category: 'Hormones',
    cost: 688,
    price: 2500,
    duration: '6 months',
    services: [
      'Sermorelin up to 15mg x 6',
      'Initial consultation',
      '2x Follow-ups',
      'Blood panel at start',
    ],
  },
  {
    name: 'Sermorelin 3-Month (30mg)',
    category: 'Hormones',
    cost: 688,
    price: 2228,
    duration: '3 months',
    services: [
      'Sermorelin 30mg vial x 3',
      'Initial consultation',
      'Follow-up visit',
    ],
  },
  {
    name: 'BHRT Program - 3 Month',
    category: 'Hormones',
    cost: 234,
    price: 795,
    duration: '3 months',
    services: [
      'BHRT Cream (Estradiol/Prog or DHEA/Preg) x 3 months',
      'Initial hormone consultation',
      'Follow-up visit',
    ],
  },
  {
    name: 'BHRT Program - 6 Month',
    category: 'Hormones',
    cost: 468,
    price: 1575,
    duration: '6 months',
    services: [
      'BHRT Cream x 6 months',
      'Initial hormone consultation',
      '2x Follow-up visits',
      'Blood panel at start',
    ],
  },
  {
    name: 'Clomid Program - 3 Month',
    category: 'Hormones',
    cost: 141,
    price: 790,
    duration: '3 months',
    services: [
      'Clomid x 3 months',
      'Initial consultation',
      'Follow-up visit',
      'Blood panel',
    ],
  },
  {
    name: 'Naltrexone 3-Month',
    category: 'Hormones',
    cost: 75,
    price: 460,
    duration: '3 months',
    services: [
      'Naltrexone (all doses) x 3 months',
      'Initial consultation',
      'Follow-up check-in',
    ],
  },
  // Sexual Health Packages
  {
    name: 'ED Complete 3-Month',
    category: 'Sexual Health',
    cost: 120,
    price: 599,
    duration: '3 months',
    services: [
      'Tadalafil 6-19mg x 3 months (90ct total)',
      'Arousal Cream (30ml)',
      'Initial consultation',
      'Follow-up visit',
    ],
  },
  // Wellness Packages
  {
    name: 'Comprehensive Wellness Panel',
    category: 'Wellness',
    cost: 200,
    price: 749,
    duration: 'One-time',
    services: [
      'Full Blood Panel',
      'New Patient Consultation',
      'Follow-up visit to review results',
      'Personalized treatment plan',
    ],
  },
  {
    name: 'Annual Wellness Program',
    category: 'Wellness',
    cost: 400,
    price: 1400,
    duration: '12 months',
    services: [
      '2x Full Blood Panels (start + 6mo)',
      'Annual Wellness Visit',
      '2x Follow-up consultations',
      'Personalized treatment plan',
    ],
  },
];

const DEFAULT_MEMBERSHIPS = [
  {
    name: 'Essential',
    tier: 'Starter',
    starterFee: 100,
    totalCost: 20,
    maxCost: 30,
    price: 51,
    credits: 1,
    services: [
      'Telehealth access ($99 visits)',
      'Patient portal access',
      '24/7 messaging with care team',
      'Discounted visit pricing ($124 add-on visits)',
    ],
    products: [
      '10% off all medications',
      '10% off bloodwork',
      '10% off all packages',
    ],
  },
  {
    name: 'Wellness',
    tier: 'Growth',
    starterFee: 100,
    totalCost: 55,
    maxCost: 70,
    price: 99,
    credits: 2,
    services: [
      'Everything in Essential',
      '1 office visit per month included ($186 value)',
      'Annual wellness visit included ($311 value)',
      'Priority scheduling',
    ],
    products: [
      '15% off all medications',
      '15% off bloodwork & labs',
      '15% off all packages',
      'Free shipping on all products',
    ],
  },
  {
    name: 'Vitality',
    tier: 'Scale',
    starterFee: 150,
    totalCost: 100,
    maxCost: 130,
    price: 199,
    credits: 4,
    services: [
      'Everything in Wellness',
      '2 visits per month included',
      'Quarterly full blood panel ($374 value)',
      'Monthly B-12 injection included ($30 value)',
      'Direct physician line',
      'Dedicated care coordinator',
    ],
    products: [
      '20% off all medications & products',
      '20% off all packages',
      '1 free telehealth visit per month',
      'Free Anastrozole if on TRT ($44 value)',
    ],
  },
  {
    name: 'Premium',
    tier: 'Elite',
    starterFee: 200,
    totalCost: 160,
    maxCost: 200,
    price: 299,
    credits: 6,
    services: [
      'Everything in Vitality',
      'Unlimited office visits',
      'Monthly full blood panel included',
      'Monthly IV Vitamin Therapy ($150 value)',
      'Same-day appointment guarantee',
      'After-hours phone access',
    ],
    products: [
      '25% off all medications & products',
      '25% off all packages',
      'Free shipping + priority fulfillment',
      'Annual Anti-Aging Gel Pump included ($174 value)',
      'Birthday month: free product of choice (up to $211)',
    ],
  },
  {
    name: 'Concierge',
    tier: 'VIP',
    starterFee: 299,
    totalCost: 220,
    maxCost: 270,
    price: 499,
    credits: 'Unlimited',
    services: [
      'Everything in Premium',
      'Unlimited visits + telehealth',
      'Quarterly in-depth wellness review',
      'Annual comprehensive panel + specialty labs',
      'Direct cell phone access to Dr. Tack',
      'Expedited Rx refills (same day)',
      'Priority referral coordination',
    ],
    products: [
      '30% off all medications & products',
      '30% off all packages',
      'Monthly B-12 + quarterly IV Therapy included',
      'Annual skincare bundle included ($499 value)',
      'Complimentary guest passes (2/month)',
      '1 free package upgrade per year (up to $500 value)',
    ],
  },
];

const DEFAULT_SALES = {
  memberships: [
    { name: 'Essential', unitsSold: 150, price: 51 },
    { name: 'Wellness', unitsSold: 100, price: 99 },
    { name: 'Vitality', unitsSold: 60, price: 199 },
    { name: 'Premium', unitsSold: 30, price: 299 },
    { name: 'Concierge', unitsSold: 10, price: 499 },
  ],
  bundles: [
    { name: 'WL Level 3', unitsSold: 80, price: 624 },
    { name: 'WL Level 5', unitsSold: 40, price: 874 },
    { name: 'Mens Vitality Bundle', unitsSold: 35, price: 449 },
    { name: 'Anti-Aging Skin Bundle', unitsSold: 25, price: 449 },
    { name: 'BHRT Starter (Women)', unitsSold: 30, price: 449 },
    { name: 'TRT + Support (Men)', unitsSold: 45, price: 299 },
    { name: 'Growth Hormone Starter', unitsSold: 20, price: 449 },
  ],
  packages: [
    { name: 'Semaglutide 3-Month Kickstart', unitsSold: 35, price: 899 },
    { name: 'Tirzepatide 3-Month (2.5-5mg)', unitsSold: 20, price: 1499 },
    { name: 'WL Level 5 Program - 6 Month', unitsSold: 10, price: 4775 },
    { name: 'TRT Quarterly (Every 2 Weeks)', unitsSold: 30, price: 1275 },
    { name: 'Sermorelin 3-Month (15mg)', unitsSold: 15, price: 1275 },
    { name: 'BHRT Program - 3 Month', unitsSold: 25, price: 795 },
    { name: 'ED Complete 3-Month', unitsSold: 20, price: 599 },
    { name: 'Comprehensive Wellness Panel', unitsSold: 30, price: 749 },
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

function BundlesSection({ bundles, setBundles, targetMargin }) {
  const updateBundle = (idx, key, raw) => {
    setBundles(prev => prev.map((b, i) =>
      i === idx ? { ...b, [key]: Number(raw) } : b
    ));
  };

  return (
    <section className="panel">
      <h2>Bundles</h2>
      <p className="section-desc">Product groupings — meds, creams & supplies sold together</p>
      <div className="bundle-cards">
        {bundles.map((b, i) => {
          const margin = b.price > 0 ? (b.price - b.cost) / b.price : 0;
          const ok = margin >= targetMargin;
          return (
            <div key={b.name} className={`bundle-card cat-border-${b.category.toLowerCase().replace(/[^a-z]/g, '')}`}>
              <div className="package-header">
                <h3>{b.name}</h3>
                <span className="cell-status">{ok ? '✅' : '⚠️'}</span>
              </div>
              <span className={`category-tag cat-${b.category.toLowerCase().replace(/[^a-z]/g, '')}`}>{b.category}</span>
              <div className="bundle-price">${b.price}</div>
              <ul className="bundle-items">
                {b.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="membership-financials">
                <div className="financial-row">
                  <span>Cost</span>
                  <input type="number" value={b.cost}
                    onChange={e => updateBundle(i, 'cost', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Price</span>
                  <input type="number" value={b.price}
                    onChange={e => updateBundle(i, 'price', e.target.value)} />
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

function PackagesSection({ packages, setPackages, targetMargin }) {
  const updatePackage = (idx, key, raw) => {
    setPackages(prev => prev.map((p, i) =>
      i === idx ? { ...p, [key]: Number(raw) } : p
    ));
  };

  return (
    <section className="panel">
      <h2>Packages</h2>
      <p className="section-desc">Multi-month service programs — visits + treatments over time</p>
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
              {p.duration && <span className="duration-badge">{p.duration}</span>}
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
      {renderTable('Bundle Sales', sales.bundles, 'bundles')}
      {renderTable('Package Sales', sales.packages, 'packages')}
    </section>
  );
}

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

function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [bundles, setBundles] = useState(DEFAULT_BUNDLES);
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [memberships, setMemberships] = useState(DEFAULT_MEMBERSHIPS);
  const [sales, setSales] = useState(DEFAULT_SALES);

  const summary = useMemo(() => {
    const membershipRevenue = sales.memberships.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const bundleRevenue = sales.bundles.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const packageRevenue = sales.packages.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const starterFeeRevenue = sales.memberships.reduce((sum, s) => {
      const m = memberships.find(mem => mem.name === s.name);
      return sum + (m ? s.unitsSold * m.starterFee : 0);
    }, 0);
    const totalRevenue = membershipRevenue + bundleRevenue + packageRevenue + starterFeeRevenue;
    const totalCosts = memberships.reduce((sum, m) => sum + m.totalCost, 0)
      + bundles.reduce((sum, b) => sum + b.cost, 0)
      + packages.reduce((sum, p) => sum + p.cost, 0);
    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? profit / totalRevenue : 0;
    const ltv = inputs.churnRate > 0 ? inputs.arpu / inputs.churnRate : 0;
    const ltvCac = inputs.maxCac > 0 ? ltv / inputs.maxCac : 0;
    const burnRate = totalCosts - totalRevenue;
    const runway = burnRate > 0 ? inputs.startingCash / burnRate : Infinity;

    return { membershipRevenue, bundleRevenue, packageRevenue, starterFeeRevenue, totalRevenue, totalCosts, profit, margin, ltv, ltvCac, burnRate, runway };
  }, [inputs, memberships, bundles, packages, sales]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="brand-mark">
          <h1>Shape The Wave Longevity™</h1>
          <span className="tagline">Optimize health. Align habits. Live longer, better.</span>
        </div>
        <div className="brand-hierarchy">
          <span className="brand-pill brand-reel">REEL™ Align Method™</span>
          <span className="brand-arrow">→</span>
          <span className="brand-pill brand-ai">ReelVerse AI™</span>
          <span className="brand-arrow">→</span>
          <span className="brand-pill brand-os">ReelVerse OS™</span>
        </div>
      </header>
      <section className="panel ecosystem-panel">
        <h2>Ecosystem</h2>
        <div className="ecosystem-grid">
          <div className="eco-card">
            <span className="eco-icon">🧭</span>
            <strong>ReelVerse Coach™</strong>
            <span>AI guidance</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">🪞</span>
            <strong>ReelVerse Mirror™</strong>
            <span>Reflection & journaling</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">🧭</span>
            <strong>ReelVerse Compass™</strong>
            <span>Goals, values & direction</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">🚀</span>
            <strong>ReelVerse Momentum™</strong>
            <span>Habits & progress</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">🎓</span>
            <strong>ReelVerse Academy™</strong>
            <span>Courses & certification</span>
          </div>
          <div className="eco-card eco-card-credential">
            <span className="eco-icon">🏅</span>
            <strong>Certified REEL Method Practitioner™</strong>
            <span>Professional credential</span>
          </div>
        </div>
        <div className="framework-bar">
          <span className="framework-label">REEL™ Framework:</span>
          <span className="framework-step">Reflect</span>
          <span className="framework-dot">·</span>
          <span className="framework-step">Envision</span>
          <span className="framework-dot">·</span>
          <span className="framework-step">Execute</span>
          <span className="framework-dot">·</span>
          <span className="framework-step">Learn</span>
          <span className="framework-dot">·</span>
          <span className="framework-step">Align</span>
        </div>
      </section>
      <div className="dashboard-grid">
        <InputsPanel inputs={inputs} setInputs={setInputs} />
        <SummaryPanel summary={summary} />
        <MembershipsSection memberships={memberships} setMemberships={setMemberships} targetMargin={inputs.targetMargin} />
        <BundlesSection bundles={bundles} setBundles={setBundles} targetMargin={inputs.targetMargin} />
        <PackagesSection packages={packages} setPackages={setPackages} targetMargin={inputs.targetMargin} />
        <ServicesTable services={services} setServices={setServices} targetMargin={inputs.targetMargin} />
        <SalesTable sales={sales} setSales={setSales} />
        <RevenueChart sales={sales} />
      </div>
    </div>
  );
}

export default App;
