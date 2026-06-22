import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => localStorage.clear());

test('renders header with app name and brand', () => {
  render(<App />);
  expect(screen.getByText('Momentum')).toBeInTheDocument();
  expect(screen.getByText(/REELVERSE/)).toBeInTheDocument();
});

test('renders bottom navigation with all tabs', () => {
  render(<App />);
  const tabs = screen.getAllByRole('tab');
  expect(tabs).toHaveLength(3);
  expect(tabs.map(t => t.getAttribute('aria-label'))).toEqual(['Today','Stats','Habits']);
});

test('renders starter habits on Today screen', () => {
  render(<App />);
  expect(screen.getByText('REEL Align Check-In')).toBeInTheDocument();
  expect(screen.getByText('Move 30 minutes')).toBeInTheDocument();
  expect(screen.getByText('Drink 8 glasses of water')).toBeInTheDocument();
});

test('shows progress percentage', () => {
  render(<App />);
  expect(screen.getByText('0%')).toBeInTheDocument();
  expect(screen.getByText(/0 of 8/)).toBeInTheDocument();
});

test('toggles a habit on click', () => {
  render(<App />);
  const habit = screen.getByText('REEL Align Check-In').closest('button');
  fireEvent.click(habit);
  expect(screen.getByText(/1 of 8/)).toBeInTheDocument();
});

test('shows all-done message when every habit checked', () => {
  render(<App />);
  const buttons = screen.getAllByRole('button').filter(
    b => b.getAttribute('aria-pressed') !== null
  );
  buttons.forEach(b => fireEvent.click(b));
  expect(screen.getByText('All habits done!')).toBeInTheDocument();
});

test('navigates to Stats screen', () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText('Stats'));
  expect(screen.getByText('Current Streak')).toBeInTheDocument();
  expect(screen.getByText('30-Day Heatmap')).toBeInTheDocument();
  expect(screen.getByText('Habit Streaks')).toBeInTheDocument();
});

test('navigates to Habits management screen', () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText('Habits'));
  expect(screen.getByText('Your Habits')).toBeInTheDocument();
  expect(screen.getByText('8 active habits')).toBeInTheDocument();
});

test('opens create modal and adds a habit', () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText('Habits'));
  fireEvent.click(screen.getByText('+ New'));
  expect(screen.getByText('New Habit')).toBeInTheDocument();

  const input = screen.getByPlaceholderText('e.g. Meditate 10 minutes');
  fireEvent.change(input, { target: { value: 'Test Habit' } });
  fireEvent.click(screen.getByText('Add Habit'));

  expect(screen.getByText('Test Habit')).toBeInTheDocument();
  expect(screen.getByText('9 active habits')).toBeInTheDocument();
});

test('deletes a habit', () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText('Habits'));
  const deleteBtn = screen.getByLabelText('Delete REEL Align Check-In');
  fireEvent.click(deleteBtn);
  expect(screen.queryByText('REEL Align Check-In')).not.toBeInTheDocument();
  expect(screen.getByText('7 active habits')).toBeInTheDocument();
});

test('shows pillar tags on habits', () => {
  render(<App />);
  const mindTags = screen.getAllByText(/Mind/);
  expect(mindTags.length).toBeGreaterThanOrEqual(1);
});

test('Stats shows pillar performance bars', () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText('Stats'));
  expect(screen.getByText('Pillar Performance')).toBeInTheDocument();
});
