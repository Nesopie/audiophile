import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import ProductsPage from './components/productsPage';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
        <Routes>
            <Route 
                path="/" 
                element={<App />} 
            />
            <Route 
                path="/products/:category"
                element={<ProductsPage />} 
            />
        </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);