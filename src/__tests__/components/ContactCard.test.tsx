import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContactCard } from '../../components/ContactCard';

const mockContact = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  country: 'US'
};

const mockDelete = jest.fn();

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ContactCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders contact information correctly', () => {
    renderWithRouter(<ContactCard contact={mockContact} onDelete={mockDelete} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Country: US')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    renderWithRouter(<ContactCard contact={mockContact} onDelete={mockDelete} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  it('has edit link with correct URL', () => {
    renderWithRouter(<ContactCard contact={mockContact} onDelete={mockDelete} />);
    
    const editLink = screen.getByText('Edit').closest('a');
    expect(editLink).toHaveAttribute('href', '/edit/1');
  });
});
