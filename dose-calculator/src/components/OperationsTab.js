import { useState } from 'react';

function OperationsTab() {
  const [inventory, setInventory] = useState([
    { name: 'Semaglutide vials', stock: 45, reorderAt: 20, cost: 100, supplier: 'Empower' },
    { name: 'Tirzepatide vials', stock: 30, reorderAt: 15, cost: 150, supplier: 'Empower' },
    { name: 'Testosterone Cypionate', stock: 60, reorderAt: 25, cost: 89, supplier: 'Empower' },
    { name: 'Phentermine (30ct)', stock: 100, reorderAt: 50, cost: 3, supplier: 'Henry Schein' },
    { name: 'Shake Boxes (Robard)', stock: 200, reorderAt: 100, cost: 6, supplier: 'Robard' },
    { name: 'B-12 vials', stock: 80, reorderAt: 30, cost: 5, supplier: 'Empower' },
    { name: 'Sermorelin 15mg', stock: 25, reorderAt: 10, cost: 115, supplier: 'Empower' },
    { name: 'Syringes (box 100)', stock: 15, reorderAt: 5, cost: 18, supplier: 'Henry Schein' },
    { name: 'Alcohol wipes (box 200)', stock: 20, reorderAt: 8, cost: 5, supplier: 'Henry Schein' },
    { name: 'Sildenafil 100mg (30ct)', stock: 40, reorderAt: 15, cost: 33, supplier: 'Empower' },
    { name: 'Tadalafil 5mg (30ct)', stock: 35, reorderAt: 15, cost: 9, supplier: 'Empower' },
    { name: 'Anastrozole', stock: 50, reorderAt: 20, cost: 10, supplier: 'Empower' },
  ]);

  const updateStock = (idx, value) => {
    setInventory(prev => prev.map((item, i) =>
      i === idx ? { ...item, stock: Number(value) } : item
    ));
  };

  // Schedule data
  const hours = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const schedule = {
    '8:00 AM':  ['Dr. Tack',     'PA Johnson',  'NP Williams', 'Dr. Tack',     'PA Johnson',  ''],
    '9:00 AM':  ['Dr. Tack',     'PA Johnson',  'NP Williams', 'Dr. Tack',     'PA Johnson',  'Dr. Tack'],
    '10:00 AM': ['Dr. Tack',     'PA Johnson',  'NP Williams', 'MA Garcia',    'PA Johnson',  'Dr. Tack'],
    '11:00 AM': ['MA Garcia',    'Dr. Tack',    'PA Johnson',  'NP Williams',  'Dr. Tack',    'MA Garcia'],
    '12:00 PM': ['',             '',            '',            '',             '',            ''],
    '1:00 PM':  ['Dr. Tack',     'NP Williams', 'Dr. Tack',    'PA Johnson',   'NP Williams', ''],
    '2:00 PM':  ['PA Johnson',   'NP Williams', 'Dr. Tack',    'PA Johnson',   'NP Williams', ''],
    '3:00 PM':  ['PA Johnson',   'MA Garcia',   'MA Garcia',   'Dr. Tack',     'MA Garcia',   ''],
    '4:00 PM':  ['NP Williams',  'MA Garcia',   'MA Garcia',   'NP Williams',  'MA Garcia',   ''],
    '5:00 PM':  ['',             '',            '',            '',             '',            ''],
  };

  const getStaffClass = (name) => {
    if (name.startsWith('Dr.')) return 'staff-dr';
    if (name.startsWith('PA')) return 'staff-pa';
    if (name.startsWith('NP')) return 'staff-np';
    if (name.startsWith('MA')) return 'staff-ma';
    return '';
  };

  return (
    <div className="dashboard-grid">
      {/* Staff Schedule */}
      <section className="panel">
        <h2>Staff Schedule</h2>
        <p className="section-desc">Weekly provider schedule</p>
        <div className="schedule-grid">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  {days.map(d => <th key={d}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {hours.map(hour => (
                  <tr key={hour}>
                    <td style={{ fontWeight: 600, fontSize: 12 }}>{hour}</td>
                    {schedule[hour].map((staff, i) => (
                      <td key={i} className={getStaffClass(staff)}>
                        {staff || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12 }}>
          <span className="staff-dr">Dr. Tack</span>
          <span className="staff-pa">PA Johnson</span>
          <span className="staff-np">NP Williams</span>
          <span className="staff-ma">MA Garcia</span>
        </div>
      </section>

      {/* Inventory Tracker */}
      <section className="panel">
        <h2>Inventory Tracker</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Stock</th>
                <th>Reorder At</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Supplier</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, i) => {
                const low = item.stock <= item.reorderAt;
                return (
                  <tr key={item.name}>
                    <td className="cell-name">{item.name}</td>
                    <td>
                      <input type="number" value={item.stock}
                        onChange={e => updateStock(i, e.target.value)}
                        style={{ width: 60 }} />
                    </td>
                    <td>{item.reorderAt}</td>
                    <td className={low ? 'stock-low' : 'stock-ok'}>
                      {low ? '⚠️ Low' : '✅ OK'}
                    </td>
                    <td>${item.cost}</td>
                    <td>{item.supplier}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Billing Pipeline */}
      <section className="panel">
        <h2>Billing Pipeline</h2>
        <p className="section-desc">Patient visit billing workflow</p>
        <div className="pipeline">
          <div className="pipeline-stage">
            <h4>Scheduled</h4>
            <div className="pipeline-count" style={{ color: 'var(--color-blue)' }}>45</div>
            <div className="pipeline-amount">$14,175</div>
          </div>
          <div className="pipeline-arrow">&rarr;</div>
          <div className="pipeline-stage">
            <h4>Completed</h4>
            <div className="pipeline-count" style={{ color: 'var(--color-teal)' }}>38</div>
            <div className="pipeline-amount">$11,970</div>
          </div>
          <div className="pipeline-arrow">&rarr;</div>
          <div className="pipeline-stage">
            <h4>Billed</h4>
            <div className="pipeline-count" style={{ color: 'var(--color-orange)' }}>32</div>
            <div className="pipeline-amount">$10,080</div>
          </div>
          <div className="pipeline-arrow">&rarr;</div>
          <div className="pipeline-stage">
            <h4>Paid</h4>
            <div className="pipeline-count" style={{ color: 'var(--color-green)' }}>28</div>
            <div className="pipeline-amount">$8,820</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OperationsTab;
