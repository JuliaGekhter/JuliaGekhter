import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Shape the Wave dashboard', () => {
  render(<App />);
  expect(screen.getByText('Shape the Wave')).toBeInTheDocument();
  expect(screen.getByText('Memberships, Bundles & Packages')).toBeInTheDocument();
});

test('renders all four sections', () => {
  render(<App />);
  expect(screen.getAllByText('Memberships').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Bundles').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Packages').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Services').length).toBeGreaterThanOrEqual(1);
});

test('bundles are product groupings', () => {
  render(<App />);
  expect(screen.getByText(/Product groupings/)).toBeInTheDocument();
  expect(screen.getAllByText('WL Level 3').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Mens Vitality Bundle').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('BHRT Starter (Women)').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Anti-Aging Skin Bundle').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('TRT + Support (Men)').length).toBeGreaterThanOrEqual(1);
});

test('packages are multi-month service programs', () => {
  render(<App />);
  expect(screen.getByText(/Multi-month service programs/)).toBeInTheDocument();
  expect(screen.getAllByText('Semaglutide 3-Month Kickstart').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('TRT Quarterly (Every 2 Weeks)').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Annual Wellness Program').length).toBeGreaterThanOrEqual(1);
});

test('memberships have 5 tiers with credits', () => {
  render(<App />);
  expect(screen.getAllByText('Essential').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/Concierge/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('Unlimited credits/mo')).toBeInTheDocument();
  expect(screen.getByText('6 credits/mo')).toBeInTheDocument();
});

test('revenue shows all three streams', () => {
  render(<App />);
  expect(screen.getByText('Membership MRR')).toBeInTheDocument();
  expect(screen.getByText('Bundle Revenue')).toBeInTheDocument();
  expect(screen.getByText('Package Revenue')).toBeInTheDocument();
});
