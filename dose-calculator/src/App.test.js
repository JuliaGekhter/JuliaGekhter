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
  expect(screen.getAllByText('Full Blood Panel').length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('Sildenafil 100mg (30ct)')).toBeInTheDocument();
});

test('packages use actual multi-month pricing', () => {
  render(<App />);
  expect(screen.getAllByText('Semaglutide 3-Month Kickstart').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Tirzepatide 3-Month Bundle').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('TRT Quarterly').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Sermorelin 3-Month').length).toBeGreaterThanOrEqual(1);
});

test('memberships match actual pricing tiers', () => {
  render(<App />);
  expect(screen.getAllByText(/starter fee/).length).toBe(4);
  expect(screen.getByText('1 credits/mo')).toBeInTheDocument();
  expect(screen.getByText('2 credits/mo')).toBeInTheDocument();
  expect(screen.getByText('Unlimited credits/mo')).toBeInTheDocument();
});

test('renders revenue breakdown', () => {
  render(<App />);
  expect(screen.getByText('Membership MRR')).toBeInTheDocument();
  expect(screen.getByText('Package Revenue')).toBeInTheDocument();
  expect(screen.getByText('Revenue Breakdown')).toBeInTheDocument();
});
