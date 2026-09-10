import ProductCard from "../components/ProductCard";
import "./Outdoor.css";

function Outdoor({ products, onProductSelect }) {
  const outdoorProducts = products.filter((product) => product.categoryId === 2,
  );

  return (
    <main className="outdoor-page">
      <header className="outdoor-page-heading">
        <p>PLAY YOUR GAME</p>
        <h1>Outdoor</h1>
      </header>
      <section className="outdoor-products-grid" aria-label="Outdoor products">
        {outdoorProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onProductSelect}
          />
        ))}
      </section>
    </main>
  );
}

export default Outdoor;
