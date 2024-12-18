import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ContactForm } from '../../components/ContactForm';
import { VALIDATION_MESSAGES } from '../../constants/general';
import { Contact } from '../../types';

const mockContact: Contact = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  country: 'US'
};

const mockSave = jest.fn();
const history = createMemoryHistory();

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <Router history={history}>
        {component}
      </Router>
    );
  };

  it('renders empty form in add mode', () => {
    renderWithRouter(<ContactForm onSave={mockSave} />);
    
    expect(screen.getByText('Add Contact')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toHaveValue('');
    expect(screen.getByLabelText('Last Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Country')).toHaveValue('');
  });

  it('shows validation errors for empty fields', async () => {
    renderWithRouter(<ContactForm onSave={mockSave} />);
    
    fireEvent.click(screen.getByText('Save Contact'));

    await waitFor(() => {
      const firstNameError = screen.getByText('This field is required', { selector: '#firstName + .error' });
      const lastNameError = screen.getByText('This field is required', { selector: '#lastName + .error' });
      const emailError = screen.getByText('This field is required', { selector: '#email + .error' });
      
      expect(firstNameError).toBeInTheDocument();
      expect(lastNameError).toBeInTheDocument();
      expect(emailError).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderWithRouter(<ContactForm onSave={mockSave} />);
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' }
    });
    fireEvent.click(screen.getByText('Save Contact'));

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_MESSAGES.EMAIL)).toBeInTheDocument();
    });
  });

  it('calls onSave with form data when valid', async () => {
    renderWithRouter(<ContactForm onSave={mockSave} />);
    
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'US' }
    });

    fireEvent.click(screen.getByText('Save Contact'));

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith({
        id: '',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        country: 'US'
      });
    });
  });
});
