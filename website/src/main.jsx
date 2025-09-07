import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // ✅ Import provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>  {/* ✅ Wrap your app */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
