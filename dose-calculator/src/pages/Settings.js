import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [defaultUnit, setDefaultUnit] = useState("mg/mL");
  const [precision, setPrecision] = useState("2");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setDefaultUnit("mg/mL");
    setPrecision("2");
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <p className="settings-subtitle">Customize calculator preferences.</p>

      <div className="settings-card">
        <div className="setting-row">
          <div className="setting-info">
            <label className="setting-label">Default Unit</label>
            <p className="setting-desc">
              Unit pre-selected when the calculator loads.
            </p>
          </div>
          <select
            className="setting-select"
            value={defaultUnit}
            onChange={(e) => setDefaultUnit(e.target.value)}
          >
            <option value="mg/mL">mg/mL</option>
            <option value="g/L">g/L</option>
          </select>
        </div>

        <div className="setting-divider" />

        <div className="setting-row">
          <div className="setting-info">
            <label className="setting-label">Decimal Precision</label>
            <p className="setting-desc">
              Number of decimal places shown in results.
            </p>
          </div>
          <select
            className="setting-select"
            value={precision}
            onChange={(e) => setPrecision(e.target.value)}
          >
            <option value="1">1 decimal</option>
            <option value="2">2 decimals</option>
            <option value="3">3 decimals</option>
            <option value="4">4 decimals</option>
          </select>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? "Saved!" : "Save Preferences"}
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset Defaults
        </button>
      </div>
    </div>
  );
}
