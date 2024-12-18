import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ContactList } from './components/ContactList';
import { ContactForm } from './components/ContactForm';
import { Navigation } from './components/Navigation';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useContacts } from './hooks/useContacts';
import { ROUTES } from './constants/general';
import { LoadingSpinner } from './components/common/LoadingSpinner';

export const App: React.FC = () => {
  const { contacts, loading, error, saveContact, deleteContact } = useContacts();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Navigation />
          <Switch>
            <Route 
              exact 
              path={ROUTES.HOME}
              render={() => (
                <ContactList 
                  contacts={contacts} 
                  onDelete={deleteContact} 
                />
              )}
            />
            <Route 
              path={ROUTES.ADD}
              render={() => (
                <ContactForm onSave={saveContact} />
              )}
            />
            <Route 
              path={ROUTES.EDIT}
              render={() => (
                <ContactForm 
                  contacts={contacts} 
                  onSave={saveContact} 
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </ErrorBoundary>
  );
};
