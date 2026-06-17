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

test('renders membership tier names', () => {
  render(<App />);
  expect(screen.getAllByText('Wellness').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Vitality').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Concierge').length).toBeGreaterThanOrEqual(1);
});

test('renders tier badges', () => {
  render(<App />);
  expect(screen.getByText('Starter')).toBeInTheDocument();
  expect(screen.getByText('Growth')).toBeInTheDocument();
  expect(screen.getByText('Scale')).toBeInTheDocument();
});

test('renders Shape the Wave services', () => {
  render(<App />);
  expect(screen.getByText('Monthly Vitamin B-12 injection')).toBeInTheDocument();
  expect(screen.getByText('HRT & hormone management')).toBeInTheDocument();
  expect(screen.getByText('RF Microneedling (Morpheus8)')).toBeInTheDocument();
});

test('renders summary metrics', () => {
  render(<App />);
  expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  expect(screen.getByText('Profit')).toBeInTheDocument();
  expect(screen.getAllByText('Margin').length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('LTV:CAC')).toBeInTheDocument();
});
