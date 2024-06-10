import React from 'react';
import ReactDOM from 'react-dom/client';
import NoteTaker from './components/NoteTaker';
import './global.css';
//import Backend from './backend/NoteTakerBackend';

const root = ReactDOM.createRoot(document.getElementById('root'));
//const backend = Backend();
root.render(
  <React.StrictMode>
    <NoteTaker />
  </React.StrictMode>
);
