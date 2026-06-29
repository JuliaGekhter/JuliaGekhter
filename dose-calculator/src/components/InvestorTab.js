function InvestorTab() {
  return (
    <div className="dashboard-grid">
      {/* P&L Statement */}
      <section className="panel">
        <h2>P&L Statement</h2>
        <p className="section-desc">12-month projected financials — FY 2025</p>
        <div className="table-wrapper">
          <table className="financial-table">
            <thead>
              <tr>
                <th></th>
                <th>Q1 2025</th>
                <th>Q2 2025</th>
                <th>Q3 2025</th>
                <th>Q4 2025</th>
                <th>FY 2025</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="row-header" colSpan="6">Revenue</td></tr>
              <tr>
                <td className="row-header">Membership MRR</td>
                <td>$134K</td><td>$156K</td><td>$180K</td><td>$208K</td><td>$678K</td>
              </tr>
              <tr>
                <td className="row-header">Package Revenue</td>
                <td>$1.15M</td><td>$1.34M</td><td>$1.54M</td><td>$1.78M</td><td>$5.81M</td>
              </tr>
              <tr>
                <td className="row-header">Bundle Revenue</td>
                <td>$504K</td><td>$587K</td><td>$675K</td><td>$778K</td><td>$2.54M</td>
              </tr>
              <tr>
                <td className="row-header">Starter Fees</td>
                <td>$158K</td><td>$184K</td><td>$212K</td><td>$244K</td><td>$798K</td>
              </tr>
              <tr className="row-total">
                <td>Total Revenue</td>
                <td>$1.95M</td><td>$2.27M</td><td>$2.61M</td><td>$3.01M</td><td>$9.83M</td>
              </tr>
              <tr>
                <td className="row-header">COGS</td>
                <td>$390K</td><td>$454K</td><td>$522K</td><td>$602K</td><td>$1.97M</td>
              </tr>
              <tr className="row-subtotal">
                <td>Gross Profit</td>
                <td>$1.56M</td><td>$1.81M</td><td>$2.09M</td><td>$2.41M</td><td>$7.87M</td>
              </tr>
              <tr>
                <td className="row-header">Gross Margin</td>
                <td>80%</td><td>80%</td><td>80%</td><td>80%</td><td>80%</td>
              </tr>
              <tr><td className="row-header" colSpan="6">OpEx</td></tr>
              <tr>
                <td className="row-header">Staff &amp; Payroll</td>
                <td>$280K</td><td>$290K</td><td>$320K</td><td>$340K</td><td>$1.23M</td>
              </tr>
              <tr>
                <td className="row-header">Rent &amp; Facilities</td>
                <td>$60K</td><td>$60K</td><td>$75K</td><td>$75K</td><td>$270K</td>
              </tr>
              <tr>
                <td className="row-header">Marketing</td>
                <td>$80K</td><td>$90K</td><td>$100K</td><td>$110K</td><td>$380K</td>
              </tr>
              <tr>
                <td className="row-header">Technology</td>
                <td>$30K</td><td>$30K</td><td>$35K</td><td>$35K</td><td>$130K</td>
              </tr>
              <tr>
                <td className="row-header">Insurance &amp; Legal</td>
                <td>$25K</td><td>$25K</td><td>$25K</td><td>$25K</td><td>$100K</td>
              </tr>
              <tr className="row-total">
                <td>Total OpEx</td>
                <td>$475K</td><td>$495K</td><td>$555K</td><td>$585K</td><td>$2.11M</td>
              </tr>
              <tr className="row-subtotal">
                <td>EBITDA</td>
                <td>$1.08M</td><td>$1.32M</td><td>$1.53M</td><td>$1.82M</td><td>$5.76M</td>
              </tr>
              <tr>
                <td className="row-header">EBITDA Margin</td>
                <td>55%</td><td>58%</td><td>59%</td><td>60%</td><td>59%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Unit Economics */}
      <section className="panel">
        <h2>Unit Economics</h2>
        <p className="section-desc">Key per-unit performance metrics</p>
        <div className="metrics-grid">
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
            <span className="metric-label">CAC</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>$80</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-green)' }}>
            <span className="metric-label">LTV</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>$3,000</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-teal)' }}>
            <span className="metric-label">LTV:CAC</span>
            <span className="metric-value" style={{ color: 'var(--color-teal)' }}>37.5x</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-purple)' }}>
            <span className="metric-label">Payback Period</span>
            <span className="metric-value" style={{ color: 'var(--color-purple)' }}>0.5 mo</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-orange)' }}>
            <span className="metric-label">Gross Margin</span>
            <span className="metric-value" style={{ color: 'var(--color-orange)' }}>80%</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-green)' }}>
            <span className="metric-label">EBITDA Margin</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>59%</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
            <span className="metric-label">ARPU</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>$150/mo</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-red)' }}>
            <span className="metric-label">Churn</span>
            <span className="metric-value" style={{ color: 'var(--color-red)' }}>5%</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-teal)' }}>
            <span className="metric-label">Revenue/Provider</span>
            <span className="metric-value" style={{ color: 'var(--color-teal)' }}>$162K/mo</span>
          </div>
        </div>
      </section>

      {/* Fundraising Summary */}
      <section className="panel">
        <h2>Fundraising Summary</h2>
        <p className="section-desc">Current round details and use of funds</p>
        <div className="metrics-grid">
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
            <span className="metric-label">Round</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>Seed</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-green)' }}>
            <span className="metric-label">Target</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>$1.5M</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-purple)' }}>
            <span className="metric-label">Valuation</span>
            <span className="metric-value" style={{ color: 'var(--color-purple)' }}>$15M pre</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-orange)' }}>
            <span className="metric-label">Timeline</span>
            <span className="metric-value" style={{ color: 'var(--color-orange)' }}>Q3 2025</span>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <h3 style={{ fontSize: 14, marginBottom: 10, color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Use of Funds</h3>
          <div className="metrics-grid">
            <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
              <span className="metric-label">Lake Forest Buildout</span>
              <span className="metric-value" style={{ color: 'var(--color-blue)' }}>40%</span>
            </div>
            <div className="metric-card" style={{ borderLeftColor: 'var(--color-teal)' }}>
              <span className="metric-label">Waukegan Buildout</span>
              <span className="metric-value" style={{ color: 'var(--color-teal)' }}>25%</span>
            </div>
            <div className="metric-card" style={{ borderLeftColor: 'var(--color-purple)' }}>
              <span className="metric-label">Technology / Zenoti</span>
              <span className="metric-value" style={{ color: 'var(--color-purple)' }}>15%</span>
            </div>
            <div className="metric-card" style={{ borderLeftColor: 'var(--color-orange)' }}>
              <span className="metric-label">Marketing</span>
              <span className="metric-value" style={{ color: 'var(--color-orange)' }}>10%</span>
            </div>
            <div className="metric-card" style={{ borderLeftColor: 'var(--color-green)' }}>
              <span className="metric-label">Working Capital</span>
              <span className="metric-value" style={{ color: 'var(--color-green)' }}>10%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Pitch Data */}
      <section className="panel">
        <h2>Investor Pitch Data</h2>
        <p className="section-desc">10-slide deck overview</p>
        <div className="pitch-slides">
          <div className="pitch-slide">
            <span className="slide-number">Slide 1</span>
            <h3>Problem</h3>
            <p>60% of adults have chronic conditions, primary care wait times 3+ weeks</p>
          </div>
          <div className="pitch-slide">
            <span className="slide-number">Slide 2</span>
            <h3>Solution</h3>
            <p>Shape The Wave Longevity — concierge wellness + AI-powered behavior change</p>
          </div>
          <div className="pitch-slide">
            <span className="slide-number">Slide 3</span>
            <h3>Market</h3>
            <p>TAM $285M, SAM $42M, SOM $2.1M (Year 1)</p>
          </div>
          <div className="pitch-slide">
            <span className="slide-number">Slide 4</span>
            <h3>Product</h3>
            <p>14-tab platform, 50 services, 22 bundles, 25 packages, 5 memberships</p>
          </div>
          <div className="pitch-slide">
            <span className="slide-number">Slide 5</span>
            <h3>Traction</h3>
            <p>350 members, $649K MRR, 55% MoM growth, 95% retention Month 1</p>
          </div>
          <div className="pitch-slide">
            <span className="slide-number">Slide 6</span>
            <h3>Business Model</h3>
            <p>Memberships (recurring) + Packages (programs) + Bundles (products)</p>
          </div>
          <div className="pitch-slide">
            <span className="slide-number">Slide 7</span>
            <h3>Unit Economics</h3>
            <p>LTV:CAC 37.5x, 80% gross margin, 0.5 month payback</p>
          </div>
          <div className="pitch-slide">
            <span className="slide-number">Slide 8</span>
            <h3>Team</h3>
            <p>Dr. Paul C. Tack (MD), PA Johnson, NP Williams, MA Garcia + ReelVerse AI</p>
          </div>
          <div className="pitch-slide">
            <span className="slide-number">Slide 9</span>
            <h3>Growth Plan</h3>
            <p>3 locations by 2026, franchise model Q4 2026, 5 franchises by 2027</p>
          </div>
          <div className="pitch-slide">
            <span className="slide-number">Slide 10</span>
            <h3>Ask</h3>
            <p>$1.5M seed at $15M pre-money for multi-location expansion</p>
          </div>
        </div>
      </section>

      {/* Cap Table */}
      <section className="panel">
        <h2>Cap Table</h2>
        <p className="section-desc">Current capitalization structure</p>
        <div className="table-wrapper">
          <table className="cap-table">
            <thead>
              <tr>
                <th>Shareholder</th>
                <th>Shares</th>
                <th>%</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="cell-name">Dr. Paul C. Tack</td>
                <td>7,500,000</td>
                <td>75%</td>
                <td>Common</td>
              </tr>
              <tr>
                <td className="cell-name">Early Team Pool</td>
                <td>1,000,000</td>
                <td>10%</td>
                <td>Options</td>
              </tr>
              <tr>
                <td className="cell-name">Seed Investors</td>
                <td>1,000,000</td>
                <td>10%</td>
                <td>Preferred</td>
              </tr>
              <tr>
                <td className="cell-name">ESOP Reserve</td>
                <td>500,000</td>
                <td>5%</td>
                <td>Reserved</td>
              </tr>
              <tr style={{ borderTop: '2px solid var(--color-border)' }}>
                <td className="cell-name" style={{ fontWeight: 700 }}>Total</td>
                <td style={{ fontWeight: 700 }}>10,000,000</td>
                <td style={{ fontWeight: 700 }}>100%</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default InvestorTab;
