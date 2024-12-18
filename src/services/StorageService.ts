import { Contact } from '../models/Contact';

export class StorageService {
  private STORAGE_KEY = 'address_book_contacts';

  saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
  }

  getContacts(): Contact[] {
    const contacts = localStorage.getItem(this.STORAGE_KEY);
    if (!contacts) return [];
    
    try {
      return JSON.parse(contacts);
    } catch {
      return [];
    }
  }
}
