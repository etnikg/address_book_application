import { Contact } from './models';

// Component Props
export interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
}

export interface ContactFormProps {
  contacts?: Contact[];
  onSave: (contact: Contact) => void;
}

export interface ContactCardProps {
  contact: Contact;
  onDelete: (id: string) => void;
}

export interface NavigationProps {
  // Empty for now, but makes it easier to add props later
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
