import { useState, useEffect, useMemo, useCallback } from "react";

// Shape The Wave brand palette — exact hex values, do not substitute
const C = {
  bg: "#06080e", card: "#111827", cardHi: "#1a2234",
  border: "#1f2937", text: "#f1f5f9", muted: "#94a3b8", dim: "#64748b",
  white: "#fff",
  waveGreen: "#1E965A",
  waveBlue: "#4BB4E1",
  gold: "#B8893D",
  rose: "#f43f5e",
  shadow: "0 2px 16px rgba(0,0,0,.4)",
};

const STYLE = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
body{font-family:'Inter','Space Grotesk',system-ui,sans-serif;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#4BB4E133;border-radius:2px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fadeUp .3s ease both;}
.d1{animation-delay:.05s}.d2{animation-delay:.10s}.d3{animation-delay:.15s}.d4{animation-delay:.20s}
@keyframes holoPulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.06);opacity:1}}
@keyframes holoRing{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes holoRingRev{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}
@keyframes holoScan{0%{transform:translateY(-46px);opacity:0}15%{opacity:.7}85%{opacity:.7}100%{transform:translateY(46px);opacity:0}}
@keyframes holoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.holo-orb{animation:holoPulse 3.2s ease-in-out infinite;}
.holo-ring-a{animation:holoRing 9s linear infinite;}
.holo-ring-b{animation:holoRingRev 14s linear infinite;}
.holo-scan{animation:holoScan 2.8s linear infinite;}
.holo-float{animation:holoFloat 4.5s ease-in-out infinite;}
@media (prefers-reduced-motion: reduce){
  .holo-orb,.holo-ring-a,.holo-ring-b,.holo-scan,.holo-float,.fu{animation:none;}
}
button{font-family:inherit;cursor:pointer;}input,textarea{font-family:inherit;}`;

function Styles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLE;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
  return null;
}

// ─── COACHING CONTENT ────────────────────────────────────────
const TOPICS = [
  {
    id: "sleep", name: "Sleep", color: C.waveBlue,
    message: "Sleep is the foundation every other longevity lever rests on. Anchor a consistent wake time—even on weekends—and protect the final hour before bed from screens and bright light. Seven to nine hours of consolidated sleep supports glucose regulation, memory consolidation, and hormonal balance. If sleep remains fragmented despite good habits, raise it with your Shape The Wave clinician.",
  },
  {
    id: "movement", name: "Movement", color: C.waveGreen,
    message: "Aim for a weekly blend of zone 2 aerobic work, two or more resistance sessions, and daily low-intensity movement such as walking after meals. Muscle is a longevity organ: preserving lean mass protects metabolic health, bone density, and independence across decades. Start where you are—consistency compounds faster than intensity.",
  },
  {
    id: "nutrition", name: "Nutrition", color: C.gold,
    message: "Build each plate around protein and plants: roughly one gram of protein per pound of target body weight per day, distributed across meals, alongside fiber-rich vegetables and whole foods. Minimize ultra-processed foods and liquid calories. Nutrition is not a sprint of restriction—it is a sustainable pattern your labs and energy will reflect.",
  },
  {
    id: "stress", name: "Stress", color: C.waveBlue,
    message: "Chronic stress accelerates biological aging through cortisol, inflammation, and sleep disruption. Two evidence-anchored counters: brief daily breathwork—five minutes of slow exhale-weighted breathing—and scheduled recovery blocks you defend like appointments. Notice the difference between productive challenge and unrelenting load; the second one is the target.",
  },
  {
    id: "connection", name: "Connection", color: C.waveGreen,
    message: "Social connection is one of the strongest predictors of healthy lifespan—comparable in effect size to major clinical risk factors. Invest deliberately: one meaningful conversation daily, one shared activity weekly. Isolation is a health exposure; treat connection as part of your protocol, not an afterthought.",
  },
  {
    id: "recovery", name: "Recovery", color: C.gold,
    message: "Adaptation happens during recovery, not during effort. Alternate hard training days with easier ones, take one full rest day weekly, and monitor morning energy as a simple readiness signal. Persistent fatigue, declining performance, or disrupted sleep are signals to pull back—and worth discussing at your next visit.",
  },
];

const DAILY_FOCUS = [
  "Today's focus: hydration. Front-load water early in the day and taper by evening to protect sleep.",
  "Today's focus: protein at breakfast. An early protein anchor steadies appetite and preserves lean mass.",
  "Today's focus: a ten-minute walk after your largest meal to blunt the glucose curve.",
  "Today's focus: lights down an hour before bed. Dim environments cue melatonin release.",
  "Today's focus: one meaningful conversation. Connection is a longevity intervention.",
  "Today's focus: two minutes of slow breathing before your most demanding task.",
  "Today's focus: resistance training. Muscle preserved now is independence preserved later.",
  "Today's focus: a consistent wake time. Your circadian rhythm rewards predictability.",
  "Today's focus: fiber. Aim for vegetables at two meals to feed the microbiome.",
  "Today's focus: sunlight within an hour of waking to anchor your circadian clock.",
  "Today's focus: posture and movement breaks—stand and move for two minutes each hour.",
  "Today's focus: caffeine curfew. Hold the last cup at least eight hours before bed.",
  "Today's focus: gratitude. Note one specific thing—specificity is what moves mood.",
  "Today's focus: plan tomorrow's training tonight. Decisions made in advance get kept.",
];

const PROTOCOL = [
  { id: "p1", name: "7+ hours of sleep", domain: "Sleep", emoji: "😴" },
  { id: "p2", name: "Morning sunlight", domain: "Sleep", emoji: "🌅" },
  { id: "p3", name: "30 minutes of movement", domain: "Movement", emoji: "🏃" },
  { id: "p4", name: "Protein at every meal", domain: "Nutrition", emoji: "🍳" },
  { id: "p5", name: "8 glasses of water", domain: "Nutrition", emoji: "💧" },
  { id: "p6", name: "5 minutes of breathwork", domain: "Stress", emoji: "🌬️" },
  { id: "p7", name: "Meaningful connection", domain: "Connection", emoji: "💬" },
  { id: "p8", name: "Screen-free wind-down", domain: "Recovery", emoji: "📵" },
];

const MOODS = ["Great", "Good", "Okay", "Low"];

// ─── HELPERS ─────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10);
const dayKey = (d) => new Date(d).toISOString().slice(0, 10);

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("coach");
  const [log, setLog] = useState(() => load("hlc_log", {}));
  const [vitals, setVitals] = useState(() => load("hlc_vitals", {}));

  useEffect(() => save("hlc_log", log), [log]);
  useEffect(() => save("hlc_vitals", vitals), [vitals]);

  const toggle = useCallback((itemId) => {
    setLog((prev) => {
      const key = `${today()}_${itemId}`;
      const next = { ...prev };
      if (next[key]) delete next[key]; else next[key] = true;
      return next;
    });
  }, []);

  const isChecked = useCallback((itemId) => !!log[`${today()}_${itemId}`], [log]);

  const saveVitals = useCallback((entry) => {
    setVitals((prev) => ({ ...prev, [today()]: entry }));
  }, []);

  const streak = useMemo(() => {
    let s = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const key = dayKey(new Date(d - i * 86400000));
      const anyDone = PROTOCOL.some((p) => log[`${key}_${p.id}`]);
      if (anyDone) s++;
      else if (i > 0) break;
    }
    return s;
  }, [log]);

  const screens = {
    coach: <CoachScreen />,
    today: <TodayScreen toggle={toggle} isChecked={isChecked} streak={streak} />,
    vitals: <VitalsScreen vitals={vitals} saveVitals={saveVitals} />,
    center: <CenterScreen />,
  };

  const NAV = [
    { id: "coach", label: "Coach", icon: "◉" },
    { id: "today", label: "Today", icon: "✓" },
    { id: "vitals", label: "Vitals", icon: "♥" },
    { id: "center", label: "Center", icon: "◆" },
  ];

  return (
    <div style={{
      minHeight: "100dvh", background: C.bg, color: C.text,
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <Styles />
      <div style={{
        width: "100%", maxWidth: 480, minHeight: "100dvh",
        display: "flex", flexDirection: "column",
        paddingTop: "env(safe-area-inset-top)",
      }}>
        <header style={{
          padding: "18px 20px 12px", display: "flex", alignItems: "baseline",
          justifyContent: "space-between", borderBottom: `1px solid ${C.border}`,
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19,
              letterSpacing: .3,
            }}>
              Hologram <span style={{ color: C.waveBlue }}>Longevity Coach</span>
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              Shape The Wave&#8482; Longevity Centers
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto", padding: "16px 20px 96px" }}>
          {screens[tab]}
        </main>

        <nav
          role="tablist"
          aria-label="Main navigation"
          style={{
            position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "100%", maxWidth: 480, display: "flex",
            background: "rgba(6,8,14,.92)", backdropFilter: "blur(12px)",
            borderTop: `1px solid ${C.border}`,
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          {NAV.map((n) => (
            <button
              key={n.id}
              role="tab"
              aria-selected={tab === n.id}
              aria-label={n.label}
              onClick={() => setTab(n.id)}
              style={{
                flex: 1, padding: "12px 0 14px", background: "none", border: "none",
                color: tab === n.id ? C.waveBlue : C.dim,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              }}
            >
              <span aria-hidden="true" style={{ fontSize: 16 }}>{n.icon}</span>
              <span style={{ fontSize: 11, fontWeight: tab === n.id ? 600 : 400 }}>{n.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ─── HOLOGRAM AVATAR ─────────────────────────────────────────
function HologramAvatar() {
  return (
    <div className="holo-float" aria-hidden="true" style={{
      width: 148, height: 148, margin: "0 auto", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div className="holo-ring-a" style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        border: `1.5px solid ${C.waveBlue}55`,
        borderTopColor: C.waveBlue, borderBottomColor: "transparent",
      }} />
      <div className="holo-ring-b" style={{
        position: "absolute", inset: 14, borderRadius: "50%",
        border: `1.5px solid ${C.waveGreen}44`,
        borderLeftColor: C.waveGreen, borderRightColor: "transparent",
      }} />
      <div className="holo-orb" style={{
        width: 92, height: 92, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, ${C.waveBlue}cc, ${C.waveGreen}99 55%, ${C.bg} 100%)`,
        boxShadow: `0 0 34px ${C.waveBlue}66, 0 0 70px ${C.waveGreen}33`,
        position: "relative", overflow: "hidden",
      }}>
        <div className="holo-scan" style={{
          position: "absolute", left: 0, right: 0, top: "50%", height: 3,
          background: `linear-gradient(90deg, transparent, ${C.white}aa, transparent)`,
        }} />
      </div>
      <div style={{
        position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
        width: 90, height: 10, borderRadius: "50%",
        background: `radial-gradient(ellipse, ${C.waveBlue}44, transparent 70%)`,
      }} />
    </div>
  );
}

