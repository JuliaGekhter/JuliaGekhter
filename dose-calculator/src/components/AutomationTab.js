import { useState } from 'react';

const WORKFLOWS = [
  { name: 'New Patient Welcome', trigger: 'Patient registration completed', actions: ['Send welcome email', 'Send welcome SMS', 'Schedule initial consultation', 'Create patient folder'], enabled: true },
  { name: 'Appointment Reminder', trigger: '24 hours before appointment', actions: ['Send email reminder', 'Send SMS 2 hours before', 'Include preparation instructions'], enabled: true },
  { name: 'Post-Visit Follow-Up', trigger: 'Visit marked complete', actions: ['Send satisfaction survey (24hr)', 'Schedule next appointment prompt (48hr)', 'Update treatment plan'], enabled: true },
  { name: 'Membership Renewal', trigger: '7 days before renewal date', actions: ['Send renewal reminder email', 'Alert billing for payment processing', 'Offer upgrade if on lower tier'], enabled: true },
  { name: 'Lab Results Ready', trigger: 'Lab results imported from HealthLab', actions: ['Notify patient via portal + email', 'Flag for provider review', 'Schedule follow-up if abnormal'], enabled: true },
  { name: 'Package Milestone', trigger: 'Package reaches 50%/75%/100%', actions: ['Send congratulations email', 'Share progress summary', 'Offer renewal/upgrade at 100%'], enabled: true },
  { name: 'Churn Prevention', trigger: 'Missed appointment + no reschedule in 7 days', actions: ['Send "we miss you" email', 'Staff outreach call at day 10', 'Offer incentive at day 14'], enabled: false },
  { name: 'Referral Reward', trigger: 'Referred patient completes first visit', actions: ['Credit referrer account', 'Send thank you to referrer', 'Welcome bonus to new patient'], enabled: true },
];

const LOG_ENTRIES = [
  { timestamp: 'Jun 22, 3:45 PM', workflow: 'Appointment Reminder', patient: 'Sarah M.', status: 'Success' },
  { timestamp: 'Jun 22, 2:30 PM', workflow: 'Lab Results Ready', patient: 'John K.', status: 'Success' },
  { timestamp: 'Jun 22, 1:15 PM', workflow: 'Post-Visit Follow-Up', patient: 'Mike R.', status: 'Success' },
  { timestamp: 'Jun 22, 11:00 AM', workflow: 'New Patient Welcome', patient: 'Lisa T.', status: 'Success' },
  { timestamp: 'Jun 21, 4:30 PM', workflow: 'Membership Renewal', patient: 'David W.', status: 'Success' },
  { timestamp: 'Jun 21, 3:00 PM', workflow: 'Appointment Reminder', patient: 'Amy C.', status: 'Failed' },
  { timestamp: 'Jun 21, 1:45 PM', workflow: 'Package Milestone', patient: 'Tom B.', status: 'Success' },
  { timestamp: 'Jun 20, 5:00 PM', workflow: 'Churn Prevention', patient: 'Chris P.', status: 'Pending' },
  { timestamp: 'Jun 20, 3:30 PM', workflow: 'Referral Reward', patient: 'Rachel S.', status: 'Success' },
  { timestamp: 'Jun 20, 2:00 PM', workflow: 'Appointment Reminder', patient: 'Dan H.', status: 'Success' },
];

function AutomationTab() {
  const [workflows, setWorkflows] = useState(WORKFLOWS);

  const toggleWorkflow = (index) => {
    setWorkflows(prev => prev.map((w, i) => i === index ? { ...w, enabled: !w.enabled } : w));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <section className="panel">
        <h2>Workflow Builder</h2>
        <p className="section-desc">Automate repetitive tasks with trigger-based workflows</p>
        <div className="workflow-cards">
          {workflows.map((w, i) => (
            <div className="workflow-card" key={w.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{w.name}</h3>
                <button
                  className={`workflow-toggle ${w.enabled ? 'on' : 'off'}`}
                  onClick={() => toggleWorkflow(i)}
                >
                  {w.enabled ? 'Active' : 'Inactive'}
                </button>
              </div>
              <div className="workflow-trigger">Trigger: {w.trigger}</div>
              <ol className="workflow-actions">
                {w.actions.map((a, j) => (
                  <li key={j}>{a}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Automation Log</h2>
        <p className="section-desc">Recent workflow executions</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Workflow</th>
                <th>Patient</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LOG_ENTRIES.map((entry, i) => (
                <tr key={i}>
                  <td>{entry.timestamp}</td>
                  <td>{entry.workflow}</td>
                  <td>{entry.patient}</td>
                  <td>
                    <span className={`status-badge ${
                      entry.status === 'Success' ? 'status-connected' :
                      entry.status === 'Failed' ? 'status-action-needed' :
                      'status-in-progress'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Email / SMS Stats</h2>
        <div className="metrics-grid">
          <div className="metric-card" style={{ borderColor: 'var(--color-blue)' }}>
            <span className="metric-label">Emails Sent</span>
            <span className="metric-value">3,450</span>
          </div>
          <div className="metric-card" style={{ borderColor: 'var(--color-green)' }}>
            <span className="metric-label">Delivery Rate</span>
            <span className="metric-value">98.2%</span>
          </div>
          <div className="metric-card" style={{ borderColor: 'var(--color-purple)' }}>
            <span className="metric-label">Open Rate</span>
            <span className="metric-value">42%</span>
          </div>
          <div className="metric-card" style={{ borderColor: 'var(--color-teal)' }}>
            <span className="metric-label">SMS Sent</span>
            <span className="metric-value">1,240</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AutomationTab;
