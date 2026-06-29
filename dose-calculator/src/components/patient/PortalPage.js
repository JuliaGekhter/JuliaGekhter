import { useState } from 'react';

function PortalPage() {
  const [reply, setReply] = useState('');

  return (
    <div>
      <div className="portal-welcome">
        <h2>Welcome back, Sarah!</h2>
        <div className="portal-stats">
          <div className="portal-stat">Next appointment: <strong>Jul 15, 2025 2:00 PM with Dr. Tack</strong></div>
          <div className="portal-stat">Membership: <strong>Vitality - $199/mo</strong></div>
          <div className="portal-stat">Credits remaining: <strong>3 of 4</strong></div>
          <div className="portal-stat">Active packages: <strong>1</strong></div>
        </div>
      </div>

      <div className="portal-sections">
        {/* Upcoming Appointments */}
        <div className="p-card">
          <h3 style={{marginBottom:12}}>Upcoming Appointments</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date &amp; Time</th>
                  <th>Service</th>
                  <th>Provider</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jul 15, 2025 2:00 PM</td>
                  <td>Semaglutide Injection</td>
                  <td>Dr. Tack</td>
                  <td>
                    <button className="p-card-btn-outline" style={{marginRight:6, marginTop:0, padding:'4px 10px', fontSize:11}}>Reschedule</button>
                    <button className="p-card-btn-outline" style={{marginTop:0, padding:'4px 10px', fontSize:11, color:'#ff453a', borderColor:'#ff453a'}}>Cancel</button>
                  </td>
                </tr>
                <tr>
                  <td>Jul 22, 2025 10:00 AM</td>
                  <td>Follow-up Visit</td>
                  <td>PA Johnson</td>
                  <td>
                    <button className="p-card-btn-outline" style={{marginRight:6, marginTop:0, padding:'4px 10px', fontSize:11}}>Reschedule</button>
                    <button className="p-card-btn-outline" style={{marginTop:0, padding:'4px 10px', fontSize:11, color:'#ff453a', borderColor:'#ff453a'}}>Cancel</button>
                  </td>
                </tr>
                <tr>
                  <td>Aug 5, 2025 9:00 AM</td>
                  <td>Blood Panel</td>
                  <td>MA Garcia</td>
                  <td>
                    <button className="p-card-btn-outline" style={{marginRight:6, marginTop:0, padding:'4px 10px', fontSize:11}}>Reschedule</button>
                    <button className="p-card-btn-outline" style={{marginTop:0, padding:'4px 10px', fontSize:11, color:'#ff453a', borderColor:'#ff453a'}}>Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* My Membership */}
        <div className="p-card">
          <h3 style={{marginBottom:12}}>My Membership</h3>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
            <span style={{fontSize:18, fontWeight:700, color:'#4c8dff'}}>Vitality</span>
            <span style={{fontSize:13, color:'#666'}}>$199/mo</span>
          </div>
          <div style={{fontSize:13, color:'#555', lineHeight:1.8}}>
            <p>4 credits/month &mdash; 3 remaining this month</p>
            <p>Member since: January 2025</p>
            <p>Next billing: July 1, 2025</p>
          </div>
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <button className="p-card-btn">Upgrade</button>
            <button className="p-card-btn-outline">Manage</button>
          </div>
        </div>

        {/* Active Packages */}
        <div className="p-card">
          <h3 style={{marginBottom:12}}>Active Packages</h3>
          <p style={{fontSize:15, fontWeight:600, marginBottom:8}}>Semaglutide 3-Month Kickstart</p>
          <p style={{fontSize:13, color:'#666', marginBottom:4}}>Month 2 of 3 (67%)</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{width:'67%'}} />
          </div>
          <p style={{fontSize:13, color:'#555', marginTop:8}}>Visits completed: 2 of 3</p>
          <p style={{fontSize:13, color:'#555'}}>Next visit: July 15, 2025</p>
        </div>

        {/* Lab Results */}
        <div className="p-card">
          <h3 style={{marginBottom:12}}>Lab Results</h3>
          <div style={{borderBottom:'1px solid #e2e5f0', paddingBottom:10, marginBottom:10}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <p style={{fontSize:14, fontWeight:600}}>Jun 15, 2025 &mdash; Full Blood Panel</p>
                <p style={{fontSize:12, color:'#666'}}>Reviewed by Dr. Tack</p>
              </div>
              <button className="p-card-btn" style={{marginTop:0, padding:'6px 14px', fontSize:12}}>View Results</button>
            </div>
          </div>
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <p style={{fontSize:14, fontWeight:600}}>Mar 10, 2025 &mdash; Full Blood Panel</p>
                <p style={{fontSize:12, color:'#666'}}>Reviewed by Dr. Tack</p>
              </div>
              <button className="p-card-btn" style={{marginTop:0, padding:'6px 14px', fontSize:12}}>View Results</button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-card">
          <h3 style={{marginBottom:4}}>Messages</h3>
          <span style={{display:'inline-block', padding:'2px 8px', borderRadius:10, background:'#ff453a', color:'white', fontSize:11, fontWeight:700, marginBottom:12}}>1 new message</span>
          <div className="message-bubble">
            <p style={{fontWeight:600, marginBottom:4}}>Dr. Tack:</p>
            <p>Your recent labs look great! Testosterone levels are improving. Let&apos;s discuss at your next visit.</p>
          </div>
          <input
            type="text"
            className="message-input"
            placeholder="Type a reply..."
            value={reply}
            onChange={e => setReply(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default PortalPage;
