import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react.js';
import { persistor, store } from './store/redux/store.js';
import QueryProvider from './services/providers/query-provider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <App />
        </PersistGate>
      </Provider>
    </QueryProvider>
  </StrictMode>
);
