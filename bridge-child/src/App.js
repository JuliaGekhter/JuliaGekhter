import { useState, useEffect } from "react";

const T = {
navy:"#08121e", navyMid:"#0d1b2a", navyUp:"#132333",
gold:"#9a7b2f", goldl:"#c4a24a", goldb:"#e8c55a", goldPale:"#f5e4a8",
ink:"#1a1a1c", cream:"#f0ece3", creamDk:"#e4ddd0",
silv:"#6e7e8a", mist:"#f6f4f0", white:"#ffffff",
shadowSm:"0 1px 6px rgba(0,0,0,.12),0 2px 12px rgba(0,0,0,.08)",
shadowMd:"0 4px 16px rgba(0,0,0,.15),0 8px 32px rgba(0,0,0,.10)",
};

const STYLE = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap'); *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;} ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#c4a24a44;border-radius:2px;} @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}} @keyframes fadeIn{from{opacity:0;}to{opacity:1;}} .fu{animation:fadeUp .35s cubic-bezier(.22,.68,0,1.18) both;} .d1{animation-delay:.06s;} .d2{animation-delay:.12s;} .d3{animation-delay:.18s;} .d4{animation-delay:.24s;} .d5{animation-delay:.30s;} .d6{animation-delay:.36s;} .press{transition:transform .10s,opacity .10s;} .press:active{transform:scale(.97);opacity:.82;} button{font-family:inherit;} textarea{font-family:'EB Garamond',Georgia,serif!important;}`;

function Styles() {
  useEffect(()=>{
    const el=document.createElement("style");
    el.textContent=STYLE; document.head.appendChild(el);
    return()=>el.remove();
  },[]);
  return null;
}

// ─── DATA ────────────────────────────────────────────────────
const EXCERPTS = [
  { chapter:"Introduction", title:"Who Is a Bridge Child?",
    epigraph:"Between two worlds life hovers like a star,\ntwixt night and morn, upon the horizon's verge.",
    text:`There is a moment every bridge child knows. It does not announce itself with ceremony. It arrives in the middle of an ordinary Tuesday, or in the silence between two heartbeats when someone asks where you are from. The moment is this: you realize, again, with fresh astonishment, that you do not fully belong anywhere.\n\nYou are fluent in two worlds and native to neither. You are, in the deepest and most literal sense, a bridge — a structure that connects two shores without being a part of either one.\n\nI am a bridge child. I crossed the ocean from Ukraine to the United States at the age of fifteen, speaking enough English to order a meal and not much else. I built a career in the very field that might have helped me as a child, had I been fortunate enough to encounter someone who understood what I was carrying.\n\nI wrote this book because no such person found me. And because the fifteen-year-old I was — sitting alone in a school cafeteria that felt like a different planet, performing competence while drowning in grief for a life I was not permitted to mourn — deserves to have her story told. Not as tragedy. Not as triumph. As truth.`,
  },
  { chapter:"Chapter One", title:"The Country That Made Me",
    epigraph:"Ukraine, Before",
    text:`Before I tell you about the leaving, I need to tell you about what was left.\n\nThis is the part of the immigrant story that gets skipped in the popular telling. We begin with the journey, the arrival, the adjustment. But the truth is that the country I came from — its textures and smells and rhythms and silences — is still with me in ways I am still, more than two decades later, discovering.\n\nHer kitchen was the center of the universe. I mean this with precision rather than sentimentality. She made borscht the way no one else has ever made borscht. She made dumplings on winter afternoons, the kitchen filling with steam, and she let me help, and I was terrible at it, and she corrected me with patient good humor and let me try again. Those afternoons are among the most important of my life.\n\nVera gave me beauty. Ivan gave me language. Between the two of them, they gave me the tools I have used to survive everything that came after. This book exists because of both of them.`,
  },
  { chapter:"Chapter Two", title:"Leaving",
    epigraph:"2003",
    text:`His name was Sasha.\n\nI need to tell you about Sasha before I tell you anything else about the leaving, because he was the truest reason that the leaving was so hard, and because his story has been inside this book from the first page, waiting to be told.\n\nFirst love and lost home arrive together for the bridge child. They become inseparable in memory — the person and the place, the face and the season, the goodbye said and the one that couldn't be.\n\nI cried in the airport bathroom, ten minutes before we boarded. I went alone into a stall and I cried with the specific silence of someone who has learned that grief is something you do in private. I put my hands over my mouth. I cried for Sasha. For Vera and her kitchen and the smell of dill.\n\nThen I dried my face. I practiced the expression. I walked out. I was fifteen years old and I was leaving my entire life and I was not allowed to fall apart and so I didn't.`,
  },
  { chapter:"Chapter Nine", title:"Becoming a Mother",
    epigraph:"2014",
    text:`Noah was born in the spring of 2014. The joy was real, immediate, and total. Noah's existence was — and is — the most unambiguous good of my life.\n\nBecoming a mother activated everything I had been carrying. Every attachment wound. Every unprocessed grief. Every survival strategy. They all surfaced, as if Noah's arrival had opened some sealed room in my interior.\n\nThe immigrant parent's paradox: you came here for your children, and the children you raise here are more here than you will ever be. This is exactly the success you hoped for. It costs something intimate and ongoing.\n\nMotherhood crystallized something important: my son was watching everything I did. I understood that everything I carried I would also pass on — unless I did the work. This understanding has been the engine of my healing ever since.`,
  },
  { chapter:"Epilogue", title:"The Bridge Holds",
    epigraph:"Early 2026",
    text:`I came to America at fifteen, not speaking the language, not knowing anyone, not having any map for what was ahead of me.\n\nI am in my early forties now. I have a son and a husband and a career and this book. I have a grandfather named Ivan who was a writer and who showed me what language could do, and who died before I could say goodbye, and whose absence I carry every day. I have a grandmother named Vera who fed me and gave me beauty and pressed an icon into my hands at an airport, and whose way of loving has become my own.\n\nI am still a bridge child. I will always be a bridge child. The bridge child's position — between two worlds, fluent in neither and native to both, always doing the work of translation — is not a problem that gets solved. It is a condition that gets integrated.\n\nThe bridge holds. Even when it is tested. Even when the weight of everything being carried across it seems too much. The bridge holds.\n\nI am the evidence.`,
  },
];

