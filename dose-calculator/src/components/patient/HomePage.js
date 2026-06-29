import { DEFAULT_MEMBERSHIPS } from '../../data/constants';

function HomePage({ onNavigate }) {
  const highlights = [
    {
      title: 'Weight Loss',
      desc: 'Semaglutide, Tirzepatide, shake programs & phentermine protocols',
      icon: '⚖️',
    },
    {
      title: 'Hormones',
      desc: 'TRT, BHRT, Sermorelin & growth hormone optimization',
      icon: '🧪',
    },
    {
      title: 'Sexual Health',
      desc: 'ED treatments, arousal therapy & vitality restoration',
      icon: '❤️',
    },
    {
      title: 'Wellness',
      desc: 'Comprehensive blood panels, IV therapy & B-12 injections',
      icon: '🩺',
    },
    {
      title: 'Anti-Aging',
      desc: 'Medical-grade skin care, tretinoin & hair restoration',
      icon: '✨',
    },
  ];

  const testimonials = [
    {
      text: 'After 3 months on the semaglutide program, I lost 32 pounds and have more energy than I have had in years. Dr. Tack and the team made me feel supported every step of the way.',
      author: 'Michael R., Weight Loss Patient',
    },
    {
      text: 'The TRT program completely changed my quality of life. Better sleep, more focus, and I finally feel like myself again. The quarterly blood panels give me peace of mind.',
      author: 'James T., Hormone Optimization Patient',
    },
    {
      text: 'I was nervous about BHRT but the staff here walked me through everything. Six months later my labs are dialed in and I feel amazing. The Vitality membership pays for itself.',
      author: 'Lisa M., BHRT Patient',
    },
  ];

  return (
    <div>
      <section className="hero">
        <h2>Your Journey to Optimal Health Starts Here</h2>
        <p>Evidence-based longevity medicine tailored to your unique biology</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => onNavigate('book')}>Book a Consultation</button>
          <button className="btn-secondary" onClick={() => onNavigate('memberships')}>Become a Member</button>
        </div>
      </section>

      <h2 className="section-title">Our Services</h2>
      <div className="highlights-grid">
        {highlights.map(h => (
          <div className="highlight-card" key={h.title}>
            <div className="highlight-icon">{h.icon}</div>
            <h3>{h.title}</h3>
            <p>{h.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Membership Tiers</h2>
      <div className="p-cards-grid">
        {DEFAULT_MEMBERSHIPS.map(m => (
          <div className="p-card" key={m.name}>
            <h3>{m.name}</h3>
            <div className="p-card-price">${m.price}<span style={{fontSize:14,color:'#666'}}>/mo</span></div>
            <p>{typeof m.credits === 'number' ? m.credits : m.credits} credits/mo</p>
            <p style={{fontSize:12,color:'#999'}}>Starter fee: ${m.starterFee}</p>
            <button className="p-card-btn" onClick={() => onNavigate('memberships')}>Learn More</button>
          </div>
        ))}
      </div>

      <h2 className="section-title">What Our Patients Say</h2>
      <div className="testimonials">
        {testimonials.map((t, i) => (
          <div className="testimonial" key={i}>
            <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
            <p className="testimonial-author">&mdash; {t.author}</p>
          </div>
        ))}
      </div>

      <section className="p-card" style={{textAlign:'center', padding:32}}>
        <h2 className="section-title">Visit Us</h2>
        <p style={{fontSize:16, marginBottom:8}}>Windsor Court Office Park, Gurnee, IL 60031</p>
        <p style={{fontSize:14, color:'#666', marginBottom:4}}>Phone: 847-625-8300</p>
        <p style={{fontSize:14, color:'#666', marginBottom:16}}>Monday &ndash; Friday: 8:00 AM &ndash; 4:30 PM</p>
        <button className="btn-primary" onClick={() => onNavigate('book')}>Schedule Your Visit</button>
      </section>
    </div>
  );
}
export default HomePage;
