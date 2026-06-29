import { useState, useMemo } from 'react';
import { DEFAULT_CPT_CODES } from '../data/constants';

function CptCodesTable() {
  const [cptSearch, setCptSearch] = useState('');

  const filtered = useMemo(() => {
    if (!cptSearch.trim()) return DEFAULT_CPT_CODES;
    const q = cptSearch.toLowerCase();
    return DEFAULT_CPT_CODES.filter(c =>
      c.cpt.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [cptSearch]);

  return (
    <section className="panel">
      <h2>CPT Codes</h2>
      <p className="section-desc">Fee schedule with current and 2025 rates</p>
      <input
        className="cpt-search"
        type="text"
        placeholder="Search by CPT code or description..."
        value={cptSearch}
        onChange={e => setCptSearch(e.target.value)}
      />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>CPT</th>
              <th>Description</th>
              <th>Current Fee</th>
              <th>2025 Fee</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.cpt}>
                <td className="cell-name">{c.cpt}</td>
                <td>{c.description}</td>
                <td>${c.fee}</td>
                <td className="cell-good">${c.newFee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CptCodesTable;