const EXERCISES = [
  { num:"1", part:"Part One — The Country That Made You",
    title:"A Letter to the Country You Left", time:"30–45 min",
    desc:"Give voice to your relationship with the country you came from. You are allowed to feel love and grief and anger simultaneously.",
    prompts:["What did you love about the country, and what do you miss?","What are you angry about — the circumstances that made leaving necessary?","What have you carried with you, consciously or not?","What do you want the country to know about what it gave you?"],
    starter:"Dear [your country]… or To the place that made me…",
  },
  { num:"2", part:"Part One — The Country That Made You",
    title:"The Invisible Suitcase", time:"45–60 min",
    desc:"When you immigrated, you brought an invisible suitcase packed with values, beliefs, survival strategies, and grief. This exercise is that unpacking.",
    prompts:["Values and beliefs I brought:","Survival strategies I developed:","Grief I carried:","Gifts and strengths I brought:"],
    starter:"The thing I have been carrying longest is…",
  },
  { num:"3", part:"Part One — The Country That Made You",
    title:"Your Anchor", time:"30–40 min",
    desc:"Every resilient person had an anchor — one person who was consistently, genuinely present, who made you feel the world was fundamentally okay.",
    prompts:["Who was your anchor? Name them and describe them.","Their hands / voice / kitchen / smell:","The specific thing they did that communicated love:","What they gave you that you still carry:"],
    starter:"You may not have known what you were giving me, but I want you to know…",
  },
  { num:"4", part:"Part Two — The Crossing",
    title:"The People I Left Behind", time:"45–60 min",
    desc:"This exercise is about the specific people you left — the grandmother, the first love, the best friend. Each deserves to be named.",
    prompts:["List every significant person you left:","Who were they to you — describe the relationship:","What did you never get to say?","What do you carry from them still?"],
    starter:"Write them an unsent letter. Say what was never said.",
  },
  { num:"5", part:"Part Two — The Crossing",
    title:"A Letter to Your Younger Self", time:"30–45 min",
    desc:"The version of you who arrived in a new country was doing something genuinely extraordinary, largely without support or acknowledgment.",
    prompts:["What that year was actually like, named honestly.","What you wish someone had told you.","What you want to thank that younger self for.","What they did right, even when they thought they were doing it wrong."],
    starter:"Dear [your name] at [age]… I want you to know…",
  },
  { num:"6", part:"Part Three — Building a Life",
    title:"Your Two Selves: A Dialogue", time:"30–45 min",
    desc:"Bridge children carry two or more cultural identities simultaneously. This exercise gives those identities voice to speak to each other.",
    prompts:["Self A is… (home, old language, family)","Self B is… (work, public life, new country)","Write a conversation — let them argue, let them find common ground.","What did you learn from letting them speak?"],
    starter:"What I learned from letting them speak was…",
  },
  { num:"7", part:"Part Four — Toward Wholeness",
    title:"The Bridge You Built", time:"30–45 min",
    desc:"The bridge child's position is not only a burden. It is a distinctive capability. This exercise is about naming and claiming it.",
    prompts:["Because of my experience, I understand things others often don't:","Ways my bridge child perspective made me better at my work:","Ways it made me a better parent, partner, or friend:","Something I can do that most people who grew up in one culture cannot:"],
    starter:"The bridge I have built has allowed others to cross because…",
  },
  { num:"8", part:"Part Four — Toward Wholeness",
    title:"A Letter to Your Future Self", time:"30–40 min",
    desc:"You have spent time excavating what has been. This exercise is about who you are becoming. Write a letter to yourself ten years from now.",
    prompts:["What you hope will be different in ten years.","What you hope will still be the same.","A message about your anchor and what their memory will mean.","What you want to tell the bridge child just beginning her crossing."],
    starter:"Dear [name], by the time you read this…",
  },
];

