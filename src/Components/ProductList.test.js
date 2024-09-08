import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import { ProductProvider } from '../Context/ProductContext';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  // For additional matchers

test('displays products from dummy data', async () => {
  render(
    <ProductProvider>
      <ProductList />
    </ProductProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Apple iPhone 3GS 16GB/)).toBeInTheDocument();
    expect(screen.getByText(/Micromax Bling Q55/)).toBeInTheDocument();
  });
});

