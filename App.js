import React from 'react';

import Routes from './src/routes';

import {UserProvider} from './src/contexts/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}
