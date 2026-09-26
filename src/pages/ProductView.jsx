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
  const [selectedSize, setSelectedSize] = useState("8");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState("");
  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
    : 0;

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

  const submitReview = (event) => {
    event.preventDefault();
    const name = reviewName.trim();
    const text = reviewText.trim();

    if (!name || !text) {
      setReviewMessage("Please enter your name and review.");
      return;
    }

    setReviews((currentReviews) => [
      {
        id: `${Date.now()}-${currentReviews.length}`,
        name,
        text,
        rating: reviewRating,
      },
      ...currentReviews,
    ]);
    setReviewName("");
    setReviewText("");
    setReviewRating(5);
    setReviewMessage("Thanks for sharing your review.");
  };

  return (
    <main className="product-view">
      <div className="product-view-container">
        <button type="button" className="product-view-back" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to products
        </button>

        <section className="product-view-layout">
          <div className="product-gallery">
            <div className="product-gallery-main">
              <span className="product-gallery-caption">BUILT FOR YOUR GAME</span>
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
                    aria-pressed={activeImage === image}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-purchase-details">
            <p className="product-view-label">
              {product.categoryName || "FOOTBALL SHOES"}
            </p>
            <h1>{product.name}</h1>
            <p className="product-view-price">₹{product.price}</p>
            <a className="product-view-rating" href="#product-reviews">
              <span aria-hidden="true">
                {"★".repeat(Math.round(averageRating))}
                {"☆".repeat(5 - Math.round(averageRating))}
              </span>
              <span>
                {reviews.length
                  ? `${reviews.length} ${
                      reviews.length === 1 ? "review" : "reviews"
                    }`
                  : "Be the first to review"}
              </span>
            </a>
            <div className="product-view-description">
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description || defaultDescription,
                }}
              />
            </div>
            <div className="product-option-group">
              <div className="product-option-heading">
                <span>Choose your size</span>
                <button type="button">Size guide</button>
              </div>
              <div className="product-size-options">
                {["6", "7", "8", "9", "10"].map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={selectedSize === size ? "selected" : ""}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
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
                <span aria-live="polite">{quantity}</span>
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
            <div className="product-purchase-note">
              <span aria-hidden="true">✓</span>
              Easy returns within 7 days
            </div>
          </div>
        </section>

        <section className="product-specifications">
          <div className="product-section-heading">
            <p className="product-view-label">THE DETAILS</p>
            <h2>Made for every move</h2>
          </div>
          <dl>
            <div>
              <dt>Category</dt>
              <dd>{product.categoryName || "Football shoes"}</dd>
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

        <section className="product-reviews-section" id="product-reviews">
          <div className="product-reviews-heading">
            <div>
              <p className="product-view-label">PLAYER FEEDBACK</p>
              <h2>Product reviews</h2>
              <p className="product-reviews-intro">
                Tried it on the pitch? Share your experience with other players.
              </p>
            </div>
            <div className="product-reviews-count" aria-live="polite">
              <strong>{reviews.length}</strong>
              <span>{reviews.length === 1 ? "review" : "reviews"}</span>
            </div>
          </div>

          <div className="product-reviews-content">
            <div className="product-review-list">
              {reviews.length ? (
                reviews.map((review) => (
                  <article className="product-review-card" key={review.id}>
                    <div className="product-review-card-heading">
                      <strong>{review.name}</strong>
                      <span aria-label={`${review.rating} out of 5 stars`}>
                        {"★".repeat(review.rating)}
                        <span className="product-review-empty-stars">
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </span>
                    </div>
                    <p>{review.text}</p>
                  </article>
                ))
              ) : (
                <div className="product-reviews-empty">
                  <span aria-hidden="true">✳</span>
                  <h3>No reviews yet</h3>
                  <p>Be the first to tell us what you think.</p>
                </div>
              )}
            </div>

            <form className="product-review-form" onSubmit={submitReview}>
              <h3>Write a review</h3>
              <label htmlFor="product-review-name">Your name</label>
              <input
                id="product-review-name"
                name="name"
                autoComplete="name"
                maxLength={60}
                value={reviewName}
                onChange={(event) => setReviewName(event.target.value)}
                required
              />
              <fieldset className="product-review-rating">
                <legend>Your rating</legend>
                <div>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      type="button"
                      key={rating}
                      className={rating <= reviewRating ? "selected" : ""}
                      onClick={() => setReviewRating(rating)}
                      aria-label={`${rating} star${rating === 1 ? "" : "s"}`}
                      aria-pressed={reviewRating === rating}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </fieldset>
              <label htmlFor="product-review-text">Your review</label>
              <textarea
                id="product-review-text"
                name="review"
                rows="4"
                maxLength={1000}
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                required
              />
              <button type="submit" className="product-review-submit">
                POST REVIEW
              </button>
              {reviewMessage && (
                <p className="product-review-message" role="status">
                  {reviewMessage}
                </p>
              )}
              <p className="product-review-disclaimer">
                Reviews are shown on this page for this visit.
              </p>
            </form>
          </div>
        </section>

        <section className="related-products-section">
          <div className="related-products-heading">
            <p className="product-view-label">KEEP EXPLORING</p>
            <h2>You may also like</h2>
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
      </div>
    </main>
  );
}

export default ProductView;
