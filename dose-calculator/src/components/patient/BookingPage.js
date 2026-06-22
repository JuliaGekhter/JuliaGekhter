import { useState } from 'react';
import { DEFAULT_SERVICES } from '../../data/constants';

const PROVIDERS = [
  { name: 'Dr. Paul C. Tack', title: 'MD, Physician' },
  { name: 'PA Johnson', title: 'PA-C' },
  { name: 'NP Williams', title: 'NP' },
];

const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
];

const UNAVAILABLE = new Set(['9:30 AM', '11:00 AM', '2:30 PM']);

function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [service, setService] = useState('');
  const [provider, setProvider] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const categories = Array.from(new Set(DEFAULT_SERVICES.map(s => s.category)));
  const todayStr = new Date().toISOString().split('T')[0];

  const canNext = () => {
    if (currentStep === 1) return service !== '';
    if (currentStep === 2) return provider !== '';
    if (currentStep === 3) return date !== '';
    if (currentStep === 4) return time !== '';
    if (currentStep === 5) return name !== '' && phone !== '' && email !== '';
    return false;
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const totalSteps = 5;

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        return (
          <span key={step} style={{display:'flex', alignItems:'center', gap:0}}>
            <span className={`step-dot${step === currentStep ? ' active' : ''}${step < currentStep ? ' done' : ''}`}>
              {step < currentStep ? '✓' : step}
            </span>
            {step < totalSteps && <span className={`step-line${step < currentStep ? ' done' : ''}`} />}
          </span>
        );
      })}
    </div>
  );

  if (confirmed) {
    return (
      <div>
        <div className="success-message">
          <h3>Appointment Confirmed!</h3>
          <p style={{fontSize:16, color:'#333', marginBottom:8}}>You&apos;ll receive a confirmation email and SMS reminder.</p>
          <p style={{fontSize:14, color:'#666'}}>{service} with {provider}</p>
          <p style={{fontSize:14, color:'#666'}}>{date} at {time}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">Book an Appointment</h2>
      <p style={{color:'#666', marginBottom:20}}>Step {currentStep} of {totalSteps}</p>

      {renderStepIndicator()}

      <div className="p-card" style={{maxWidth:600, margin:'0 auto'}}>
        {currentStep === 1 && (
          <div>
            <h3 style={{marginBottom:12}}>Select a Service</h3>
            <select value={service} onChange={e => setService(e.target.value)}
              style={{width:'100%', padding:10, border:'1px solid #e2e5f0', borderRadius:6, fontSize:14, fontFamily:'inherit'}}>
              <option value="">-- Choose a service --</option>
              {categories.map(cat => (
                <optgroup label={cat} key={cat}>
                  {DEFAULT_SERVICES.filter(s => s.category === cat).map((s, i) => (
                    <option key={i} value={s.name}>{s.name} - ${s.price}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 style={{marginBottom:12}}>Select a Provider</h3>
            <div className="provider-cards">
              {PROVIDERS.map(p => (
                <div key={p.name}
                  className={`provider-card${provider === p.name ? ' selected' : ''}`}
                  onClick={() => setProvider(p.name)}>
                  <h4>{p.name}</h4>
                  <p>{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 style={{marginBottom:12}}>Select a Date</h3>
            <input type="date" value={date} min={todayStr}
              onChange={e => setDate(e.target.value)}
              style={{width:'100%', padding:10, border:'1px solid #e2e5f0', borderRadius:6, fontSize:14, fontFamily:'inherit'}} />
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 style={{marginBottom:12}}>Select a Time</h3>
            <div className="time-slots">
              {TIME_SLOTS.map(t => {
                const isUnavailable = UNAVAILABLE.has(t);
                return (
                  <button key={t}
                    className={`time-slot${time === t ? ' selected' : ''}${isUnavailable ? ' unavailable' : ''}`}
                    onClick={() => { if (!isUnavailable) setTime(t); }}
                    disabled={isUnavailable}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h3 style={{marginBottom:12}}>Confirm Your Appointment</h3>
            <div style={{background:'#f8f9fc', borderRadius:8, padding:16, marginBottom:16}}>
              <p style={{fontSize:14, marginBottom:4}}><strong>Service:</strong> {service}</p>
              <p style={{fontSize:14, marginBottom:4}}><strong>Provider:</strong> {provider}</p>
              <p style={{fontSize:14, marginBottom:4}}><strong>Date:</strong> {date}</p>
              <p style={{fontSize:14}}><strong>Time:</strong> {time}</p>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              <label style={{fontSize:13, fontWeight:500, color:'#666'}}>
                Full Name
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  style={{width:'100%', padding:10, border:'1px solid #e2e5f0', borderRadius:6, fontSize:14, fontFamily:'inherit', marginTop:4}} />
              </label>
              <label style={{fontSize:13, fontWeight:500, color:'#666'}}>
                Phone
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  style={{width:'100%', padding:10, border:'1px solid #e2e5f0', borderRadius:6, fontSize:14, fontFamily:'inherit', marginTop:4}} />
              </label>
              <label style={{fontSize:13, fontWeight:500, color:'#666'}}>
                Email
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  style={{width:'100%', padding:10, border:'1px solid #e2e5f0', borderRadius:6, fontSize:14, fontFamily:'inherit', marginTop:4}} />
              </label>
            </div>
          </div>
        )}

        <div style={{display:'flex', justifyContent:'space-between', marginTop:20}}>
          {currentStep > 1 ? (
            <button className="p-card-btn-outline" onClick={() => setCurrentStep(currentStep - 1)}>Back</button>
          ) : <span />}
          {currentStep < 5 ? (
            <button className="p-card-btn" onClick={() => setCurrentStep(currentStep + 1)} disabled={!canNext()}
              style={{opacity: canNext() ? 1 : 0.5}}>Next</button>
          ) : (
            <button className="p-card-btn" onClick={handleConfirm} disabled={!canNext()}
              style={{opacity: canNext() ? 1 : 0.5}}>Confirm Booking</button>
          )}
        </div>
      </div>
    </div>
  );
}
export default BookingPage;
