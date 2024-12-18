export const STORAGE_KEY = 'address_book_contacts';

export const ROUTES = {
  HOME: '/',
  ADD: '/add',
  EDIT: '/edit/:id'
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  COUNTRY: 'Please select a country',
  DUPLICATE_EMAIL: 'This email is already registered to another contact'
} as const;

export const DIALOG_MESSAGES = {
  DELETE_CONTACT: {
    TITLE: 'Delete Contact',
    MESSAGE: 'Are you sure you want to delete this contact? This action cannot be undone.',
    ARIA_LABEL: 'Confirm deletion'
  }
} as const;
