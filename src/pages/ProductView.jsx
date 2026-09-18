import { useState } from "react";
import ProductCard from "../components/ProductCard";
import "./ProductView.css";

const defaultDescription =
  "Designed for confident performance, with a secure fit and dependable comfort from training through match day.";

function ProductView({
  product,
  products,
  onBack,
  onProductSelect,
  addToCart: handleAddToCart,
}) {
  const productImages = product.images?.length
    ? product.images
    : [product.image];
  const [activeImage, setActiveImage] = useState(productImages[0]);
  const [selectedSize, setSelectedSize] = useState("UK 8");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  const addToCart = () => {
    handleAddToCart({
      ...product,
      selectedSize,
      quantity,
    });

    setMessage(
      `${quantity} ${quantity === 1 ? "item" : "items"} added to cart.`,
    );
  };

  return (
    <main className="product-view">
      <button type="button" className="product-view-back" onClick={onBack}>
        ← Back to products
      </button>

      <section className="product-view-layout">
        <div className="product-gallery">
          <div className="product-gallery-main">
            <img src={activeImage} alt={product.name} />
          </div>

          {productImages.length > 1 && (
            <div
              className="product-gallery-thumbnails"
              aria-label="Product images"
            >
              {productImages.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={activeImage === image ? "active" : ""}
                  onClick={() => setActiveImage(image)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-purchase-details">
          <p className="product-view-label">FOOTBALL SHOES</p>
          <h1>{product.name}</h1>
          <p className="product-view-price">₹{product.price}</p>
          <p
            className="product-view-rating"
            aria-label="Rated 4.8 out of 5 stars"
          >
            ★★★★★ <span>4.8 (24 reviews)</span>
          </p>
          <div className="product-view-description">
            <div
              dangerouslySetInnerHTML={{
                __html: product.description || defaultDescription,
              }}
            />
          </div>
          <div className="product-option-group">
            <div className="product-option-heading">
              <span>Size</span>
              <button type="button">Size guide</button>
            </div>
            <div className="product-size-options">
              {["6", "7", "8", "9", "10"].map((size) => (
                <button
                  type="button"
                  key={size}
                  className={selectedSize === size ? "selected" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-action-row">
            <div className="quantity-selector" aria-label="Quantity selector">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="product-action-button product-add-button"
              onClick={addToCart}
            >
              ADD TO CART
            </button>
          </div>
          <button
            type="button"
            className="product-action-button product-buy-button"
            onClick={addToCart}
          >
            BUY NOW
          </button>
          {message && (
            <p className="product-action-message" role="status">
              {message}
            </p>
          )}
        </div>
      </section>

      <section className="product-specifications">
        <h2>Product details</h2>
        <dl>
          <div>
            <dt>Category</dt>
            <dd>Football shoes</dd>
          </div>
          <div>
            <dt>Fit</dt>
            <dd>Regular fit</dd>
          </div>
          <div>
            <dt>Upper</dt>
            <dd>Durable synthetic upper</dd>
          </div>
          <div>
            <dt>Care</dt>
            <dd>Wipe clean with a dry cloth</dd>
          </div>
        </dl>
      </section>

      <section className="related-products-section">
        <div>
          <p className="product-view-label">YOU MAY ALSO LIKE</p>
          <h2>Related products</h2>
        </div>
        <div className="related-products-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              onSelect={onProductSelect}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductView;
