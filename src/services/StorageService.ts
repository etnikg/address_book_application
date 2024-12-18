import { Contact } from '../models/Contact';
import { STORAGE_KEY } from '../constants/general';

export class StorageService {
  saveContacts(contacts: Contact[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  getContacts(): Contact[] {
    const contacts = localStorage.getItem(STORAGE_KEY);
    if (!contacts) return [];
    
    try {
      return JSON.parse(contacts);
    } catch {
      return [];
    }
  }
}
