import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput: React.FC<Props> = ({ label, error, id, ...props }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input id={id} {...props} />
    {error && <span className="error">{error}</span>}
  </div>
);
