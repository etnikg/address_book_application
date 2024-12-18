import { StorageService } from '../../services/StorageService';
import { Contact } from '../../types';

describe('StorageService', () => {
  let storageService: StorageService;
  let mockContacts: Contact[];

  beforeEach(() => {
    storageService = new StorageService();
    mockContacts = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        country: 'US'
      }
    ];
    localStorage.clear();
  });

  it('saves contacts to localStorage', () => {
    storageService.saveContacts(mockContacts);
    
    const stored = localStorage.getItem('address_book_contacts');
    expect(stored).toBe(JSON.stringify(mockContacts));
  });

  it('retrieves contacts from localStorage', () => {
    localStorage.setItem('address_book_contacts', JSON.stringify(mockContacts));
    
    const contacts = storageService.getContacts();
    expect(contacts).toEqual(mockContacts);
  });

  it('returns empty array when no contacts exist', () => {
    const contacts = storageService.getContacts();
    expect(contacts).toEqual([]);
  });

  it('handles invalid JSON in localStorage', () => {
    localStorage.setItem('address_book_contacts', 'invalid-json');
    
    expect(() => storageService.getContacts()).not.toThrow();
    expect(storageService.getContacts()).toEqual([]);
  });
});
