import React from 'react';
import { useNavigate } from 'react-router-dom';


const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <tr onClick={handleClick} className="product-item">
      <td>{product.title}</td>
      <td>${product.price}</td>
      <td>{product.popularity}</td>
    </tr>
  );
};

export default ProductItem;

