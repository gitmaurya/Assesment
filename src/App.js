import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './Context/ProductContext';
import Dashboard from './Pages/Dashboard';
import ProductDetails from './Pages/ProductDetails';
import './App.css';

const App = () => (
  <ProductProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  </ProductProvider>
);

export default App;
