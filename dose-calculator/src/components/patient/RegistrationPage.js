import { useState } from 'react';
import { DEFAULT_MEMBERSHIPS } from '../../data/constants';

function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Step 1: Personal Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  // Step 2: Insurance
  const [insuranceType, setInsuranceType] = useState('');
  const [carrier, setCarrier] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [groupNumber, setGroupNumber] = useState('');

  // Step 3: Medical History
  const [conditions, setConditions] = useState([]);
  const [medications, setMedications] = useState('');
  const [allergies, setAllergies] = useState('');

  // Step 4: Primary Concern
  const [concern, setConcern] = useState('');

  // Step 5: Referral
  const [referral, setReferral] = useState('');

  // Step 6: Consent
  const [hipaa, setHipaa] = useState(false);
  const [treatment, setTreatment] = useState(false);
  const [financial, setFinancial] = useState(false);

  // Step 7: Membership
  const [selectedMembership, setSelectedMembership] = useState('');

  const totalSteps = 8;

  const conditionsList = ['Diabetes', 'Hypertension', 'Heart Disease', 'Thyroid Disorder', 'High Cholesterol', 'Anxiety/Depression', 'Sleep Apnea', 'None'];
  const concerns = ['Weight Loss', 'Hormone Optimization', 'Sexual Health', 'General Wellness', 'Anti-Aging / Skin Care', 'Multiple Concerns'];
  const referralSources = ['Google Search', 'Social Media (Instagram/Facebook)', 'Patient Referral', 'Walk-in', 'Doctor Referral', 'Other'];

  const toggleCondition = (c) => {
    if (c === 'None') {
      setConditions(['None']);
      return;
    }
    const filtered = conditions.filter(x => x !== 'None');
    if (filtered.includes(c)) {
      setConditions(filtered.filter(x => x !== c));
    } else {
      setConditions([...filtered, c]);
    }
  };

  const canNext = () => {
    if (step === 1) return firstName && lastName && dob && phone && email;
    if (step === 2) return insuranceType !== '';
    if (step === 3) return conditions.length > 0;
    if (step === 4) return concern !== '';
    if (step === 5) return referral !== '';
    if (step === 6) return hipaa && treatment && financial;
    if (step === 7) return true; // optional
    return true;
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => {
        const s = i + 1;
        return (
          <span key={s} style={{display:'flex', alignItems:'center', gap:0}}>
            <span className={`step-dot${s === step ? ' active' : ''}${s < step ? ' done' : ''}`}>
              {s < step ? '✓' : s}
            </span>
            {s < totalSteps && <span className={`step-line${s < step ? ' done' : ''}`} />}
          </span>
        );
      })}
    </div>
  );

  if (submitted) {
    return (
      <div className="success-message">
        <h3>Registration Complete!</h3>
        <p style={{fontSize:16, color:'#333', marginBottom:8}}>Welcome to Shape The Wave Longevity. Your care team will reach out within 24 hours.</p>
        <p style={{fontSize:14, color:'#666'}}>A confirmation has been sent to {email}.</p>
      </div>
    );
  }

  const inputStyle = {width:'100%', padding:10, border:'1px solid #e2e5f0', borderRadius:6, fontSize:14, fontFamily:'inherit', marginTop:4};
  const labelStyle = {fontSize:13, fontWeight:500, color:'#666', display:'flex', flexDirection:'column', gap:0};

  return (
    <div>
      <h2 className="section-title">New Patient Registration</h2>
      <p style={{color:'#666', marginBottom:20}}>Step {step} of {totalSteps}</p>

      {renderStepIndicator()}

      <div className="reg-form">
        <div className="p-card">
          {step === 1 && (
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <h3>Personal Information</h3>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <label style={labelStyle}>First Name <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} /></label>
                <label style={labelStyle}>Last Name <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} /></label>
              </div>
              <label style={labelStyle}>Date of Birth <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={inputStyle} /></label>
              <label style={labelStyle}>Phone <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} /></label>
              <label style={labelStyle}>Email <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} /></label>
              <label style={labelStyle}>Address <input type="text" value={address} onChange={e => setAddress(e.target.value)} style={inputStyle} /></label>
              <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:12}}>
                <label style={labelStyle}>City <input type="text" value={city} onChange={e => setCity(e.target.value)} style={inputStyle} /></label>
                <label style={labelStyle}>State <input type="text" value={state} onChange={e => setState(e.target.value)} style={inputStyle} /></label>
                <label style={labelStyle}>Zip <input type="text" value={zip} onChange={e => setZip(e.target.value)} style={inputStyle} /></label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <h3>Insurance Information</h3>
              <label style={labelStyle}>
                Insurance Type
                <select value={insuranceType} onChange={e => setInsuranceType(e.target.value)} style={inputStyle}>
                  <option value="">-- Select --</option>
                  <option value="Self Pay">Self Pay</option>
                  <option value="Private Insurance">Private Insurance</option>
                  <option value="BCBS">BCBS</option>
                </select>
              </label>
              {insuranceType !== 'Self Pay' && insuranceType !== '' && (
                <>
                  <label style={labelStyle}>Carrier Name <input type="text" value={carrier} onChange={e => setCarrier(e.target.value)} style={inputStyle} /></label>
                  <label style={labelStyle}>Policy Number <input type="text" value={policyNumber} onChange={e => setPolicyNumber(e.target.value)} style={inputStyle} /></label>
                  <label style={labelStyle}>Group Number <input type="text" value={groupNumber} onChange={e => setGroupNumber(e.target.value)} style={inputStyle} /></label>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <h3>Medical History</h3>
              <p style={{fontSize:13, color:'#666'}}>Select any conditions that apply:</p>
              <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
                {conditionsList.map(c => (
                  <label key={c} style={{display:'flex', alignItems:'center', gap:6, fontSize:14, cursor:'pointer'}}>
                    <input type="checkbox" checked={conditions.includes(c)} onChange={() => toggleCondition(c)} />
                    {c}
                  </label>
                ))}
              </div>
              <label style={labelStyle}>
                Current Medications
                <textarea value={medications} onChange={e => setMedications(e.target.value)} rows={3}
                  style={{...inputStyle, resize:'vertical'}} placeholder="List any current medications..." />
              </label>
              <label style={labelStyle}>
                Allergies
                <textarea value={allergies} onChange={e => setAllergies(e.target.value)} rows={2}
                  style={{...inputStyle, resize:'vertical'}} placeholder="List any allergies..." />
              </label>
            </div>
          )}

          {step === 4 && (
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <h3>Primary Concern</h3>
              <p style={{fontSize:13, color:'#666'}}>What brings you to Shape The Wave?</p>
              {concerns.map(c => (
                <label key={c} style={{display:'flex', alignItems:'center', gap:8, fontSize:14, cursor:'pointer', padding:'6px 0'}}>
                  <input type="radio" name="concern" value={c} checked={concern === c} onChange={() => setConcern(c)} />
                  {c}
                </label>
              ))}
            </div>
          )}

          {step === 5 && (
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <h3>How Did You Hear About Us?</h3>
              {referralSources.map(r => (
                <label key={r} style={{display:'flex', alignItems:'center', gap:8, fontSize:14, cursor:'pointer', padding:'6px 0'}}>
                  <input type="radio" name="referral" value={r} checked={referral === r} onChange={() => setReferral(r)} />
                  {r}
                </label>
              ))}
            </div>
          )}

          {step === 6 && (
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <h3>Consent &amp; Agreements</h3>
              <p style={{fontSize:13, color:'#666'}}>Please review and accept each agreement to continue.</p>

              <div className="consent-item">
                <label>
                  <input type="checkbox" checked={hipaa} onChange={() => setHipaa(!hipaa)} />
                  HIPAA Privacy Notice
                </label>
                <p className="consent-preview">I acknowledge that I have received and reviewed the Notice of Privacy Practices, which describes how my health information may be used and disclosed. I understand that I may request restrictions on certain uses and disclosures of my protected health information.</p>
              </div>

              <div className="consent-item">
                <label>
                  <input type="checkbox" checked={treatment} onChange={() => setTreatment(!treatment)} />
                  Treatment Consent
                </label>
                <p className="consent-preview">I consent to the medical treatments and procedures recommended by my healthcare provider at Shape The Wave Longevity. I understand that all treatments carry inherent risks and that I may withdraw my consent at any time.</p>
              </div>

              <div className="consent-item">
                <label>
                  <input type="checkbox" checked={financial} onChange={() => setFinancial(!financial)} />
                  Financial Responsibility Agreement
                </label>
                <p className="consent-preview">I understand that I am financially responsible for all charges not covered by insurance. I agree to pay all co-pays, deductibles, and non-covered services at the time of my visit. Membership fees are billed monthly and subject to the cancellation policy.</p>
              </div>
            </div>
          )}

          {step === 7 && (
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <h3>Select a Membership (Optional)</h3>
              <p style={{fontSize:13, color:'#666'}}>Choose a membership plan or skip this step.</p>
              <div style={{display:'grid', gap:12}}>
                {DEFAULT_MEMBERSHIPS.map(m => (
                  <div key={m.name}
                    className={`p-card${selectedMembership === m.name ? ' mem-card-popular' : ''}`}
                    style={{cursor:'pointer', border: selectedMembership === m.name ? '2px solid #4c8dff' : undefined}}
                    onClick={() => setSelectedMembership(m.name)}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div>
                        <span style={{fontSize:11, fontWeight:700, color:'#4c8dff', textTransform:'uppercase'}}>{m.tier}</span>
                        <h3 style={{fontSize:16}}>{m.name}</h3>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <span style={{fontSize:22, fontWeight:800, color:'#4c8dff'}}>${m.price}</span>
                        <span style={{fontSize:12, color:'#666'}}>/mo</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="p-card-btn-outline" onClick={() => { setSelectedMembership(''); setStep(8); }}
                style={{textAlign:'center'}}>Skip for now</button>
            </div>
          )}

          {step === 8 && (
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <h3>Review &amp; Submit</h3>
              <div style={{background:'#f8f9fc', borderRadius:8, padding:16, fontSize:14, lineHeight:1.8}}>
                <p><strong>Name:</strong> {firstName} {lastName}</p>
                <p><strong>DOB:</strong> {dob}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Email:</strong> {email}</p>
                {address && <p><strong>Address:</strong> {address}{city && `, ${city}`}{state && `, ${state}`} {zip}</p>}
                <p><strong>Insurance:</strong> {insuranceType}{carrier && ` - ${carrier}`}</p>
                <p><strong>Conditions:</strong> {conditions.join(', ') || 'None selected'}</p>
                {medications && <p><strong>Medications:</strong> {medications}</p>}
                {allergies && <p><strong>Allergies:</strong> {allergies}</p>}
                <p><strong>Primary Concern:</strong> {concern}</p>
                <p><strong>Referral Source:</strong> {referral}</p>
                <p><strong>Membership:</strong> {selectedMembership || 'None selected'}</p>
              </div>
            </div>
          )}

          <div style={{display:'flex', justifyContent:'space-between', marginTop:20}}>
            {step > 1 ? (
              <button className="p-card-btn-outline" onClick={() => setStep(step - 1)}>Back</button>
            ) : <span />}
            {step < 8 ? (
              <button className="p-card-btn" onClick={() => setStep(step + 1)} disabled={!canNext()}
                style={{opacity: canNext() ? 1 : 0.5}}>Next</button>
            ) : (
              <button className="p-card-btn" onClick={() => setSubmitted(true)}>Submit Registration</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegistrationPage;
