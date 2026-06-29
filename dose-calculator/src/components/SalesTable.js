function SalesTable({ sales, setSales }) {
  const updateSale = (section, idx, key, raw) => {
    setSales(prev => ({
      ...prev,
      [section]: prev[section].map((s, i) =>
        i === idx ? { ...s, [key]: Number(raw) } : s
      ),
    }));
  };

  const renderTable = (title, data, section) => (
    <div className="sales-group">
      <h3 className="sales-group-title">{title}</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Units Sold</th>
              <th>Price</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => {
              const revenue = s.unitsSold * s.price;
              return (
                <tr key={s.name}>
                  <td className="cell-name">{s.name}</td>
                  <td>
                    <input type="number" value={s.unitsSold}
                      onChange={e => updateSale(section, i, 'unitsSold', e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={s.price}
                      onChange={e => updateSale(section, i, 'price', e.target.value)} />
                  </td>
                  <td className="cell-revenue">${revenue.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <section className="panel">
      <h2>Sales</h2>
      {renderTable('Membership Sales', sales.memberships, 'memberships')}
      {renderTable('Bundle Sales', sales.bundles, 'bundles')}
      {renderTable('Package Sales', sales.packages, 'packages')}
    </section>
  );
}

export default SalesTable;
