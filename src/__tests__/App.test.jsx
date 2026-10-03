import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../hooks/useAuth';

// Mock the API modules to avoid network calls
jest.mock('../api/tasks', () => ({
  fetchTasks: jest.fn().mockResolvedValue([
    { id: 1, title: 'Test Task', completed: false },
  ]),
  deleteTask: jest.fn(),
  createTask: jest.fn(),
}));

jest.mock('../api/auth', () => ({
  login: jest.fn().mockResolvedValue('mock-jwt-token'),
}));

test('renders login page when not authenticated', async () => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </AuthProvider>
  );

  // Should show login form
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
});

test('renders task list after successful login', async () => {
  // Pre‑populate token in localStorage
  localStorage.setItem('jwt_token', 'mock-jwt-token');

  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </AuthProvider>
  );

  // Wait for tasks to load
  await waitFor(() => {
    expect(screen.getByText(/your tasks/i)).toBeInTheDocument();
  });

  // Verify a mocked task appears
  expect(screen.getByText('Test Task')).toBeInTheDocument();
});