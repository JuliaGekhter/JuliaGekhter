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
