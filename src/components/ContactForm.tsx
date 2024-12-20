import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormData, FormErrors, ContactFormProps } from '../types';
import { validateEmail, validateRequired } from '../utils/validation';
import { getNames, getCode } from 'country-list';
import { VALIDATION_MESSAGES } from '../constants/general';
import { FormInput } from './common/FormInput';

export const ContactForm: React.FC<ContactFormProps> = ({ contacts, onSave }) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    country: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const countries = getNames().map(name => ({ name, code: getCode(name) }));
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && contacts) {
      const contact = contacts.find(c => c.id === id);
      if (contact) {
        setFormData({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          country: contact.country
        });
      }
    }
  }, [id, contacts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    if (!validateRequired(formData.firstName)) {
      newErrors.firstName = VALIDATION_MESSAGES.REQUIRED;
    }
    
    if (!validateRequired(formData.lastName)) {
      newErrors.lastName = VALIDATION_MESSAGES.REQUIRED;
    }
    
    if (!validateRequired(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.REQUIRED;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.EMAIL;
    }
    
    if (!validateRequired(formData.country)) {
      newErrors.country = VALIDATION_MESSAGES.COUNTRY;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        onSave({
          id: id || '',
          ...formData
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Error && error.message === 'duplicate_email') {
          setErrors(prev => ({
            ...prev,
            email: VALIDATION_MESSAGES.DUPLICATE_EMAIL
          }));
        }
      }
    }
  }, [formData, validateForm, onSave, history, id]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>{id ? 'Edit Contact' : 'Add Contact'}</h2>
      
      <FormInput
        label="First Name"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        error={errors.firstName}
      />

      <FormInput
        label="Last Name"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        error={errors.lastName}
      />

      <FormInput
        label="Email"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <div className="custom-select" ref={dropdownRef}>
          <button
            type="button"
            id="country"
            onClick={() => setIsOpen(!isOpen)}
            className="select-button"
            aria-label="Select country"
            data-empty={!formData.country}
          >
            {formData.country 
              ? countries.find(c => c.code === formData.country)?.name || 'Select a country'
              : 'Select a country'}
          </button>
          {isOpen && (
            <div className="select-dropdown">
              {countries.map(country => (
                <button
                  type="button"
                  key={country.code}
                  onClick={() => {
                    handleInputChange({
                      target: { name: 'country', value: country.code }
                    } as React.ChangeEvent<HTMLSelectElement>);
                    setIsOpen(false);
                  }}
                  className={`option ${formData.country === country.code ? 'selected' : ''}`}
                >
                  {country.name || 'Unknown country'}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.country && <span className="error">{errors.country}</span>}
      </div>

      <button type="submit">Save Contact</button>
    </form>
  );
};
