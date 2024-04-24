

// Example product data
const products = [
  { id: 1, name: 'Coffee', description: 'Freshly brewed coffee', price: '$2.99' },
  { id: 2, name: 'Tea', description: 'Organic green tea', price: '$2.49' },
  { id: 3, name: 'Croissant', description: 'Buttery and flaky', price: '$3.99' },
  // Add more products as needed
];

function Products() {
  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
