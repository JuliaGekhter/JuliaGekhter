import React, { useState, useEffect } from "react";
import "./Home.css";

const fmt = (n) =>
  n === null ? "" : Number.isInteger(n) ? n.toString() : n.toFixed(2);

const unitConversions = {
  "mg/mL": 1,
  "g/L": 0.001,
};

export default function Home() {
  const [conc, setConc] = useState("");
  const [dose, setDose] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("mg/mL");

  const convertConcentration = (value, u) => value * unitConversions[u];

  useEffect(() => {
    const c = parseFloat(conc);
    const d = parseFloat(dose);

    if (!conc && !dose) {
      setResult(null);
      setError("");
      return;
    }

    if (isNaN(c) || c <= 0) {
      setResult(null);
      setError(conc ? "Invalid concentration" : "");
      return;
    }
    if (isNaN(d) || d <= 0) {
      setResult(null);
      setError(dose ? "Invalid dose" : "");
      return;
    }

    const cConverted = convertConcentration(c, unit);
    setError("");
    setResult(d / cConverted);
  }, [conc, dose, unit]);

  const ready = result !== null;

  const handleClear = () => {
    setConc("");
    setDose("");
    setResult(null);
    setError("");
  };

  return (
    <div className="calc-container">
      <div className="calc-header">
        <h1>IV / IM Dose Calculator</h1>
        <p className="calc-subtitle">
          Calculate the volume to draw up based on vial concentration and ordered dose.
        </p>
      </div>

      <div className="calc-card">
        <div className="input-group">
          <label className="input-label">Vial Concentration</label>
          <div className="input-row">
            <input
              className="calc-input"
              type="number"
              placeholder="e.g. 10"
              value={conc}
              onChange={(e) => setConc(e.target.value)}
              min="0"
            />
            <select
              className="calc-select"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="mg/mL">mg/mL</option>
              <option value="g/L">g/L</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Ordered Dose (mg)</label>
          <input
            className="calc-input full-width"
            type="number"
            placeholder="e.g. 25"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            min="0"
          />
        </div>

        <div className={`result-box ${ready ? "result-ready" : ""} ${error ? "result-error" : ""}`}>
          {error ? (
            <span className="error-text">{error}</span>
          ) : ready ? (
            <>
              <span className="result-label">Volume to administer</span>
              <span className="result-value mono">{fmt(result)} mL</span>
            </>
          ) : (
            <span className="result-placeholder">Enter values above to calculate</span>
          )}
        </div>

        {(conc || dose) && (
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
