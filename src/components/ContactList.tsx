import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactListProps } from '../types';
import { ContactCard } from './ContactCard';
import { ConfirmDialog } from './common/ConfirmDialog';
import { ROUTES, DIALOG_MESSAGES } from '../constants/general';

export const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete }) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="contact-list" role="main">
        <h2>Contacts</h2>
        {contacts.length === 0 ? (
          <p>No contacts found. Add some!</p>
        ) : (
          contacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={handleDelete}
            />
          ))
        )}
        <Link to={ROUTES.ADD}>
          <button>Add New Contact</button>
        </Link>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title={DIALOG_MESSAGES.DELETE_CONTACT.TITLE}
        message={DIALOG_MESSAGES.DELETE_CONTACT.MESSAGE}
      />
    </>
  );
};
