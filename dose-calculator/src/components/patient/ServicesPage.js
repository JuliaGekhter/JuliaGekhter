import { useState } from 'react';
import { DEFAULT_SERVICES } from '../../data/constants';

const DURATION_MAP = {
  'Visits': '30 min',
  'Bloodwork': '15 min',
  'Weight Loss': '30 min',
  'Hormones': '15 min',
  'Sexual Health': '15 min',
  'Products': '10 min',
  'Medications': '10 min',
};

function ServicesPage({ onNavigate }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(DEFAULT_SERVICES.map(s => s.category)))];
  const filtered = filter === 'All' ? DEFAULT_SERVICES : DEFAULT_SERVICES.filter(s => s.category === filter);

  return (
    <div>
      <h2 className="section-title">Our Services</h2>
      <p style={{color:'#666', marginBottom:16}}>Browse all {DEFAULT_SERVICES.length} services we offer. Click &ldquo;Book Now&rdquo; to schedule.</p>

      <div className="category-filter">
        {categories.map(c => (
          <button key={c} className={`filter-btn${filter === c ? ' active' : ''}`}
            onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="p-cards-grid">
        {filtered.map((s, i) => (
          <div className="p-card" key={i}>
            <span style={{fontSize:11, fontWeight:600, color:'#4c8dff', textTransform:'uppercase', letterSpacing:0.5}}>{s.category}</span>
            <h3 style={{marginTop:4}}>{s.name}</h3>
            <p style={{fontSize:12, color:'#999'}}>Est. duration: {DURATION_MAP[s.category] || '15 min'}</p>
            <div className="p-card-price">${s.price}</div>
            <button className="p-card-btn" onClick={() => onNavigate('book')}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ServicesPage;
