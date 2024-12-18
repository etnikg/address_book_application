export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
}
