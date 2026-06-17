import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Shape the Wave dashboard header', () => {
  render(<App />);
  expect(screen.getByText('Shape the Wave')).toBeInTheDocument();
});

test('renders all section headings', () => {
  render(<App />);
  expect(screen.getByText('Inputs')).toBeInTheDocument();
  expect(screen.getByText('Memberships')).toBeInTheDocument();
  expect(screen.getByText('Sales')).toBeInTheDocument();
  expect(screen.getByText('Summary')).toBeInTheDocument();
  expect(screen.getByText('Revenue by Membership')).toBeInTheDocument();
});

test('renders all 4 membership tier names', () => {
  render(<App />);
  expect(screen.getAllByText('Wellness').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Transform').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Vitality').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Concierge').length).toBeGreaterThanOrEqual(1);
});

test('renders starter fees on each membership', () => {
  render(<App />);
  expect(screen.getByText('+ $99 starter fee')).toBeInTheDocument();
  expect(screen.getByText('+ $149 starter fee')).toBeInTheDocument();
  expect(screen.getByText('+ $199 starter fee')).toBeInTheDocument();
  expect(screen.getByText('+ $249 starter fee')).toBeInTheDocument();
});

test('renders starter fee revenue in summary', () => {
  render(<App />);
  expect(screen.getByText('Starter Fee Revenue')).toBeInTheDocument();
  expect(screen.getByText('Monthly Revenue')).toBeInTheDocument();
});

test('renders weight loss accountability services in Transform tier', () => {
  render(<App />);
  expect(screen.getByText('Weekly accountability consultations')).toBeInTheDocument();
  expect(screen.getByText('Bi-weekly check-in meetings')).toBeInTheDocument();
  expect(screen.getByText('GLP-1 medications (Semaglutide/Tirzepatide)')).toBeInTheDocument();
});

test('renders a la carte add-ons for lower tiers', () => {
  render(<App />);
  const addOnLabels = screen.getAllByText('A la carte add-ons:');
  expect(addOnLabels.length).toBe(3);
});

test('renders summary metrics', () => {
  render(<App />);
  expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  expect(screen.getByText('Profit')).toBeInTheDocument();
  expect(screen.getAllByText('Margin').length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('LTV:CAC')).toBeInTheDocument();
});
