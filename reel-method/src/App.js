import { useState, useEffect, useMemo } from "react";

// ─── THEME ───────────────────────────────────────────────────
const C = {
  bg: "#0a0a1a", card: "#141428", cardHi: "#1c1c38",
  border: "#2a2a4a", borderHi: "#3a3a5a",
  text: "#e8e8f0", muted: "#8888a8", dim: "#5a5a78",
  white: "#ffffff",
  R: "#ef4444", E1: "#f59e0b", E2: "#22c55e", L: "#6366f1",
  mind: "#a78bfa", body: "#f472b6", digital: "#38bdf8",
  family: "#fb923c", environ: "#4ade80", recovery: "#e879f9",
  shadow: "0 2px 16px rgba(0,0,0,.4)",
  glow: "0 0 30px rgba(99,102,241,.15)",
};

const STYLE = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
body{font-family:'Inter','Space Grotesk',system-ui,sans-serif;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#6366f144;border-radius:2px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
.fu{animation:fadeUp .35s ease both;}
.d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}.d4{animation-delay:.24s}.d5{animation-delay:.30s}
button{font-family:inherit;cursor:pointer;}textarea{font-family:inherit;}`;

function Styles(){
  useEffect(()=>{
    const el=document.createElement("style");
    el.textContent=STYLE;document.head.appendChild(el);
    return()=>el.remove();
  },[]);
  return null;
}

// ─── DATA ────────────────────────────────────────────────────
const REEL_STEPS = [
  { letter: "R", name: "Recognize", color: C.R,
    desc: "Recognize the signal: body, mind, emotion, environment, technology, relationships, and spirit.",
    prompt: "What signal are you noticing right now? A feeling, a thought, a physical sensation, something in your environment?",
  },
  { letter: "E", name: "Examine", color: C.E1,
    desc: "Examine what is helping, harming, blocking, or repeating.",
    prompt: "Look closer. Is this helping or harming you? Is it a pattern that keeps repeating? What's blocking you?",
  },
  { letter: "E", name: "Elevate", color: C.E2,
    desc: "Elevate the system with better habits, cleaner inputs, safer tools, stronger boundaries, and conscious care.",
    prompt: "What one thing can you upgrade right now? A habit, a boundary, a tool, a choice?",
  },
  { letter: "L", name: "Link", color: C.L,
    desc: "Link everything together: health, learning, family, technology, safety, accessibility, privacy, recovery, and daily life.",
    prompt: "How does this connect to the rest of your life? What systems does this touch?",
  },
];

const PILLARS = [
  { id: "mind", name: "Mind Care", emoji: "🧠", color: C.mind,
    desc: "Focus, emotional regulation, screen balance, learning, creativity, memory, and stress recovery.",
    checks: [
      "I could focus on tasks today",
      "I managed my emotions well",
      "I balanced screen time with rest",
      "I learned or created something",
      "I managed stress effectively",
    ],
  },
  { id: "body", name: "Body Care", emoji: "💪", color: C.body,
    desc: "Movement, sleep, hydration, nutrition, posture, breathing, sensory awareness, and physical safety.",
    checks: [
      "I moved my body intentionally",
      "I slept well last night",
      "I drank enough water",
      "I ate nourishing food",
      "I noticed my posture and breathing",
    ],
  },
  { id: "digital", name: "Digital Care", emoji: "🔐", color: C.digital,
    desc: "Privacy, security, accessibility, certificates, encrypted websites, safe apps, screen time, and healthy device use.",
    checks: [
      "I used devices intentionally, not reactively",
      "I checked privacy settings or permissions",
      "I took breaks from screens",
      "I used safe, encrypted tools",
      "I set boundaries with notifications",
    ],
  },
  { id: "family", name: "Family Care", emoji: "👨‍👩‍👧‍👦", color: C.family,
    desc: "Family Sharing, child safety, Screen Time, communication, support systems, and shared responsibility.",
    checks: [
      "I connected meaningfully with family",
      "I checked in on someone I care about",
      "I communicated a need or boundary",
      "I supported someone's growth",
      "I practiced shared responsibility",
    ],
  },
  { id: "environ", name: "Environment Care", emoji: "🌍", color: C.environ,
    desc: "Home, travel, accessories, connected devices, and safe surroundings.",
    checks: [
      "My spaces feel safe and organized",
      "I noticed my surroundings with intention",
      "I adjusted something for comfort or safety",
      "I interacted with nature or fresh air",
      "I cared for my living environment",
    ],
  },
  { id: "recovery", name: "Recovery Care", emoji: "🔄", color: C.recovery,
    desc: "Restart, reset, restore, update, repair, reflect, and return to balance.",
    checks: [
      "I paused to reflect today",
      "I let go of something that isn't serving me",
      "I repaired or restored something (relationship, habit, device)",
      "I gave myself permission to rest",
      "I returned to a practice I had dropped",
    ],
  },
];

const FLOW_STEPS = [
  { step: "See the signal", icon: "👁️" },
  { step: "Name the pattern", icon: "🏷️" },
  { step: "Protect the person", icon: "🛡️" },
  { step: "Upgrade the system", icon: "⬆️" },
  { step: "Restore balance", icon: "⚖️" },
  { step: "Teach the method", icon: "🌱" },
];

function loadData() {
  try { return JSON.parse(localStorage.getItem("reel_data") || "{}"); } catch { return {}; }
}
function saveData(d) {
  try { localStorage.setItem("reel_data", JSON.stringify(d)); } catch {}
}
function loadEntries() {
  try { return JSON.parse(localStorage.getItem("reel_entries") || "[]"); } catch { return []; }
}
function saveEntries(e) {
  try { localStorage.setItem("reel_entries", JSON.stringify(e)); } catch {}
}

// ─── COMPONENTS ──────────────────────────────────────────────

function ReelLogo({ size = 42 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {REEL_STEPS.map((s, i) => (
        <div key={i} style={{
          width: size, height: size, borderRadius: size * 0.28,
          background: `linear-gradient(135deg, ${s.color}dd, ${s.color}88)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size * 0.48, fontWeight: 700, color: C.white,
          fontFamily: "'Space Grotesk',sans-serif",
          boxShadow: `0 0 ${size * 0.4}px ${s.color}44`,
        }}>
          {s.letter}
        </div>
      ))}
    </div>
  );
}

