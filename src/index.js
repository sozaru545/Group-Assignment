import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this
import App from './App';
import './index.css';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap your app here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
