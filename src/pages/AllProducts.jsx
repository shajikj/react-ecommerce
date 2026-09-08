import "./AllProducts.css";
import ProductCard from "../components/ProductCard";

function AllProducts({ products, onProductSelect }) {
  return (
    <section className="all-products-page">
      <div className="all-products-container">

        <div className="all-products-header">
          <h1>ALL PRODUCTS</h1>
          <p>Explore our complete collection</p>
        </div>

        <div className="all-products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product} 
              onSelect={onProductSelect}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default AllProducts;