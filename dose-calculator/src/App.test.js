import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dose calculator heading', () => {
  render(<App />);
  const heading = screen.getByText(/IV \/ IM Dose Calculator/i);
  expect(heading).toBeInTheDocument();
});
