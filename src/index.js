import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  root.render(
    <React.StrictMode>
      <div style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
      }}
      >
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Configuration Required</h1>
          <p style={{ margin: 0 }}>
            Set <code>REACT_APP_CLERK_PUBLISHABLE_KEY</code> in deployment environment variables.
          </p>
        </div>
      </div>
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <App />
      </ClerkProvider>
    </React.StrictMode>
  );
}
