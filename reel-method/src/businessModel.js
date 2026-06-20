// ─────────────────────────────────────────────────────────────
//  Shape The Wave Longevity™ — Complete Business Model
//  5 Memberships · 16 Bundles · 21 Packages · 49 Services
// ─────────────────────────────────────────────────────────────

// ─── 49 SERVICES ─────────────────────────────────────────────
export const SERVICES = [
  // ── Mind Care (S01–S08) ──
  { id:"S01", name:"REEL Align Daily Check-In", pillar:"mind", price:0, unit:"session",
    desc:"Guided daily Reflect-Envision-Execute-Learn-Align journaling session." },
  { id:"S02", name:"Focus & Flow Coaching Session", pillar:"mind", price:75, unit:"60 min",
    desc:"One-on-one session to build deep-work habits and eliminate distraction patterns." },
  { id:"S03", name:"Emotional Regulation Workshop", pillar:"mind", price:45, unit:"90 min",
    desc:"Group workshop on identifying emotional triggers and building response flexibility." },
  { id:"S04", name:"Stress Recovery Protocol", pillar:"mind", price:60, unit:"session",
    desc:"Clinician-guided stress assessment and personalized recovery plan." },
  { id:"S05", name:"Screen Balance Audit", pillar:"mind", price:35, unit:"session",
    desc:"Review screen-time patterns, set boundaries, and build a sustainable digital diet." },
  { id:"S06", name:"Creative Expression Lab", pillar:"mind", price:40, unit:"90 min",
    desc:"Facilitated creative session — writing, art, or movement — for mental clarity." },
  { id:"S07", name:"Memory & Learning Optimization", pillar:"mind", price:55, unit:"session",
    desc:"Evidence-based techniques for retention, recall, and accelerated learning." },
  { id:"S08", name:"Mindfulness Foundations Course", pillar:"mind", price:120, unit:"4-week",
    desc:"Four-week progressive mindfulness program with daily guided practices." },

  // ── Body Care (S09–S16) ──
  { id:"S09", name:"Movement Assessment", pillar:"body", price:65, unit:"session",
    desc:"Functional movement screening and personalized exercise programming." },
  { id:"S10", name:"Sleep Optimization Consultation", pillar:"body", price:55, unit:"session",
    desc:"Sleep hygiene assessment, circadian rhythm analysis, and improvement protocol." },
  { id:"S11", name:"Nutrition & Hydration Review", pillar:"body", price:50, unit:"session",
    desc:"Dietary pattern analysis with practical, sustainable nutrition guidance." },
  { id:"S12", name:"Breathwork & Posture Clinic", pillar:"body", price:40, unit:"60 min",
    desc:"Hands-on breathwork techniques and postural correction strategies." },
  { id:"S13", name:"Sensory Awareness Session", pillar:"body", price:45, unit:"60 min",
    desc:"Guided somatic experiencing to reconnect with physical sensation and body signals." },
  { id:"S14", name:"Physical Safety Assessment", pillar:"body", price:35, unit:"session",
    desc:"Home and workplace ergonomic and safety evaluation." },
  { id:"S15", name:"Longevity Biomarker Review", pillar:"body", price:95, unit:"session",
    desc:"Review of key health markers with longevity-focused interpretation and action plan." },
  { id:"S16", name:"Body Care 30-Day Challenge", pillar:"body", price:80, unit:"30-day",
    desc:"Structured 30-day program integrating movement, sleep, nutrition, and recovery." },

  // ── Digital Care (S17–S24) ──
  { id:"S17", name:"Privacy & Security Audit", pillar:"digital", price:60, unit:"session",
    desc:"Full review of device settings, passwords, app permissions, and online exposure." },
  { id:"S18", name:"Digital Detox Planning", pillar:"digital", price:40, unit:"session",
    desc:"Structured plan for reducing screen dependency and building offline rhythms." },
  { id:"S19", name:"Safe App & Tool Assessment", pillar:"digital", price:35, unit:"session",
    desc:"Evaluation of apps and tools for encryption, data practices, and accessibility." },
  { id:"S20", name:"Family Device Setup", pillar:"digital", price:55, unit:"session",
    desc:"Configure Family Sharing, Screen Time, parental controls, and safe browsing." },
  { id:"S21", name:"Password & Identity Protection", pillar:"digital", price:30, unit:"session",
    desc:"Set up password managers, 2FA, and identity monitoring." },
  { id:"S22", name:"Accessibility Configuration", pillar:"digital", price:45, unit:"session",
    desc:"Configure devices for vision, hearing, motor, and cognitive accessibility needs." },
  { id:"S23", name:"Notification & Boundary Design", pillar:"digital", price:30, unit:"session",
    desc:"Redesign notification settings and digital boundaries for focus and well-being." },
  { id:"S24", name:"Digital Wellness Course", pillar:"digital", price:90, unit:"4-week",
    desc:"Four-week course on building a healthy, secure, and intentional digital life." },

  // ── Family Care (S25–S32) ──
  { id:"S25", name:"Family Communication Session", pillar:"family", price:85, unit:"60 min",
    desc:"Facilitated session to improve family communication patterns and conflict resolution." },
  { id:"S26", name:"Child Safety & Development Review", pillar:"family", price:65, unit:"session",
    desc:"Age-appropriate safety review covering digital, physical, and emotional well-being." },
  { id:"S27", name:"Couples Alignment Session", pillar:"family", price:90, unit:"60 min",
    desc:"Values alignment, shared goal-setting, and relationship maintenance for partners." },
  { id:"S28", name:"Parenting Strategy Consultation", pillar:"family", price:75, unit:"session",
    desc:"Evidence-based parenting strategies tailored to your family's needs and challenges." },
  { id:"S29", name:"Support System Mapping", pillar:"family", price:45, unit:"session",
    desc:"Identify, strengthen, and build your network of support — family, friends, community." },
  { id:"S30", name:"Shared Responsibility Workshop", pillar:"family", price:50, unit:"90 min",
    desc:"Workshop on equitable distribution of household, emotional, and caregiving labor." },
  { id:"S31", name:"Family Tech Agreement", pillar:"family", price:40, unit:"session",
    desc:"Create a family technology agreement covering screen time, safety, and shared rules." },
  { id:"S32", name:"Multigenerational Wellness Plan", pillar:"family", price:110, unit:"session",
    desc:"Comprehensive wellness plan addressing needs across generations in the family." },

  // ── Environment Care (S33–S40) ──
  { id:"S33", name:"Home Environment Audit", pillar:"environ", price:55, unit:"session",
    desc:"Room-by-room assessment of safety, comfort, organization, and wellness impact." },
  { id:"S34", name:"Travel Wellness Kit", pillar:"environ", price:35, unit:"kit",
    desc:"Pre-travel wellness checklist, packing guide, and routines for healthy travel." },
  { id:"S35", name:"Workspace Optimization", pillar:"environ", price:50, unit:"session",
    desc:"Ergonomic setup, lighting, air quality, and productivity environment design." },
  { id:"S36", name:"Connected Device Setup", pillar:"environ", price:40, unit:"session",
    desc:"Configure smart home devices, Bluetooth accessories, and charging infrastructure safely." },
  { id:"S37", name:"Nature Connection Protocol", pillar:"environ", price:30, unit:"session",
    desc:"Structured plan for increasing outdoor time, nature exposure, and green space use." },
  { id:"S38", name:"Seasonal Environment Adjustment", pillar:"environ", price:35, unit:"session",
    desc:"Adapt home, routines, and habits for seasonal changes in light, temperature, and mood." },
  { id:"S39", name:"Vehicle & CarPlay Safety Review", pillar:"environ", price:30, unit:"session",
    desc:"Review CarPlay setup, driving ergonomics, and vehicle safety for daily commutes." },
  { id:"S40", name:"Sustainable Living Plan", pillar:"environ", price:45, unit:"session",
    desc:"Reduce environmental impact through sustainable choices in home, food, and transport." },

  // ── Recovery Care (S41–S49) ──
  { id:"S41", name:"Recovery Assessment", pillar:"recovery", price:60, unit:"session",
    desc:"Comprehensive assessment of where you are stuck, depleted, or in need of repair." },
  { id:"S42", name:"System Reset Session", pillar:"recovery", price:70, unit:"90 min",
    desc:"Guided reset — clear backlogs, restore routines, and return to your baseline." },
  { id:"S43", name:"Repair & Restore Coaching", pillar:"recovery", price:75, unit:"60 min",
    desc:"One-on-one coaching for repairing relationships, habits, or systems that have broken down." },
  { id:"S44", name:"Burnout Recovery Protocol", pillar:"recovery", price:85, unit:"session",
    desc:"Clinician-designed burnout assessment, boundary repair, and recovery roadmap." },
  { id:"S45", name:"Reflection & Journaling Lab", pillar:"recovery", price:35, unit:"60 min",
    desc:"Guided reflective journaling session using the REEL Align framework." },
  { id:"S46", name:"Update & Maintenance Check", pillar:"recovery", price:40, unit:"session",
    desc:"Quarterly review of all systems — health, digital, family, environment — for maintenance." },
  { id:"S47", name:"Grief & Transition Support", pillar:"recovery", price:90, unit:"session",
    desc:"Clinical support for navigating loss, life transitions, and identity shifts." },
  { id:"S48", name:"Return-to-Balance Program", pillar:"recovery", price:150, unit:"6-week",
    desc:"Six-week structured program for comprehensive life rebalancing after disruption." },
  { id:"S49", name:"Integration & Completion Session", pillar:"recovery", price:65, unit:"session",
    desc:"Closing session to integrate learnings, celebrate progress, and set forward direction." },
];

