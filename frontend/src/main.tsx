import { ApolloProvider } from '@apollo/client/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';

import App from './App';
import { client } from './lib/client';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Toaster
        position="top-right"
        expand={true}
        richColors={false}
        closeButton={true}
        theme="dark"
        toastOptions={{
          style: {
            background: '#080f22',
            color: '#f1f5f9',
            border: '1px solid #1e293b',
            borderRadius: '12px',
          },
          className: 'font-sans',
        }}
      />
    </ApolloProvider>
  </React.StrictMode>
);
