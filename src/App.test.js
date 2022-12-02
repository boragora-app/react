import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Car title', () => {
  render(<App />);
  const element = screen.getByText(/Car/);
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('navbar-brand');
});
