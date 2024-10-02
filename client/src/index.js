import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/authContext';
import { FormsContextProvider } from './Context/formsContext';
import { MessagingContextProvider } from './Context/universalMessagingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MessagingContextProvider>
        <FormsContextProvider>
            <App />
        </FormsContextProvider>
      </MessagingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

