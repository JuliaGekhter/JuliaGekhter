import React, { useState, useEffect } from "react";
import "@fontsource/dm-mono";
import "@fontsource/dm-sans";

const fmt = (n) => (n === null ? "" : Number.isInteger(n) ? n.toString() : n.toFixed(2));

const unitConversions = {
  "mg/mL": 1,
  "g/L": 0.001,
};

export default function DoseCalc() {
  const [conc, setConc] = useState("");
  const [dose, setDose] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("mg/mL");

  const convertConcentration = (value, unit) => value * unitConversions[unit];

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

  return (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <h1>IV / IM Dose Calculator</h1>

      {/* Concentration Input */}
      <div>
        <label>
          Vial Concentration:
          <input
            type="number"
            placeholder="e.g. 10"
            value={conc}
            onChange={(e) => setConc(e.target.value)}
          />
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="mg/mL">mg/mL</option>
            <option value="g/L">g/L</option>
          </select>
        </label>
      </div>

      {/* Dose Input */}
      <div>
        <label>
          Ordered Dose (mg):
          <input
            type="number"
            placeholder="e.g. 25"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
          />
        </label>
      </div>

      {/* Results */}
      <div>
        Volume: {ready ? `${fmt(result)} mL` : "Input Required"}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
