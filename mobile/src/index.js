import React from 'react';
import {StatusBar} from 'react-native';
import './config/ReactotronConfig';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './store';

import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="# F5F5F5" />
        <App />
      </PersistGate>
    </Provider>
  );
}