import { useState } from 'react';

function MarketingTab() {
  const [campaigns, setCampaigns] = useState([
    { name: 'Google Ads - Weight Loss', channel: 'Paid Search', budget: 3000, audience: 'Weight loss seekers 25-55', reach: 15000, conversions: 45 },
    { name: 'Facebook - TRT Awareness', channel: 'Social', budget: 2000, audience: 'Men 35-60', reach: 20000, conversions: 30 },
    { name: 'Instagram - Aesthetics', channel: 'Social', budget: 1500, audience: 'Women 25-50', reach: 25000, conversions: 20 },
    { name: 'Email - Membership Upgrade', channel: 'Email', budget: 200, audience: 'Current patients', reach: 800, conversions: 40 },
    { name: 'Referral Program', channel: 'Referral', budget: 500, audience: 'Existing members', reach: 350, conversions: 25 },
    { name: 'Local SEO + GMB', channel: 'Organic', budget: 1000, audience: 'Gurnee area searchers', reach: 8000, conversions: 35 },
  ]);

  const updateCampaign = (idx, key, value) => {
    setCampaigns(prev => prev.map((c, i) =>
      i === idx ? { ...c, [key]: key === 'name' || key === 'channel' || key === 'audience' ? value : Number(value) } : c
    ));
  };

  // Funnel data
  const funnelStages = [
    { label: 'Awareness', count: 10000, desc: 'Website visits/mo', color: 'var(--color-blue)', width: '100%' },
    { label: 'Interest', count: 2500, desc: '25% conversion', color: 'var(--color-teal)', width: '80%' },
    { label: 'Consultation', count: 500, desc: '20% conversion', color: 'var(--color-purple)', width: '60%' },
    { label: 'Enrollment', count: 150, desc: '30% conversion', color: 'var(--color-orange)', width: '40%' },
    { label: 'Retention', count: 127, desc: '85% retention', color: 'var(--color-green)', width: '30%' },
  ];

  // Email templates
  const emailTemplates = [
    { title: 'Welcome Series', preview: 'Welcome to Shape The Wave! Here\'s what to expect...' },
    { title: 'Membership Upgrade', preview: 'You\'re getting great results — unlock more with Vitality...' },
    { title: 'Referral Program', preview: 'Share the wave! Earn $25-$150 for every referral...' },
    { title: 'Weight Loss Success', preview: 'See how [Patient] lost 30lbs with our Semaglutide program...' },
    { title: 'Appointment Reminder', preview: 'Your appointment with Dr. Tack is tomorrow at 2:00 PM...' },
  ];

  // Content calendar
  const contentCalendar = [
    { day: 'Mon', type: 'Educational', topic: '5 Signs You Need Hormone Testing', platform: 'Blog + IG' },
    { day: 'Tue', type: 'Testimonial', topic: 'Patient weight loss story', platform: 'FB + IG' },
    { day: 'Wed', type: 'Promotion', topic: 'Semaglutide 3-Month Kickstart $899', platform: 'All' },
    { day: 'Thu', type: 'Behind-the-Scenes', topic: 'Office tour / staff intro', platform: 'IG Stories' },
    { day: 'Fri', type: 'Educational', topic: 'Understanding Your Blood Panel Results', platform: 'Blog + YT' },
    { day: 'Sat', type: 'Community', topic: 'Weekend wellness tip', platform: 'IG + FB' },
  ];

  return (
    <div className="dashboard-grid">
      {/* Acquisition Funnel */}
      <section className="panel">
        <h2>Acquisition Funnel</h2>
        <p className="section-desc">Monthly patient acquisition pipeline</p>
        <div className="funnel">
          {funnelStages.map(stage => (
            <div
              key={stage.label}
              className="funnel-stage"
              style={{ width: stage.width, background: stage.color }}
            >
              <span className="funnel-stage-label">{stage.label}</span>
              <span className="funnel-stage-count">{stage.count.toLocaleString()}</span>
              <span className="funnel-stage-rate">{stage.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Campaign Planner */}
      <section className="panel">
        <h2>Campaign Planner</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Channel</th>
                <th>Budget</th>
                <th>Audience</th>
                <th>Reach</th>
                <th>Conversions</th>
                <th>CPA</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => {
                const cpa = c.conversions > 0 ? (c.budget / c.conversions).toFixed(0) : 0;
                return (
                  <tr key={c.name}>
                    <td className="cell-name">{c.name}</td>
                    <td>{c.channel}</td>
                    <td>
                      <input type="number" value={c.budget}
                        onChange={e => updateCampaign(i, 'budget', e.target.value)}
                        style={{ width: 70 }} />
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{c.audience}</td>
                    <td>
                      <input type="number" value={c.reach}
                        onChange={e => updateCampaign(i, 'reach', e.target.value)}
                        style={{ width: 70 }} />
                    </td>
                    <td>
                      <input type="number" value={c.conversions}
                        onChange={e => updateCampaign(i, 'conversions', e.target.value)}
                        style={{ width: 60 }} />
                    </td>
                    <td className="cell-good">${cpa}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Email Templates */}
      <section className="panel">
        <h2>Email Templates</h2>
        <div className="email-cards">
          {emailTemplates.map(t => (
            <div key={t.title} className="email-card">
              <span className="email-badge">Preview</span>
              <h4>{t.title}</h4>
              <p>{t.preview}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content Calendar */}
      <section className="panel">
        <h2>Content Calendar</h2>
        <p className="section-desc">Weekly content schedule</p>
        <div className="table-wrapper">
          <table className="content-calendar">
            <thead>
              <tr>
                <th>Day</th>
                <th>Content Type</th>
                <th>Topic</th>
                <th>Platform</th>
              </tr>
            </thead>
            <tbody>
              {contentCalendar.map(row => (
                <tr key={row.day}>
                  <td className="cell-name">{row.day}</td>
                  <td>{row.type}</td>
                  <td>{row.topic}</td>
                  <td style={{ color: 'var(--color-text-dim)' }}>{row.platform}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default MarketingTab;
