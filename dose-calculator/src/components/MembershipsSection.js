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
              {m.referralBonus && (
                <div className="membership-section">
                  <span className="membership-section-label">Referral Program</span>
                  <span className="referral-bonus">{m.referralBonus}</span>
                </div>
              )}
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

export default MembershipsSection;
