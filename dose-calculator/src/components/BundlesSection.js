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

export default BundlesSection;
