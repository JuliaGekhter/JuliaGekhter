function BackendTab() {
  return (
    <div className="dashboard-grid">
      {/* Database Schema */}
      <section className="panel">
        <h2>Database Schema</h2>
        <p className="section-desc">Core tables and column definitions</p>
        <div className="schema-cards">
          <div className="schema-card">
            <h3>patients</h3>
            <ul className="schema-columns">
              <li>id (PK)</li>
              <li>firstName</li>
              <li>lastName</li>
              <li>dob</li>
              <li>phone</li>
              <li>email</li>
              <li>insuranceType</li>
              <li>membershipId</li>
              <li>createdAt</li>
            </ul>
          </div>
          <div className="schema-card">
            <h3>memberships</h3>
            <ul className="schema-columns">
              <li>id (PK)</li>
              <li>name</li>
              <li>tier</li>
              <li>price</li>
              <li>starterFee</li>
              <li>credits</li>
              <li>referralBonus</li>
            </ul>
          </div>
          <div className="schema-card">
            <h3>appointments</h3>
            <ul className="schema-columns">
              <li>id (PK)</li>
              <li>patientId</li>
              <li>serviceId</li>
              <li>providerId</li>
              <li>dateTime</li>
              <li>status</li>
              <li>notes</li>
            </ul>
          </div>
          <div className="schema-card">
            <h3>billing</h3>
            <ul className="schema-columns">
              <li>id (PK)</li>
              <li>patientId</li>
              <li>amount</li>
              <li>type (membership/package/service/bundle)</li>
              <li>paymentMethod</li>
              <li>status</li>
              <li>cptCode</li>
              <li>createdAt</li>
            </ul>
          </div>
          <div className="schema-card">
            <h3>inventory</h3>
            <ul className="schema-columns">
              <li>id (PK)</li>
              <li>name</li>
              <li>stock</li>
              <li>reorderAt</li>
              <li>cost</li>
              <li>supplier</li>
              <li>lastUpdated</li>
            </ul>
          </div>
          <div className="schema-card">
            <h3>packages</h3>
            <ul className="schema-columns">
              <li>id (PK)</li>
              <li>patientId</li>
              <li>packageTypeId</li>
              <li>startDate</li>
              <li>endDate</li>
              <li>visitsUsed</li>
              <li>visitsTotal</li>
              <li>status</li>
            </ul>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="panel">
        <h2>API Endpoints</h2>
        <p className="section-desc">RESTful API routes and authorization levels</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Description</th>
                <th>Auth</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="api-method method-get">GET</span></td>
                <td className="api-endpoint">/api/patients</td>
                <td>List all patients</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td><span className="api-method method-post">POST</span></td>
                <td className="api-endpoint">/api/patients</td>
                <td>Create patient</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td><span className="api-method method-get">GET</span></td>
                <td className="api-endpoint">/api/patients/:id</td>
                <td>Get patient details</td>
                <td>Admin, Self</td>
              </tr>
              <tr>
                <td><span className="api-method method-put">PUT</span></td>
                <td className="api-endpoint">/api/patients/:id</td>
                <td>Update patient</td>
                <td>Admin, Self</td>
              </tr>
              <tr>
                <td><span className="api-method method-get">GET</span></td>
                <td className="api-endpoint">/api/memberships</td>
                <td>List membership tiers</td>
                <td>Public</td>
              </tr>
              <tr>
                <td><span className="api-method method-post">POST</span></td>
                <td className="api-endpoint">/api/memberships/enroll</td>
                <td>Enroll in membership</td>
                <td>Auth</td>
              </tr>
              <tr>
                <td><span className="api-method method-get">GET</span></td>
                <td className="api-endpoint">/api/appointments</td>
                <td>List appointments</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td><span className="api-method method-post">POST</span></td>
                <td className="api-endpoint">/api/appointments</td>
                <td>Book appointment</td>
                <td>Auth</td>
              </tr>
              <tr>
                <td><span className="api-method method-put">PUT</span></td>
                <td className="api-endpoint">/api/appointments/:id</td>
                <td>Update/cancel appointment</td>
                <td>Auth</td>
              </tr>
              <tr>
                <td><span className="api-method method-get">GET</span></td>
                <td className="api-endpoint">/api/services</td>
                <td>List all services</td>
                <td>Public</td>
              </tr>
              <tr>
                <td><span className="api-method method-get">GET</span></td>
                <td className="api-endpoint">/api/packages</td>
                <td>List all packages</td>
                <td>Public</td>
              </tr>
              <tr>
                <td><span className="api-method method-post">POST</span></td>
                <td className="api-endpoint">/api/packages/purchase</td>
                <td>Purchase package</td>
                <td>Auth</td>
              </tr>
              <tr>
                <td><span className="api-method method-get">GET</span></td>
                <td className="api-endpoint">/api/billing/:patientId</td>
                <td>Get billing history</td>
                <td>Admin, Self</td>
              </tr>
              <tr>
                <td><span className="api-method method-post">POST</span></td>
                <td className="api-endpoint">/api/billing/charge</td>
                <td>Process payment</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td><span className="api-method method-get">GET</span></td>
                <td className="api-endpoint">/api/inventory</td>
                <td>List inventory</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td><span className="api-method method-put">PUT</span></td>
                <td className="api-endpoint">/api/inventory/:id</td>
                <td>Update stock</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td><span className="api-method method-post">POST</span></td>
                <td className="api-endpoint">/api/webhooks/zenoti</td>
                <td>Zenoti sync webhook</td>
                <td>System</td>
              </tr>
              <tr>
                <td><span className="api-method method-post">POST</span></td>
                <td className="api-endpoint">/api/webhooks/athena</td>
                <td>Athena EHR webhook</td>
                <td>System</td>
              </tr>
              <tr>
                <td><span className="api-method method-post">POST</span></td>
                <td className="api-endpoint">/api/webhooks/stripe</td>
                <td>Stripe payment webhook</td>
                <td>System</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Authentication Flow */}
      <section className="panel">
        <h2>Authentication Flow</h2>
        <p className="section-desc">JWT-based authentication and role-based access control</p>
        <div className="auth-flow">
          <div className="auth-step">
            <div className="auth-step-number">1</div>
            <h4>Login Request</h4>
            <p>Patient/Staff login via POST /api/auth/login (email + password)</p>
          </div>
          <div className="auth-step">
            <div className="auth-step-number">2</div>
            <h4>Server Validates</h4>
            <p>Returns JWT token + refresh token</p>
          </div>
          <div className="auth-step">
            <div className="auth-step-number">3</div>
            <h4>Client Stores Token</h4>
            <p>Includes in Authorization header</p>
          </div>
          <div className="auth-step">
            <div className="auth-step-number">4</div>
            <h4>Role-Based Access</h4>
            <p>Admin (full), Provider (clinical), Patient (self-only), Public (read-only services/memberships)</p>
          </div>
        </div>
      </section>

      {/* Integration Architecture */}
      <section className="panel">
        <h2>Integration Architecture</h2>
        <p className="section-desc">External service data flow and sync patterns</p>
        <div className="data-flow-cards">
          <div className="data-flow-card">
            <strong>Zenoti</strong>
            <span className="data-flow-arrow">&rarr;</span>
            <strong>STW</strong>
            <div className="data-flow-items">Services, appointments, inventory sync (every 2 hours)</div>
          </div>
          <div className="data-flow-card">
            <strong>Athena</strong>
            <span className="data-flow-arrow">&rarr;</span>
            <strong>STW</strong>
            <div className="data-flow-items">Patient records, lab results, CPT codes (real-time webhooks)</div>
          </div>
          <div className="data-flow-card">
            <strong>Stripe</strong>
            <span className="data-flow-arrow">&rarr;</span>
            <strong>STW</strong>
            <div className="data-flow-items">Payments, subscriptions, invoices (real-time webhooks)</div>
          </div>
          <div className="data-flow-card">
            <strong>STW</strong>
            <span className="data-flow-arrow">&rarr;</span>
            <strong>Twilio</strong>
            <div className="data-flow-items">Appointment reminders, marketing SMS (event-driven)</div>
          </div>
          <div className="data-flow-card">
            <strong>STW</strong>
            <span className="data-flow-arrow">&rarr;</span>
            <strong>SendGrid</strong>
            <div className="data-flow-items">Email campaigns, transactional emails (event-driven)</div>
          </div>
          <div className="data-flow-card">
            <strong>STW</strong>
            <span className="data-flow-arrow">&rarr;</span>
            <strong>GA</strong>
            <div className="data-flow-items">Page views, conversions, events (client-side)</div>
          </div>
        </div>
      </section>

      {/* Webhook Config */}
      <section className="panel">
        <h2>Webhook Configuration</h2>
        <p className="section-desc">Registered webhook endpoints and event subscriptions</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Source</th>
                <th>URL</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="cell-name">appointment.created</td>
                <td>Zenoti</td>
                <td className="api-endpoint">/api/webhooks/zenoti</td>
                <td><span className="status-badge status-connected">Active</span></td>
              </tr>
              <tr>
                <td className="cell-name">appointment.completed</td>
                <td>Zenoti</td>
                <td className="api-endpoint">/api/webhooks/zenoti</td>
                <td><span className="status-badge status-connected">Active</span></td>
              </tr>
              <tr>
                <td className="cell-name">lab_results.ready</td>
                <td>Athena</td>
                <td className="api-endpoint">/api/webhooks/athena</td>
                <td><span className="status-badge status-connected">Active</span></td>
              </tr>
              <tr>
                <td className="cell-name">patient.updated</td>
                <td>Athena</td>
                <td className="api-endpoint">/api/webhooks/athena</td>
                <td><span className="status-badge status-connected">Active</span></td>
              </tr>
              <tr>
                <td className="cell-name">payment.succeeded</td>
                <td>Stripe</td>
                <td className="api-endpoint">/api/webhooks/stripe</td>
                <td><span className="status-badge status-connected">Active</span></td>
              </tr>
              <tr>
                <td className="cell-name">payment.failed</td>
                <td>Stripe</td>
                <td className="api-endpoint">/api/webhooks/stripe</td>
                <td><span className="status-badge status-connected">Active</span></td>
              </tr>
              <tr>
                <td className="cell-name">subscription.renewed</td>
                <td>Stripe</td>
                <td className="api-endpoint">/api/webhooks/stripe</td>
                <td><span className="status-badge status-connected">Active</span></td>
              </tr>
              <tr>
                <td className="cell-name">subscription.canceled</td>
                <td>Stripe</td>
                <td className="api-endpoint">/api/webhooks/stripe</td>
                <td><span className="status-badge status-connected">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Environment Config */}
      <section className="panel">
        <h2>Environment Configuration</h2>
        <p className="section-desc">Per-environment settings and service endpoints</p>
        <div className="env-cards">
          <div className="env-card">
            <h4 style={{ color: 'var(--color-green)' }}>Development</h4>
            <div className="env-row">API_URL: http://localhost:3001</div>
            <div className="env-row">DATABASE: stw_dev</div>
            <div className="env-row">STRIPE_MODE: test</div>
            <div className="env-row">DEBUG: true</div>
            <div className="env-row">LOG_LEVEL: debug</div>
          </div>
          <div className="env-card">
            <h4 style={{ color: 'var(--color-orange)' }}>Staging</h4>
            <div className="env-row">API_URL: https://staging-api.stw.com</div>
            <div className="env-row">DATABASE: stw_staging</div>
            <div className="env-row">STRIPE_MODE: test</div>
            <div className="env-row">DEBUG: false</div>
            <div className="env-row">LOG_LEVEL: info</div>
          </div>
          <div className="env-card">
            <h4 style={{ color: 'var(--color-red)' }}>Production</h4>
            <div className="env-row">API_URL: https://api.stw.com</div>
            <div className="env-row">DATABASE: stw_prod</div>
            <div className="env-row">STRIPE_MODE: live</div>
            <div className="env-row">DEBUG: false</div>
            <div className="env-row">LOG_LEVEL: warn</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BackendTab;
