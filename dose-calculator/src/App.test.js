import { render, screen } from '@testing-library/react';
import App from './App';

test('renders financial dashboard header', () => {
  render(<App />);
  expect(screen.getByText('Financial Dashboard')).toBeInTheDocument();
});

test('renders all section headings', () => {
  render(<App />);
  expect(screen.getByText('Inputs')).toBeInTheDocument();
  expect(screen.getByText('Products')).toBeInTheDocument();
  expect(screen.getByText('Sales')).toBeInTheDocument();
  expect(screen.getByText('Summary')).toBeInTheDocument();
  expect(screen.getByText('Revenue by Product')).toBeInTheDocument();
});

test('renders product names', () => {
  render(<App />);
  expect(screen.getAllByText('T-Shirt').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Hoodie').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Membership').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Course').length).toBeGreaterThanOrEqual(1);
});

test('renders summary metrics', () => {
  render(<App />);
  expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  expect(screen.getByText('Profit')).toBeInTheDocument();
  expect(screen.getAllByText('Margin').length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('LTV:CAC')).toBeInTheDocument();
});
