import { useState } from 'react';
import { DEFAULT_MEMBERSHIPS, DEFAULT_SERVICES } from '../data/constants';

function PatientsTab() {
  // Patient Intake Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    insuranceType: 'Self Pay',
    primaryConcern: 'Weight Loss',
    referralSource: 'Google',
    medicalHistory: [],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Membership selector state
  const [selectedMembership, setSelectedMembership] = useState(null);

  // Appointment booking state
  const [appointment, setAppointment] = useState({
    date: '',
    time: '9:00 AM',
    service: DEFAULT_SERVICES[0].name,
    provider: 'Dr. Tack',
  });
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setFormSubmitted(false);
  };

  const toggleMedicalHistory = (condition) => {
    setFormData(prev => {
      const list = prev.medicalHistory.includes(condition)
        ? prev.medicalHistory.filter(c => c !== condition)
        : [...prev.medicalHistory, condition];
      return { ...prev, medicalHistory: list };
    });
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM',
  ];

  const medicalConditions = ['Diabetes', 'Hypertension', 'Heart Disease', 'Thyroid', 'None'];

  return (
    <div className="dashboard-grid">
      {/* Patient Intake Form */}
      <section className="panel">
        <h2>Patient Intake Form</h2>
        <div className="form-grid">
          <label>First Name
            <input type="text" value={formData.firstName}
              onChange={e => updateForm('firstName', e.target.value)} />
          </label>
          <label>Last Name
            <input type="text" value={formData.lastName}
              onChange={e => updateForm('lastName', e.target.value)} />
          </label>
          <label>Date of Birth
            <input type="date" value={formData.dob}
              onChange={e => updateForm('dob', e.target.value)} />
          </label>
          <label>Phone
            <input type="tel" value={formData.phone}
              onChange={e => updateForm('phone', e.target.value)} />
          </label>
          <label>Email
            <input type="email" value={formData.email}
              onChange={e => updateForm('email', e.target.value)} />
          </label>
          <label>Insurance Type
            <select value={formData.insuranceType}
              onChange={e => updateForm('insuranceType', e.target.value)}>
              <option>Self Pay</option>
              <option>Insurance</option>
              <option>BCBS</option>
            </select>
          </label>
          <label>Primary Concern
            <select value={formData.primaryConcern}
              onChange={e => updateForm('primaryConcern', e.target.value)}>
              <option>Weight Loss</option>
              <option>Hormones</option>
              <option>Sexual Health</option>
              <option>Wellness</option>
              <option>Anti-Aging</option>
            </select>
          </label>
          <label>Referral Source
            <select value={formData.referralSource}
              onChange={e => updateForm('referralSource', e.target.value)}>
              <option>Google</option>
              <option>Social Media</option>
              <option>Referral</option>
              <option>Walk-in</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        <div style={{ marginTop: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-dim)', fontWeight: 500 }}>Medical History</span>
          <div className="checkbox-group" style={{ marginTop: 6 }}>
            {medicalConditions.map(condition => (
              <label key={condition}>
                <input
                  type="checkbox"
                  checked={formData.medicalHistory.includes(condition)}
                  onChange={() => toggleMedicalHistory(condition)}
                />
                {condition}
              </label>
            ))}
          </div>
        </div>
        <button className="form-btn" onClick={handleSubmit}>Submit Intake Form</button>
        {formSubmitted && (
          <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 6, background: 'rgba(52, 199, 89, 0.15)', color: 'var(--color-green)', fontSize: 14, fontWeight: 600 }}>
            Patient intake form submitted successfully!
          </div>
        )}
      </section>

      {/* Membership Selector */}
      <section className="panel">
        <h2>Membership Selector</h2>
        <p className="section-desc">Choose a membership tier for the patient</p>
        <div className="membership-cards">
          {DEFAULT_MEMBERSHIPS.map(m => (
            <div
              key={m.name}
              className={`membership-select-card bundle-card${selectedMembership === m.name ? ' selected' : ''}`}
              onClick={() => setSelectedMembership(m.name)}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{m.name}</h3>
              <div className="bundle-price">${m.price}<span style={{ fontSize: 14, color: 'var(--color-text-dim)' }}>/mo</span></div>
              <div className="credits-badge">{m.credits} credits/mo</div>
              <ul className="bundle-items">
                {m.services.slice(0, 3).map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                className="form-btn"
                style={{ width: '100%', background: selectedMembership === m.name ? 'var(--color-green)' : 'var(--color-blue)' }}
                onClick={(e) => { e.stopPropagation(); setSelectedMembership(m.name); }}
              >
                {selectedMembership === m.name ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Booking */}
      <section className="panel">
        <h2>Appointment Booking</h2>
        <div className="form-grid">
          <label>Date
            <input type="date" value={appointment.date}
              onChange={e => setAppointment(prev => ({ ...prev, date: e.target.value }))} />
          </label>
          <label>Time
            <select value={appointment.time}
              onChange={e => setAppointment(prev => ({ ...prev, time: e.target.value }))}>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </label>
          <label>Service
            <select value={appointment.service}
              onChange={e => setAppointment(prev => ({ ...prev, service: e.target.value }))}>
              {DEFAULT_SERVICES.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </label>
          <label>Provider
            <select value={appointment.provider}
              onChange={e => setAppointment(prev => ({ ...prev, provider: e.target.value }))}>
              <option>Dr. Tack</option>
              <option>PA Johnson</option>
              <option>NP Williams</option>
            </select>
          </label>
        </div>
        <button className="form-btn" onClick={() => setAppointmentBooked(true)}>Book Appointment</button>
        {appointmentBooked && (
          <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 6, background: 'rgba(52, 199, 89, 0.15)', color: 'var(--color-green)', fontSize: 14, fontWeight: 600 }}>
            Appointment booked successfully!
          </div>
        )}
      </section>

      {/* Patient Portal Preview */}
      <section className="panel">
        <h2>Patient Portal Preview</h2>
        <p className="section-desc">Sample patient view</p>
        <div className="portal-grid">
          <div className="portal-card">
            <h4>Upcoming Appointments</h4>
            <div className="portal-item">
              <strong>Jul 15, 2026 - 10:00 AM</strong><br />
              New Patient Consultation - Dr. Tack
            </div>
            <div className="portal-item">
              <strong>Aug 12, 2026 - 2:30 PM</strong><br />
              Follow-up Visit - PA Johnson
            </div>
          </div>
          <div className="portal-card">
            <h4>Current Membership</h4>
            <div className="portal-item">
              <strong>Wellness - $99/mo</strong>
              <span className="portal-badge portal-badge-active" style={{ marginLeft: 8 }}>Active</span>
            </div>
          </div>
          <div className="portal-card">
            <h4>Active Packages</h4>
            <div className="portal-item">
              Semaglutide 3-Month Kickstart - Month 2 of 3
            </div>
          </div>
          <div className="portal-card">
            <h4>Recent Lab Results</h4>
            <div className="portal-item">
              Full Blood Panel - <span className="portal-badge portal-badge-active">Reviewed</span>
              <br /><span style={{ fontSize: 11, color: 'var(--color-text-dim)' }}>Jun 28, 2026</span>
            </div>
          </div>
          <div className="portal-card">
            <h4>Messages</h4>
            <div className="portal-item">
              <span className="portal-badge portal-badge-new">1 new</span>
              <span style={{ marginLeft: 8 }}>message from Dr. Tack</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientsTab;
