import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Shape the Wave dashboard', () => {
  render(<App />);
  expect(screen.getByText('Shape the Wave')).toBeInTheDocument();
});

test('renders three distinct sections', () => {
  render(<App />);
  expect(screen.getAllByText('Services').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Packages').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Memberships').length).toBeGreaterThanOrEqual(1);
});

test('services reflect 2025 pricing', () => {
  render(<App />);
  expect(screen.getAllByText('New Patient Consultation').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Semaglutide - First 3 Months').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('TRT - Every 2 Weeks').length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('Sildenafil 100mg (30ct)')).toBeInTheDocument();
});

test('has 22 packages across all categories', () => {
  render(<App />);
  expect(screen.getAllByText(/sold separately/).length).toBe(1);
  expect(screen.getAllByText('Semaglutide 3-Month Kickstart').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Mens Vitality Bundle').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Anti-Aging Skin Bundle').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Hair Restoration Bundle').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('BHRT Cream 3-Month').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('ED Complete 3-Month').length).toBeGreaterThanOrEqual(1);
});

test('has 5 membership tiers with expanded perks', () => {
  render(<App />);
  expect(screen.getAllByText('Essential').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/Wellness/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/Vitality/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/Premium/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/Concierge/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('Unlimited credits/mo')).toBeInTheDocument();
  expect(screen.getByText('6 credits/mo')).toBeInTheDocument();
});

test('memberships show rich perks', () => {
  render(<App />);
  expect(screen.getByText(/Direct cell phone access/)).toBeInTheDocument();
  expect(screen.getByText(/Birthday month/)).toBeInTheDocument();
  expect(screen.getByText(/free package upgrade/)).toBeInTheDocument();
  expect(screen.getByText(/Dedicated care coordinator/)).toBeInTheDocument();
});

test('renders revenue breakdown', () => {
  render(<App />);
  expect(screen.getByText('Membership MRR')).toBeInTheDocument();
  expect(screen.getByText('Package Revenue')).toBeInTheDocument();
  expect(screen.getByText('Revenue Breakdown')).toBeInTheDocument();
});
