import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

beforeEach(() => localStorage.clear());

const goTo = (label) => fireEvent.click(screen.getByRole("tab", { name: label }));

test("renders header with app title and brand", () => {
  render(<App />);
  expect(screen.getByText(/Hologram/)).toBeInTheDocument();
  expect(screen.getByText(/Longevity Coach/)).toBeInTheDocument();
  expect(screen.getAllByText(/Shape The Wave/).length).toBeGreaterThan(0);
});

test("bottom nav renders four tabs with labels", () => {
  render(<App />);
  const tabs = screen.getAllByRole("tab");
  expect(tabs).toHaveLength(4);
  ["Coach", "Today", "Vitals", "Center"].forEach((label) => {
    expect(screen.getByRole("tab", { name: label })).toBeInTheDocument();
  });
});

test("coach screen shows greeting and reveals pillar guidance on chip press", () => {
  render(<App />);
  expect(screen.getByText(/your longevity coach/)).toBeInTheDocument();
  expect(screen.getByText(/Today's focus/)).toBeInTheDocument();

  const sleepChip = screen.getByRole("button", { name: "Sleep" });
  expect(sleepChip).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(sleepChip);
  expect(sleepChip).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText(/foundation every other longevity lever/)).toBeInTheDocument();

  fireEvent.click(sleepChip);
  expect(screen.queryByText(/foundation every other longevity lever/)).not.toBeInTheDocument();
});

test("today screen reachable and protocol items toggle with progress", () => {
  render(<App />);
  goTo("Today");
  expect(screen.getByText("Daily protocol")).toBeInTheDocument();
  expect(screen.getByText(/0 of 8 complete/)).toBeInTheDocument();

  const item = screen.getByRole("button", { name: /7\+ hours of sleep/ });
  expect(item).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(item);
  expect(item).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText(/1 of 8 complete/)).toBeInTheDocument();

  fireEvent.click(item);
  expect(screen.getByText(/0 of 8 complete/)).toBeInTheDocument();
});

test("protocol completion persists across remount", () => {
  const { unmount } = render(<App />);
  goTo("Today");
  fireEvent.click(screen.getByRole("button", { name: /Morning sunlight/ }));
  unmount();

  render(<App />);
  goTo("Today");
  expect(screen.getByRole("button", { name: /Morning sunlight/ }))
    .toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText(/1 of 8 complete/)).toBeInTheDocument();
});

test("vitals check-in saves and appears in history", () => {
  render(<App />);
  goTo("Vitals");
  expect(screen.getByText("Today's check-in")).toBeInTheDocument();

  const saveBtn = screen.getByRole("button", { name: "Save check-in" });
  expect(saveBtn).toBeDisabled();

  fireEvent.change(screen.getByLabelText(/Hours of sleep/), { target: { value: "8" } });
  fireEvent.click(screen.getByRole("button", { name: "Energy level 4" }));
  fireEvent.click(screen.getByRole("button", { name: "Great" }));
  expect(saveBtn).toBeEnabled();
  fireEvent.click(saveBtn);

  expect(screen.getByText(/Last 7 days/i)).toBeInTheDocument();
  expect(screen.getByText(/8h sleep/)).toBeInTheDocument();
  expect(screen.getByText(/energy 4\/5/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Update check-in" })).toBeInTheDocument();
});

test("center screen shows practice facts, programs, and care team", () => {
  render(<App />);
  goTo("Center");
  expect(screen.getAllByText(/Gurnee/).length).toBeGreaterThan(0);
  expect(screen.getByText(/www\.shapethewave\.com/)).toBeInTheDocument();
  expect(screen.getAllByText(/Dr\. Paul Tack/).length).toBeGreaterThan(0);
  expect(screen.getByText(/Julia Gekhter, LCSW/)).toBeInTheDocument();
  expect(screen.getByText(/Surge/)).toBeInTheDocument();
  expect(screen.getByText(/Revive/)).toBeInTheDocument();
  expect(screen.getByText(/CBC, CMP, and A1C/)).toBeInTheDocument();
});