// ─── 21 PACKAGES ─────────────────────────────────────────────
export const PACKAGES = [
  // ── Mind Packages (P01–P04) ──
  { id:"P01", name:"Mind Starter", pillar:"mind", price:149, services:["S01","S05","S08"],
    desc:"Daily check-ins, screen balance, and mindfulness foundations." },
  { id:"P02", name:"Focus & Performance", pillar:"mind", price:199, services:["S02","S07","S06"],
    desc:"Deep-work coaching, learning optimization, and creative expression." },
  { id:"P03", name:"Emotional Mastery", pillar:"mind", price:179, services:["S03","S04","S01"],
    desc:"Emotional regulation, stress recovery, and daily REEL practice." },
  { id:"P04", name:"Complete Mind Care", pillar:"mind", price:399, services:["S01","S02","S03","S04","S05","S06","S07","S08"],
    desc:"Every Mind Care service — the full cognitive and emotional toolkit." },

  // ── Body Packages (P05–P07) ──
  { id:"P05", name:"Body Essentials", pillar:"body", price:169, services:["S09","S11","S12"],
    desc:"Movement, nutrition, and breathwork fundamentals." },
  { id:"P06", name:"Longevity Foundations", pillar:"body", price:249, services:["S10","S15","S16"],
    desc:"Sleep optimization, biomarker review, and the 30-day body challenge." },
  { id:"P07", name:"Complete Body Care", pillar:"body", price:419, services:["S09","S10","S11","S12","S13","S14","S15","S16"],
    desc:"Every Body Care service — head-to-toe physical optimization." },

  // ── Digital Packages (P08–P10) ──
  { id:"P08", name:"Digital Safety", pillar:"digital", price:119, services:["S17","S21","S23"],
    desc:"Privacy audit, password protection, and notification boundaries." },
  { id:"P09", name:"Family Digital", pillar:"digital", price:149, services:["S20","S19","S22"],
    desc:"Family device setup, safe app review, and accessibility configuration." },
  { id:"P10", name:"Complete Digital Care", pillar:"digital", price:299, services:["S17","S18","S19","S20","S21","S22","S23","S24"],
    desc:"Every Digital Care service — total digital life protection and optimization." },

  // ── Family Packages (P11–P13) ──
  { id:"P11", name:"Family Foundations", pillar:"family", price:199, services:["S25","S29","S31"],
    desc:"Communication, support mapping, and family tech agreement." },
  { id:"P12", name:"Parenting & Partnership", pillar:"family", price:249, services:["S27","S28","S26"],
    desc:"Couples alignment, parenting strategy, and child safety review." },
  { id:"P13", name:"Complete Family Care", pillar:"family", price:449, services:["S25","S26","S27","S28","S29","S30","S31","S32"],
    desc:"Every Family Care service — whole-family wellness and alignment." },

  // ── Environment Packages (P14–P15) ──
  { id:"P14", name:"Home & Work Environment", pillar:"environ", price:139, services:["S33","S35","S36"],
    desc:"Home audit, workspace optimization, and connected device setup." },
  { id:"P15", name:"Complete Environment Care", pillar:"environ", price:279, services:["S33","S34","S35","S36","S37","S38","S39","S40"],
    desc:"Every Environment Care service — optimized surroundings everywhere." },

  // ── Recovery Packages (P16–P18) ──
  { id:"P16", name:"Recovery Essentials", pillar:"recovery", price:159, services:["S41","S45","S46"],
    desc:"Assessment, journaling, and quarterly maintenance checks." },
  { id:"P17", name:"Deep Recovery", pillar:"recovery", price:299, services:["S42","S43","S44","S48"],
    desc:"System reset, repair coaching, burnout recovery, and the 6-week program." },
  { id:"P18", name:"Complete Recovery Care", pillar:"recovery", price:499, services:["S41","S42","S43","S44","S45","S46","S47","S48","S49"],
    desc:"Every Recovery Care service — full restoration and integration." },

  // ── Cross-Pillar Packages (P19–P21) ──
  { id:"P19", name:"New Client Intake", pillar:"cross", price:129, services:["S01","S09","S17","S33","S41"],
    desc:"First-session package: daily check-in + assessments across mind, body, digital, environment, and recovery." },
  { id:"P20", name:"Quarterly System Review", pillar:"cross", price:199, services:["S46","S15","S17","S33"],
    desc:"Quarterly maintenance across body biomarkers, digital security, environment, and system health." },
  { id:"P21", name:"Life Transition Package", pillar:"cross", price:349, services:["S47","S42","S04","S29","S49"],
    desc:"Grief support, system reset, stress recovery, support mapping, and integration for major life changes." },
];

