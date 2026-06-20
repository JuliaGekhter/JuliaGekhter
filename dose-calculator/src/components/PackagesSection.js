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

export default PackagesSection;
