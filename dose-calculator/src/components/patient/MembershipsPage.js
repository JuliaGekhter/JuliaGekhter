import { DEFAULT_MEMBERSHIPS } from '../../data/constants';

function MembershipsPage({ onNavigate }) {
  return (
    <div>
      <h2 className="section-title">Membership Plans</h2>
      <p style={{color:'#666', marginBottom:24}}>Choose the plan that fits your health journey. All memberships include patient portal access, care team messaging, and exclusive pricing.</p>

      <div className="membership-compare">
        {DEFAULT_MEMBERSHIPS.map(m => {
          const isPopular = m.name === 'Vitality';
          return (
            <div className={`p-card${isPopular ? ' mem-card-popular' : ''}`} key={m.name}
              style={{display:'flex', flexDirection:'column', gap:12, position: isPopular ? 'relative' : undefined}}>
              {isPopular && <span className="popular-badge">Most Popular</span>}

              <span style={{fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, color:'#4c8dff'}}>{m.tier}</span>
              <h3 style={{fontSize:22, fontWeight:700}}>{m.name}</h3>

              <div>
                <span style={{fontSize:36, fontWeight:800, color:'#4c8dff'}}>${m.price}</span>
                <span style={{fontSize:14, color:'#666'}}>/mo</span>
              </div>
              <p style={{fontSize:12, color:'#999'}}>Starter fee: ${m.starterFee}</p>
              <p style={{fontSize:13, fontWeight:600, color:'#4c8dff'}}>{typeof m.credits === 'number' ? m.credits : m.credits} credits/mo</p>

              <div style={{borderTop:'1px solid #e2e5f0', paddingTop:10}}>
                <p style={{fontSize:11, fontWeight:600, textTransform:'uppercase', color:'#999', marginBottom:6}}>Included Services</p>
                <ul style={{listStyle:'none', padding:0}}>
                  {m.services.map((s, i) => (
                    <li key={i} style={{fontSize:13, color:'#555', padding:'3px 0'}}>&#10003; {s}</li>
                  ))}
                </ul>
              </div>

              <div style={{borderTop:'1px solid #e2e5f0', paddingTop:10}}>
                <p style={{fontSize:11, fontWeight:600, textTransform:'uppercase', color:'#999', marginBottom:6}}>Product Discounts</p>
                <ul style={{listStyle:'none', padding:0}}>
                  {m.products.map((p, i) => (
                    <li key={i} style={{fontSize:13, color:'#555', padding:'3px 0'}}>&#9670; {p}</li>
                  ))}
                </ul>
              </div>

              <p style={{fontSize:12, color:'#34c759', fontWeight:600}}>Referral: {m.referralBonus}</p>

              <button className="p-card-btn" onClick={() => onNavigate('register')} style={{marginTop:'auto'}}>Join Now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MembershipsPage;
