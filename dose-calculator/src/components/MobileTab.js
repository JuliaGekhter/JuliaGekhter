function MobileTab() {
  return (
    <div className="dashboard-grid">
      {/* App Screens */}
      <section className="panel">
        <h2>App Screens</h2>
        <p className="section-desc">Mobile app screen mockups and UI specifications</p>
        <div className="screen-cards">
          <div className="screen-card">
            <h3>Splash Screen</h3>
            <p>Logo + tagline animation, auto-redirect to login</p>
            <ul className="screen-elements">
              <li>Animated STW logo</li>
              <li>Tagline fade-in</li>
              <li>Loading indicator</li>
              <li>Auto-redirect after 2s</li>
            </ul>
          </div>
          <div className="screen-card">
            <h3>Login</h3>
            <p>Email/password, biometric option, &quot;New Patient&quot; link</p>
            <ul className="screen-elements">
              <li>Email input field</li>
              <li>Password input field</li>
              <li>Biometric login button (Face ID / Touch ID)</li>
              <li>&quot;Forgot Password&quot; link</li>
              <li>&quot;New Patient? Register&quot; link</li>
            </ul>
          </div>
          <div className="screen-card">
            <h3>Dashboard</h3>
            <p>Next appointment, membership status, credits, quick actions</p>
            <ul className="screen-elements">
              <li>Welcome greeting with name</li>
              <li>Next appointment card</li>
              <li>Membership tier badge</li>
              <li>Credits remaining counter</li>
              <li>Quick action buttons (Book, Message, Portal)</li>
            </ul>
          </div>
          <div className="screen-card">
            <h3>Appointments</h3>
            <p>Calendar view, upcoming list, book new, reschedule/cancel</p>
            <ul className="screen-elements">
              <li>Monthly calendar view</li>
              <li>Upcoming appointments list</li>
              <li>Book new appointment button</li>
              <li>Reschedule / cancel actions</li>
              <li>Past appointments history</li>
            </ul>
          </div>
          <div className="screen-card">
            <h3>Memberships</h3>
            <p>Current tier card, upgrade options, usage stats, payment history</p>
            <ul className="screen-elements">
              <li>Current membership tier card</li>
              <li>Usage statistics (credits used/remaining)</li>
              <li>Upgrade tier options</li>
              <li>Payment history list</li>
              <li>Renewal date display</li>
            </ul>
          </div>
          <div className="screen-card">
            <h3>Services</h3>
            <p>Browse by category, pricing, &quot;Book&quot; button per service</p>
            <ul className="screen-elements">
              <li>Category filter tabs</li>
              <li>Service cards with pricing</li>
              <li>Service description expandable</li>
              <li>Book button per service</li>
              <li>Search bar</li>
            </ul>
          </div>
          <div className="screen-card">
            <h3>Booking Flow</h3>
            <p>Service &rarr; Provider &rarr; Date &rarr; Time &rarr; Confirm (step indicator)</p>
            <ul className="screen-elements">
              <li>Step progress indicator</li>
              <li>Service selection</li>
              <li>Provider selection cards</li>
              <li>Date picker calendar</li>
              <li>Time slot grid</li>
              <li>Confirmation summary</li>
            </ul>
          </div>
          <div className="screen-card">
            <h3>Portal</h3>
            <p>Lab results, messages, billing, profile</p>
            <ul className="screen-elements">
              <li>Lab results with trends</li>
              <li>Message inbox (provider messages)</li>
              <li>Billing summary and invoices</li>
              <li>Profile and insurance info</li>
            </ul>
          </div>
          <div className="screen-card">
            <h3>AI Coach Chat</h3>
            <p>Chat interface with ReelVerse Coach, quick action buttons</p>
            <ul className="screen-elements">
              <li>Chat message bubbles</li>
              <li>Text input with send button</li>
              <li>Quick action chips</li>
              <li>Symptom checker shortcut</li>
              <li>Coach avatar</li>
            </ul>
          </div>
          <div className="screen-card">
            <h3>Settings</h3>
            <p>Notifications, payment methods, insurance, privacy, logout</p>
            <ul className="screen-elements">
              <li>Notification preferences toggles</li>
              <li>Payment methods management</li>
              <li>Insurance information</li>
              <li>Privacy settings</li>
              <li>Logout button</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Push Notifications */}
      <section className="panel">
        <h2>Push Notifications</h2>
        <p className="section-desc">Notification types, triggers, and templates</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Trigger</th>
                <th>Template</th>
                <th>Opt-out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="cell-name">Appointment Reminder</td>
                <td>24hr before</td>
                <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{'"Your appointment with {provider} is tomorrow at {time}"'}</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Appointment Reminder</td>
                <td>2hr before</td>
                <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{'"Reminder: {service} at {time} today"'}</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Lab Results</td>
                <td>Results imported</td>
                <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{'"Your lab results are ready. View in the app."'}</td>
                <td>No</td>
              </tr>
              <tr>
                <td className="cell-name">Membership Renewal</td>
                <td>7 days before</td>
                <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{'"Your {tier} membership renews on {date}"'}</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Package Milestone</td>
                <td>50%/75%/100%</td>
                <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{'"Congratulations! You\'ve completed {pct}% of your {package}"'}</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td className="cell-name">New Message</td>
                <td>Provider message</td>
                <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{'"New message from {provider}"'}</td>
                <td>No</td>
              </tr>
              <tr>
                <td className="cell-name">Payment Confirmation</td>
                <td>Payment processed</td>
                <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{"Payment of {amount} received. Thank you!"}</td>
                <td>No</td>
              </tr>
              <tr>
                <td className="cell-name">Promotion</td>
                <td>Manual campaign</td>
                <td style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{'{custom message}'}</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Offline Mode */}
      <section className="panel">
        <h2>Offline Mode</h2>
        <p className="section-desc">Capabilities available without network connection</p>
        <div className="offline-cards">
          <div className="offline-card">
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>Cached Appointments</h3>
            <p style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>View upcoming 7 days offline, sync on reconnect</p>
          </div>
          <div className="offline-card">
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>Membership Card</h3>
            <p style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>Digital membership card available offline for check-in</p>
          </div>
          <div className="offline-card">
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>Medication Reminders</h3>
            <p style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>Continue alerting even without connection</p>
          </div>
          <div className="offline-card">
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>Queue Actions</h3>
            <p style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>Book/cancel requests queued and sent when back online</p>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="panel">
        <h2>Feature Comparison</h2>
        <p className="section-desc">Web vs Mobile feature availability</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Web</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="cell-name">Service Browsing</td>
                <td className="cell-good">Yes</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Appointment Booking</td>
                <td className="cell-good">Yes</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Patient Portal</td>
                <td className="cell-good">Yes</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">AI Coach Chat</td>
                <td className="cell-good">Yes</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Push Notifications</td>
                <td style={{ color: 'var(--color-text-dim)' }}>No</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Biometric Login</td>
                <td style={{ color: 'var(--color-text-dim)' }}>No</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Offline Mode</td>
                <td style={{ color: 'var(--color-text-dim)' }}>No</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Digital Membership Card</td>
                <td style={{ color: 'var(--color-text-dim)' }}>No</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Medication Reminders</td>
                <td style={{ color: 'var(--color-text-dim)' }}>No</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Apple Health / Google Fit</td>
                <td style={{ color: 'var(--color-text-dim)' }}>No</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">QR Code Check-in</td>
                <td style={{ color: 'var(--color-text-dim)' }}>No</td>
                <td className="cell-good">Yes</td>
              </tr>
              <tr>
                <td className="cell-name">Camera (progress photos)</td>
                <td style={{ color: 'var(--color-text-dim)' }}>No</td>
                <td className="cell-good">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* App Store Listing */}
      <section className="panel">
        <h2>App Store Listing</h2>
        <p className="section-desc">Planned App Store / Google Play listing preview</p>
        <div className="app-store-preview">
          <h3>Shape The Wave Longevity</h3>
          <div className="app-store-subtitle">Your Wellness Journey, Simplified</div>
          <div className="app-store-rating">&#9733;&#9733;&#9733;&#9733;&#9733; 4.8 (projected)</div>
          <p className="app-store-desc">
            Manage your concierge wellness experience. Book appointments, track your health journey,
            chat with your AI coach, and access your membership — all from your phone.
          </p>
          <div className="app-store-meta">
            <span><strong>Category:</strong> Health &amp; Fitness / Medical</span>
            <span><strong>Compatibility:</strong> iOS 16+, Android 12+</span>
            <span><strong>Size:</strong> ~45 MB</span>
            <span><strong>Keywords:</strong> wellness, longevity, weight loss, hormone therapy, TRT, semaglutide, health, appointments</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MobileTab;