function PillarRadar({ scores }) {
  const n = PILLARS.length;
  const cx = 100, cy = 100, r = 75;
  const angleStep = (2 * Math.PI) / n;
  const point = (i, pct) => {
    const a = angleStep * i - Math.PI / 2;
    return [cx + r * pct * Math.cos(a), cy + r * pct * Math.sin(a)];
  };
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = PILLARS.map((p, i) => point(i, (scores[p.id] || 0) / 5));
  const polygon = dataPoints.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <svg width="100%" viewBox="0 0 200 200" style={{ maxWidth: 260, display: "block", margin: "0 auto" }}>
      {gridLevels.map((lvl) => (
        <polygon key={lvl}
          points={PILLARS.map((_, i) => point(i, lvl).join(",")).join(" ")}
          fill="none" stroke={C.border} strokeWidth="0.5" />
      ))}
      {PILLARS.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.border} strokeWidth="0.5" />;
      })}
      <polygon points={polygon} fill={C.L + "28"} stroke={C.L} strokeWidth="2" />
      {PILLARS.map((p, i) => {
        const [x, y] = dataPoints[i];
        return <circle key={i} cx={x} cy={y} r="4" fill={p.color} />;
      })}
      {PILLARS.map((p, i) => {
        const [x, y] = point(i, 1.18);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fill={p.color} fontWeight="600" fontFamily="'Space Grotesk',sans-serif">
            {p.emoji}
          </text>
        );
      })}
    </svg>
  );
}

