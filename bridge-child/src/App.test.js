import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders home screen with title and author', () => {
  render(<App />);
  expect(screen.getByText('The Bridge Child')).toBeInTheDocument();
  expect(screen.getByText('Julia Gekhter-Tack, LCSW')).toBeInTheDocument();
});

test('renders bottom navigation with all tabs', () => {
  render(<App />);
  const tabs = screen.getAllByRole('tab');
  expect(tabs).toHaveLength(5);
  expect(tabs.map(t => t.getAttribute('aria-label'))).toEqual(
    ['Home','Read','Workbook','Author','Buy']
  );
});

test('navigates to excerpts screen via nav', () => {
  render(<App />);
  const navRead = screen.getAllByText('Read').find(
    el => el.closest('button')?.style.flex === '1'
  );
  fireEvent.click(navRead);
  expect(screen.getByText('Read Excerpts')).toBeInTheDocument();
  expect(screen.getByText('Who Is a Bridge Child?')).toBeInTheDocument();
});

test('navigates to workbook screen via nav', () => {
  render(<App />);
  const navWorkbook = screen.getAllByText('Workbook').find(
    el => el.tagName === 'SPAN'
  );
  fireEvent.click(navWorkbook);
  expect(screen.getByText(/Exercises in Healing/)).toBeInTheDocument();
  expect(screen.getByText('A Letter to the Country You Left')).toBeInTheDocument();
});

test('navigates to about screen', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Author'));
  expect(screen.getByText('Julia Gekhter-Tack')).toBeInTheDocument();
  expect(screen.getByText('Her Story')).toBeInTheDocument();
});

test('navigates to buy screen via nav', () => {
  render(<App />);
  const navBuy = screen.getAllByText('Buy').find(
    el => el.tagName === 'SPAN'
  );
  fireEvent.click(navBuy);
  expect(screen.getByText('Amazon Paperback')).toBeInTheDocument();
  expect(screen.getByText('Kindle eBook')).toBeInTheDocument();
});

test('opens and closes an excerpt', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Read Excerpts'));
  fireEvent.click(screen.getByText('Who Is a Bridge Child?'));
  expect(screen.getByText(/There is a moment every bridge child knows/)).toBeInTheDocument();
  fireEvent.click(screen.getByText('Back'));
  expect(screen.getByText(/Selected passages/)).toBeInTheDocument();
});

test('opens a workbook exercise via workbook screen', () => {
  render(<App />);
  const navWorkbook = screen.getAllByText('Workbook').find(
    el => el.tagName === 'SPAN'
  );
  fireEvent.click(navWorkbook);
  fireEvent.click(screen.getByText('A Letter to the Country You Left'));
  expect(screen.getByText('Opening Line')).toBeInTheDocument();
  expect(screen.getByText('Writing Prompts')).toBeInTheDocument();
  expect(screen.getByText('Reflection')).toBeInTheDocument();
});

test('navigates to excerpts via home grid button', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Read Excerpts'));
  expect(screen.getByText('Who Is a Bridge Child?')).toBeInTheDocument();
  expect(screen.getByText('The Country That Made Me')).toBeInTheDocument();
});

test('all five excerpt chapters are listed', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Read Excerpts'));
  expect(screen.getByText('Introduction')).toBeInTheDocument();
  expect(screen.getByText('Chapter One')).toBeInTheDocument();
  expect(screen.getByText('Chapter Two')).toBeInTheDocument();
  expect(screen.getByText('Chapter Nine')).toBeInTheDocument();
  expect(screen.getByText('Epilogue')).toBeInTheDocument();
});

test('all eight workbook exercises are listed', () => {
  render(<App />);
  const navWorkbook = screen.getAllByText('Workbook').find(
    el => el.tagName === 'SPAN'
  );
  fireEvent.click(navWorkbook);
  expect(screen.getByText('A Letter to the Country You Left')).toBeInTheDocument();
  expect(screen.getByText('The Invisible Suitcase')).toBeInTheDocument();
  expect(screen.getByText('Your Anchor')).toBeInTheDocument();
  expect(screen.getByText('The People I Left Behind')).toBeInTheDocument();
  expect(screen.getByText('A Letter to Your Younger Self')).toBeInTheDocument();
  expect(screen.getByText('Your Two Selves: A Dialogue')).toBeInTheDocument();
  expect(screen.getByText('The Bridge You Built')).toBeInTheDocument();
  expect(screen.getByText('A Letter to Your Future Self')).toBeInTheDocument();
});
