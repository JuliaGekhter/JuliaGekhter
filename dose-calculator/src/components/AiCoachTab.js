import { useState } from 'react';

const CONDITIONS = ['Obesity', 'Low Testosterone', 'Erectile Dysfunction', 'Fatigue', 'Hair Loss', 'Anxiety', 'Hormone Imbalance', 'Skin Aging'];
const SYMPTOMS = ['Weight Gain', 'Fatigue', 'Low Libido', 'Hair Loss', 'Brain Fog', 'Mood Changes', 'Sleep Issues', 'Muscle Loss', 'Hot Flashes', 'Joint Pain'];
const TREATMENT_TYPES = ['Semaglutide Program', 'TRT Quarterly', 'Mens Vitality Bundle', 'WL Level 3 Package', 'Longevity Stack', 'Anti-Aging Program'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CHURN_PATIENTS = [
  { name: 'Chris P.', membership: 'Essential', risk: 85, factors: 'Missed 2 appointments, no reschedule', action: 'Personal outreach call' },
  { name: 'Amy C.', membership: 'Wellness', risk: 72, factors: 'Declined last 2 upsells, payment failed once', action: 'Offer payment plan' },
  { name: 'Tom B.', membership: 'Vitality', risk: 65, factors: 'Completed package, hasn\'t rebooked', action: 'Package renewal offer' },
  { name: 'Lisa T.', membership: 'Essential', risk: 58, factors: 'Only using telehealth, low engagement', action: 'In-person visit incentive' },
  { name: 'Dan H.', membership: 'Wellness', risk: 45, factors: 'Inconsistent appointments, changed time 3x', action: 'Schedule optimization' },
];

function AiCoachTab() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm ReelVerse Coach. I'm here to help you on your wellness journey. What would you like to discuss today?" },
    { role: 'user', text: "I've been on Semaglutide for 2 months and lost 12 pounds. Is that good progress?" },
    { role: 'bot', text: "That's excellent progress! Losing 12 pounds in 2 months (about 1.5 lbs/week) is within the healthy range and right on track for Semaglutide therapy. Most patients see 5-10% body weight loss in the first 3 months. Keep following your nutrition plan and attending your check-ins. Would you like me to review your upcoming appointments or suggest adjustments to your plan?" },
  ]);
  const [chatInput, setChatInput] = useState('');

  const [recAge, setRecAge] = useState('');
  const [recGender, setRecGender] = useState('Male');
  const [recBmi, setRecBmi] = useState('');
  const [recConditions, setRecConditions] = useState([]);
  const [recResult, setRecResult] = useState(null);

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomResult, setSymptomResult] = useState(null);

  const [schedTreatment, setSchedTreatment] = useState(TREATMENT_TYPES[0]);
  const [schedDays, setSchedDays] = useState([]);
  const [schedTime, setSchedTime] = useState('morning');
  const [schedProvider, setSchedProvider] = useState('any');
  const [schedResult, setSchedResult] = useState(null);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', text: chatInput };
    const botMsg = { role: 'bot', text: "I'll analyze that and get back to you. In the meantime, please discuss with Dr. Tack at your next visit." };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setChatInput('');
  };

  const toggleCondition = (c) => {
    setRecConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const toggleSymptom = (s) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const toggleDay = (d) => {
    setSchedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  const generateRec = () => {
    const recs = [];
    if (recConditions.includes('Obesity')) recs.push({ name: 'Semaglutide Program + WL Level 3', urgency: 'Recommended', reason: 'BMI and obesity indicate weight loss therapy' });
    if (recConditions.includes('Low Testosterone')) recs.push({ name: 'TRT Quarterly Package', urgency: 'Recommended', reason: 'Testosterone replacement therapy for hypogonadism' });
    if (recConditions.includes('Erectile Dysfunction')) recs.push({ name: 'Mens Vitality Bundle', urgency: 'Recommended', reason: 'Comprehensive sexual health treatment' });
    if (recConditions.includes('Fatigue')) recs.push({ name: 'Full Blood Panel + B-12 Injections', urgency: 'Soon', reason: 'Rule out deficiencies and hormonal causes' });
    if (recConditions.includes('Hair Loss')) recs.push({ name: 'Anti-Aging Program + Finasteride', urgency: 'Routine', reason: 'Hair restoration protocol' });
    if (recConditions.includes('Anxiety')) recs.push({ name: 'Wellness Consultation + Hormone Panel', urgency: 'Soon', reason: 'Assess hormonal contributors to anxiety' });
    if (recConditions.includes('Hormone Imbalance')) recs.push({ name: 'Comprehensive Hormone Panel + TRT Evaluation', urgency: 'Recommended', reason: 'Full hormonal assessment needed' });
    if (recConditions.includes('Skin Aging')) recs.push({ name: 'Anti-Aging Gel Pump + Longevity Stack', urgency: 'Routine', reason: 'Skin rejuvenation and cellular health' });
    if (recs.length === 0) recs.push({ name: 'New Patient Consultation', urgency: 'Routine', reason: 'General wellness assessment recommended' });
    setRecResult(recs);
  };

  const checkSymptoms = () => {
    const results = [];
    if (selectedSymptoms.includes('Weight Gain')) results.push({ test: 'Thyroid Panel + Metabolic Panel', service: 'Semaglutide Evaluation', urgency: 'Soon' });
    if (selectedSymptoms.includes('Fatigue')) results.push({ test: 'CBC + Iron Panel + B-12', service: 'IV Vitamin Therapy', urgency: 'Soon' });
    if (selectedSymptoms.includes('Low Libido')) results.push({ test: 'Total & Free Testosterone', service: 'TRT Consultation', urgency: 'Soon' });
    if (selectedSymptoms.includes('Hair Loss')) results.push({ test: 'DHT + Thyroid Panel', service: 'Anti-Aging Evaluation', urgency: 'Routine' });
    if (selectedSymptoms.includes('Brain Fog')) results.push({ test: 'Hormone Panel + Thyroid', service: 'Wellness Consultation', urgency: 'Soon' });
    if (selectedSymptoms.includes('Mood Changes')) results.push({ test: 'Comprehensive Hormone Panel', service: 'Mental Wellness Eval', urgency: 'Soon' });
    if (selectedSymptoms.includes('Sleep Issues')) results.push({ test: 'Cortisol + Melatonin Levels', service: 'Sleep Optimization Program', urgency: 'Routine' });
    if (selectedSymptoms.includes('Muscle Loss')) results.push({ test: 'Testosterone + Growth Hormone', service: 'TRT + Peptide Therapy', urgency: 'Soon' });
    if (selectedSymptoms.includes('Hot Flashes')) results.push({ test: 'Estrogen + Progesterone Panel', service: 'Hormone Replacement', urgency: 'Urgent' });
    if (selectedSymptoms.includes('Joint Pain')) results.push({ test: 'Inflammatory Markers + Vitamin D', service: 'Joint Health Protocol', urgency: 'Routine' });
    if (results.length === 0) results.push({ test: 'Full Blood Panel', service: 'New Patient Consultation', urgency: 'Routine' });
    setSymptomResult(results);
  };

  const generateSchedule = () => {
    const slots = [];
    const activeDays = schedDays.length > 0 ? schedDays : ['Mon', 'Wed', 'Fri'];
    const months = ['Month 1', 'Month 2', 'Month 3'];
    months.forEach((month, mi) => {
      const weekSlots = [];
      for (let w = 1; w <= 4; w++) {
        const day = activeDays[(w - 1) % activeDays.length];
        const time = schedTime === 'morning' ? '9:00 AM' : '2:00 PM';
        const prov = schedProvider === 'any' ? (w % 2 === 0 ? 'Dr. Tack' : 'PA Johnson') : schedProvider;
        weekSlots.push({ week: `Week ${mi * 4 + w}`, day, time, provider: prov });
      }
      slots.push({ month, visits: weekSlots });
    });
    setSchedResult(slots);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* AI Chat */}
      <section className="panel">
        <h2>ReelVerse Coach AI</h2>
        <p className="section-desc">AI-powered wellness assistant</p>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role === 'bot' ? 'chat-bot' : 'chat-user'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Ask ReelVerse Coach..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="chat-send" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </section>

      {/* Treatment Recommendations */}
      <section className="panel">
        <h2>Treatment Recommendations</h2>
        <p className="section-desc">AI-generated treatment plans based on patient profile</p>
        <div className="form-grid">
          <label>
            Age
            <input type="number" value={recAge} onChange={(e) => setRecAge(e.target.value)} placeholder="e.g. 45" />
          </label>
          <label>
            Gender
            <select value={recGender} onChange={(e) => setRecGender(e.target.value)}>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
          <label>
            BMI
            <input type="number" value={recBmi} onChange={(e) => setRecBmi(e.target.value)} placeholder="e.g. 28" />
          </label>
        </div>
        <div style={{ marginTop: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-dim)', fontWeight: 500 }}>Conditions</span>
          <div className="checkbox-group" style={{ marginTop: 6 }}>
            {CONDITIONS.map(c => (
              <label key={c}>
                <input type="checkbox" checked={recConditions.includes(c)} onChange={() => toggleCondition(c)} />
                {c}
              </label>
            ))}
          </div>
        </div>
        <button className="form-btn" onClick={generateRec}>Generate Recommendations</button>
        {recResult && (
          <div style={{ marginTop: 16 }}>
            {recResult.map((r, i) => (
              <div className="recommendation-card" key={i}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginTop: 4 }}>{r.reason}</div>
                <span className={`status-badge ${r.urgency === 'Recommended' ? 'status-connected' : r.urgency === 'Soon' ? 'status-in-progress' : 'status-in-progress'}`} style={{ marginTop: 8, display: 'inline-block' }}>
                  {r.urgency}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Symptom Checker */}
      <section className="panel">
        <h2>Symptom Checker</h2>
        <p className="section-desc">Select symptoms to get suggested tests and services</p>
        <div className="checkbox-group">
          {SYMPTOMS.map(s => (
            <label key={s}>
              <input type="checkbox" checked={selectedSymptoms.includes(s)} onChange={() => toggleSymptom(s)} />
              {s}
            </label>
          ))}
        </div>
        <button className="form-btn" onClick={checkSymptoms}>Check Symptoms</button>
        {symptomResult && (
          <div style={{ marginTop: 16 }}>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Suggested Test</th>
                    <th>Recommended Service</th>
                    <th>Urgency</th>
                  </tr>
                </thead>
                <tbody>
                  {symptomResult.map((r, i) => (
                    <tr key={i}>
                      <td className="cell-name">{r.test}</td>
                      <td>{r.service}</td>
                      <td>
                        <span className={`status-badge ${
                          r.urgency === 'Urgent' ? 'status-action-needed' :
                          r.urgency === 'Soon' ? 'status-in-progress' :
                          'status-connected'
                        }`}>
                          {r.urgency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Smart Scheduling */}
      <section className="panel">
        <h2>Smart Scheduling</h2>
        <p className="section-desc">AI-optimized appointment scheduling</p>
        <div className="form-grid">
          <label>
            Treatment Type
            <select value={schedTreatment} onChange={(e) => setSchedTreatment(e.target.value)}>
              {TREATMENT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label>
            Preferred Time
            <select value={schedTime} onChange={(e) => setSchedTime(e.target.value)}>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
            </select>
          </label>
          <label>
            Provider Preference
            <select value={schedProvider} onChange={(e) => setSchedProvider(e.target.value)}>
              <option value="any">Any Available</option>
              <option value="Dr. Tack">Dr. Tack</option>
              <option value="PA Johnson">PA Johnson</option>
              <option value="NP Williams">NP Williams</option>
            </select>
          </label>
        </div>
        <div style={{ marginTop: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-dim)', fontWeight: 500 }}>Preferred Days</span>
          <div className="checkbox-group" style={{ marginTop: 6 }}>
            {DAYS.map(d => (
              <label key={d}>
                <input type="checkbox" checked={schedDays.includes(d)} onChange={() => toggleDay(d)} />
                {d}
              </label>
            ))}
          </div>
        </div>
        <button className="form-btn" onClick={generateSchedule}>Generate Schedule</button>
        {schedResult && (
          <div style={{ marginTop: 16 }}>
            {schedResult.map((m, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{m.month}</h3>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Week</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Provider</th>
                      </tr>
                    </thead>
                    <tbody>
                      {m.visits.map((v, j) => (
                        <tr key={j}>
                          <td>{v.week}</td>
                          <td>{v.day}</td>
                          <td>{v.time}</td>
                          <td>{v.provider}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Predictive Churn */}
      <section className="panel">
        <h2>Predictive Churn Analysis</h2>
        <p className="section-desc">AI-identified at-risk patients</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Membership</th>
                <th>Risk %</th>
                <th>Risk Factors</th>
                <th>Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {CHURN_PATIENTS.map((p, i) => (
                <tr key={i}>
                  <td className="cell-name">{p.name}</td>
                  <td>{p.membership}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: p.risk >= 75 ? 'var(--color-red)' : p.risk >= 60 ? 'var(--color-orange)' : 'var(--color-green)' }}>
                      {p.risk}%
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--color-text-dim)' }}>{p.factors}</td>
                  <td>
                    <span className="status-badge status-in-progress">{p.action}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AiCoachTab;
