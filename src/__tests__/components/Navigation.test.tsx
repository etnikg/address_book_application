import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';

describe('Navigation', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders navigation links', () => {
    renderWithRouter(<Navigation />);
    
    expect(screen.getByText('Contact List')).toHaveAttribute('href', '/');
    expect(screen.getByText('Add Contact')).toHaveAttribute('href', '/add');
  });

  it('has correct accessibility attributes', () => {
    renderWithRouter(<Navigation />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
