import { useState, useEffect, useMemo } from "react";

const C = {
  bg: "#0f172a", card: "#1e293b", cardHi: "#273548",
  accent: "#38bdf8", accentDk: "#0ea5e9", accentPale: "#bae6fd",
  green: "#4ade80", greenDk: "#22c55e",
  amber: "#fbbf24", amberDk: "#f59e0b",
  rose: "#fb7185", roseDk: "#e11d48",
  purple: "#a78bfa", purpleDk: "#8b5cf6",
  text: "#f1f5f9", muted: "#94a3b8", dim: "#64748b",
  border: "#334155", white: "#ffffff",
  shadow: "0 2px 12px rgba(0,0,0,.25)",
};

const STYLE = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
body{font-family:'Inter',system-ui,sans-serif;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#38bdf844;border-radius:2px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.fu{animation:fadeUp .3s ease both;}
.d1{animation-delay:.05s;}.d2{animation-delay:.10s;}.d3{animation-delay:.15s;}.d4{animation-delay:.20s;}
button{font-family:inherit;cursor:pointer;}
textarea{font-family:inherit;}`;

function Styles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLE;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
  return null;
}

const MOODS = [
  { emoji: "😔", label: "Struggling", value: 1, color: C.rose },
  { emoji: "😟", label: "Low", value: 2, color: C.amber },
  { emoji: "😐", label: "Okay", value: 3, color: C.muted },
  { emoji: "🙂", label: "Good", value: 4, color: C.green },
  { emoji: "😊", label: "Great", value: 5, color: C.accent },
];

const PHQ2 = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
];

const GAD2 = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
];

const FREQ_OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

const SELF_CARE = [
  { id: "sleep", label: "Slept well", emoji: "💤" },
  { id: "exercise", label: "Moved my body", emoji: "🏃" },
  { id: "social", label: "Connected with someone", emoji: "🫂" },
  { id: "outdoors", label: "Spent time outside", emoji: "🌿" },
  { id: "meals", label: "Ate regular meals", emoji: "🍽️" },
  { id: "creative", label: "Did something creative", emoji: "🎨" },
];

function loadEntries() {
  try { return JSON.parse(localStorage.getItem("wc_entries") || "[]"); } catch { return []; }
}
function saveEntries(entries) {
  try { localStorage.setItem("wc_entries", JSON.stringify(entries)); } catch {}
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function scoreSeverity(score, max) {
  const pct = score / max;
  if (pct <= 0.25) return { label: "Minimal", color: C.green };
  if (pct <= 0.5) return { label: "Mild", color: C.amber };
  if (pct <= 0.75) return { label: "Moderate", color: C.amberDk };
  return { label: "Elevated", color: C.rose };
}

// ─── COMPONENTS ──────────────────────────────────────────────

function MoodPicker({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {MOODS.map((m) => {
        const on = value === m.value;
        return (
          <button key={m.value} onClick={() => onChange(m.value)}
            aria-label={m.label}
            style={{
              background: on ? m.color + "22" : C.card,
              border: `2px solid ${on ? m.color : C.border}`,
              borderRadius: 14, padding: "10px 6px", width: 62,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              transition: "all .15s",
              transform: on ? "scale(1.08)" : "scale(1)",
            }}>
            <span style={{ fontSize: 28 }}>{m.emoji}</span>
            <span style={{ fontSize: 10, color: on ? m.color : C.muted, fontWeight: 600 }}>
              {m.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function FreqScale({ questions, answers, onChange, label }) {
  return (
    <div className="fu d1" style={{ marginTop: 20 }}>
      <div style={{ fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontSize: 11, color: C.dim, fontStyle: "italic", marginBottom: 14 }}>
        Over the last 2 weeks, how often have you been bothered by:
      </div>
      {questions.map((q, qi) => (
        <div key={qi} style={{
          background: C.card, borderRadius: 12, padding: "12px 14px",
          marginBottom: 8, border: `1px solid ${C.border}`,
        }}>
          <div style={{ fontSize: 13, color: C.text, marginBottom: 10, lineHeight: 1.5 }}>{q}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {FREQ_OPTIONS.map((opt) => {
              const on = answers[qi] === opt.value;
              return (
                <button key={opt.value} onClick={() => onChange(qi, opt.value)}
                  style={{
                    background: on ? C.accent + "22" : C.cardHi,
                    border: `1.5px solid ${on ? C.accent : "transparent"}`,
                    borderRadius: 8, padding: "5px 10px",
                    fontSize: 11, color: on ? C.accent : C.muted, fontWeight: on ? 600 : 400,
                    transition: "all .12s",
                  }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function SelfCareChecklist({ checked, onChange }) {
  return (
    <div className="fu d2" style={{ marginTop: 20 }}>
      <div style={{ fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
        Self-Care Today
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {SELF_CARE.map((item) => {
          const on = checked.includes(item.id);
          return (
            <button key={item.id} onClick={() => onChange(item.id)}
              aria-pressed={on}
              style={{
                background: on ? C.green + "18" : C.card,
                border: `1.5px solid ${on ? C.greenDk : C.border}`,
                borderRadius: 10, padding: "10px 12px",
                display: "flex", alignItems: "center", gap: 8,
                textAlign: "left", transition: "all .12s",
              }}>
              <span style={{ fontSize: 18 }}>{item.emoji}</span>
              <span style={{ fontSize: 12, color: on ? C.green : C.muted, fontWeight: on ? 600 : 400 }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MiniChart({ entries, field, color, height = 60 }) {
  const last14 = entries.slice(-14);
  if (last14.length < 2) return null;
  const vals = last14.map((e) => e[field] ?? 0);
  const max = Math.max(...vals, 1);
  const w = 100 / vals.length;
  return (
    <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none"
      style={{ display: "block", borderRadius: 8, overflow: "hidden" }}>
      {vals.map((v, i) => {
        const barH = (v / max) * (height - 4);
        return (
          <rect key={i} x={i * w + 1} y={height - barH - 2} width={w - 2} height={barH}
            rx="2" fill={color} opacity={0.6 + (i / vals.length) * 0.4} />
        );
      })}
    </svg>
  );
}

function ScoreBadge({ score, max, label }) {
  const sev = scoreSeverity(score, max);
  return (
    <div style={{
      background: C.card, borderRadius: 12, padding: "14px 16px",
      border: `1px solid ${C.border}`, flex: 1, minWidth: 130,
    }}>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 6, fontWeight: 500 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: sev.color }}>{score}</span>
        <span style={{ fontSize: 12, color: C.dim }}>/ {max}</span>
      </div>
      <div style={{
        display: "inline-block", marginTop: 6, padding: "2px 8px",
        borderRadius: 6, fontSize: 10, fontWeight: 600,
        background: sev.color + "22", color: sev.color,
      }}>
        {sev.label}
      </div>
    </div>
  );
}

// ─── SCREENS ─────────────────────────────────────────────────

function CheckInScreen({ onComplete, entries }) {
  const [mood, setMood] = useState(null);
  const [phq, setPhq] = useState([null, null]);
  const [gad, setGad] = useState([null, null]);
  const [selfCare, setSelfCare] = useState([]);
  const [journal, setJournal] = useState("");
  const [step, setStep] = useState(0);

  const updatePhq = (i, v) => setPhq((p) => p.map((x, j) => (j === i ? v : x)));
  const updateGad = (i, v) => setGad((p) => p.map((x, j) => (j === i ? v : x)));
  const toggleCare = (id) => setSelfCare((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const canNext = () => {
    if (step === 0) return mood !== null;
    if (step === 1) return phq.every((v) => v !== null) && gad.every((v) => v !== null);
    return true;
  };

  const submit = () => {
    const entry = {
      date: new Date().toISOString(),
      mood,
      phq2: phq.reduce((a, b) => a + b, 0),
      gad2: gad.reduce((a, b) => a + b, 0),
      selfCare,
      selfCareCount: selfCare.length,
      journal: journal.trim() || null,
    };
    onComplete(entry);
  };

  const todayDone = entries.length > 0 &&
    new Date(entries[entries.length - 1].date).toDateString() === new Date().toDateString();

  if (todayDone) {
    const last = entries[entries.length - 1];
    const moodInfo = MOODS.find((m) => m.value === last.mood);
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div className="fu" style={{ fontSize: 56, marginBottom: 12 }}>{moodInfo?.emoji}</div>
        <div className="fu d1" style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 6 }}>
          Today's check-in complete
        </div>
        <div className="fu d2" style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>
          You reported feeling {moodInfo?.label.toLowerCase()}. Come back tomorrow.
        </div>
        <div className="fu d3" style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <ScoreBadge score={last.phq2} max={6} label="PHQ-2 (Mood)" />
          <ScoreBadge score={last.gad2} max={6} label="GAD-2 (Anxiety)" />
        </div>
        {last.selfCare.length > 0 && (
          <div className="fu d4" style={{ marginTop: 16, fontSize: 13, color: C.dim }}>
            Self-care: {last.selfCare.map((id) => SELF_CARE.find((s) => s.id === id)?.emoji).join(" ")}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      {/* Progress */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
        {[0, 1, 2].map((s) => (
          <div key={s} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: s <= step ? C.accent : C.border,
            transition: "background .2s",
          }} />
        ))}
      </div>

      {step === 0 && (
        <div className="fu">
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>
            How are you feeling right now?
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>
            Be honest — there are no wrong answers.
          </div>
          <MoodPicker value={mood} onChange={setMood} />
        </div>
      )}

      {step === 1 && (
        <div className="fu">
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>
            Screening Questions
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>
            Validated clinical screening tools (PHQ-2 &amp; GAD-2).
          </div>
          <FreqScale questions={PHQ2} answers={phq} onChange={updatePhq} label="Mood (PHQ-2)" />
          <FreqScale questions={GAD2} answers={gad} onChange={updateGad} label="Anxiety (GAD-2)" />
        </div>
      )}

      {step === 2 && (
        <div className="fu">
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>
            Self-Care &amp; Reflection
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>
            What did you do for yourself today?
          </div>
          <SelfCareChecklist checked={selfCare} onChange={toggleCare} />
          <div className="fu d3" style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
              Journal (optional)
            </div>
            <textarea value={journal} onChange={(e) => setJournal(e.target.value)}
              placeholder="Anything on your mind..."
              aria-label="Journal entry"
              rows={4}
              style={{
                width: "100%", background: C.card, border: `1.5px solid ${C.border}`,
                borderRadius: 10, padding: "10px 12px", color: C.text, fontSize: 14,
                lineHeight: 1.6, resize: "vertical", outline: "none",
                boxSizing: "border-box",
              }} />
          </div>
        </div>
      )}

      {/* Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        background: `linear-gradient(transparent, ${C.bg} 30%)`,
        display: "flex", gap: 10, justifyContent: "center",
        maxWidth: 480, margin: "0 auto",
      }}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)}
            style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
              padding: "12px 24px", color: C.muted, fontSize: 14, fontWeight: 600,
            }}>
            Back
          </button>
        )}
        <button
          onClick={() => (step < 2 ? setStep(step + 1) : submit())}
          disabled={!canNext()}
          style={{
            flex: 1, maxWidth: 260,
            background: canNext() ? `linear-gradient(135deg, ${C.accentDk}, ${C.accent})` : C.cardHi,
            border: "none", borderRadius: 12, padding: "12px 24px",
            color: canNext() ? C.white : C.dim, fontSize: 14, fontWeight: 700,
            opacity: canNext() ? 1 : 0.5, transition: "all .15s",
          }}>
          {step < 2 ? "Continue" : "Submit Check-In"}
        </button>
      </div>
    </div>
  );
}

function HistoryScreen({ entries }) {
  const sorted = useMemo(() => [...entries].reverse(), [entries]);
  const last14 = entries.slice(-14);

  if (entries.length === 0) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{"📊"}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 6 }}>No check-ins yet</div>
        <div style={{ fontSize: 13, color: C.muted }}>Complete your first check-in to see trends here.</div>
      </div>
    );
  }

  const avgMood = (last14.reduce((a, e) => a + e.mood, 0) / last14.length).toFixed(1);
  const avgPhq = (last14.reduce((a, e) => a + e.phq2, 0) / last14.length).toFixed(1);
  const avgGad = (last14.reduce((a, e) => a + e.gad2, 0) / last14.length).toFixed(1);
  const avgCare = (last14.reduce((a, e) => a + e.selfCareCount, 0) / last14.length).toFixed(1);
  const streak = (() => {
    let s = 0;
    const today = new Date();
    for (let i = entries.length - 1; i >= 0; i--) {
      const d = new Date(entries[i].date);
      const diff = Math.floor((today - d) / 86400000);
      if (diff === s) s++;
      else break;
    }
    return s;
  })();

  return (
    <div style={{ padding: "20px 16px 30px" }}>
      {/* Stats row */}
      <div className="fu" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Streak", val: `${streak}d`, color: C.accent },
          { label: "Avg Mood", val: avgMood, color: MOODS[Math.round(avgMood) - 1]?.color || C.muted },
          { label: "Entries", val: entries.length, color: C.purple },
        ].map((s) => (
          <div key={s.label} style={{
            background: C.card, borderRadius: 12, padding: "12px 10px",
            textAlign: "center", border: `1px solid ${C.border}`,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Trend charts */}
      <div className="fu d1" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
          14-Day Trends
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Mood", field: "mood", color: C.accent },
            { label: "Self-Care", field: "selfCareCount", color: C.green },
            { label: "PHQ-2", field: "phq2", color: C.amber },
            { label: "GAD-2", field: "gad2", color: C.rose },
          ].map((ch) => (
            <div key={ch.label} style={{
              background: C.card, borderRadius: 12, padding: "10px 12px",
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: C.muted, fontWeight: 500 }}>{ch.label}</span>
                <span style={{ fontSize: 11, color: ch.color, fontWeight: 600 }}>
                  {ch.label === "Mood" ? avgMood : ch.label === "Self-Care" ? avgCare : ch.label === "PHQ-2" ? avgPhq : avgGad}
                </span>
              </div>
              <MiniChart entries={entries} field={ch.field} color={ch.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Entry list */}
      <div className="fu d2">
        <div style={{ fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
          Recent Entries
        </div>
        {sorted.slice(0, 20).map((entry, i) => {
          const moodInfo = MOODS.find((m) => m.value === entry.mood);
          const phqSev = scoreSeverity(entry.phq2, 6);
          const gadSev = scoreSeverity(entry.gad2, 6);
          return (
            <div key={i} style={{
              background: C.card, borderRadius: 12, padding: "12px 14px",
              marginBottom: 8, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 28 }}>{moodInfo?.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
                  {formatDate(entry.date)}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: phqSev.color + "22", color: phqSev.color }}>
                    PHQ {entry.phq2}
                  </span>
                  <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: gadSev.color + "22", color: gadSev.color }}>
                    GAD {entry.gad2}
                  </span>
                  {entry.selfCareCount > 0 && (
                    <span style={{ fontSize: 10, color: C.dim }}>
                      {entry.selfCareCount} self-care
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InfoScreen() {
  const sections = [
    {
      title: "About This Tool",
      body: "Wellness Check-In is a daily self-assessment tool designed to help you track your mental health over time. It uses validated clinical screening instruments alongside self-care tracking and personal journaling.",
    },
    {
      title: "PHQ-2 (Patient Health Questionnaire)",
      body: "The PHQ-2 is a validated two-item screening tool for depression. Scores range from 0–6. A score of 3 or higher suggests further evaluation for depression may be warranted. It is not a diagnostic tool.",
    },
    {
      title: "GAD-2 (Generalized Anxiety Disorder)",
      body: "The GAD-2 is a validated two-item screening tool for anxiety disorders. Scores range from 0–6. A score of 3 or higher suggests further evaluation for anxiety may be warranted. It is not a diagnostic tool.",
    },
    {
      title: "Privacy",
      body: "All data is stored locally on your device using browser storage. Nothing is sent to any server. Your entries are private and remain entirely on this device.",
    },
    {
      title: "Important Disclaimer",
      body: "This tool is for self-monitoring purposes only. It is not a substitute for professional mental health care. If you are in crisis, please contact the 988 Suicide & Crisis Lifeline by calling or texting 988, or contact your local emergency services.",
      highlight: true,
    },
  ];

  return (
    <div style={{ padding: "20px 16px 30px" }}>
      <div className="fu" style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 16 }}>
        Information
      </div>
      {sections.map((s, i) => (
        <div key={i} className="fu" style={{
          background: s.highlight ? C.rose + "12" : C.card,
          borderRadius: 12, padding: "14px 16px", marginBottom: 10,
          border: `1px solid ${s.highlight ? C.roseDk + "44" : C.border}`,
          animationDelay: `${i * 0.05}s`,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: s.highlight ? C.rose : C.text, marginBottom: 6 }}>
            {s.title}
          </div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{s.body}</div>
        </div>
      ))}
      <div className="fu" style={{
        marginTop: 16, textAlign: "center", fontSize: 12, color: C.dim,
        animationDelay: `${sections.length * 0.05}s`,
      }}>
        Built by Julia Gekhter-Tack, LCSW
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────

const NAV = [
  { id: "checkin", label: "Check In", icon: "❤️" },
  { id: "history", label: "History", icon: "📊" },
  { id: "info", label: "Info", icon: "ℹ️" },
];

// ─── APP ─────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("checkin");
  const [entries, setEntries] = useState(loadEntries);

  const handleComplete = (entry) => {
    const next = [...entries, entry];
    setEntries(next);
    saveEntries(next);
  };

  const screens = {
    checkin: <CheckInScreen entries={entries} onComplete={handleComplete} />,
    history: <HistoryScreen entries={entries} />,
    info: <InfoScreen />,
  };

  return (
    <>
      <Styles />
      <div style={{
        width: "100%", maxWidth: 480, height: "100dvh", margin: "0 auto",
        display: "flex", flexDirection: "column", background: C.bg,
        overflow: "hidden",
      }}>
        {/* Header */}
        <header style={{
          background: C.bg, padding: "14px 18px 10px",
          borderBottom: `1px solid ${C.border}`, flexShrink: 0,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Wellness Check-In</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 1 }}>Daily self-assessment</div>
          </div>
          <div style={{ fontSize: 10, color: C.dim }}>
            {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto" }}>
          {screens[tab]}
        </main>

        {/* Nav */}
        <nav role="tablist" aria-label="Main navigation" style={{
          background: C.bg, borderTop: `1px solid ${C.border}`,
          display: "flex", paddingBottom: "env(safe-area-inset-bottom, 5px)",
          flexShrink: 0,
        }}>
          {NAV.map(({ id, label, icon }) => {
            const on = tab === id;
            return (
              <button key={id} role="tab" aria-selected={on} aria-label={label}
                onClick={() => setTab(id)}
                style={{
                  flex: 1, background: "none", border: "none",
                  padding: "10px 4px 8px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                }}>
                <span style={{ fontSize: 18, opacity: on ? 1 : 0.5 }}>{icon}</span>
                <span style={{
                  fontSize: 10, fontWeight: on ? 700 : 400,
                  color: on ? C.accent : C.dim,
                }}>
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
