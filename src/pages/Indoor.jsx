import ProductCard from "../components/ProductCard";
import "./Indoor.css";

function Indoor({ products, onProductSelect }) {
  const indoorProducts = products.filter((product) => product.category === "Indoor");

  return (
    <main className="indoor-page">
      <header className="indoor-page-heading">
        <p>PLAY YOUR GAME</p>
        <h1>Indoor</h1>
      </header>
      <section className="indoor-products-grid" aria-label="Indoor products">
        {indoorProducts.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={onProductSelect} />
        ))}
      </section>
    </main>
  );
}

export default Indoor;
