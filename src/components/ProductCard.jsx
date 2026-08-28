function ProductCard({ product, onSelect }) {
  const openProduct = () => onSelect?.(product);

  return (
    <div
      className={`product-card${onSelect ? " product-card-link" : ""}`}
      onClick={onSelect ? openProduct : undefined}
      onKeyDown={(event) => {
        if (onSelect && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          openProduct();
        }
      }}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >

      <div className="product-image-container">

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        {product.selectOptions && (
          <div className="select-options">
            SELECT OPTIONS
          </div>
        )}

      </div>

      <div className="product-details">

        <div className="product-name-price">

          <h3>{product.name}</h3>

          <span>₹{product.price}</span>

        </div>

        {product.colors && (
          <p className="product-colors">
            {product.colors}
          </p>
        )}

      </div>

    </div>
  );
}

export default ProductCard;
