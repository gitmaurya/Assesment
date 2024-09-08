import React, { useState } from 'react';

const priceRanges = [
  { label: '0-5000', value: { min: 0, max: 5000 } },
  { label: '5000-10000', value: { min: 5000, max: 10000 } },
  { label: '10000-20000', value: { min: 10000, max: 20000 } },
  { label: '20000+', value: { min: 20000, max: Infinity } },
];

const popularityRanges = [
  { label: '0-10000', value: { min: 0, max: 10000 } },
  { label: '10000-30000', value: { min: 10000, max: 30000 } },
  { label: '30000-50000', value: { min: 30000, max: 50000 } },
  { label: '50000+', value: { min: 50000, max: Infinity } },
];

const Filters = ({ onFilter, onSort }) => {
  const [priceRange, setPriceRange] = useState(priceRanges[0].value);
  const [popularityRange, setPopularityRange] = useState(popularityRanges[0].value);

  const handleApplyFilters = () => {
    onFilter({ priceRange, popularityRange });
  };

  return (
    <div className="filters">
      <div className="filter-section">
        <label htmlFor="price-range">Price Range:</label>
        <select
          id="price-range"
          value={priceRange.label}
          onChange={(e) => setPriceRange(priceRanges.find(range => range.label === e.target.value).value)}
        >
          {priceRanges.map(range => (
            <option key={range.label} value={range.label}>{range.label}</option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label htmlFor="popularity-range">Popularity Range:</label>
        <select
          id="popularity-range"
          value={popularityRange.label}
          onChange={(e) => setPopularityRange(popularityRanges.find(range => range.label === e.target.value).value)}
        >
          {popularityRanges.map(range => (
            <option key={range.label} value={range.label}>{range.label}</option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <button onClick={handleApplyFilters}>Apply Filters</button>
      </div>
    </div>
  );
};

export default Filters;
