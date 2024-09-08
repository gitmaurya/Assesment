import React, { useContext, useState,useEffect } from 'react';
import { ProductContext } from '../Context/ProductContext';

import SearchBar from './SearchBar';
import Filters from './Filters';
import Pagination from './Pagination';
import ProductDetailsModal from './ProductDetailsModal';



const ProductList = () => {
  const { products, error } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (query) => {
    setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())));
  };

  const handleFilter = (filters) => {
    const { priceRange, popularityRange } = filters;
    const filtered = products.filter(product => {
      const price = parseFloat(product.price);
      const popularity = parseFloat(product.popularity);

      const inPriceRange = priceRange ? (price >= priceRange.min && price <= priceRange.max) : true;
      const inPopularityRange = popularityRange ? (popularity >= popularityRange.min && popularity <= popularityRange.max) : true;

      return inPriceRange && inPopularityRange;
    });
    setFilteredProducts(filtered);
  };

  const handleSort = (sortType) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortType === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
      if (sortType === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
      if (sortType === 'popularity-asc') return parseFloat(a.popularity) - parseFloat(b.popularity);
      if (sortType === 'popularity-desc') return parseFloat(b.popularity) - parseFloat(a.popularity);
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container">
      <header className="page-header">
        <h1>Product Dashboard</h1>
      </header>
      {error && <p className="error-message">{error}</p>}
      <SearchBar onSearch={handleSearch} />
      <Filters onFilter={handleFilter} onSort={handleSort} />
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Popularity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map(product => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.popularity}</td>
                <td>
                  <button className="view-button" onClick={() => handleViewClick(product)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      {modalOpen && <ProductDetailsModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductList;
