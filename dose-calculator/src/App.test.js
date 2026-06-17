import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Shape the Wave dashboard header', () => {
  render(<App />);
  expect(screen.getByText('Shape the Wave')).toBeInTheDocument();
});

test('renders all three main sections', () => {
  render(<App />);
  expect(screen.getAllByText('Services').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Packages').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Memberships').length).toBeGreaterThanOrEqual(1);
});

test('services are individual a la carte items', () => {
  render(<App />);
  expect(screen.getByText('Individual a la carte services')).toBeInTheDocument();
  expect(screen.getByText('Botox (per area)')).toBeInTheDocument();
  expect(screen.getByText('GLP-1 Medication')).toBeInTheDocument();
  expect(screen.getByText('Office Visit')).toBeInTheDocument();
});

test('packages are bundles not tied to memberships', () => {
  render(<App />);
  expect(screen.getByText(/sold separately, not tied to memberships/)).toBeInTheDocument();
  expect(screen.getAllByText('Weight Loss Kickstart').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Weight Loss Accelerator').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Glow Up').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Total Body Reset').length).toBeGreaterThanOrEqual(1);
});

test('memberships include credits, services and products', () => {
  render(<App />);
  expect(screen.getByText(/includes credits, services, and products/)).toBeInTheDocument();
  expect(screen.getByText('2 credits/mo')).toBeInTheDocument();
  expect(screen.getByText('4 credits/mo')).toBeInTheDocument();
  expect(screen.getByText('8 credits/mo')).toBeInTheDocument();
  expect(screen.getByText('Unlimited credits/mo')).toBeInTheDocument();
});

test('memberships have starter fees', () => {
  render(<App />);
  expect(screen.getByText('+ $99 starter fee')).toBeInTheDocument();
  expect(screen.getByText('+ $149 starter fee')).toBeInTheDocument();
  expect(screen.getByText('+ $199 starter fee')).toBeInTheDocument();
  expect(screen.getByText('+ $249 starter fee')).toBeInTheDocument();
});

test('membership cards show services and products sections separately', () => {
  render(<App />);
  const productLabels = screen.getAllByText('Products');
  expect(productLabels.length).toBeGreaterThanOrEqual(4);
});

test('renders revenue breakdown with both memberships and packages', () => {
  render(<App />);
  expect(screen.getByText('Membership MRR')).toBeInTheDocument();
  expect(screen.getByText('Package Revenue')).toBeInTheDocument();
  expect(screen.getByText('Revenue Breakdown')).toBeInTheDocument();
});