// ─── BRIDGE SVG ──────────────────────────────────────────────
function BridgeSVG() {
  const archY = t => 142 - 108*Math.sin(Math.PI*t);
  const archPts = Array.from({length:61},(_,i)=>{const t=i/60;return `${8+t*404},${archY(t)}`;}).join(" ");
  const upY = t => 142 + 75*Math.sin(Math.PI*t+Math.PI);
  const upPts = Array.from({length:61},(_,i)=>{const t=i/60;return `${78+t*264},${upY(t)}`;}).join(" ");
  return (
    <svg width="100%" height="210" viewBox="0 0 420 210" preserveAspectRatio="xMidYMid meet" style={{display:"block",flexShrink:0}}>
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020810"/><stop offset="32%" stopColor="#0e0826"/>
          <stop offset="62%" stopColor="#320a42"/><stop offset="83%" stopColor="#771a0c"/>
          <stop offset="100%" stopColor="#b05e16"/>
        </linearGradient>
        <linearGradient id="wtr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101e52"/><stop offset="100%" stopColor="#030810"/>
        </linearGradient>
        <radialGradient id="hg" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#e8c55a" stopOpacity="0.5"/>
          <stop offset="50%" stopColor="#c45018" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#c45018" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="420" height="210" fill="url(#bg)"/>
      <ellipse cx="210" cy="145" rx="230" ry="105" fill="url(#hg)"/>
      {[[22,13,1.8],[60,7,1.2],[98,20,1.5],[140,5,2],[175,15,1],[216,4,1.8],[260,11,1.2],[300,6,2],[345,17,1.5],[380,9,1],[50,30,1],[145,26,1.2],[292,23,1],[362,28,1.4]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={0.38+Math.abs(Math.sin(i))*0.28}/>
      ))}
      <rect y="143" width="420" height="67" fill="url(#wtr)"/>
      {[0,1,2,3].map(i=><ellipse key={i} cx={210} cy={153+i*10} rx={58-i*10} ry={2.2-i*0.3} fill="#c4a24a" opacity={0.2-i*0.04}/>)}
      <rect x="8" y="140" width="404" height="8" fill="#c4a24a" opacity="0.92"/>
      <rect x="8" y="139" width="404" height="2.5" fill="#f0d860"/>
      <polyline points={archPts} fill="none" stroke="#9a7b2f" strokeWidth="13" opacity="0.22"/>
      <polyline points={archPts} fill="none" stroke="#c4a24a" strokeWidth="8" opacity="0.45"/>
      <polyline points={archPts} fill="none" stroke="#e8c55a" strokeWidth="4.5"/>
      <polyline points={archPts} fill="none" stroke="#f8e898" strokeWidth="2"/>
      <polyline points={upPts} fill="none" stroke="#c4a24a" strokeWidth="5" opacity="0.4"/>
      <polyline points={upPts} fill="none" stroke="#e8c55a" strokeWidth="2.5" opacity="0.75"/>
      {[0.15,0.28,0.42,0.58,0.72,0.85].map((t,i)=>{
        const x=8+t*404; return <line key={i} x1={x} y1={archY(t)} x2={x} y2="140" stroke="#c4a24a" strokeWidth="1.2" opacity="0.5"/>;
      })}
      {[96,324].map(tx=>(
        <g key={tx}>
          <rect x={tx-5} y={archY(tx===96?0.21:0.79)} width="10" height={140-archY(tx===96?0.21:0.79)} fill="#c4a24a"/>
          <rect x={tx-3} y={archY(tx===96?0.21:0.79)} width="6" height={140-archY(tx===96?0.21:0.79)} fill="#e8c55a" opacity="0.45"/>
          <rect x={tx-8} y={archY(tx===96?0.21:0.79)-6} width="16" height="7" fill="#f0d860" rx="1"/>
          {[0.32,0.57,0.80].map((r,i)=>{
            const by=archY(tx===96?0.21:0.79)+r*(140-archY(tx===96?0.21:0.79));
            return <rect key={i} x={tx-14} y={by-3} width="28" height="6" fill="#c4a24a" opacity="0.75"/>;
          })}
          <circle cx={tx} cy={archY(tx===96?0.21:0.79)-11} r="7" fill="#e8c55a" opacity="0.82"/>
          <circle cx={tx} cy={archY(tx===96?0.21:0.79)-11} r="3.5" fill="#fff8d0"/>
        </g>
      ))}
      <ellipse cx="225" cy="148" rx="10" ry="2.5" fill="#c4a24a" opacity="0.18"/>
      <circle cx="225" cy="134" r="5" fill={T.navy}/>
      <rect x="221" y="139" width="8" height="10" rx="1" fill={T.navy}/>
      <line x1="219" y1="141" x2="213" y2="148" stroke={T.navy} strokeWidth="3" strokeLinecap="round"/>
      <line x1="231" y1="141" x2="236" y2="148" stroke={T.navy} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

// ─── SHARED ──────────────────────────────────────────────────
const Label = ({children,light}) => (
  <div style={{fontSize:10,color:light?T.gold:T.goldl,letterSpacing:3.5,
    textTransform:"uppercase",fontFamily:"'EB Garamond',Georgia,serif",
    fontWeight:500,marginBottom:8}}>{children}</div>
);

function Header({label,title,subtitle,onBack,light}) {
  return (
    <div style={{background:light?T.mist:T.navyMid,
      padding:"13px 18px 17px",flexShrink:0,
      borderBottom:`1px solid ${light?T.creamDk:T.goldl+"18"}`}}>
      {onBack && (
        <button className="press" onClick={onBack}
          style={{background:"none",border:"none",
            color:light?T.gold:T.goldl,fontSize:14,
            fontFamily:"'EB Garamond',Georgia,serif",
            cursor:"pointer",padding:"0 0 9px",
            display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:17}}>←</span> Back
        </button>
      )}
      {label && <Label light={light}>{label}</Label>}
      <div style={{fontSize:21,fontWeight:700,
        color:light?T.ink:T.white,
        fontFamily:"'Playfair Display',Georgia,serif",
        lineHeight:1.2}}>{title}</div>
      {subtitle && <div style={{fontSize:13,color:T.silv,fontStyle:"italic",
        fontFamily:"'EB Garamond',Georgia,serif",marginTop:4}}>{subtitle}</div>}
    </div>
  );
}

const Orn = ({m="12px 0"}) => (
  <div style={{textAlign:"center",margin:m}}>
    <span style={{fontSize:16,color:T.gold,letterSpacing:8}}>&#10022;</span>
  </div>
);

// ─── HOME ────────────────────────────────────────────────────
function Home({go}) {
  return (
    <div style={{height:"100%",overflowY:"auto",background:T.navy}}>
      <BridgeSVG/>
      <div className="fu" style={{padding:"4px 20px 20px",textAlign:"center"}}>
        <div style={{fontSize:10,color:T.goldl,letterSpacing:5,textTransform:"uppercase",
          fontFamily:"'EB Garamond',Georgia,serif",marginBottom:7,fontWeight:500}}>
          A Memoir
        </div>
        <div style={{fontSize:36,fontWeight:700,color:T.white,
          fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.05,letterSpacing:-0.3}}>
          The Bridge Child
        </div>
        <div style={{width:44,height:1.5,background:T.goldl,margin:"12px auto 11px"}}/>
        <div style={{fontSize:14.5,color:T.goldl,
          fontFamily:"'EB Garamond',Georgia,serif",letterSpacing:0.3}}>
          Julia Gekhter-Tack, LCSW
        </div>
        <div style={{fontSize:12,color:T.silv,marginTop:3,
          fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic"}}>
          Licensed Clinical Social Worker &amp; Psychotherapist
        </div>
      </div>

      <div className="fu d1" style={{margin:"0 17px 20px",padding:"13px 17px",
        borderLeft:`3px solid ${T.gold}`,
        background:"linear-gradient(90deg,#9a7b2f14,transparent)",
        borderRadius:"0 9px 9px 0"}}>
        <div style={{fontSize:14.5,color:"#d8ccb4",fontStyle:"italic",
          fontFamily:"'EB Garamond',Georgia,serif",lineHeight:1.82,letterSpacing:0.15}}>
          "The bridge child's great task — and great gift — is learning to hold two worlds
          simultaneously without being torn apart by the tension between them."
        </div>
      </div>

      <div className="fu d2" style={{padding:"0 17px 18px"}}>
        <Label>Explore</Label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[
            {icon:"📖",label:"Read Excerpts",id:"excerpts",sub:"5 passages"},
            {icon:"✍️",label:"Workbook",id:"workbook",sub:"8 exercises"},
            {icon:"👤",label:"About the Author",id:"about",sub:"Julia's story"},
            {icon:"🛒",label:"Get the Book",id:"buy",sub:"Paperback · Kindle"},
          ].map(({icon,label,id,sub})=>(
            <button key={id} className="press" onClick={()=>go(id)}
              style={{background:T.navyUp,border:`1px solid ${T.goldl}22`,
                borderRadius:13,padding:"17px 12px",cursor:"pointer",
                textAlign:"left",boxShadow:T.shadowSm}}>
              <div style={{fontSize:25,marginBottom:9}}>{icon}</div>
              <div style={{fontSize:14,color:T.goldb,fontWeight:600,
                fontFamily:"'Playfair Display',Georgia,serif",
                marginBottom:3,lineHeight:1.2}}>{label}</div>
              <div style={{fontSize:11,color:T.silv,
                fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic"}}>
                {sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fu d3" style={{margin:"0 17px 30px",padding:"17px",
        background:T.navyUp,borderRadius:13,
        border:`1px solid ${T.goldl}18`,boxShadow:T.shadowSm}}>
        <Label>What is a Bridge Child?</Label>
        <div style={{fontSize:14.5,color:"#b4aca0",lineHeight:1.88,
          fontFamily:"'EB Garamond',Georgia,serif",letterSpacing:0.18}}>
          A bridge child is someone who immigrated during adolescence — old enough to
          carry a fully formed memory of the culture left behind, and young enough to be
          deeply reshaped by the culture entered. We exist in the hyphen. We live in the
          between.
        </div>
        <Orn m="13px 0 0"/>
      </div>
    </div>
  );
}

// ─── EXCERPTS ────────────────────────────────────────────────
function Excerpts() {
  const [sel, setSel] = useState(null);

  if (sel !== null) {
    const e = EXCERPTS[sel];
    return (
      <div style={{display:"flex",flexDirection:"column",height:"100%",background:T.mist}}>
        <Header label={e.chapter} title={e.title} light onBack={()=>setSel(null)}/>
        <div style={{background:T.creamDk,padding:"13px 22px",
          borderBottom:`1px solid ${T.creamDk}`,flexShrink:0}}>
          <div style={{fontSize:13,color:T.silv,fontStyle:"italic",
            fontFamily:"'EB Garamond',Georgia,serif",lineHeight:1.72,letterSpacing:0.25}}>
            {e.epigraph.split("\n").map((l,i)=>(
              <span key={i}>{l}{i<e.epigraph.split("\n").length-1&&<br/>}</span>
            ))}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"22px 22px 36px"}}>
          {e.text.split("\n\n").map((p,i)=>(
            <p key={i} style={{fontFamily:"'EB Garamond',Georgia,serif",
              fontSize:17,color:T.ink,lineHeight:1.92,marginBottom:20,
              textIndent:i===0?0:22,letterSpacing:0.12}}>{p}</p>
          ))}
          <div style={{textAlign:"center",paddingTop:18,
            borderTop:`1px solid ${T.goldl}38`}}>
            <span style={{fontSize:18,color:T.gold,letterSpacing:8}}>&#10022;</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header label="The Bridge Child" title="Read Excerpts"
        subtitle="Selected passages from the memoir"/>
      <div style={{flex:1,overflowY:"auto",background:"#ede9e2",padding:"14px"}}>
        {EXCERPTS.map((e,i)=>(
          <button key={i} className="press" onClick={()=>setSel(i)}
            style={{width:"100%",background:T.white,border:"none",
              borderRadius:12,marginBottom:10,cursor:"pointer",textAlign:"left",
              boxShadow:T.shadowSm,overflow:"hidden",
              borderLeft:`4px solid ${T.goldl}`}}>
            <div className="fu" style={{padding:"16px 16px",
              animationDelay:`${i*0.06}s`}}>
              <div style={{fontSize:10,color:T.gold,letterSpacing:3,
                textTransform:"uppercase",
                fontFamily:"'EB Garamond',Georgia,serif",marginBottom:4}}>
                {e.chapter}
              </div>
              <div style={{fontSize:18,fontWeight:700,color:T.ink,
                fontFamily:"'Playfair Display',Georgia,serif",
                marginBottom:7,lineHeight:1.2}}>{e.title}</div>
              <div style={{fontSize:14,color:"#666",lineHeight:1.65,
                fontFamily:"'EB Garamond',Georgia,serif",
                overflow:"hidden",display:"-webkit-box",
                WebkitLineClamp:2,WebkitBoxOrient:"vertical",
                letterSpacing:0.1}}>
                {e.text.split("\n\n")[0]}
              </div>
              <div style={{marginTop:9,fontSize:12,color:T.goldl,
                fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic"}}>
                Read excerpt →
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── WORKBOOK ────────────────────────────────────────────────
function Workbook() {
  const [sel, setSel] = useState(null);
  const [data, setData] = useState(()=>{
    try{return JSON.parse(localStorage.getItem("bc_wb")||"{}");}catch{return {};}
  });
  const save=(k,v)=>{
    const next={...data,[k]:v}; setData(next);
    try{localStorage.setItem("bc_wb",JSON.stringify(next));}catch{}
  };

  if (sel !== null) {
    const e = EXERCISES[sel];
    const k = `e${e.num}`;
    const allDone = e.prompts.every((_,i)=>data[`${k}_${i}`]?.trim());
    return (
      <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
        <Header light label={`Exercise ${e.num} · ${e.time}`}
          title={e.title} subtitle={e.part} onBack={()=>setSel(null)}/>
        <div style={{flex:1,overflowY:"auto",background:T.mist,
          padding:"15px 15px 36px"}}>
          <div className="fu" style={{background:T.white,borderRadius:11,
            padding:"13px 15px",marginBottom:15,
            borderLeft:`3px solid ${T.gold}`,boxShadow:T.shadowSm}}>
            <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15,
              color:T.ink,lineHeight:1.82,letterSpacing:0.12}}>{e.desc}</p>
          </div>
          <div className="fu d1">
            <Label light>Opening Line</Label>
            <div style={{background:"#fdfaf0",border:`1px solid ${T.goldl}3a`,
              borderRadius:8,padding:"9px 12px",marginBottom:15,
              fontSize:14,color:T.silv,fontStyle:"italic",
              fontFamily:"'EB Garamond',Georgia,serif",lineHeight:1.68}}>
              "{e.starter}"
            </div>
          </div>
          <div className="fu d2">
            <Label light>Writing Prompts</Label>
            {e.prompts.map((p,i)=>(
              <div key={i} style={{marginBottom:13}}>
                <div style={{fontSize:13.5,fontWeight:600,color:T.ink,
                  fontFamily:"'Playfair Display',Georgia,serif",
                  marginBottom:5,lineHeight:1.35}}>{p}</div>
                <textarea value={data[`${k}_${i}`]||""}
                  onChange={ev=>save(`${k}_${i}`,ev.target.value)}
                  placeholder="Write here…" rows={3}
                  style={{width:"100%",fontSize:15,color:T.ink,lineHeight:1.75,
                    padding:"9px 11px",
                    border:`1.5px solid ${data[`${k}_${i}`]?.length>0?T.goldl+"70":T.creamDk}`,
                    borderRadius:8,background:T.white,resize:"vertical",
                    outline:"none",boxSizing:"border-box",transition:"border-color .18s"}}/>
              </div>
            ))}
          </div>
          <div className="fu d3" style={{background:T.creamDk,borderRadius:11,
            padding:"13px",marginTop:4,border:`1px solid ${T.goldl}2a`}}>
            <div style={{fontSize:12,fontWeight:600,color:"#3d5a73",
              fontFamily:"'Playfair Display',Georgia,serif",marginBottom:6}}>
              Reflection
            </div>
            <div style={{fontSize:13.5,color:T.silv,fontStyle:"italic",
              fontFamily:"'EB Garamond',Georgia,serif",marginBottom:7,lineHeight:1.6}}>
              What surprised you in completing this exercise?
            </div>
            <textarea value={data[`${k}_r`]||""}
              onChange={ev=>save(`${k}_r`,ev.target.value)}
              placeholder="Write your reflection…" rows={3}
              style={{width:"100%",fontSize:15,color:T.ink,lineHeight:1.75,
                padding:"9px 11px",border:`1.5px solid ${T.goldl}32`,
                borderRadius:8,background:T.white,resize:"vertical",
                outline:"none",boxSizing:"border-box"}}/>
          </div>
          {allDone&&(
            <div className="fu" style={{marginTop:16,padding:"13px 15px",
              background:`linear-gradient(135deg,${T.navy},${T.navyUp})`,
              borderRadius:11,border:`1px solid ${T.goldl}38`,textAlign:"center"}}>
              <div style={{fontSize:17,color:T.gold,marginBottom:5}}>&#10022;</div>
              <div style={{fontSize:14,color:T.goldPale,
                fontFamily:"'EB Garamond',Georgia,serif",
                fontStyle:"italic",lineHeight:1.72}}>
                Exercise complete. The bridge holds. You are the evidence.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const parts=[...new Set(EXERCISES.map(e=>e.part))];
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header label="The Bridge Child" title="Workbook"
        subtitle="Exercises in Healing, Identity &amp; Integration"/>
      <div style={{flex:1,overflowY:"auto",background:"#ede9e2"}}>
        <div style={{margin:"12px 13px 4px",padding:"11px 13px",
          background:T.white,borderRadius:10,
          borderLeft:`3px solid ${T.gold}`,boxShadow:T.shadowSm}}>
          <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:14,
            color:T.ink,lineHeight:1.82,letterSpacing:0.12}}>
            These exercises are for you. Not for anyone who might judge whether you did
            it correctly. Your answers save automatically on this device.
          </p>
        </div>
        <div style={{padding:"4px 13px 28px"}}>
          {parts.map(part=>{
            const exs=EXERCISES.filter(e=>e.part===part);
            return (
              <div key={part}>
                <div style={{fontSize:10,color:T.gold,letterSpacing:3,
                  textTransform:"uppercase",
                  fontFamily:"'EB Garamond',Georgia,serif",
                  fontWeight:500,padding:"15px 0 7px"}}>{part}</div>
                {exs.map((e,ei)=>{
                  const idx=EXERCISES.indexOf(e);
                  const done=e.prompts.every((_,i)=>data[`e${e.num}_${i}`]?.trim());
                  return (
                    <button key={e.num} className="press" onClick={()=>setSel(idx)}
                      style={{width:"100%",background:T.white,border:"none",
                        borderRadius:12,marginBottom:9,cursor:"pointer",
                        textAlign:"left",boxShadow:T.shadowSm,overflow:"hidden"}}>
                      <div className="fu" style={{padding:"14px 14px",
                        animationDelay:`${ei*0.06}s`}}>
                        <div style={{display:"flex",justifyContent:"space-between",
                          alignItems:"flex-start",gap:8}}>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",gap:7,alignItems:"center",
                              marginBottom:5}}>
                              <span style={{background:done?T.gold:T.navy,
                                borderRadius:5,padding:"2px 6px",fontSize:10,
                                color:done?T.white:T.goldl,
                                fontFamily:"'EB Garamond',Georgia,serif"}}>
                                {e.num}
                              </span>
                              <span style={{fontSize:11,color:T.silv,fontStyle:"italic",
                                fontFamily:"'EB Garamond',Georgia,serif"}}>{e.time}</span>
                              {done&&<span style={{fontSize:11,color:T.gold,
                                fontFamily:"'EB Garamond',Georgia,serif"}}>&#10003; Done</span>}
                            </div>
                            <div style={{fontSize:16,fontWeight:700,color:T.ink,
                              fontFamily:"'Playfair Display',Georgia,serif",
                              marginBottom:4,lineHeight:1.22}}>{e.title}</div>
                            <div style={{fontSize:13,color:"#777",lineHeight:1.6,
                              fontFamily:"'EB Garamond',Georgia,serif",
                              overflow:"hidden",display:"-webkit-box",
                              WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                              {e.desc}
                            </div>
                          </div>
                          <div style={{color:T.goldl,fontSize:17,paddingTop:2,
                            flexShrink:0}}>→</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────
function About() {
  const secs=[
    {h:"Her Story",t:`Julia Gekhter-Tack immigrated from Ukraine to the United States at the age of fifteen. She arrived not speaking the language, sat alone in a school cafeteria that felt like a different planet, and learned to perform belonging before she understood what belonging actually felt like.\n\nShe is a bridge child.`},
    {h:"Her Work",t:`Over two decades, Julia built a life in America: a Master of Social Work, a clinical career, a child, a home. She is a licensed clinical social worker and psychotherapist in Illinois, where she has spent her career working with immigrant families navigating trauma, identity, and resilience.`},
    {h:"Why This Book",italic:true,t:`"I wrote this book because no one came to find the fifteen-year-old I was. And because that girl — performing competence while drowning in grief for a life I was not permitted to mourn — deserves to have her story told. Not as tragedy. Not as triumph. As truth."`},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{background:`linear-gradient(160deg,${T.navy},${T.navyUp} 55%,#1a0d32)`,
        padding:"20px 18px 24px",textAlign:"center",flexShrink:0,
        borderBottom:`1px solid ${T.goldl}1a`}}>
        <div style={{width:82,height:82,borderRadius:"50%",margin:"0 auto 13px",
          background:`radial-gradient(circle at 40% 35%,${T.goldl},${T.navy})`,
          display:"flex",alignItems:"center",justifyContent:"center",
          border:`2.5px solid ${T.goldl}`,
          boxShadow:`0 0 22px ${T.gold}40`,fontSize:34}}>{"🌉"}</div>
        <div style={{fontSize:20,fontWeight:700,color:T.white,
          fontFamily:"'Playfair Display',Georgia,serif"}}>Julia Gekhter-Tack</div>
        <div style={{fontSize:13,color:T.goldl,
          fontFamily:"'EB Garamond',Georgia,serif",marginTop:3}}>LCSW</div>
        <div style={{fontSize:11,color:T.silv,fontStyle:"italic",
          fontFamily:"'EB Garamond',Georgia,serif",marginTop:3}}>
          Licensed Clinical Social Worker &amp; Psychotherapist
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",background:"#ede9e2",
        padding:"17px 15px 28px"}}>
        {secs.map(({h,t,italic},si)=>(
          <div key={h} className="fu" style={{marginBottom:17,
            animationDelay:`${si*0.07}s`}}>
            <Label light>{h}</Label>
            <div style={{background:T.white,borderRadius:10,padding:"13px 14px",
              boxShadow:T.shadowSm}}>
              {t.split("\n\n").map((p,i)=>(
                <p key={i} style={{fontFamily:"'EB Garamond',Georgia,serif",
                  fontSize:15,color:T.ink,lineHeight:1.85,
                  margin:i>0?"11px 0 0":0,
                  fontStyle:italic?"italic":"normal",letterSpacing:0.12}}>{p}</p>
              ))}
            </div>
          </div>
        ))}
        <div className="fu d3" style={{padding:"15px 17px",
          borderLeft:`3px solid ${T.gold}`,
          background:T.white,borderRadius:"0 11px 11px 0",
          boxShadow:T.shadowSm,marginTop:4}}>
          <div style={{fontSize:16,color:T.ink,fontStyle:"italic",
            fontFamily:"'EB Garamond',Georgia,serif",lineHeight:1.88,letterSpacing:0.18}}>
            "You are not alone. You never were."
          </div>
          <div style={{fontSize:13,color:T.gold,
            fontFamily:"'EB Garamond',Georgia,serif",marginTop:8}}>
            — Julia Gekhter-Tack, LCSW
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BUY ─────────────────────────────────────────────────────
function Buy() {
  const books=[
    {label:"Amazon Paperback",price:"$14.99",icon:"📦",gold:true},
    {label:"Kindle eBook",price:"$4.99",icon:"📱",gold:false},
    {label:"The Bridge Child Workbook",price:"$18.99",icon:"✍️",gold:false,
      sub:"Companion workbook — sold separately"},
  ];
  return (
    <div style={{height:"100%",overflowY:"auto",
      background:`linear-gradient(180deg,${T.navy},${T.navyMid})`}}>
      <div className="fu" style={{padding:"24px 20px 16px",textAlign:"center"}}>
        <div style={{width:142,height:214,margin:"0 auto 18px",
          background:"linear-gradient(160deg,#0d1b2a 0%,#3d1255 38%,#7a2208 70%,#c4a24a 100%)",
          borderRadius:9,border:`2px solid ${T.goldl}`,
          boxShadow:`0 12px 38px rgba(0,0,0,0.58),inset 0 1px 0 ${T.goldl}38`,
          display:"flex",flexDirection:"column",alignItems:"center",
          justifyContent:"center",padding:"13px 11px",gap:5,
          position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",left:0,top:0,width:7,height:"100%",
            background:`linear-gradient(180deg,${T.goldl}55,${T.gold}28,${T.goldl}55)`}}/>
          <div style={{fontSize:7.5,color:T.goldl,letterSpacing:3,textTransform:"uppercase",
            fontFamily:"'EB Garamond',Georgia,serif"}}>THE</div>
          <div style={{fontSize:25,fontWeight:700,color:T.white,textAlign:"center",
            fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.05}}>
            BRIDGE<br/>CHILD
          </div>
          <div style={{width:42,height:1,background:T.goldl,margin:"3px 0"}}/>
          <div style={{fontSize:9,color:"#ccc",fontStyle:"italic",
            fontFamily:"'EB Garamond',Georgia,serif"}}>A Memoir</div>
          <div style={{marginTop:"auto",fontSize:7.5,color:T.goldl,textAlign:"center",
            fontFamily:"'EB Garamond',Georgia,serif",lineHeight:1.55}}>
            Julia Gekhter-Tack LCSW
          </div>
        </div>
        <div style={{fontSize:21,fontWeight:700,color:T.white,
          fontFamily:"'Playfair Display',Georgia,serif",marginBottom:4}}>
          The Bridge Child
        </div>
        <div style={{fontSize:13,color:T.goldl,fontStyle:"italic",
          fontFamily:"'EB Garamond',Georgia,serif"}}>
          Julia Gekhter-Tack, LCSW
        </div>
      </div>

      <div className="fu d2" style={{padding:"0 15px 30px"}}>
        <Label>Purchase</Label>
        {books.map(({label,price,icon,gold,sub})=>(
          <button key={label} className="press"
            style={{width:"100%",display:"flex",alignItems:"center",gap:13,
              background:gold?`linear-gradient(135deg,${T.gold},${T.goldl})`:T.navyUp,
              border:`1px solid ${gold?T.goldb:T.goldl+"26"}`,
              borderRadius:12,padding:"13px 15px",marginBottom:9,
              cursor:"pointer",
              boxShadow:gold?`0 4px 20px ${T.gold}44`:T.shadowSm}}>
            <div style={{fontSize:23}}>{icon}</div>
            <div style={{flex:1,textAlign:"left"}}>
              <div style={{fontSize:15,fontWeight:600,
                color:gold?T.navy:T.white,
                fontFamily:"'Playfair Display',Georgia,serif"}}>{label}</div>
              {sub&&<div style={{fontSize:11,color:gold?"#44322a":T.silv,
                fontStyle:"italic",
                fontFamily:"'EB Garamond',Georgia,serif",marginTop:2}}>{sub}</div>}
            </div>
            <div style={{fontSize:16,fontWeight:700,
              color:gold?T.navy:T.goldb,
              fontFamily:"'Playfair Display',Georgia,serif"}}>{price}</div>
          </button>
        ))}

        <div className="fu d3" style={{marginTop:16,padding:"15px",
          background:T.navyUp,borderRadius:11,border:`1px solid ${T.goldl}18`}}>
          <Label>About the Books</Label>
          <p style={{fontSize:14,color:"#a09890",lineHeight:1.82,
            fontFamily:"'EB Garamond',Georgia,serif",margin:"0 0 9px",letterSpacing:0.1}}>
            <strong style={{color:T.goldl}}>The Bridge Child: A Memoir</strong> — Julia's
            extraordinary story of immigration, identity, love, loss, and resilience.
          </p>
          <p style={{fontSize:14,color:"#a09890",lineHeight:1.82,
            fontFamily:"'EB Garamond',Georgia,serif",margin:0,letterSpacing:0.1}}>
            <strong style={{color:T.goldl}}>The Bridge Child Workbook</strong> — 15 guided
            exercises in healing, identity, and integration. Can be used independently.
          </p>
        </div>
        <Orn m="22px 0 4px"/>
        <div style={{textAlign:"center",fontSize:14,color:T.silv,fontStyle:"italic",
          fontFamily:"'EB Garamond',Georgia,serif",lineHeight:1.82}}>
          "You are not alone. You never were."
        </div>
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────
const NAV=[
  {id:"home",label:"Home",d:"M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5zM9 21V12h6v9"},
  {id:"excerpts",label:"Read",d:"M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"},
  {id:"workbook",label:"Workbook",d:"M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"},
  {id:"about",label:"Author",d:"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"},
  {id:"buy",label:"Buy",d:"M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"},
];

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const [tab,setTab]=useState("home");
  const [time,setTime]=useState(
    new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})
  );
  useEffect(()=>{
    const id=setInterval(()=>setTime(
      new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})
    ),15000);
    return()=>clearInterval(id);
  },[]);

  const screens={
    home:<Home go={setTab}/>,
    excerpts:<Excerpts/>,
    workbook:<Workbook/>,
    about:<About/>,
    buy:<Buy/>,
  };

  return (
    <>
      <Styles/>
      <div style={{width:"100%",maxWidth:430,height:"100dvh",margin:"0 auto",
        display:"flex",flexDirection:"column",background:T.navy,
        overflow:"hidden",
        borderLeft:`1px solid ${T.goldl}12`,
        borderRight:`1px solid ${T.goldl}12`}}>
        <div style={{background:T.navy,
          paddingTop:"env(safe-area-inset-top,10px)",
          padding:"10px 18px 4px",
          display:"flex",justifyContent:"space-between",
          alignItems:"center",flexShrink:0}}>
          <span style={{fontSize:12,color:T.white,
            fontFamily:"system-ui,sans-serif",fontWeight:600}}>{time}</span>
          <span style={{fontSize:10,color:T.silv,
            fontFamily:"system-ui,sans-serif",letterSpacing:1.5}}>{"●●●●"}</span>
        </div>

        <div style={{flex:1,overflow:"hidden",
          display:"flex",flexDirection:"column"}}>
          {screens[tab]}
        </div>

        <div style={{background:T.navy,
          borderTop:`1px solid ${T.goldl}1e`,
          display:"flex",
          paddingBottom:"env(safe-area-inset-bottom,5px)",
          flexShrink:0}}>
          {NAV.map(({id,label,d})=>{
            const on=tab===id;
            return (
              <button key={id} className="press" onClick={()=>setTab(id)}
                style={{flex:1,background:"none",border:"none",
                  padding:"9px 2px 7px",cursor:"pointer",
                  display:"flex",flexDirection:"column",
                  alignItems:"center",gap:3,position:"relative"}}>
                {on&&<div style={{position:"absolute",top:5,left:"50%",
                  transform:"translateX(-50%)",width:3,height:3,
                  borderRadius:"50%",background:T.goldb}}/>}
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path d={d} stroke={on?T.goldb:T.silv}
                    strokeWidth={on?2.2:1.8} strokeLinecap="round"
                    strokeLinejoin="round" fill={on?T.goldb+"18":"none"}/>
                </svg>
                <span style={{fontSize:9.5,
                  fontFamily:"'EB Garamond',Georgia,serif",
                  color:on?T.goldb:T.silv,
                  fontWeight:on?"600":"400",letterSpacing:0.3}}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
