import { useState, useMemo } from 'react';
import './App.css';

import {
  DEFAULT_INPUTS,
  DEFAULT_SERVICES,
  DEFAULT_BUNDLES,
  DEFAULT_PACKAGES,
  DEFAULT_MEMBERSHIPS,
  DEFAULT_SALES,
} from './data/constants';

import InputsPanel from './components/InputsPanel';
import ServicesTable from './components/ServicesTable';
import BundlesSection from './components/BundlesSection';
import PackagesSection from './components/PackagesSection';
import MembershipsSection from './components/MembershipsSection';
import SalesTable from './components/SalesTable';
import SummaryPanel from './components/SummaryPanel';
import RevenueChart from './components/RevenueChart';
import CptCodesTable from './components/CptCodesTable';
import ProjectionsPanel from './components/ProjectionsPanel';
import PatientsTab from './components/PatientsTab';
import OperationsTab from './components/OperationsTab';
import StrategyTab from './components/StrategyTab';
import MarketingTab from './components/MarketingTab';
import PatientApp from './components/patient/PatientApp';
import ReelVerseTab from './components/ReelVerseTab';
import IntegrationsTab from './components/IntegrationsTab';
import ComplianceTab from './components/ComplianceTab';
import TrainingTab from './components/TrainingTab';
import AutomationTab from './components/AutomationTab';
import AnalyticsTab from './components/AnalyticsTab';
import AiCoachTab from './components/AiCoachTab';
import MultiLocationTab from './components/MultiLocationTab';
import InvestorTab from './components/InvestorTab';
import BackendTab from './components/BackendTab';
import MobileTab from './components/MobileTab';

