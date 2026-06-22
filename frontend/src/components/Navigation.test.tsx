import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './Navigation';

// Mock useAuth hook
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { username: 'demo', id: 1, email: 'demo@test.local', created_at: new Date().toISOString() },
    logout: vi.fn(),
  }),
}));

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Navigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render navigation bar', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    expect(screen.getByText('TaskFlow')).toBeDefined();
  });

  it('should display user username', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    expect(screen.getByText('demo')).toBeDefined();
  });

  it('should have navigation links', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByText('Projects')).toBeDefined();
    expect(screen.getByText('Tasks')).toBeDefined();
  });
});
