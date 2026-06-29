function ServicesTable({ services, setServices, targetMargin, pricingMode }) {
  const updateService = (idx, key, raw) => {
    setServices(prev => prev.map((s, i) =>
      i === idx ? { ...s, [key]: Number(raw) } : s
    ));
  };

  const getActivePrice = (s) => {
    if (pricingMode === 'insurance' && s.priceInsurance != null) return s.priceInsurance;
    if (pricingMode === 'bcbs' && s.priceBcbs != null) return s.priceBcbs;
    return s.price;
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
              const activePrice = getActivePrice(s);
              const margin = activePrice > 0 ? (activePrice - s.cost) / activePrice : 0;
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
                    <input type="number" value={activePrice}
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

export default ServicesTable;
