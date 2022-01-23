import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from "@shopify/polaris";
import './index.css';
import App from './App';
import "@shopify/polaris/build/esm/styles.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider theme={{ colorScheme: "light" }}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);