// ─── 16 BUNDLES ──────────────────────────────────────────────
export const BUNDLES = [
  // ── Single-Pillar Complete Bundles (B01–B06) ──
  { id:"B01", name:"Mind Mastery Bundle", pillar:"mind", price:349, packages:["P01","P02","P03"],
    desc:"All three Mind Care packages at a bundled rate. Full cognitive and emotional mastery.", save:28 },
  { id:"B02", name:"Body Optimization Bundle", pillar:"body", price:369, packages:["P05","P06"],
    desc:"Body Essentials + Longevity Foundations. Physical health from foundation to frontier.", save:49 },
  { id:"B03", name:"Digital Life Bundle", pillar:"digital", price:229, packages:["P08","P09"],
    desc:"Digital Safety + Family Digital. Complete digital protection for you and your family.", save:39 },
  { id:"B04", name:"Family Harmony Bundle", pillar:"family", price:399, packages:["P11","P12"],
    desc:"Family Foundations + Parenting & Partnership. Whole-family alignment.", save:49 },
  { id:"B05", name:"Environment Wellness Bundle", pillar:"environ", price:119, packages:["P14"],
    desc:"Home, work, and connected environment — fully optimized.", save:20 },
  { id:"B06", name:"Recovery & Restoration Bundle", pillar:"recovery", price:399, packages:["P16","P17"],
    desc:"Recovery Essentials + Deep Recovery. From assessment to full restoration.", save:59 },

  // ── Cross-Pillar Bundles (B07–B12) ──
  { id:"B07", name:"Mind + Body Bundle", pillar:"cross", price:599, packages:["P01","P02","P05","P06"],
    desc:"Mental clarity meets physical vitality. The core mind-body connection.", save:168 },
  { id:"B08", name:"Digital + Family Bundle", pillar:"cross", price:349, packages:["P08","P09","P11"],
    desc:"Secure your digital life and strengthen family connections.", save:118 },
  { id:"B09", name:"Whole Self Starter Bundle", pillar:"cross", price:499, packages:["P01","P05","P08","P14","P16"],
    desc:"One package from each pillar. The complete starter kit for aligned living.", save:236 },
  { id:"B10", name:"Recovery + Transition Bundle", pillar:"cross", price:499, packages:["P17","P21"],
    desc:"Deep Recovery + Life Transition Package. For major reset and rebuilding.", save:149 },
  { id:"B11", name:"New Client Complete Bundle", pillar:"cross", price:299, packages:["P19","P01"],
    desc:"Intake assessment + Mind Starter. Everything for a strong beginning.", save:0 },
  { id:"B12", name:"Practitioner Toolkit Bundle", pillar:"cross", price:899, packages:["P04","P07","P10","P13","P15","P18"],
    desc:"All six Complete Care packages. The full clinical toolkit for practitioners.", save:1446 },

  // ── Specialty Bundles (B13–B16) ──
  { id:"B13", name:"Longevity Essentials Bundle", pillar:"cross", price:449, packages:["P06","P05","P08"],
    desc:"Body longevity + movement + digital safety. The core longevity stack.", save:88 },
  { id:"B14", name:"Family Complete Bundle", pillar:"cross", price:599, packages:["P13","P09","P20"],
    desc:"Complete Family Care + Family Digital + Quarterly Reviews. Total family system.", save:248 },
  { id:"B15", name:"Executive Performance Bundle", pillar:"cross", price:549, packages:["P02","P06","P08","P14"],
    desc:"Focus, longevity, digital security, and workspace. Built for high performers.", save:157 },
  { id:"B16", name:"Total Transformation Bundle", pillar:"cross", price:1499, packages:["P04","P07","P10","P13","P15","P18","P19","P20","P21"],
    desc:"Every package in the system. Complete life transformation across all pillars.", save:1263 },
];

