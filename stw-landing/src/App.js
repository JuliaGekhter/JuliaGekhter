import { useEffect, useRef } from "react";

const C = {
  bg:"#06080e", bg2:"#0c1018", card:"#111827", cardHi:"#1a2234",
  border:"#1f2937", text:"#f1f5f9", muted:"#94a3b8", dim:"#64748b",
  white:"#fff",
  wave:"#06b6d4", waveDk:"#0891b2", waveLt:"#67e8f9", waveXl:"#cffafe",
  R:"#ef4444", E1:"#f59e0b", E2:"#10b981", L:"#6366f1", A:"#8b5cf6",
  gold:"#d4a017", goldLt:"#fbbf24",
  mind:"#a78bfa", body:"#f472b6", digital:"#38bdf8",
  family:"#fb923c", environ:"#4ade80", recovery:"#e879f9",
};

const STYLE = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',system-ui,sans-serif;background:${C.bg};color:${C.text};}
::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-thumb{background:#06b6d433;border-radius:3px;}
.sg{font-family:'Space Grotesk',sans-serif;}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}
.reveal.visible{opacity:1;transform:translateY(0);}
a{color:${C.wave};text-decoration:none;}a:hover{text-decoration:underline;}`;

function Styles(){
  useEffect(()=>{
    const el=document.createElement("style");el.textContent=STYLE;document.head.appendChild(el);
    return()=>el.remove();
  },[]);
  return null;
}

function useReveal(){
  const ref=useRef();
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add("visible");obs.disconnect();}},{threshold:0.15});
    obs.observe(el);return()=>obs.disconnect();
  },[]);
  return ref;
}

function Section({children,id,style={}}){
  const ref=useReveal();
  return <section ref={ref} id={id} className="reveal" style={{maxWidth:960,margin:"0 auto",padding:"80px 24px",...style}}>{children}</section>;
}

const Tag=({children,color})=><span style={{display:"inline-block",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:6,background:color+"18",color,letterSpacing:.5}}>{children}</span>;

const REEL=[
  {letter:"R",name:"Reflect",color:C.R,text:"Pause. Notice what's happening in your body, mind, emotions, and environment."},
  {letter:"E",name:"Envision",color:C.E1,text:"See where you want to go. Clarify the version of yourself you're building toward."},
  {letter:"E",name:"Execute",color:C.E2,text:"Take one action. Small, specific, and doable right now."},
  {letter:"L",name:"Learn",color:C.L,text:"Extract the lesson. What worked, what didn't, what will you carry forward?"},
  {letter:"A",name:"Align",color:C.A,text:"Connect it all. Link this insight to your values, goals, health, and daily life."},
];

const PILLARS=[
  {name:"Mind Care",emoji:"🧠",color:C.mind,text:"Focus, emotional regulation, screen balance, creativity, memory, stress recovery."},
  {name:"Body Care",emoji:"💪",color:C.body,text:"Movement, sleep, hydration, nutrition, posture, breathing, physical safety."},
  {name:"Digital Care",emoji:"🔐",color:C.digital,text:"Privacy, security, accessibility, safe apps, screen time, healthy device use."},
  {name:"Family Care",emoji:"👨‍👩‍👧‍👦",color:C.family,text:"Communication, child safety, Screen Time, support systems, shared responsibility."},
  {name:"Environment Care",emoji:"🌍",color:C.environ,text:"Home, travel, workspace, connected devices, safe and organized surroundings."},
  {name:"Recovery Care",emoji:"🔄",color:C.recovery,text:"Reset, restore, reflect, repair, update, and return to balance."},
];

const ECOSYSTEM=[
  {name:"ReelVerse Coach",emoji:"🧭",color:C.wave,tag:"AI Guidance",text:"Personalized AI coaching that adapts to your patterns and progress."},
  {name:"ReelVerse Mirror",emoji:"🪞",color:C.A,tag:"Reflection",text:"Guided journaling and self-reflection using the REEL Align framework."},
  {name:"ReelVerse Compass",emoji:"🧭",color:C.E1,tag:"Direction",text:"Values clarification, goal-setting, and life direction mapping."},
  {name:"ReelVerse Momentum",emoji:"🚀",color:C.E2,tag:"Habits",text:"Habit tracking, streak building, and progress visualization."},
  {name:"ReelVerse Academy",emoji:"🎓",color:C.goldLt,tag:"Education",text:"Courses, workshops, and certification pathways."},
  {name:"Certified REEL Practitioner",emoji:"📜",color:C.gold,tag:"Credential",text:"Professional certification for therapists, coaches, and wellness practitioners."},
];

const PLANS=[
  {name:"Explorer",price:"Free",interval:"",color:C.dim,tag:"Start here",features:["Daily REEL Align Check-In","6 Pillars overview","Universal Health Flow guide","Community access"]},
  {name:"Align",price:"$49",interval:"/mo",color:C.wave,tag:"Most popular",pop:true,features:["Everything in Explorer","ReelVerse Coach AI — unlimited","ReelVerse Mirror, Compass, Momentum","Screen Balance Audit","10% off all services & packages"]},
  {name:"Family",price:"$89",interval:"/mo",color:C.family,tag:"Up to 6",features:["Everything in Align × 6 members","Family Device Setup","Child Safety Review","Shared family dashboard","15% off everything"]},
  {name:"Practitioner",price:"$149",interval:"/mo",color:C.A,tag:"Professionals",features:["Everything in Align","Practitioner Toolkit Bundle","ReelVerse Academy full access","Certification pathway","Client dashboard","20% off additional services"]},
  {name:"Enterprise",price:"$499",interval:"/mo",color:C.gold,tag:"Organizations",features:["Unlimited Practitioner seats","Total Transformation Bundle","White-label ReelVerse OS","Admin analytics dashboard","Dedicated account manager","API access & integrations"]},
];

const STATS=[
  {val:"49",label:"Services"},
  {val:"21",label:"Packages"},
  {val:"16",label:"Bundles"},
  {val:"5",label:"Membership Tiers"},
  {val:"6",label:"Care Pillars"},
  {val:"30",label:"Daily Checkpoints"},
];

export default function App(){
  return(
    <>
      <Styles/>
      {/* ─── HERO ─── */}
      <div style={{position:"relative",overflow:"hidden",background:`radial-gradient(ellipse at 50% 0%,${C.wave}12,transparent 60%)`}}>
        <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
          <svg width="100%" height="100%" viewBox="0 0 960 500" preserveAspectRatio="none" style={{position:"absolute",bottom:0,opacity:.06}}>
            <path d="M0,350 C160,250 320,400 480,300 C640,200 800,380 960,280 L960,500 L0,500Z" fill={C.wave}/>
            <path d="M0,400 C200,320 400,450 600,350 C760,280 880,400 960,340 L960,500 L0,500Z" fill={C.wave} opacity=".5"/>
          </svg>
        </div>

        <nav style={{maxWidth:960,margin:"0 auto",padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>
          <div className="sg" style={{fontSize:14,fontWeight:700,color:C.wave,letterSpacing:1}}>STW LONGEVITY</div>
          <div style={{display:"flex",gap:24,fontSize:13,color:C.muted}}>
            <a href="#method" style={{color:C.muted}}>Method</a>
            <a href="#pillars" style={{color:C.muted}}>Pillars</a>
            <a href="#pricing" style={{color:C.muted}}>Pricing</a>
            <a href="#about" style={{color:C.muted}}>About</a>
          </div>
        </nav>

        <Section style={{paddingTop:60,paddingBottom:80,textAlign:"center"}}>
          <div style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:C.wave,fontWeight:600,marginBottom:14}} className="sg">
            Shape The Wave Longevity&#8482;
          </div>
          <h1 className="sg" style={{fontSize:"clamp(32px,5vw,56px)",fontWeight:800,lineHeight:1.08,color:C.white,marginBottom:16}}>
            Optimize health.<br/>Align habits.<br/>Live longer, better.
          </h1>
          <p style={{fontSize:18,color:C.muted,maxWidth:520,margin:"0 auto 32px",lineHeight:1.7}}>
            A revolutionary mind-body care framework that turns awareness, technology, and self-mastery
            into one connected health system for people, families, and communities.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="#pricing" style={{display:"inline-block",padding:"14px 32px",borderRadius:12,
              background:`linear-gradient(135deg,${C.wave},${C.waveDk})`,color:C.white,
              fontSize:15,fontWeight:700,textDecoration:"none",boxShadow:`0 0 30px ${C.wave}33`}}>
              Get Started Free
            </a>
            <a href="#method" style={{display:"inline-block",padding:"14px 32px",borderRadius:12,
              background:C.card,border:`1px solid ${C.border}`,color:C.text,
              fontSize:15,fontWeight:600,textDecoration:"none"}}>
              Learn the Method
            </a>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:32}}>
            {REEL.map((s,i)=>(
              <div key={i} style={{width:42,height:42,borderRadius:11,
                background:`linear-gradient(135deg,${s.color}bb,${s.color}55)`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:20,fontWeight:700,color:C.white,boxShadow:`0 0 16px ${s.color}33`}} className="sg">
                {s.letter}
              </div>
            ))}
          </div>
          <div style={{fontSize:12,color:C.dim,marginTop:10,letterSpacing:1}}>
            Reflect &middot; Envision &middot; Execute &middot; Learn &middot; Align
          </div>
        </Section>
      </div>

      {/* ─── STATS BAR ─── */}
      <div style={{background:C.bg2,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <Section style={{padding:"32px 24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:16,textAlign:"center"}}>
            {STATS.map(s=>(
              <div key={s.label}>
                <div className="sg" style={{fontSize:28,fontWeight:800,color:C.wave}}>{s.val}</div>
                <div style={{fontSize:11,color:C.dim,marginTop:2}}>{s.label}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── METHOD ─── */}
      <Section id="method">
        <Tag color={C.wave}>The Framework</Tag>
        <h2 className="sg" style={{fontSize:32,fontWeight:800,color:C.white,marginTop:12,marginBottom:6}}>
          REEL&#8482; Align Method&#8482;
        </h2>
        <p style={{fontSize:15,color:C.muted,marginBottom:32,maxWidth:560,lineHeight:1.7}}>
          Build habits. Break patterns. Live aligned. Five steps that transform passive awareness into lasting change.
        </p>
        <div style={{display:"grid",gap:14}}>
          {REEL.map((s,i)=>(
            <div key={i} style={{display:"flex",gap:16,alignItems:"flex-start",
              background:C.card,borderRadius:16,padding:"20px",border:`1px solid ${C.border}`,
              boxShadow:`0 2px 20px rgba(0,0,0,.3)`}}>
              <div style={{width:52,height:52,borderRadius:14,flexShrink:0,
                background:`linear-gradient(135deg,${s.color}cc,${s.color}55)`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:26,fontWeight:700,color:C.white,boxShadow:`0 0 20px ${s.color}33`}} className="sg">
                {s.letter}
              </div>
              <div>
                <div className="sg" style={{fontSize:18,fontWeight:700,color:C.white}}>{s.name}</div>
                <div style={{fontSize:14,color:C.muted,marginTop:4,lineHeight:1.65}}>{s.text}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── PILLARS ─── */}
      <div style={{background:C.bg2}}>
        <Section id="pillars">
          <Tag color={C.E2}>Core System</Tag>
          <h2 className="sg" style={{fontSize:32,fontWeight:800,color:C.white,marginTop:12,marginBottom:6}}>
            6 Pillars of Care
          </h2>
          <p style={{fontSize:15,color:C.muted,marginBottom:32,maxWidth:560,lineHeight:1.7}}>
            A complete system covering every dimension of health, safety, and well-being.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
            {PILLARS.map((p,i)=>(
              <div key={i} style={{background:C.card,borderRadius:16,padding:"20px",
                border:`1px solid ${C.border}`,boxShadow:`0 2px 20px rgba(0,0,0,.3)`}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <div style={{width:42,height:42,borderRadius:11,
                    background:p.color+"14",border:`1.5px solid ${p.color}44`,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                    {p.emoji}
                  </div>
                  <div className="sg" style={{fontSize:16,fontWeight:700,color:C.white}}>{p.name}</div>
                </div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{p.text}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── ECOSYSTEM ─── */}
      <Section id="ecosystem">
        <Tag color={C.A}>Platform</Tag>
        <h2 className="sg" style={{fontSize:32,fontWeight:800,color:C.white,marginTop:12,marginBottom:6}}>
          The ReelVerse&#8482; Ecosystem
        </h2>
        <p style={{fontSize:15,color:C.muted,marginBottom:12,maxWidth:560,lineHeight:1.7}}>
          Behavior change powered by intelligence. Your personal transformation operating system.
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:32}}>
          <Tag color={C.wave}>ReelVerse AI&#8482;</Tag>
          <Tag color={C.L}>ReelVerse OS&#8482;</Tag>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
          {ECOSYSTEM.map((e,i)=>(
            <div key={i} style={{background:C.card,borderRadius:16,padding:"20px",
              border:`1px solid ${C.border}`,boxShadow:`0 2px 20px rgba(0,0,0,.3)`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:40,height:40,borderRadius:10,
                  background:e.color+"14",border:`1.5px solid ${e.color}44`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
                  {e.emoji}
                </div>
                <div>
                  <div className="sg" style={{fontSize:15,fontWeight:700,color:C.white}}>{e.name}&#8482;</div>
                  <Tag color={e.color}>{e.tag}</Tag>
                </div>
              </div>
              <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{e.text}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── FLOW ─── */}
      <div style={{background:C.bg2}}>
        <Section>
          <div style={{textAlign:"center",marginBottom:32}}>
            <Tag color={C.wave}>Universal Process</Tag>
            <h2 className="sg" style={{fontSize:28,fontWeight:800,color:C.white,marginTop:12}}>
              Universal Health Flow
            </h2>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:0}}>
            {["👁️ See the signal","🏷️ Name the pattern","🛡️ Protect the person","⬆️ Upgrade the system","⚖️ Restore balance","🌱 Teach the method"].map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center"}}>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,
                  padding:"12px 18px",fontSize:14,color:C.text,fontWeight:600,whiteSpace:"nowrap"}}>
                  {s}
                </div>
                {i<5&&<div style={{width:24,height:2,background:C.wave+"44",flexShrink:0}}/>}
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── PRICING ─── */}
      <Section id="pricing">
        <div style={{textAlign:"center",marginBottom:36}}>
          <Tag color={C.goldLt}>Pricing</Tag>
          <h2 className="sg" style={{fontSize:32,fontWeight:800,color:C.white,marginTop:12,marginBottom:6}}>
            Choose Your Path
          </h2>
          <p style={{fontSize:15,color:C.muted,maxWidth:480,margin:"0 auto",lineHeight:1.7}}>
            5 membership tiers. 49 services. 21 packages. 16 bundles.
            Start free, scale to organization.
          </p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,alignItems:"stretch"}}>
          {PLANS.map((p,i)=>(
            <div key={i} style={{
              background:p.pop?`linear-gradient(160deg,${C.wave}0c,${C.A}08)`:C.card,
              border:`${p.pop?2:1}px solid ${p.pop?C.wave+"55":C.border}`,
              borderRadius:18,padding:"24px 20px",position:"relative",
              boxShadow:p.pop?`0 0 40px ${C.wave}15`:`0 2px 20px rgba(0,0,0,.3)`,
              display:"flex",flexDirection:"column",
            }}>
              {p.pop&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",
                background:`linear-gradient(135deg,${C.wave},${C.waveDk})`,color:C.white,
                fontSize:10,fontWeight:700,padding:"3px 14px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap"}}>
                Most Popular
              </div>}
              <div style={{marginBottom:16}}>
                <Tag color={p.color}>{p.tag}</Tag>
              </div>
              <div className="sg" style={{fontSize:20,fontWeight:800,color:C.white,marginBottom:4}}>
                {p.name}
              </div>
              <div style={{marginBottom:16}}>
                <span className="sg" style={{fontSize:36,fontWeight:800,color:p.color}}>{p.price}</span>
                {p.interval&&<span style={{fontSize:14,color:C.dim}}>{p.interval}</span>}
              </div>
              <div style={{flex:1}}>
                {p.features.map((f,fi)=>(
                  <div key={fi} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8}}>
                    <span style={{color:C.E2,fontSize:13,marginTop:1,flexShrink:0}}>✓</span>
                    <span style={{fontSize:13,color:C.muted,lineHeight:1.5}}>{f}</span>
                  </div>
                ))}
              </div>
              <button style={{marginTop:16,width:"100%",padding:"12px",borderRadius:10,
                background:p.pop?`linear-gradient(135deg,${C.wave},${C.waveDk})`:C.cardHi,
                border:`1px solid ${p.pop?C.wave:C.border}`,
                color:p.pop?C.white:C.muted,fontSize:14,fontWeight:700,cursor:"pointer"}}>
                {p.price==="Free"?"Start Free":"Get Started"}
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── BRAND HIERARCHY ─── */}
      <div style={{background:C.bg2}}>
        <Section>
          <div style={{textAlign:"center",marginBottom:32}}>
            <Tag color={C.wave}>Architecture</Tag>
            <h2 className="sg" style={{fontSize:28,fontWeight:800,color:C.white,marginTop:12}}>
              Brand Hierarchy
            </h2>
          </div>
          <div style={{maxWidth:400,margin:"0 auto"}}>
            {[
              {name:"Shape The Wave Longevity™",sub:"Optimize health. Align habits. Live longer, better.",color:C.wave},
              {name:"REEL™ Align Method™",sub:"Build habits. Break patterns. Live aligned.",color:C.E2},
              {name:"ReelVerse AI™",sub:"Behavior change powered by intelligence.",color:C.A},
              {name:"ReelVerse OS™",sub:"Your personal transformation operating system.",color:C.L},
            ].map((b,i)=>(
              <div key={i} style={{display:"flex",gap:14,alignItems:"center"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:20}}>
                  <div style={{width:12,height:12,borderRadius:6,background:b.color,flexShrink:0,
                    boxShadow:`0 0 12px ${b.color}44`}}/>
                  {i<3&&<div style={{width:2,height:28,background:`linear-gradient(${b.color}66,${C.border})`}}/>}
                </div>
                <div style={{padding:"8px 0"}}>
                  <div className="sg" style={{fontSize:16,fontWeight:700,color:b.color}}>{b.name}</div>
                  <div style={{fontSize:12,color:C.muted}}>{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── ABOUT ─── */}
      <Section id="about">
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24,alignItems:"center"}}>
          <div>
            <Tag color={C.wave}>The Creator</Tag>
            <h2 className="sg" style={{fontSize:28,fontWeight:800,color:C.white,marginTop:12,marginBottom:12}}>
              Julia Gekhter-Tack, LCSW
            </h2>
            <p style={{fontSize:14,color:C.muted,lineHeight:1.75,marginBottom:12}}>
              Licensed Clinical Social Worker and Psychotherapist. A bridge child who immigrated from Ukraine
              at fifteen, Julia built this system from decades of clinical practice, personal transformation,
              and the belief that everyone deserves access to the tools of conscious living.
            </p>
            <p style={{fontSize:14,color:C.muted,lineHeight:1.75}}>
              Author of <em style={{color:C.waveLt}}>The Bridge Child: A Memoir</em> — a story of immigration,
              identity, love, loss, and the resilience that bridges two worlds.
            </p>
          </div>
          <div style={{background:C.card,borderRadius:20,padding:"28px 24px",border:`1px solid ${C.border}`,
            textAlign:"center",boxShadow:`0 2px 30px rgba(0,0,0,.4)`}}>
            <div style={{width:80,height:80,borderRadius:"50%",margin:"0 auto 16px",
              background:`radial-gradient(circle at 40% 35%,${C.wave},${C.bg})`,
              border:`2px solid ${C.wave}`,boxShadow:`0 0 24px ${C.wave}33`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>
              {"🌊"}
            </div>
            <div className="sg" style={{fontSize:18,fontWeight:700,color:C.white}}>Julia Gekhter-Tack</div>
            <div style={{fontSize:12,color:C.wave,marginTop:2}}>LCSW</div>
            <div style={{fontSize:11,color:C.dim,fontStyle:"italic",marginTop:2}}>
              Licensed Clinical Social Worker &amp; Psychotherapist
            </div>
            <div style={{width:40,height:1,background:C.border,margin:"16px auto"}}/>
            <div style={{fontSize:13,color:C.muted,fontStyle:"italic",lineHeight:1.7}}>
              "THE REEL METHOD is a universal mind-body care framework that turns everyday technology,
              awareness, safety, and self-mastery into one connected health system."
            </div>
          </div>
        </div>
      </Section>

      {/* ─── CTA ─── */}
      <div style={{background:`radial-gradient(ellipse at 50% 100%,${C.wave}0c,transparent 60%)`}}>
        <Section style={{textAlign:"center",paddingBottom:40}}>
          <h2 className="sg" style={{fontSize:28,fontWeight:800,color:C.white,marginBottom:8}}>
            Ready to shape your wave?
          </h2>
          <p style={{fontSize:15,color:C.muted,maxWidth:440,margin:"0 auto 24px",lineHeight:1.7}}>
            Start with the free Explorer membership. Practice the REEL Align Method daily.
            Watch your systems transform.
          </p>
          <a href="#pricing" style={{display:"inline-block",padding:"16px 40px",borderRadius:14,
            background:`linear-gradient(135deg,${C.wave},${C.waveDk})`,color:C.white,
            fontSize:16,fontWeight:700,textDecoration:"none",boxShadow:`0 0 40px ${C.wave}33`}}>
            Start Free Today
          </a>
        </Section>
      </div>

      {/* ─── FOOTER ─── */}
      <footer style={{background:C.bg2,borderTop:`1px solid ${C.border}`,padding:"32px 24px",textAlign:"center"}}>
        <div className="sg" style={{fontSize:13,fontWeight:700,color:C.wave,letterSpacing:1,marginBottom:8}}>
          SHAPE THE WAVE LONGEVITY&#8482;
        </div>
        <div style={{fontSize:11,color:C.dim,marginBottom:4}}>
          REEL&#8482; Align Method&#8482; &middot; ReelVerse AI&#8482; &middot; ReelVerse OS&#8482;
        </div>
        <div style={{fontSize:11,color:C.dim}}>
          Julia Gekhter-Tack, LCSW &middot; Psychotherapist &amp; Creator
        </div>
        <div style={{fontSize:10,color:C.dim,marginTop:12,opacity:.6}}>
          &copy; {new Date().getFullYear()} Shape The Wave Longevity. All rights reserved.
        </div>
      </footer>
    </>
  );
}
