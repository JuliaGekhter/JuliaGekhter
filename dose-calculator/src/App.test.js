import { render, screen } from '@testing-library/react';
import App from './App';

test('renders financial dashboard header', () => {
  render(<App />);
  expect(screen.getByText('Financial Dashboard')).toBeInTheDocument();
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
  expect(screen.getAllByText('Basic').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Pro').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Premium').length).toBeGreaterThanOrEqual(1);
});

test('renders tier badges', () => {
  render(<App />);
  expect(screen.getByText('Starter')).toBeInTheDocument();
  expect(screen.getByText('Growth')).toBeInTheDocument();
  expect(screen.getByText('Scale')).toBeInTheDocument();
});

test('renders included features', () => {
  render(<App />);
  expect(screen.getAllByText('Content Library').length).toBe(3);
  expect(screen.getByText('1-on-1 Coaching')).toBeInTheDocument();
});

test('renders summary metrics', () => {
  render(<App />);
  expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  expect(screen.getByText('Profit')).toBeInTheDocument();
  expect(screen.getAllByText('Margin').length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('LTV:CAC')).toBeInTheDocument();
});
