import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants/general';

export const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink 
            exact
            to={ROUTES.HOME}
            activeClassName="active"
          >
            Contact List
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={ROUTES.ADD}
            activeClassName="active"
          >
            Add Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
