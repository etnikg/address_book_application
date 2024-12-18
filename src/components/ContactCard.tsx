import React from 'react';
import { Link } from 'react-router-dom';
import { ContactCardProps } from '../types';
import { ROUTES } from '../constants/general';

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete }) => {
  const { id, firstName, lastName, email, country } = contact;
  
  return (
    <div className="contact-card">
      <div>
        <h3>{firstName} {lastName}</h3>
        <p>Email: {email}</p>
        <p>Country: {country}</p>
      </div>
      <div className="button-group">
        <Link to={ROUTES.EDIT.replace(':id', id)}>
          <button>Edit</button>
        </Link>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
