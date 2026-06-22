import { useState, useEffect, useMemo, useCallback } from "react";

const C = {
  bg:"#06080e", card:"#111827", cardHi:"#1a2234",
  border:"#1f2937", text:"#f1f5f9", muted:"#94a3b8", dim:"#64748b",
  white:"#fff",
  wave:"#06b6d4", waveDk:"#0891b2", waveLt:"#67e8f9",
  green:"#10b981", greenLt:"#34d399",
  amber:"#f59e0b", rose:"#f43f5e", purple:"#8b5cf6",
  mind:"#a78bfa", body:"#f472b6", digital:"#38bdf8",
  family:"#fb923c", environ:"#4ade80", recovery:"#e879f9",
  shadow:"0 2px 16px rgba(0,0,0,.4)",
};

const STYLE = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
body{font-family:'Inter','Space Grotesk',system-ui,sans-serif;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#06b6d433;border-radius:2px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fadeUp .3s ease both;}
.d1{animation-delay:.05s}.d2{animation-delay:.10s}.d3{animation-delay:.15s}.d4{animation-delay:.20s}
button{font-family:inherit;cursor:pointer;}input,textarea{font-family:inherit;}`;

function Styles(){
  useEffect(()=>{
    const el=document.createElement("style");el.textContent=STYLE;document.head.appendChild(el);
    return()=>el.remove();
  },[]);
  return null;
}

const PILLARS = [
  { id:"mind", name:"Mind", emoji:"🧠", color:C.mind },
  { id:"body", name:"Body", emoji:"💪", color:C.body },
  { id:"digital", name:"Digital", emoji:"🔐", color:C.digital },
  { id:"family", name:"Family", emoji:"👨‍👩‍👧‍👦", color:C.family },
  { id:"environ", name:"Environment", emoji:"🌍", color:C.environ },
  { id:"recovery", name:"Recovery", emoji:"🔄", color:C.recovery },
];

const STARTER_HABITS = [
  { id:"h1", name:"REEL Align Check-In", pillar:"mind", emoji:"🎞️" },
  { id:"h2", name:"Move 30 minutes", pillar:"body", emoji:"🏃" },
  { id:"h3", name:"Drink 8 glasses of water", pillar:"body", emoji:"💧" },
  { id:"h4", name:"Screen-free hour before bed", pillar:"digital", emoji:"📵" },
  { id:"h5", name:"Connect with someone", pillar:"family", emoji:"💬" },
  { id:"h6", name:"Spend time outside", pillar:"environ", emoji:"🌿" },
  { id:"h7", name:"Reflect and journal", pillar:"recovery", emoji:"📝" },
  { id:"h8", name:"7+ hours of sleep", pillar:"body", emoji:"😴" },
];

const today = () => new Date().toISOString().slice(0,10);
const dayKey = (d) => new Date(d).toISOString().slice(0,10);

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const [habits, setHabits] = useState(() => load("rv_habits", STARTER_HABITS));
  const [log, setLog] = useState(() => load("rv_log", {}));
  const [tab, setTab] = useState("today");
  const [creating, setCreating] = useState(false);

  useEffect(() => save("rv_habits", habits), [habits]);
  useEffect(() => save("rv_log", log), [log]);

  const toggle = useCallback((habitId, date) => {
    setLog(prev => {
      const key = `${date}_${habitId}`;
      const next = { ...prev };
      if (next[key]) delete next[key]; else next[key] = true;
      return next;
    });
  }, []);

  const isChecked = useCallback((habitId, date) => !!log[`${date}_${habitId}`], [log]);

  const addHabit = useCallback((habit) => {
    setHabits(prev => [...prev, { ...habit, id: `h${Date.now()}` }]);
    setCreating(false);
  }, []);

  const deleteHabit = useCallback((id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  }, []);

  const streak = useCallback((habitId) => {
    let s = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const key = dayKey(new Date(d - i * 86400000));
      if (log[`${key}_${habitId}`]) s++;
      else if (i > 0) break;
    }
    return s;
  }, [log]);

  const totalStreak = useMemo(() => {
    let s = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const key = dayKey(new Date(d - i * 86400000));
      const allDone = habits.length > 0 && habits.every(h => log[`${key}_${h.id}`]);
      if (allDone) s++;
      else if (i > 0) break;
    }
    return s;
  }, [log, habits]);

  const todayCount = useMemo(() =>
    habits.filter(h => isChecked(h.id, today())).length
  , [habits, isChecked]);

  const screens = {
    today: <TodayScreen habits={habits} toggle={toggle} isChecked={isChecked}
              streak={streak} todayCount={todayCount} totalStreak={totalStreak}
              creating={creating} setCreating={setCreating} addHabit={addHabit} />,
    stats: <StatsScreen habits={habits} log={log} streak={streak}
              totalStreak={totalStreak} />,
    manage: <ManageScreen habits={habits} deleteHabit={deleteHabit}
               streak={streak} setCreating={setCreating} creating={creating}
               addHabit={addHabit} />,
  };

  return (
    <>
      <Styles />
      <div style={{
        width:"100%", maxWidth:480, height:"100dvh", margin:"0 auto",
        display:"flex", flexDirection:"column", background:C.bg, overflow:"hidden",
      }}>
        <header style={{
          background:C.bg, padding:"14px 18px 10px",
          borderBottom:`1px solid ${C.border}`, flexShrink:0,
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:C.text,
              fontFamily:"'Space Grotesk',sans-serif" }}>Momentum</div>
            <div style={{ fontSize:10, color:C.dim, marginTop:1, letterSpacing:1 }}>
              REELVERSE&#8482;
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:20, fontWeight:700, color:totalStreak>0?C.green:C.dim }}>
              {totalStreak}d
            </div>
            <div style={{ fontSize:9, color:C.dim }}>streak</div>
          </div>
        </header>

        <main style={{ flex:1, overflowY:"auto" }}>
          {screens[tab]}
        </main>

        <nav role="tablist" aria-label="Main navigation" style={{
          background:C.bg, borderTop:`1px solid ${C.border}`,
          display:"flex", paddingBottom:"env(safe-area-inset-bottom,5px)", flexShrink:0,
        }}>
          {[
            { id:"today", label:"Today", icon:"🚀" },
            { id:"stats", label:"Stats", icon:"📊" },
            { id:"manage", label:"Habits", icon:"⚙️" },
          ].map(({id,label,icon})=>{
            const on = tab===id;
            return (
              <button key={id} role="tab" aria-selected={on} aria-label={label}
                onClick={()=>setTab(id)}
                style={{
                  flex:1, background:"none", border:"none", padding:"10px 4px 8px",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                }}>
                <span style={{ fontSize:18, opacity:on?1:.4 }}>{icon}</span>
                <span style={{ fontSize:9.5, fontWeight:on?700:400,
                  color:on?C.wave:C.dim, fontFamily:"'Space Grotesk',sans-serif" }}>
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

// ─── TODAY SCREEN ────────────────────────────────────────────
function TodayScreen({ habits, toggle, isChecked, streak, todayCount, totalStreak, creating, setCreating, addHabit }) {
  const d = today();
  const pct = habits.length > 0 ? Math.round((todayCount / habits.length) * 100) : 0;
  const allDone = habits.length > 0 && todayCount === habits.length;

  return (
    <div style={{ padding:"16px 16px 24px" }}>
      {/* Progress ring */}
      <div className="fu" style={{
        display:"flex", alignItems:"center", gap:16, marginBottom:18,
        background:C.card, borderRadius:16, padding:"16px 18px",
        border:`1px solid ${allDone ? C.green+"55" : C.border}`,
        boxShadow: allDone ? `0 0 30px ${C.green}15` : C.shadow,
      }}>
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke={C.border} strokeWidth="4" />
          <circle cx="32" cy="32" r="28" fill="none"
            stroke={allDone ? C.green : C.wave} strokeWidth="4"
            strokeDasharray={`${2*Math.PI*28}`}
            strokeDashoffset={`${2*Math.PI*28*(1 - pct/100)}`}
            strokeLinecap="round"
            transform="rotate(-90 32 32)"
            style={{ transition:"stroke-dashoffset .4s ease" }} />
          <text x="32" y="34" textAnchor="middle" dominantBaseline="middle"
            fontSize="16" fontWeight="700" fill={allDone ? C.green : C.wave}
            fontFamily="'Space Grotesk',sans-serif">
            {pct}%
          </text>
        </svg>
        <div>
          <div style={{ fontSize:18, fontWeight:700, color:C.text,
            fontFamily:"'Space Grotesk',sans-serif" }}>
            {allDone ? "All habits done!" : `${todayCount} of ${habits.length}`}
          </div>
          <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>
            {new Date().toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"})}
          </div>
        </div>
      </div>

      {/* Habit list */}
      {habits.map((h, i) => {
        const checked = isChecked(h.id, d);
        const s = streak(h.id);
        const pillar = PILLARS.find(p => p.id === h.pillar);
        return (
          <button key={h.id} className="fu" onClick={() => toggle(h.id, d)}
            aria-pressed={checked}
            style={{
              width:"100%", textAlign:"left", marginBottom:8,
              background: checked ? C.green+"0c" : C.card,
              border:`1.5px solid ${checked ? C.green+"44" : C.border}`,
              borderRadius:12, padding:"12px 14px",
              display:"flex", alignItems:"center", gap:12,
              animationDelay:`${i*0.04}s`,
              transition:"all .15s",
            }}>
            <div style={{
              width:28, height:28, borderRadius:8,
              border:`2px solid ${checked ? C.green : C.dim}`,
              background: checked ? C.green : "transparent",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:14, color:C.white, flexShrink:0,
              transition:"all .15s",
            }}>{checked ? "✓" : ""}</div>
            <div style={{ fontSize:18, flexShrink:0 }}>{h.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600,
                color: checked ? C.greenLt : C.text,
                textDecoration: checked ? "line-through" : "none",
                opacity: checked ? .7 : 1,
              }}>{h.name}</div>
              <div style={{ display:"flex", gap:6, marginTop:3 }}>
                {pillar && (
                  <span style={{ fontSize:9, padding:"1px 5px", borderRadius:4,
                    background:pillar.color+"18", color:pillar.color }}>
                    {pillar.emoji} {pillar.name}
                  </span>
                )}
                {s > 0 && (
                  <span style={{ fontSize:9, padding:"1px 5px", borderRadius:4,
                    background:C.amber+"18", color:C.amber }}>
                    🔥 {s}d
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}

      {habits.length === 0 && (
        <div style={{ textAlign:"center", padding:"40px 0", color:C.muted, fontSize:14 }}>
          No habits yet. Tap Habits to add some.
        </div>
      )}

      {/* Add button */}
      <button onClick={() => setCreating(true)} style={{
        width:"100%", marginTop:8, padding:"12px",
        background:C.card, border:`1px dashed ${C.border}`,
        borderRadius:12, color:C.wave, fontSize:13, fontWeight:600,
        display:"flex", alignItems:"center", justifyContent:"center", gap:6,
      }}>
        <span style={{ fontSize:18 }}>+</span> Add Habit
      </button>

      {creating && <CreateModal onAdd={addHabit} onClose={() => setCreating(false)} />}
    </div>
  );
}

// ─── STATS SCREEN ────────────────────────────────────────────
function StatsScreen({ habits, log, streak, totalStreak }) {
  const last30 = useMemo(() => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = dayKey(d);
      const done = habits.filter(h => log[`${key}_${h.id}`]).length;
      days.push({ date: key, done, total: habits.length, day: d.getDay() });
    }
    return days;
  }, [habits, log]);

  const completionRate = useMemo(() => {
    const total = last30.reduce((a, d) => a + d.total, 0);
    const done = last30.reduce((a, d) => a + d.done, 0);
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [last30]);

  const bestStreak = useMemo(() => {
    let best = 0, cur = 0;
    for (let i = 0; i < 365; i++) {
      const key = dayKey(new Date(Date.now() - i * 86400000));
      const allDone = habits.length > 0 && habits.every(h => log[`${key}_${h.id}`]);
      if (allDone) { cur++; best = Math.max(best, cur); }
      else cur = 0;
    }
    return best;
  }, [habits, log]);

  const pillarStats = useMemo(() => {
    return PILLARS.map(p => {
      const pillarHabits = habits.filter(h => h.pillar === p.id);
      if (pillarHabits.length === 0) return { ...p, rate: 0 };
      let done = 0, total = 0;
      last30.forEach(day => {
        pillarHabits.forEach(h => {
          total++;
          if (log[`${day.date}_${h.id}`]) done++;
        });
      });
      return { ...p, rate: total > 0 ? Math.round((done / total) * 100) : 0 };
    }).filter(p => habits.some(h => h.pillar === p.id));
  }, [habits, log, last30]);

  return (
    <div style={{ padding:"16px 16px 24px" }}>
      {/* Summary cards */}
      <div className="fu" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:18 }}>
        {[
          { label:"Current Streak", val:`${totalStreak}d`, color:C.green },
          { label:"Best Streak", val:`${bestStreak}d`, color:C.amber },
          { label:"30d Rate", val:`${completionRate}%`, color:C.wave },
        ].map(s => (
          <div key={s.label} style={{
            background:C.card, borderRadius:12, padding:"12px 8px",
            textAlign:"center", border:`1px solid ${C.border}`,
          }}>
            <div style={{ fontSize:22, fontWeight:700, color:s.color,
              fontFamily:"'Space Grotesk',sans-serif" }}>{s.val}</div>
            <div style={{ fontSize:9, color:C.dim, marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="fu d1" style={{
        background:C.card, borderRadius:14, padding:"14px 16px",
        border:`1px solid ${C.border}`, marginBottom:18,
      }}>
        <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase",
          color:C.wave, fontWeight:600, marginBottom:10,
          fontFamily:"'Space Grotesk',sans-serif" }}>30-Day Heatmap</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(10,1fr)", gap:3 }}>
          {last30.map((d, i) => {
            const pct = d.total > 0 ? d.done / d.total : 0;
            const bg = pct === 0 ? C.cardHi
              : pct < .5 ? C.green+"33"
              : pct < 1 ? C.green+"66"
              : C.green;
            return (
              <div key={i} title={`${d.date}: ${d.done}/${d.total}`} style={{
                aspectRatio:"1", borderRadius:4, background:bg,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:7, color: pct === 1 ? C.white : "transparent",
              }}>
                {pct === 1 ? "✓" : ""}
              </div>
            );
          })}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
          <span style={{ fontSize:9, color:C.dim }}>30 days ago</span>
          <span style={{ fontSize:9, color:C.dim }}>Today</span>
        </div>
      </div>

      {/* Pillar breakdown */}
      {pillarStats.length > 0 && (
        <div className="fu d2" style={{
          background:C.card, borderRadius:14, padding:"14px 16px",
          border:`1px solid ${C.border}`, marginBottom:18,
        }}>
          <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase",
            color:C.wave, fontWeight:600, marginBottom:10,
            fontFamily:"'Space Grotesk',sans-serif" }}>Pillar Performance</div>
          {pillarStats.map(p => (
            <div key={p.id} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:12, color:C.text }}>
                  {p.emoji} {p.name}
                </span>
                <span style={{ fontSize:12, fontWeight:700, color:p.color }}>{p.rate}%</span>
              </div>
              <div style={{ height:6, borderRadius:3, background:C.cardHi, overflow:"hidden" }}>
                <div style={{
                  height:"100%", borderRadius:3, background:p.color,
                  width:`${p.rate}%`, transition:"width .4s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Per-habit streaks */}
      <div className="fu d3" style={{
        background:C.card, borderRadius:14, padding:"14px 16px",
        border:`1px solid ${C.border}`,
      }}>
        <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase",
          color:C.wave, fontWeight:600, marginBottom:10,
          fontFamily:"'Space Grotesk',sans-serif" }}>Habit Streaks</div>
        {habits.map(h => {
          const s = streak(h.id);
          return (
            <div key={h.id} style={{
              display:"flex", alignItems:"center", gap:10, marginBottom:8,
              padding:"6px 0",
            }}>
              <span style={{ fontSize:16 }}>{h.emoji}</span>
              <span style={{ flex:1, fontSize:12, color:C.text }}>{h.name}</span>
              <span style={{
                fontSize:12, fontWeight:700,
                color: s > 0 ? C.amber : C.dim,
              }}>
                {s > 0 ? `🔥 ${s}d` : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MANAGE SCREEN ───────────────────────────────────────────
function ManageScreen({ habits, deleteHabit, streak, setCreating, creating, addHabit }) {
  return (
    <div style={{ padding:"16px 16px 24px" }}>
      <div className="fu" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:16, fontWeight:700, color:C.text,
            fontFamily:"'Space Grotesk',sans-serif" }}>Your Habits</div>
          <div style={{ fontSize:12, color:C.dim }}>{habits.length} active habits</div>
        </div>
        <button onClick={() => setCreating(true)} style={{
          background:`linear-gradient(135deg,${C.wave}cc,${C.waveDk}cc)`,
          border:"none", borderRadius:10, padding:"8px 16px",
          color:C.white, fontSize:13, fontWeight:600,
        }}>+ New</button>
      </div>

      {habits.map((h, i) => {
        const pillar = PILLARS.find(p => p.id === h.pillar);
        const s = streak(h.id);
        return (
          <div key={h.id} className="fu" style={{
            background:C.card, borderRadius:12, padding:"14px",
            marginBottom:8, border:`1px solid ${C.border}`,
            display:"flex", alignItems:"center", gap:12,
            animationDelay:`${i*0.03}s`,
          }}>
            <span style={{ fontSize:22 }}>{h.emoji}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{h.name}</div>
              <div style={{ display:"flex", gap:6, marginTop:3 }}>
                {pillar && (
                  <span style={{ fontSize:9, padding:"1px 5px", borderRadius:4,
                    background:pillar.color+"18", color:pillar.color }}>
                    {pillar.name}
                  </span>
                )}
                {s > 0 && (
                  <span style={{ fontSize:9, padding:"1px 5px", borderRadius:4,
                    background:C.amber+"18", color:C.amber }}>🔥 {s}d</span>
                )}
              </div>
            </div>
            <button onClick={() => deleteHabit(h.id)} aria-label={`Delete ${h.name}`}
              style={{
                background:"none", border:"none", color:C.dim, fontSize:18,
                padding:"4px 8px",
              }}>×</button>
          </div>
        );
      })}

      {creating && <CreateModal onAdd={addHabit} onClose={() => setCreating(false)} />}
    </div>
  );
}

// ─── CREATE MODAL ────────────────────────────────────────────
function CreateModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [pillar, setPillar] = useState("mind");
  const [emoji, setEmoji] = useState("✨");

  const submit = () => {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), pillar, emoji });
  };

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.7)",
      display:"flex", alignItems:"flex-end", justifyContent:"center",
      zIndex:100,
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width:"100%", maxWidth:480, background:C.card,
        borderRadius:"20px 20px 0 0", padding:"24px 20px",
        paddingBottom:"calc(24px + env(safe-area-inset-bottom,0px))",
        border:`1px solid ${C.border}`, borderBottom:"none",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontSize:18, fontWeight:700, color:C.text,
            fontFamily:"'Space Grotesk',sans-serif" }}>New Habit</div>
          <button onClick={onClose} aria-label="Close" style={{
            background:"none", border:"none", color:C.dim, fontSize:22, padding:4,
          }}>×</button>
        </div>

        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:11, color:C.muted, fontWeight:600, display:"block", marginBottom:4 }}>
            Name
          </label>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Meditate 10 minutes" autoFocus
            style={{
              width:"100%", background:C.bg, border:`1.5px solid ${C.border}`,
              borderRadius:10, padding:"10px 12px", color:C.text, fontSize:14,
              outline:"none", boxSizing:"border-box",
            }} />
        </div>

        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:11, color:C.muted, fontWeight:600, display:"block", marginBottom:6 }}>
            Pillar
          </label>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
            {PILLARS.map(p => {
              const on = pillar === p.id;
              return (
                <button key={p.id} onClick={() => setPillar(p.id)}
                  style={{
                    background: on ? p.color+"14" : C.bg,
                    border:`1.5px solid ${on ? p.color : C.border}`,
                    borderRadius:8, padding:"8px 4px", textAlign:"center",
                    fontSize:11, color: on ? p.color : C.muted,
                  }}>
                  {p.emoji} {p.name}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:11, color:C.muted, fontWeight:600, display:"block", marginBottom:6 }}>
            Emoji
          </label>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {["✨","📖","🧘","🏋️","🥗","💊","📵","🎯","🤝","🌅","💤","🎨","📝","🚶","🙏","💡"].map(e => (
              <button key={e} onClick={() => setEmoji(e)}
                style={{
                  width:36, height:36, borderRadius:8, fontSize:18,
                  background: emoji===e ? C.wave+"22" : C.bg,
                  border:`1.5px solid ${emoji===e ? C.wave : C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                {e}
              </button>
            ))}
          </div>
        </div>

        <button onClick={submit} disabled={!name.trim()}
          style={{
            width:"100%", padding:"14px",
            background: name.trim() ? `linear-gradient(135deg,${C.wave},${C.waveDk})` : C.cardHi,
            border:"none", borderRadius:12,
            color: name.trim() ? C.white : C.dim,
            fontSize:15, fontWeight:700,
          }}>
          Add Habit
        </button>
      </div>
    </div>
  );
}