function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [bundles, setBundles] = useState(DEFAULT_BUNDLES);
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [memberships, setMemberships] = useState(DEFAULT_MEMBERSHIPS);
  const [sales, setSales] = useState(DEFAULT_SALES);
  const [pricingMode, setPricingMode] = useState('selfPay');
  const [activeTab, setActiveTab] = useState('dashboard');

  const summary = useMemo(() => {
    const membershipRevenue = sales.memberships.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const bundleRevenue = sales.bundles.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const packageRevenue = sales.packages.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const starterFeeRevenue = sales.memberships.reduce((sum, s) => {
      const m = memberships.find(mem => mem.name === s.name);
      return sum + (m ? s.unitsSold * m.starterFee : 0);
    }, 0);
    const totalRevenue = membershipRevenue + bundleRevenue + packageRevenue + starterFeeRevenue;
    const totalCosts = memberships.reduce((sum, m) => sum + m.totalCost, 0)
      + bundles.reduce((sum, b) => sum + b.cost, 0)
      + packages.reduce((sum, p) => sum + p.cost, 0);
    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? profit / totalRevenue : 0;
    const ltv = inputs.churnRate > 0 ? inputs.arpu / inputs.churnRate : 0;
    const ltvCac = inputs.maxCac > 0 ? ltv / inputs.maxCac : 0;
    const burnRate = totalCosts - totalRevenue;
    const runway = burnRate > 0 ? inputs.startingCash / burnRate : Infinity;

    return { membershipRevenue, bundleRevenue, packageRevenue, starterFeeRevenue, totalRevenue, totalCosts, profit, margin, ltv, ltvCac, burnRate, runway };
  }, [inputs, memberships, bundles, packages, sales]);

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'patients', label: 'Patients' },
    { key: 'operations', label: 'Operations' },
    { key: 'strategy', label: 'Strategy' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'patient-app', label: 'Patient App' },
    { key: 'reelverse', label: 'ReelVerse' },
    { key: 'integrations', label: 'Integrations' },
    { key: 'compliance', label: 'Compliance' },
    { key: 'training', label: 'Training' },
    { key: 'automation', label: 'Automation' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'ai-coach', label: 'AI Coach' },
    { key: 'locations', label: 'Locations' },
    { key: 'investor', label: 'Investor' },
    { key: 'backend', label: 'Backend' },
    { key: 'mobile', label: 'Mobile' },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="brand-mark">
          <h1>Shape The Wave Longevity™</h1>
          <span className="tagline">Optimize health. Align habits. Live longer, better.</span>
        </div>
        <div className="brand-hierarchy">
          <span className="brand-pill brand-reel">REEL™ Align Method™</span>
          <span className="brand-arrow">&rarr;</span>
          <span className="brand-pill brand-ai">ReelVerse AI™</span>
          <span className="brand-arrow">&rarr;</span>
          <span className="brand-pill brand-os">ReelVerse OS™</span>
        </div>
      </header>
      <section className="panel ecosystem-panel">
        <h2>Ecosystem</h2>
        <div className="ecosystem-grid">
          <div className="eco-card">
            <span className="eco-icon">&#x1F9ED;</span>
            <strong>ReelVerse Coach™</strong>
            <span>AI guidance</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">&#x1FA9E;</span>
            <strong>ReelVerse Mirror™</strong>
            <span>Reflection & journaling</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">&#x1F9ED;</span>
            <strong>ReelVerse Compass™</strong>
            <span>Goals, values & direction</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">&#x1F680;</span>
            <strong>ReelVerse Momentum™</strong>
            <span>Habits & progress</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">&#x1F393;</span>
            <strong>ReelVerse Academy™</strong>
            <span>Courses & certification</span>
          </div>
          <div className="eco-card eco-card-credential">
            <span className="eco-icon">&#x1F3C5;</span>
            <strong>Certified REEL Method Practitioner™</strong>
            <span>Professional credential</span>
          </div>
        </div>
        <div className="framework-bar">
          <span className="framework-label">REEL™ Framework:</span>
          <span className="framework-step">Reflect</span>
          <span className="framework-dot">&middot;</span>
          <span className="framework-step">Envision</span>
          <span className="framework-dot">&middot;</span>
          <span className="framework-step">Execute</span>
          <span className="framework-dot">&middot;</span>
          <span className="framework-step">Learn</span>
          <span className="framework-dot">&middot;</span>
          <span className="framework-step">Align</span>
        </div>
      </section>

      <nav className="tab-nav">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`tab-btn${activeTab === t.key ? ' active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {activeTab === 'dashboard' && (
        <div className="dashboard-grid">
          <InputsPanel inputs={inputs} setInputs={setInputs} pricingMode={pricingMode} setPricingMode={setPricingMode} />
          <SummaryPanel summary={summary} />
          <MembershipsSection memberships={memberships} setMemberships={setMemberships} targetMargin={inputs.targetMargin} />
          <BundlesSection bundles={bundles} setBundles={setBundles} targetMargin={inputs.targetMargin} />
          <PackagesSection packages={packages} setPackages={setPackages} targetMargin={inputs.targetMargin} />
          <ServicesTable services={services} setServices={setServices} targetMargin={inputs.targetMargin} pricingMode={pricingMode} />
          <CptCodesTable />
          <SalesTable sales={sales} setSales={setSales} />
          <RevenueChart sales={sales} />
          <ProjectionsPanel inputs={inputs} sales={sales} memberships={memberships} />
        </div>
      )}

      {activeTab === 'patients' && <PatientsTab />}
      {activeTab === 'operations' && <OperationsTab />}
      {activeTab === 'strategy' && <StrategyTab />}
      {activeTab === 'marketing' && <MarketingTab />}
      {activeTab === 'patient-app' && <PatientApp />}
      {activeTab === 'reelverse' && <ReelVerseTab />}
      {activeTab === 'integrations' && <IntegrationsTab />}
      {activeTab === 'compliance' && <ComplianceTab />}
      {activeTab === 'training' && <TrainingTab />}
      {activeTab === 'automation' && <AutomationTab />}
      {activeTab === 'analytics' && <AnalyticsTab />}
      {activeTab === 'ai-coach' && <AiCoachTab />}
      {activeTab === 'locations' && <MultiLocationTab />}
      {activeTab === 'investor' && <InvestorTab />}
      {activeTab === 'backend' && <BackendTab />}
      {activeTab === 'mobile' && <MobileTab />}
    </div>
  );
}

export default App;