// ─── 5 MEMBERSHIPS ───────────────────────────────────────────
export const MEMBERSHIPS = [
  { id:"M01", name:"Explorer", price:0, interval:"free", color:"#64748b",
    icon:"🌱", tag:"Start here",
    desc:"Begin your REEL Align journey with free daily check-ins and core content.",
    includes:[
      "Daily REEL Align Check-In (S01)",
      "Universal Health Flow guide",
      "6 Pillars overview",
      "ReelVerse OS basic access",
      "Community access",
    ],
    bundles:[], services:["S01"],
  },
  { id:"M02", name:"Align", price:49, interval:"/mo", color:"#06b6d4",
    icon:"🌊", tag:"Most popular",
    desc:"Full individual access to the REEL Align ecosystem with AI coaching and all self-guided tools.",
    includes:[
      "Everything in Explorer",
      "ReelVerse Coach AI — unlimited sessions",
      "ReelVerse Mirror — guided journaling",
      "ReelVerse Compass — goal & values mapping",
      "ReelVerse Momentum — habit tracking",
      "Screen Balance Audit (S05)",
      "Notification & Boundary Design (S23)",
      "10% off all services & packages",
    ],
    bundles:[], services:["S01","S05","S23"],
  },
  { id:"M03", name:"Family", price:89, interval:"/mo", color:"#fb923c",
    icon:"👨‍👩‍👧‍👦", tag:"Up to 6 members",
    desc:"Whole-family access with shared dashboards, child safety tools, and family-specific services.",
    includes:[
      "Everything in Align for up to 6 family members",
      "Family Device Setup (S20)",
      "Family Tech Agreement (S31)",
      "Child Safety & Development Review (S26)",
      "Shared family dashboard",
      "ReelVerse Coach AI for each member",
      "15% off all services, packages & bundles",
    ],
    bundles:["B03"], services:["S01","S05","S23","S20","S31","S26"],
  },
  { id:"M04", name:"Practitioner", price:149, interval:"/mo", color:"#8b5cf6",
    icon:"📜", tag:"For professionals",
    desc:"For therapists, coaches, and wellness professionals who want to use the REEL Align Method with clients.",
    includes:[
      "Everything in Align",
      "Practitioner Toolkit Bundle (B12)",
      "ReelVerse Academy full access",
      "Certified REEL Method Practitioner pathway",
      "Client management dashboard",
      "White-label REEL Align sessions",
      "20% off all additional services",
      "Priority support",
    ],
    bundles:["B12"], services:["S01","S05","S23"],
  },
  { id:"M05", name:"Enterprise", price:499, interval:"/mo", color:"#d4a017",
    icon:"🏢", tag:"Organizations",
    desc:"For organizations, clinics, schools, and wellness centers deploying the REEL Align Method at scale.",
    includes:[
      "Everything in Practitioner for unlimited seats",
      "Total Transformation Bundle (B16) for onboarding",
      "Custom-branded ReelVerse OS instance",
      "Admin dashboard with analytics",
      "Staff training & certification program",
      "Dedicated account manager",
      "API access & integrations",
      "Volume pricing on all services",
    ],
    bundles:["B16","B12"], services:["S01","S05","S23"],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────

export const PILLAR_META = {
  mind:     { name:"Mind",        emoji:"🧠", color:"#a78bfa" },
  body:     { name:"Body",        emoji:"💪", color:"#f472b6" },
  digital:  { name:"Digital",     emoji:"🔐", color:"#38bdf8" },
  family:   { name:"Family",      emoji:"👨‍👩‍👧‍👦", color:"#fb923c" },
  environ:  { name:"Environment", emoji:"🌍", color:"#4ade80" },
  recovery: { name:"Recovery",    emoji:"🔄", color:"#e879f9" },
  cross:    { name:"Cross-Pillar",emoji:"🌐", color:"#06b6d4" },
};

export const COUNTS = {
  services: SERVICES.length,
  packages: PACKAGES.length,
  bundles: BUNDLES.length,
  memberships: MEMBERSHIPS.length,
};
