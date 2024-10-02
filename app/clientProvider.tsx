'use client';

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const persistor = isClient ? persistStore(store) : null;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !persistor) return null; // Skip rendering until the client-side is detected

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ClientProvider;
