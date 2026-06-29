import { useState } from 'react';
import { DEFAULT_PACKAGES, DEFAULT_BUNDLES } from '../../data/constants';

function PackagesPage({ onNavigate }) {
  const [pkgFilter, setPkgFilter] = useState('All');
  const [bundleFilter, setBundleFilter] = useState('All');

  const pkgCategories = ['All', ...Array.from(new Set(DEFAULT_PACKAGES.map(p => p.category)))];
  const bundleCategories = ['All', ...Array.from(new Set(DEFAULT_BUNDLES.map(b => b.category)))];

  const filteredPkgs = pkgFilter === 'All' ? DEFAULT_PACKAGES : DEFAULT_PACKAGES.filter(p => p.category === pkgFilter);
  const filteredBundles = bundleFilter === 'All' ? DEFAULT_BUNDLES : DEFAULT_BUNDLES.filter(b => b.category === bundleFilter);

  return (
    <div>
      <h2 className="section-title">Treatment Programs</h2>
      <p style={{color:'#666', marginBottom:16}}>Multi-month programs with bundled visits, labs, and medications for the best value.</p>

      <div className="category-filter">
        {pkgCategories.map(c => (
          <button key={c} className={`filter-btn${pkgFilter === c ? ' active' : ''}`}
            onClick={() => setPkgFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="p-cards-grid">
        {filteredPkgs.map((p, i) => (
          <div className="p-card" key={i} style={{display:'flex', flexDirection:'column', gap:8}}>
            <span style={{fontSize:11, fontWeight:600, color:'#4c8dff', textTransform:'uppercase'}}>{p.category}</span>
            <h3>{p.name}</h3>
            <span className="duration-badge">{p.duration}</span>
            <div className="p-card-price">${p.price.toLocaleString()}</div>
            <ul style={{listStyle:'none', padding:0, borderTop:'1px solid #e2e5f0', paddingTop:8}}>
              {p.services.map((s, j) => (
                <li key={j} style={{fontSize:13, color:'#555', padding:'3px 0'}}>&#8226; {s}</li>
              ))}
            </ul>
            <button className="p-card-btn" onClick={() => onNavigate('book')} style={{marginTop:'auto'}}>Get Started</button>
          </div>
        ))}
      </div>

      <h2 className="section-title" style={{marginTop:40}}>Product Bundles</h2>
      <p style={{color:'#666', marginBottom:16}}>Curated product combinations at discounted bundle pricing.</p>

      <div className="category-filter">
        {bundleCategories.map(c => (
          <button key={c} className={`filter-btn${bundleFilter === c ? ' active' : ''}`}
            onClick={() => setBundleFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="p-cards-grid">
        {filteredBundles.map((b, i) => (
          <div className="p-card" key={i} style={{display:'flex', flexDirection:'column', gap:8}}>
            <span style={{fontSize:11, fontWeight:600, color:'#bf5af2', textTransform:'uppercase'}}>{b.category}</span>
            <h3>{b.name}</h3>
            <div className="p-card-price">${b.price}</div>
            <ul style={{listStyle:'none', padding:0, borderTop:'1px solid #e2e5f0', paddingTop:8}}>
              {b.items.map((item, j) => (
                <li key={j} style={{fontSize:13, color:'#555', padding:'3px 0'}}>&#9632; {item}</li>
              ))}
            </ul>
            <button className="p-card-btn-outline" style={{marginTop:'auto'}}>Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PackagesPage;
