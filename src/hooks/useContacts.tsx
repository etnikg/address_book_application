import { useState, useCallback, useEffect } from 'react';
import { Contact } from '../models/Contact';
import { StorageService } from '../services/StorageService';

const storageService = new StorageService();

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedContacts = storageService.getContacts();
      setContacts(savedContacts);
    } catch (err) {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveContact = useCallback((contact: Contact) => {
    try {
      if (isDuplicateEmail(contact.email, contact.id)) {
        throw new Error('duplicate_email');
      }

      const newContacts = contact.id 
        ? contacts.map(c => c.id === contact.id ? contact : c)
        : [...contacts, { ...contact, id: Date.now().toString() }];
      
      setContacts(newContacts);
      storageService.saveContacts(newContacts);
    } catch (err) {
      if (err instanceof Error && err.message === 'duplicate_email') {
        throw err;
      }
      setError('Failed to save contact');
      throw new Error('save_failed');
    }
  }, [contacts]);

  const deleteContact = useCallback((id: string) => {
    try {
      const newContacts = contacts.filter(c => c.id !== id);
      setContacts(newContacts);
      storageService.saveContacts(newContacts);
    } catch (err) {
      setError('Failed to delete contact');
      throw err;
    }
  }, [contacts]);

  const isDuplicateEmail = (email: string, currentId?: string) => {
    return contacts.some(contact => 
      contact.email.toLowerCase() === email.toLowerCase() && contact.id !== currentId
    );
  };

  return {
    contacts,
    loading,
    error,
    saveContact,
    deleteContact
  };
};
