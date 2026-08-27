function ProductCard({ product }) {
  return (
    <div className="product-card">

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