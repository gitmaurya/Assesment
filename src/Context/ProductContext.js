import React, { createContext, useState, useEffect } from 'react';
import productsData from '../data/product.js'


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Transform dummy data into an array
      const productArray = Object.keys(productsData.products).map(key => ({
        id: key,
        ...productsData.products[key]
      }));
      setProducts(productArray);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ products, error }}>
      {children}
    </ProductContext.Provider>
  );
};

