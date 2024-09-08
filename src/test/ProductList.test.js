import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../Components/ProductList';
import { ProductProvider } from '../Context/ProductContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

test('fetches and displays products', async () => {
  mock.onGet('https://cdn.drcode.ai/interview-materials/products.json').reply(200, [
    { id: 1, title: 'Product 1', price: 100, popularity: 5000 },
    { id: 2, title: 'Product 2', price: 200, popularity: 10000 }
  ]);

  render(
    <ProductProvider>
      <ProductList />
    </ProductProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Product 1/)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/)).toBeInTheDocument();
  });
});