// ─── SCREENS ─────────────────────────────────────────────────

function HomeScreen({ go }) {
  const entries = loadEntries();
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayEntry = entries.find((e) => e.date === todayKey);
  const streak = (() => {
    let s = 0;
    const d = new Date();
    for (let i = 0; i < 60; i++) {
      const key = new Date(d - i * 86400000).toISOString().slice(0, 10);
      if (entries.some((e) => e.date === key)) s++;
      else if (i > 0) break;
    }
    return s;
  })();

  const lastScores = {};
  if (todayEntry) {
    PILLARS.forEach((p) => { lastScores[p.id] = todayEntry.pillarScores?.[p.id] || 0; });
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", background: C.bg }}>
      {/* Hero */}
      <div className="fu" style={{
        padding: "32px 20px 20px", textAlign: "center",
        background: `radial-gradient(ellipse at 50% 0%, ${C.L}12, transparent 70%)`,
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <ReelLogo size={48} />
        </div>
        <div style={{
          fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.dim,
          fontFamily: "'Space Grotesk',sans-serif", marginBottom: 6,
        }}>A Revolutionary</div>
        <div style={{
          fontSize: 22, fontWeight: 700, color: C.text,
          fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.15, marginBottom: 6,
        }}>Mind-Body Universal<br/>Health Care System</div>
        <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginBottom: 20 }}>
          Julia Gekhter-Tack, LCSW
        </div>

        {/* Quick stats */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
          {[
            { label: "Streak", val: `${streak}d`, color: C.L },
            { label: "Entries", val: entries.length, color: C.E2 },
            { label: "Today", val: todayEntry ? "Done" : "Open", color: todayEntry ? C.E2 : C.E1 },
          ].map((s) => (
            <div key={s.label} style={{
              background: C.card, borderRadius: 12, padding: "10px 18px",
              border: `1px solid ${C.border}`, minWidth: 80,
            }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily check-in CTA */}
      <div className="fu d1" style={{ padding: "0 16px 16px" }}>
        <button onClick={() => go("checkin")} style={{
          width: "100%", padding: "16px 20px",
          background: todayEntry
            ? C.card
            : `linear-gradient(135deg, ${C.L}dd, ${C.L}88)`,
          border: `1px solid ${todayEntry ? C.border : C.L}`,
          borderRadius: 14, color: C.white, textAlign: "left",
          boxShadow: todayEntry ? C.shadow : C.glow,
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>
            {todayEntry ? "Today's REEL Complete" : "Start Daily REEL"}
          </div>
          <div style={{ fontSize: 12, color: todayEntry ? C.muted : "#ffffffbb", marginTop: 4 }}>
            {todayEntry
              ? "Come back tomorrow for your next check-in"
              : "Recognize → Examine → Elevate → Link"}
          </div>
        </button>
      </div>

      {/* Radar */}
      {todayEntry && (
        <div className="fu d2" style={{
          margin: "0 16px 16px", background: C.card, borderRadius: 14,
          padding: "16px", border: `1px solid ${C.border}`,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.L,
            fontWeight: 600, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif",
          }}>Today's System Health</div>
          <PillarRadar scores={todayEntry.pillarScores || {}} />
        </div>
      )}

      {/* Nav grid */}
      <div className="fu d3" style={{ padding: "0 16px 16px" }}>
        <div style={{
          fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.dim,
          fontWeight: 600, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif",
        }}>Explore</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { icon: "🎞️", label: "The REEL", id: "method", sub: "R • E • E • L" },
            { icon: "🏛️", label: "6 Pillars", id: "pillars", sub: "Core system" },
            { icon: "🌊", label: "Health Flow", id: "flow", sub: "Universal process" },
            { icon: "📊", label: "History", id: "history", sub: "Your data" },
          ].map(({ icon, label, id, sub }) => (
            <button key={id} onClick={() => go(id)} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 13, padding: "16px 12px", textAlign: "left",
              boxShadow: C.shadow,
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{
                fontSize: 13, color: C.text, fontWeight: 600,
                fontFamily: "'Space Grotesk',sans-serif", marginBottom: 2,
              }}>{label}</div>
              <div style={{ fontSize: 10, color: C.dim, fontStyle: "italic" }}>{sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="fu d4" style={{
        margin: "0 16px 28px", padding: "16px",
        background: C.card, borderRadius: 14, border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${C.L}`,
      }}>
        <div style={{
          fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.L,
          fontWeight: 600, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif",
        }}>Mission</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>
          THE REEL METHOD is a universal mind-body care framework that turns everyday
          technology, awareness, safety, and self-mastery into one connected health system
          for people, families, and communities.
        </div>
      </div>
    </div>
  );
}

function MethodScreen({ onBack }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ height: "100%", overflowY: "auto", background: C.bg }}>
      <Header title="The REEL" subtitle="Four steps to conscious care" onBack={onBack} />
      <div style={{ padding: "16px 16px 30px" }}>
        {REEL_STEPS.map((s, i) => (
          <button key={i} className="fu" onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              width: "100%", textAlign: "left", marginBottom: 10,
              background: expanded === i ? s.color + "14" : C.card,
              border: `1.5px solid ${expanded === i ? s.color + "66" : C.border}`,
              borderRadius: 14, padding: 0, overflow: "hidden",
              animationDelay: `${i * 0.06}s`, boxShadow: C.shadow,
              transition: "all .2s",
            }}>
            <div style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${s.color}dd, ${s.color}66)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, fontWeight: 700, color: C.white, flexShrink: 0,
                fontFamily: "'Space Grotesk',sans-serif",
                boxShadow: `0 0 20px ${s.color}33`,
              }}>{s.letter}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text,
                  fontFamily: "'Space Grotesk',sans-serif" }}>{s.name}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 3, lineHeight: 1.55 }}>{s.desc}</div>
              </div>
              <span style={{ fontSize: 14, color: C.dim, transition: "transform .2s",
                transform: expanded === i ? "rotate(90deg)" : "rotate(0)" }}>{">"}</span>
            </div>
            {expanded === i && (
              <div style={{
                padding: "0 18px 16px",
                borderTop: `1px solid ${s.color}22`,
              }}>
                <div style={{
                  marginTop: 12, padding: "12px 14px",
                  background: s.color + "0c", borderRadius: 10,
                  border: `1px solid ${s.color}22`,
                }}>
                  <div style={{ fontSize: 10, color: s.color, fontWeight: 600, letterSpacing: 1.5,
                    textTransform: "uppercase", marginBottom: 6 }}>Reflection Prompt</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, fontStyle: "italic" }}>
                    {s.prompt}
                  </div>
                </div>
              </div>
            )}
          </button>
        ))}

        <div className="fu d4" style={{
          marginTop: 16, padding: "14px 16px", textAlign: "center",
          background: C.card, borderRadius: 12, border: `1px solid ${C.border}`,
        }}>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
            <strong style={{ color: C.L }}>R</strong>ecognize the signal.{" "}
            <strong style={{ color: C.E1 }}>E</strong>xamine the pattern.{" "}
            <strong style={{ color: C.E2 }}>E</strong>levate the system.{" "}
            <strong style={{ color: C.L }}>L</strong>ink it all together.
          </div>
        </div>
      </div>
    </div>
  );
}

function PillarsScreen({ onBack }) {
  const [sel, setSel] = useState(null);
  if (sel !== null) {
    const p = PILLARS[sel];
    return (
      <div style={{ height: "100%", overflowY: "auto", background: C.bg }}>
        <Header title={p.name} subtitle={p.desc} onBack={() => setSel(null)} />
        <div style={{ padding: "16px 16px 30px" }}>
          <div className="fu" style={{ textAlign: "center", fontSize: 48, marginBottom: 16 }}>
            {p.emoji}
          </div>
          <div className="fu d1" style={{
            fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: p.color,
            fontWeight: 600, marginBottom: 10, fontFamily: "'Space Grotesk',sans-serif",
          }}>Daily Checkpoints</div>
          {p.checks.map((check, ci) => (
            <div key={ci} className="fu" style={{
              background: C.card, borderRadius: 10, padding: "12px 14px",
              marginBottom: 8, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 10,
              animationDelay: `${(ci + 1) * 0.05}s`,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                border: `2px solid ${p.color}55`, flexShrink: 0,
              }} />
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{check}</div>
            </div>
          ))}
          <div className="fu d5" style={{
            marginTop: 16, padding: "14px 16px", borderRadius: 12,
            background: p.color + "0c", border: `1px solid ${p.color}22`,
          }}>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
              These checkpoints help you <strong style={{ color: p.color }}>Recognize</strong> signals
              in {p.name.toLowerCase()}, <strong style={{ color: C.E1 }}>Examine</strong> patterns,
              and <strong style={{ color: C.E2 }}>Elevate</strong> your system daily.
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ height: "100%", overflowY: "auto", background: C.bg }}>
      <Header title="6 Core Pillars" subtitle="The complete system of care" onBack={onBack} />
      <div style={{ padding: "16px 16px 30px" }}>
        {PILLARS.map((p, i) => (
          <button key={p.id} className="fu" onClick={() => setSel(i)}
            style={{
              width: "100%", textAlign: "left", marginBottom: 10,
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: "16px 16px", boxShadow: C.shadow,
              display: "flex", alignItems: "center", gap: 14,
              animationDelay: `${i * 0.05}s`,
            }}>
            <div style={{
              width: 46, height: 46, borderRadius: 13,
              background: p.color + "18", border: `1.5px solid ${p.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, flexShrink: 0,
            }}>{p.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text,
                fontFamily: "'Space Grotesk',sans-serif" }}>{p.name}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 3, lineHeight: 1.5,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                overflow: "hidden" }}>{p.desc}</div>
            </div>
            <span style={{ color: p.color, fontSize: 16, flexShrink: 0 }}>{">"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FlowScreen({ onBack }) {
  return (
    <div style={{ height: "100%", overflowY: "auto", background: C.bg }}>
      <Header title="Universal Health Flow" subtitle="The path from signal to mastery" onBack={onBack} />
      <div style={{ padding: "16px 16px 30px" }}>
        {FLOW_STEPS.map((f, i) => (
          <div key={i} className="fu" style={{
            display: "flex", alignItems: "stretch", gap: 14,
            marginBottom: 0, animationDelay: `${i * 0.06}s`,
          }}>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", width: 40,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: C.L + "22", border: `1.5px solid ${C.L}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0,
              }}>{f.icon}</div>
              {i < FLOW_STEPS.length - 1 && (
                <div style={{
                  width: 2, flex: 1, minHeight: 20,
                  background: `linear-gradient(${C.L}44, ${C.L}11)`,
                }} />
              )}
            </div>
            <div style={{
              flex: 1, background: C.card, borderRadius: 12,
              padding: "14px 16px", marginBottom: 12,
              border: `1px solid ${C.border}`, boxShadow: C.shadow,
            }}>
              <div style={{
                fontSize: 9, color: C.dim, fontWeight: 600, letterSpacing: 1.5,
                textTransform: "uppercase", marginBottom: 4,
              }}>Step {i + 1}</div>
              <div style={{
                fontSize: 15, fontWeight: 700, color: C.text,
                fontFamily: "'Space Grotesk',sans-serif",
              }}>{f.step}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckInScreen({ onBack, onComplete }) {
  const [step, setStep] = useState(0);
  const [reelAnswers, setReelAnswers] = useState(["", "", "", ""]);
  const [pillarChecks, setPillarChecks] = useState(
    () => Object.fromEntries(PILLARS.map((p) => [p.id, []]))
  );
  const todayKey = new Date().toISOString().slice(0, 10);
  const entries = loadEntries();
  const todayDone = entries.some((e) => e.date === todayKey);

  if (todayDone) {
    const entry = entries.find((e) => e.date === todayKey);
    return (
      <div style={{ height: "100%", overflowY: "auto", background: C.bg }}>
        <Header title="Today's REEL" subtitle="Check-in complete" onBack={onBack} />
        <div style={{ padding: "30px 16px", textAlign: "center" }}>
          <div className="fu" style={{ marginBottom: 16 }}>
            <ReelLogo size={40} />
          </div>
          <div className="fu d1" style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 6,
            fontFamily: "'Space Grotesk',sans-serif" }}>
            REEL Complete
          </div>
          <div className="fu d2" style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>
            Come back tomorrow to continue your practice.
          </div>
          {entry?.pillarScores && (
            <div className="fu d3">
              <PillarRadar scores={entry.pillarScores} />
            </div>
          )}
        </div>
      </div>
    );
  }

  const totalSteps = 5;
  const reelStep = REEL_STEPS[step];

  const toggleCheck = (pillarId, checkIdx) => {
    setPillarChecks((prev) => {
      const arr = prev[pillarId] || [];
      return {
        ...prev,
        [pillarId]: arr.includes(checkIdx) ? arr.filter((x) => x !== checkIdx) : [...arr, checkIdx],
      };
    });
  };

  const submit = () => {
    const pillarScores = {};
    PILLARS.forEach((p) => { pillarScores[p.id] = (pillarChecks[p.id] || []).length; });
    const entry = {
      date: todayKey,
      reel: reelAnswers,
      pillarScores,
      pillarChecks,
    };
    const next = [...entries.filter((e) => e.date !== todayKey), entry];
    saveEntries(next);
    onComplete();
  };

  return (
    <div style={{ height: "100%", overflowY: "auto", background: C.bg }}>
      <Header title="Daily REEL" subtitle={`Step ${step + 1} of ${totalSteps}`} onBack={onBack} />
      <div style={{ padding: "16px 16px 100px" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= step
                ? (i < 4 ? REEL_STEPS[i]?.color || C.L : C.L)
                : C.border,
              transition: "background .2s",
            }} />
          ))}
        </div>

        {step < 4 && (
          <div className="fu" key={step}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `linear-gradient(135deg, ${reelStep.color}dd, ${reelStep.color}66)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 700, color: C.white,
                fontFamily: "'Space Grotesk',sans-serif",
                boxShadow: `0 0 20px ${reelStep.color}33`,
              }}>{reelStep.letter}</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text,
                  fontFamily: "'Space Grotesk',sans-serif" }}>{reelStep.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{reelStep.desc}</div>
              </div>
            </div>
            <div style={{
              background: reelStep.color + "0c", borderRadius: 12, padding: "12px 14px",
              border: `1px solid ${reelStep.color}22`, marginBottom: 14,
            }}>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, fontStyle: "italic" }}>
                {reelStep.prompt}
              </div>
            </div>
            <textarea
              value={reelAnswers[step]}
              onChange={(e) => setReelAnswers((a) => a.map((v, i) => (i === step ? e.target.value : v)))}
              placeholder="Write your thoughts..."
              aria-label={`${reelStep.name} reflection`}
              rows={4}
              style={{
                width: "100%", background: C.card, border: `1.5px solid ${C.border}`,
                borderRadius: 12, padding: "12px 14px", color: C.text, fontSize: 14,
                lineHeight: 1.65, resize: "vertical", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        )}

        {step === 4 && (
          <div className="fu">
            <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4,
              fontFamily: "'Space Grotesk',sans-serif" }}>System Check</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
              Check off what you did today across all 6 pillars.
            </div>
            {PILLARS.map((p) => (
              <div key={p.id} style={{ marginBottom: 14 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
                }}>
                  <span style={{ fontSize: 18 }}>{p.emoji}</span>
                  <span style={{
                    fontSize: 12, fontWeight: 700, color: p.color,
                    fontFamily: "'Space Grotesk',sans-serif",
                  }}>{p.name}</span>
                  <span style={{ fontSize: 10, color: C.dim, marginLeft: "auto" }}>
                    {(pillarChecks[p.id] || []).length}/{p.checks.length}
                  </span>
                </div>
                {p.checks.map((check, ci) => {
                  const on = (pillarChecks[p.id] || []).includes(ci);
                  return (
                    <button key={ci} onClick={() => toggleCheck(p.id, ci)}
                      aria-pressed={on}
                      style={{
                        width: "100%", textAlign: "left", marginBottom: 4,
                        background: on ? p.color + "14" : C.card,
                        border: `1px solid ${on ? p.color + "55" : C.border}`,
                        borderRadius: 8, padding: "8px 12px",
                        display: "flex", alignItems: "center", gap: 10,
                        transition: "all .12s",
                      }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 5,
                        border: `2px solid ${on ? p.color : C.dim}`,
                        background: on ? p.color : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: C.white, flexShrink: 0, transition: "all .12s",
                      }}>{on ? "✓" : ""}</div>
                      <span style={{ fontSize: 12, color: on ? C.text : C.muted }}>{check}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        background: `linear-gradient(transparent, ${C.bg} 30%)`,
        display: "flex", gap: 10, justifyContent: "center",
        maxWidth: 480, margin: "0 auto",
      }}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
            padding: "12px 24px", color: C.muted, fontSize: 14, fontWeight: 600,
          }}>Back</button>
        )}
        <button
          onClick={() => (step < totalSteps - 1 ? setStep(step + 1) : submit())}
          style={{
            flex: 1, maxWidth: 260,
            background: step < 4
              ? `linear-gradient(135deg, ${REEL_STEPS[step]?.color || C.L}dd, ${REEL_STEPS[step]?.color || C.L}88)`
              : `linear-gradient(135deg, ${C.L}dd, ${C.L}88)`,
            border: "none", borderRadius: 12, padding: "12px 24px",
            color: C.white, fontSize: 14, fontWeight: 700,
          }}>
          {step < totalSteps - 1 ? "Continue" : "Complete REEL"}
        </button>
      </div>
    </div>
  );
}

function HistoryScreen({ onBack }) {
  const entries = loadEntries();
  const sorted = useMemo(() => [...entries].reverse(), [entries]);

  if (entries.length === 0) {
    return (
      <div style={{ height: "100%", overflowY: "auto", background: C.bg }}>
        <Header title="History" subtitle="Your REEL journey" onBack={onBack} />
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{"📊"}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 6 }}>No entries yet</div>
          <div style={{ fontSize: 13, color: C.muted }}>Complete your first daily REEL to see trends here.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", background: C.bg }}>
      <Header title="History" subtitle={`${entries.length} entries`} onBack={onBack} />
      <div style={{ padding: "16px 16px 30px" }}>
        {/* Summary radar */}
        {entries.length >= 1 && (
          <div className="fu" style={{
            background: C.card, borderRadius: 14, padding: "16px",
            border: `1px solid ${C.border}`, marginBottom: 16,
          }}>
            <div style={{
              fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.L,
              fontWeight: 600, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif",
            }}>Latest System Health</div>
            <PillarRadar scores={entries[entries.length - 1].pillarScores || {}} />
          </div>
        )}

        {/* Entry list */}
        <div className="fu d1" style={{
          fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.dim,
          fontWeight: 600, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif",
        }}>All Entries</div>
        {sorted.map((entry, i) => {
          const total = PILLARS.reduce((a, p) => a + (entry.pillarScores?.[p.id] || 0), 0);
          const max = PILLARS.length * 5;
          const pct = Math.round((total / max) * 100);
          return (
            <div key={i} className="fu" style={{
              background: C.card, borderRadius: 12, padding: "12px 14px",
              marginBottom: 8, border: `1px solid ${C.border}`,
              animationDelay: `${i * 0.03}s`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
                    {new Date(entry.date).toLocaleDateString(undefined, {
                      weekday: "short", month: "short", day: "numeric",
                    })}
                  </div>
                  <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                    {PILLARS.map((p) => {
                      const score = entry.pillarScores?.[p.id] || 0;
                      return (
                        <div key={p.id} style={{
                          width: 20, height: 20, borderRadius: 5,
                          background: score > 0 ? p.color + (score > 3 ? "66" : "33") : C.cardHi,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10,
                        }}>{p.emoji}</div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: pct >= 60 ? C.E2 : pct >= 30 ? C.E1 : C.R }}>
                    {pct}%
                  </div>
                  <div style={{ fontSize: 9, color: C.dim }}>{total}/{max}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SHARED ──────────────────────────────────────────────────

function Header({ title, subtitle, onBack }) {
  return (
    <div style={{
      background: C.bg, padding: "13px 18px 14px", flexShrink: 0,
      borderBottom: `1px solid ${C.border}`,
    }}>
      {onBack && (
        <button onClick={onBack} aria-label="Go back" style={{
          background: "none", border: "none", color: C.L, fontSize: 13,
          padding: "0 0 8px", display: "flex", alignItems: "center", gap: 5,
        }}>
          <span aria-hidden="true" style={{ fontSize: 16 }}>{"<"}</span> Back
        </button>
      )}
      <div style={{ fontSize: 19, fontWeight: 700, color: C.text,
        fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.2 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{subtitle}</div>}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "checkin", label: "REEL", icon: "🎞️" },
  { id: "pillars", label: "Pillars", icon: "🏛️" },
  { id: "history", label: "History", icon: "📊" },
];

// ─── APP ─────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("home");
  const [, forceUpdate] = useState(0);

  const screens = {
    home: <HomeScreen go={setTab} />,
    method: <MethodScreen onBack={() => setTab("home")} />,
    pillars: <PillarsScreen onBack={() => setTab("home")} />,
    flow: <FlowScreen onBack={() => setTab("home")} />,
    checkin: <CheckInScreen onBack={() => setTab("home")} onComplete={() => { forceUpdate((n) => n + 1); setTab("home"); }} />,
    history: <HistoryScreen onBack={() => setTab("home")} />,
  };

  return (
    <>
      <Styles />
      <div style={{
        width: "100%", maxWidth: 480, height: "100dvh", margin: "0 auto",
        display: "flex", flexDirection: "column", background: C.bg, overflow: "hidden",
      }}>
        <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {screens[tab]}
          </div>
        </main>
        <nav role="tablist" aria-label="Main navigation" style={{
          background: C.bg, borderTop: `1px solid ${C.border}`,
          display: "flex", paddingBottom: "env(safe-area-inset-bottom, 5px)", flexShrink: 0,
        }}>
          {NAV_ITEMS.map(({ id, label, icon }) => {
            const on = tab === id;
            return (
              <button key={id} role="tab" aria-selected={on} aria-label={label}
                onClick={() => setTab(id)}
                style={{
                  flex: 1, background: "none", border: "none",
                  padding: "10px 4px 8px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                }}>
                <span style={{ fontSize: 18, opacity: on ? 1 : 0.4 }}>{icon}</span>
                <span style={{
                  fontSize: 9.5, fontWeight: on ? 700 : 400,
                  color: on ? C.L : C.dim,
                  fontFamily: "'Space Grotesk',sans-serif",
                }}>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
