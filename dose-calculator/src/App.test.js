import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand hierarchy', () => {
  render(<App />);
  expect(screen.getByText('Shape The Wave Longevity™')).toBeInTheDocument();
  expect(screen.getByText('Optimize health. Align habits. Live longer, better.')).toBeInTheDocument();
  expect(screen.getByText('REEL™ Align Method™')).toBeInTheDocument();
  expect(screen.getByText('ReelVerse AI™')).toBeInTheDocument();
  expect(screen.getByText('ReelVerse OS™')).toBeInTheDocument();
});

test('renders ecosystem products', () => {
  render(<App />);
  expect(screen.getByText('ReelVerse Coach™')).toBeInTheDocument();
  expect(screen.getByText('ReelVerse Mirror™')).toBeInTheDocument();
  expect(screen.getByText('ReelVerse Compass™')).toBeInTheDocument();
  expect(screen.getByText('ReelVerse Momentum™')).toBeInTheDocument();
  expect(screen.getByText('ReelVerse Academy™')).toBeInTheDocument();
  expect(screen.getByText('Certified REEL Method Practitioner™')).toBeInTheDocument();
});

test('renders REEL framework steps', () => {
  render(<App />);
  expect(screen.getByText('Reflect')).toBeInTheDocument();
  expect(screen.getByText('Envision')).toBeInTheDocument();
  expect(screen.getByText('Execute')).toBeInTheDocument();
  expect(screen.getByText('Learn')).toBeInTheDocument();
  expect(screen.getByText('Align')).toBeInTheDocument();
});

test('renders memberships, bundles, packages', () => {
  render(<App />);
  expect(screen.getAllByText('Memberships').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Bundles').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Packages').length).toBeGreaterThanOrEqual(1);
});

test('renders 5 membership tiers', () => {
  render(<App />);
  expect(screen.getAllByText('Essential').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/Concierge/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('Unlimited credits/mo')).toBeInTheDocument();
});

test('renders revenue streams', () => {
  render(<App />);
  expect(screen.getByText('Membership MRR')).toBeInTheDocument();
  expect(screen.getByText('Bundle Revenue')).toBeInTheDocument();
  expect(screen.getByText('Package Revenue')).toBeInTheDocument();
});

test('renders CPT codes section', () => {
  render(<App />);
  expect(screen.getByText('CPT Codes')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Search by CPT code or description...')).toBeInTheDocument();
});

test('renders projections section', () => {
  render(<App />);
  expect(screen.getByText('Financial Projections')).toBeInTheDocument();
  expect(screen.getByText('Projected ARR')).toBeInTheDocument();
  expect(screen.getByText('Month 12 Members')).toBeInTheDocument();
});

test('renders pricing mode toggle', () => {
  render(<App />);
  expect(screen.getByText('Pricing Mode')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Self Pay')).toBeInTheDocument();
});

test('renders referral bonuses', () => {
  render(<App />);
  expect(screen.getByText('$25 credit per referral')).toBeInTheDocument();
  expect(screen.getByText('$50 credit per referral')).toBeInTheDocument();
  expect(screen.getByText('$75 credit + free B-12 for referee')).toBeInTheDocument();
  expect(screen.getByText('$100 credit + 1 month free for referee')).toBeInTheDocument();
  expect(screen.getByText('$150 credit + 1 month free for referee + starter fee waiver')).toBeInTheDocument();
});

test('renders new bundle and package names', () => {
  render(<App />);
  expect(screen.getAllByText('Complete Male Optimization').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Longevity Stack').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Tirzepatide 6-Month Program').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('HCG + TRT Combo 3-Month').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Couples TRT Bundle').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Couples Wellness Annual').length).toBeGreaterThanOrEqual(1);
});

test('renders all 5 tab buttons', () => {
  render(<App />);
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Patients')).toBeInTheDocument();
  expect(screen.getByText('Operations')).toBeInTheDocument();
  expect(screen.getByText('Strategy')).toBeInTheDocument();
  expect(screen.getByText('Marketing')).toBeInTheDocument();
});

test('dashboard tab is active by default', () => {
  render(<App />);
  const dashboardBtn = screen.getByText('Dashboard');
  expect(dashboardBtn.className).toContain('active');
});

test('renders Patient App tab', () => {
  render(<App />);
  expect(screen.getByText('Patient App')).toBeInTheDocument();
});

test('renders ReelVerse tab', () => {
  render(<App />);
  expect(screen.getByText('ReelVerse')).toBeInTheDocument();
});

test('renders Integrations tab', () => {
  render(<App />);
  expect(screen.getByText('Integrations')).toBeInTheDocument();
});

test('renders Compliance tab', () => {
  render(<App />);
  expect(screen.getByText('Compliance')).toBeInTheDocument();
});

test('renders Training tab', () => {
  render(<App />);
  expect(screen.getByText('Training')).toBeInTheDocument();
});

test('renders Automation tab', () => {
  render(<App />);
  expect(screen.getByText('Automation')).toBeInTheDocument();
});

test('renders Analytics tab', () => {
  render(<App />);
  expect(screen.getByText('Analytics')).toBeInTheDocument();
});

test('renders AI Coach tab', () => {
  render(<App />);
  expect(screen.getByText('AI Coach')).toBeInTheDocument();
});

test('renders Locations tab', () => {
  render(<App />);
  expect(screen.getByText('Locations')).toBeInTheDocument();
});

test('renders Investor tab', () => {
  render(<App />);
  expect(screen.getByText('Investor')).toBeInTheDocument();
});

test('renders Backend tab', () => {
  render(<App />);
  expect(screen.getByText('Backend')).toBeInTheDocument();
});

test('renders Mobile tab', () => {
  render(<App />);
  expect(screen.getByText('Mobile')).toBeInTheDocument();
});