// ─── COACH SCREEN ────────────────────────────────────────────
function CoachScreen() {
  const [topicId, setTopicId] = useState(null);
  const topic = TOPICS.find((t) => t.id === topicId) || null;
  const focus = DAILY_FOCUS[dayOfYear() % DAILY_FOCUS.length];

  return (
    <div>
      <div className="fu" style={{ paddingTop: 8 }}>
        <HologramAvatar />
      </div>

      <div className="fu d1" style={{ textAlign: "center", marginTop: 18 }}>
        <div style={{
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 17,
        }}>
          {greeting()}. I'm <span style={{ color: C.waveGreen }}>Wave</span>, your longevity coach.
        </div>
        <p style={{ color: C.muted, fontSize: 13, margin: "8px 0 0", lineHeight: 1.55 }}>
          {focus}
        </p>
      </div>

      <div className="fu d2" style={{ marginTop: 22 }}>
        <div style={{
          fontSize: 12, fontWeight: 600, color: C.dim, textTransform: "uppercase",
          letterSpacing: 1, marginBottom: 10,
        }}>
          Ask about a pillar
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TOPICS.map((t) => (
            <button
              key={t.id}
              aria-pressed={topicId === t.id}
              onClick={() => setTopicId(topicId === t.id ? null : t.id)}
              style={{
                padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                background: topicId === t.id ? `${t.color}22` : C.card,
                border: `1px solid ${topicId === t.id ? t.color : C.border}`,
                color: topicId === t.id ? t.color : C.muted,
                transition: "all .15s ease",
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {topic && (
        <div className="fu" key={topic.id} style={{
          marginTop: 16, background: C.card, borderRadius: 16,
          border: `1px solid ${topic.color}44`, padding: "16px 18px",
          boxShadow: C.shadow,
        }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: topic.color, marginBottom: 6,
          }}>
            Wave on {topic.name.toLowerCase()}
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: C.text }}>
            {topic.message}
          </p>
        </div>
      )}

      <p className="fu d3" style={{
        marginTop: 20, fontSize: 11, color: C.dim, lineHeight: 1.5, textAlign: "center",
      }}>
        Educational coaching only—not medical advice. Discuss changes with your
        Shape The Wave physician.
      </p>
    </div>
  );
}

// ─── TODAY SCREEN ────────────────────────────────────────────
function TodayScreen({ toggle, isChecked, streak }) {
  const done = PROTOCOL.filter((p) => isChecked(p.id)).length;
  const pct = Math.round((done / PROTOCOL.length) * 100);

  return (
    <div>
      <div className="fu" style={{
        background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
        padding: "16px 18px", display: "flex", alignItems: "center", gap: 16,
        boxShadow: C.shadow,
      }}>
        <ProgressRing pct={pct} />
        <div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 16 }}>
            Daily protocol
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>
            {done} of {PROTOCOL.length} complete
          </div>
          <div style={{ fontSize: 12, color: C.gold, marginTop: 4, fontWeight: 600 }}>
            {streak} day streak
          </div>
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
        {PROTOCOL.map((p, i) => {
          const checked = isChecked(p.id);
          return (
            <li key={p.id} className={`fu d${Math.min(i % 4 + 1, 4)}`}>
              <button
                aria-pressed={checked}
                aria-label={`${p.name} — ${checked ? "complete" : "not complete"}`}
                onClick={() => toggle(p.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  background: checked ? `${C.waveGreen}14` : C.card,
                  border: `1px solid ${checked ? C.waveGreen : C.border}`,
                  borderRadius: 14, padding: "12px 14px", textAlign: "left",
                  transition: "all .15s ease",
                }}
              >
                <span aria-hidden="true" style={{ fontSize: 20 }}>{p.emoji}</span>
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: "block", fontSize: 14, fontWeight: 500,
                    color: checked ? C.waveGreen : C.text,
                  }}>
                    {p.name}
                  </span>
                  <span style={{ display: "block", fontSize: 11, color: C.dim, marginTop: 1 }}>
                    {p.domain}
                  </span>
                </span>
                <span aria-hidden="true" style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${checked ? C.waveGreen : C.border}`,
                  background: checked ? C.waveGreen : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: C.bg, fontSize: 13, fontWeight: 700,
                }}>
                  {checked ? "✓" : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ProgressRing({ pct }) {
  const r = 26, circ = 2 * Math.PI * r;
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" role="img" aria-label={`${pct} percent complete`}>
      <circle cx="34" cy="34" r={r} fill="none" stroke={C.border} strokeWidth="6" />
      <circle
        cx="34" cy="34" r={r} fill="none"
        stroke={C.waveGreen} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        transform="rotate(-90 34 34)"
        style={{ transition: "stroke-dashoffset .3s ease" }}
      />
      <text x="34" y="39" textAnchor="middle" fill={C.text} fontSize="14" fontWeight="600">
        {pct}%
      </text>
    </svg>
  );
}

// ─── VITALS SCREEN ───────────────────────────────────────────
function VitalsScreen({ vitals, saveVitals }) {
  const existing = vitals[today()] || null;
  const [sleep, setSleep] = useState(existing ? String(existing.sleep) : "");
  const [energy, setEnergy] = useState(existing ? existing.energy : 0);
  const [mood, setMood] = useState(existing ? existing.mood : "");

  const canSave = sleep !== "" && !isNaN(Number(sleep)) && Number(sleep) >= 0 &&
    Number(sleep) <= 24 && energy > 0 && mood !== "";

  const history = useMemo(() =>
    Object.entries(vitals).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 7)
  , [vitals]);

  return (
    <div>
      <div className="fu" style={{
        background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
        padding: "16px 18px", boxShadow: C.shadow,
      }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 16 }}>
          Today's check-in
        </div>

        <label style={{ display: "block", marginTop: 14, fontSize: 13, color: C.muted }}>
          Hours of sleep last night
          <input
            type="number" inputMode="decimal" min="0" max="24" step="0.5"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            style={{
              display: "block", width: "100%", marginTop: 6, padding: "10px 12px",
              background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10,
              color: C.text, fontSize: 15,
            }}
          />
        </label>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 13, color: C.muted }}>Energy level</div>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                aria-pressed={energy === n}
                aria-label={`Energy level ${n}`}
                onClick={() => setEnergy(n)}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 14, fontWeight: 600,
                  background: energy === n ? `${C.waveBlue}22` : C.bg,
                  border: `1px solid ${energy === n ? C.waveBlue : C.border}`,
                  color: energy === n ? C.waveBlue : C.dim,
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 13, color: C.muted }}>Mood</div>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            {MOODS.map((m) => (
              <button
                key={m}
                aria-pressed={mood === m}
                onClick={() => setMood(m)}
                style={{
                  flex: 1, padding: "9px 0", borderRadius: 10, fontSize: 13, fontWeight: 500,
                  background: mood === m ? `${C.waveGreen}22` : C.bg,
                  border: `1px solid ${mood === m ? C.waveGreen : C.border}`,
                  color: mood === m ? C.waveGreen : C.dim,
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!canSave}
          onClick={() => saveVitals({ sleep: Number(sleep), energy, mood })}
          style={{
            width: "100%", marginTop: 16, padding: "12px 0", borderRadius: 12,
            background: canSave ? C.waveGreen : C.cardHi,
            border: "none", color: canSave ? C.white : C.dim,
            fontSize: 14, fontWeight: 600,
            cursor: canSave ? "pointer" : "not-allowed",
          }}
        >
          {existing ? "Update check-in" : "Save check-in"}
        </button>
      </div>

      {history.length > 0 && (
        <div className="fu d1" style={{ marginTop: 18 }}>
          <div style={{
            fontSize: 12, fontWeight: 600, color: C.dim, textTransform: "uppercase",
            letterSpacing: 1, marginBottom: 10,
          }}>
            Last 7 days
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {history.map(([date, v]) => (
              <li key={date} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
                padding: "10px 14px", fontSize: 13,
              }}>
                <span style={{ color: C.muted }}>{date}</span>
                <span style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: C.waveBlue }}>{v.sleep}h sleep</span>
                  <span style={{ color: C.gold }}>energy {v.energy}/5</span>
                  <span style={{ color: C.waveGreen }}>{v.mood}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── CENTER SCREEN ───────────────────────────────────────────
function CenterScreen() {
  return (
    <div>
      <div className="fu" style={{
        background: `linear-gradient(135deg, ${C.waveGreen}22, ${C.waveBlue}18)`,
        borderRadius: 16, border: `1px solid ${C.waveGreen}44`,
        padding: "18px", boxShadow: C.shadow,
      }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17 }}>
          Shape The Wave&#8482; Longevity Centers
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
          A physician-led longevity and integrative medicine practice founded and
          owned by Dr. Paul Tack, MD. We pair clinical rigor with sustained
          coaching so patients extend healthspan—not just lifespan.
        </p>
        <div style={{ marginTop: 12, fontSize: 13, color: C.text }}>
          <div>Gurnee, IL</div>
          <div style={{ color: C.waveBlue, marginTop: 2 }}>www.shapethewave.com</div>
        </div>
      </div>

      <div className="fu d1" style={{ marginTop: 18 }}>
        <div style={{
          fontSize: 12, fontWeight: 600, color: C.dim, textTransform: "uppercase",
          letterSpacing: 1, marginBottom: 10,
        }}>
          Programs
        </div>
        <div style={{
          background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
          padding: "14px 18px",
        }}>
          <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 14, lineHeight: 2, color: C.text }}>
            <li>Sculpt&#8482;</li>
            <li>Sculpt Elite&#8482;</li>
            <li>Sculpt Lite&#8482;</li>
            <li>Ignite&#8482;</li>
            <li>Surge&#8482;</li>
            <li>Revive&#8482;</li>
          </ul>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
            Every program includes baseline labs: CBC, CMP, and A1C. Ignite&#8482;
            adds a lipid panel and TSH. Ask our team in Gurnee for current program
            details and pricing.
          </p>
        </div>
      </div>

      <div className="fu d2" style={{ marginTop: 18 }}>
        <div style={{
          fontSize: 12, fontWeight: 600, color: C.dim, textTransform: "uppercase",
          letterSpacing: 1, marginBottom: 10,
        }}>
          Your care team
        </div>
        <div style={{
          background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
          padding: "14px 18px", fontSize: 13, lineHeight: 1.8, color: C.text,
        }}>
          <div><span style={{ color: C.gold, fontWeight: 600 }}>Dr. Paul Tack, MD</span> — Founder and owner</div>
          <div><span style={{ color: C.waveBlue, fontWeight: 600 }}>Julia Gekhter, LCSW</span> — Clinician</div>
          <div><span style={{ color: C.waveGreen, fontWeight: 600 }}>Renee Barneveld, RN</span> — Clinical nursing</div>
        </div>
      </div>

      <p className="fu d3" style={{
        marginTop: 20, fontSize: 11, color: C.dim, lineHeight: 1.5, textAlign: "center",
      }}>
        This app provides educational wellness coaching and does not diagnose,
        treat, or cure any condition. Individual results vary.
      </p>
    </div>
  );
}
