import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContactList } from '../../components/ContactList';
import { DIALOG_MESSAGES } from '../../constants/general';

const mockContacts = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    country: 'US'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    country: 'UK'
  }
];

const mockDelete = jest.fn();

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ContactList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state message when no contacts', () => {
    renderWithRouter(<ContactList contacts={[]} onDelete={mockDelete} />);
    expect(screen.getByText('No contacts found. Add some!')).toBeInTheDocument();
  });

  it('renders all contacts when provided', () => {
    renderWithRouter(<ContactList contacts={mockContacts} onDelete={mockDelete} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('shows confirmation dialog when delete is clicked', () => {
    renderWithRouter(<ContactList contacts={mockContacts} onDelete={mockDelete} />);
    
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(screen.getByText(DIALOG_MESSAGES.DELETE_CONTACT.TITLE)).toBeInTheDocument();
  });

  it('has add contact button with correct link', () => {
    renderWithRouter(<ContactList contacts={mockContacts} onDelete={mockDelete} />);
    
    const addButton = screen.getByText('Add New Contact').closest('a');
    expect(addButton).toHaveAttribute('href', '/add');
  });
});
