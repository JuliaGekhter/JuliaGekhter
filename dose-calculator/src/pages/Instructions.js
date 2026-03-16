import React from "react";
import "./Instructions.css";

export default function Instructions() {
  return (
    <div className="instructions">
      <h1>How to Use</h1>
      <p className="instructions-intro">
        This calculator determines the volume (mL) to draw up for IV or IM
        injections based on the vial concentration and the ordered dose.
      </p>

      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Enter the Vial Concentration</h3>
            <p>
              Find the concentration on the medication vial label. Enter the
              numeric value and select the matching unit (mg/mL or g/L).
            </p>
          </div>
        </div>

        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Enter the Ordered Dose</h3>
            <p>
              Type the dose prescribed by the provider in milligrams (mg).
            </p>
          </div>
        </div>

        <div className="step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Read the Result</h3>
            <p>
              The calculator instantly displays the volume to administer. Always
              double-check results before administering medication.
            </p>
          </div>
        </div>
      </div>

      <div className="formula-card">
        <h3>Formula</h3>
        <p className="formula mono">
          Volume (mL) = Ordered Dose (mg) / Concentration (mg/mL)
        </p>
      </div>

      <div className="warning-card">
        <h3>Important</h3>
        <ul>
          <li>This tool is for educational and reference purposes only.</li>
          <li>Always verify calculations with a second qualified person.</li>
          <li>Follow your facility's medication administration policies.</li>
        </ul>
      </div>
    </div>
  );
}
