import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/montserrat';
import '@fontsource-variable/noto-sans-thai';
import '@fontsource-variable/noto-sans-devanagari';
import '@fontsource-variable/noto-sans-sc';
import '@fontsource-variable/noto-sans-kr';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
