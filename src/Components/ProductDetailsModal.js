import React from 'react';


const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-close" onClick={onClose}>×</div>
        <h2>{product.title}</h2>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Popularity:</strong> {product.popularity}</p>
        <p><strong>Description:</strong> {product.description || 'No description available'}</p>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
