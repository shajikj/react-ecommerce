import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./ProductView.css";

const defaultDescription =
  "Designed for confident performance, with a secure fit and dependable comfort from training through match day.";

const reviewsApiUrl = "http://localhost/react-backend/api/reviews";

async function loadProductReviews(productId, signal) {
  const response = await fetch(
    `${reviewsApiUrl}/list.php?product_id=${encodeURIComponent(productId)}`,
    { credentials: "include", signal },
  );
  const data = await response.json();

  if (!response.ok || !data.status || !Array.isArray(data.data)) {
    throw new Error(data.message || "Unable to load product reviews.");
  }

  return data.data.map((review) => ({
    id: review.review_id,
    name: review.customer_name || "Customer",
    text: review.review_text,
    rating: Number(review.rating),
    date: review.review_date || review.created_at || review.date || "",
  }));
}

function formatReviewDate(date) {
  if (!date) return "";

  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString();
}

function ProductView({
  product,
  products,
  customer,
  onBack,
  onProductSelect,
  addToCart: handleAddToCart,
}) {
  const productImages = product.images?.length
    ? product.images
    : [product.image];
  const [activeImage, setActiveImage] = useState(productImages[0]);
  const [zoomPosition, setZoomPosition] = useState(null);
  const [selectedSize, setSelectedSize] = useState("8");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [reviewData, setReviewData] = useState(() => ({
    productId: product?.id,
    reviews: [],
    isLoading: true,
    error: "",
  }));
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  useEffect(() => {
    if (!product?.id) return undefined;

    const controller = new AbortController();
    loadProductReviews(product.id, controller.signal)
      .then((loadedReviews) => {
        setReviewData({
          productId: product.id,
          reviews: loadedReviews,
          isLoading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Review fetch failed:", error);
          setReviewData({
            productId: product.id,
            reviews: [],
            isLoading: false,
            error: error.message || "Unable to load product reviews.",
          });
        }
      });

    return () => controller.abort();
  }, [product?.id]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const currentReviewData =
    reviewData.productId === product?.id
      ? reviewData
      : { reviews: [], isLoading: true, error: "" };
  const { reviews, isLoading: isLoadingReviews, error: reviewError } =
    currentReviewData;
  const customerId = customer?.id ?? customer?.customer_id;
  const customerName = customer?.name ?? customer?.customer_name ?? "";
  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
  }));
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
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

  const submitReview = async (event) => {
    event.preventDefault();
    const text = reviewText.trim();

    if (!customerId) {
      setReviewMessage("Please sign in before submitting a review.");
      return;
    }

    if (reviewRating < 1 || reviewRating > 5) {
      setReviewMessage("Please select a rating from 1 to 5 stars.");
      return;
    }

    if (!text) {
      setReviewMessage("Please enter your review.");
      return;
    }

    setIsSubmittingReview(true);
    setReviewMessage("");
    try {
      const response = await fetch(`${reviewsApiUrl}/create.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          product_id: product.id,
          customer_id: customerId,
          rating: reviewRating,
          review_text: text,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || "Unable to submit your review.");
      }

      setReviewText("");
      setReviewRating(0);
      try {
        const updatedReviews = await loadProductReviews(product.id);
        setReviewData({
          productId: product.id,
          reviews: updatedReviews,
          isLoading: false,
          error: "",
        });
        setReviewMessage("Thanks for sharing your review.");
      } catch (error) {
        console.error("Reviews could not be refreshed:", error);
        setReviewMessage(
          "Your review was submitted, but the reviews could not be refreshed.",
        );
      }
    } catch (error) {
      console.error("Review submission failed:", error);
      setReviewMessage(error.message || "Unable to submit your review.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const updateZoomPosition = (event) => {
    if (
      !window.matchMedia(
        "(min-width: 801px) and (hover: hover) and (pointer: fine)",
      ).matches
    ) {
      return;
    }

    const image = event.currentTarget;
    if (!image.naturalWidth || !image.naturalHeight) return;

    const imageContainer = image.parentElement;
    if (!imageContainer) return;

    const containerBounds = imageContainer.getBoundingClientRect();
    const imageBounds = {
      left: containerBounds.left + image.offsetLeft,
      top: containerBounds.top + image.offsetTop,
      width: image.offsetWidth,
      height: image.offsetHeight,
    };
    const imageAspectRatio = image.naturalWidth / image.naturalHeight;
    const imageBoxAspectRatio = imageBounds.width / imageBounds.height;
    const contentWidth =
      imageAspectRatio > imageBoxAspectRatio
        ? imageBounds.width
        : imageBounds.height * imageAspectRatio;
    const contentHeight =
      imageAspectRatio > imageBoxAspectRatio
        ? imageBounds.width / imageAspectRatio
        : imageBounds.height;
    const contentLeft =
      imageBounds.left + (imageBounds.width - contentWidth) / 2;
    const contentTop =
      imageBounds.top + (imageBounds.height - contentHeight) / 2;
    const imageX = Math.min(
      1,
      Math.max(0, (event.clientX - contentLeft) / contentWidth),
    );
    const imageY = Math.min(
      1,
      Math.max(0, (event.clientY - contentTop) / contentHeight),
    );

    setZoomPosition({
      x:
        (((imageBounds.width - contentWidth) / 2 + imageX * contentWidth) /
          imageBounds.width) *
        100,
      y:
        (((imageBounds.height - contentHeight) / 2 + imageY * contentHeight) /
          imageBounds.height) *
        100,
    });
  };

  return (
    <main className="product-view">
      <div className="product-view-container">
        <button type="button" className="product-view-back" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to products
        </button>

        <section className="product-view-layout">
          <div className="product-gallery">
            <div
              className={`product-gallery-main${
                zoomPosition ? " is-zoom-active" : ""
              }`}
            >
              <span className="product-gallery-caption">
                BUILT FOR YOUR GAME
              </span>
              <img
                src={activeImage}
                alt={product.name}
                onMouseEnter={updateZoomPosition}
                onMouseMove={updateZoomPosition}
                onMouseLeave={() => setZoomPosition(null)}
                style={{
                  transformOrigin: zoomPosition
                    ? `${zoomPosition.x}% ${zoomPosition.y}%`
                    : "center",
                }}
              />
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
              <h2>Customer Reviews</h2>
              <p className="product-reviews-intro">
                Tried it on the pitch? Share your experience with other players.
              </p>
            </div>
            <div className="product-reviews-count" aria-live="polite">
              <strong>{reviews.length}</strong>
              <span>{reviews.length === 1 ? "review" : "reviews"}</span>
            </div>
          </div>

          <div className="product-review-summary">
            <div className="product-review-average">
              <strong>{averageRating.toFixed(1)} ★</strong>
              <span>
                Based on {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
            <div className="product-review-breakdown">
              {ratingCounts.map(({ rating, count }) => (
                <div className="product-review-breakdown-row" key={rating}>
                  <span>{rating} ★</span>
                  <span
                    className="product-review-breakdown-track"
                    aria-hidden="true"
                  >
                    <span
                      style={{
                        width: reviews.length
                          ? `${(count / reviews.length) * 100}%`
                          : "0%",
                      }}
                    />
                  </span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="product-reviews-content">
            <div
              className="product-review-list"
              aria-live="polite"
              aria-busy={isLoadingReviews}
            >
              {isLoadingReviews ? (
                <p className="product-reviews-status">Loading reviews...</p>
              ) : reviewError ? (
                <p className="product-reviews-status" role="alert">
                  {reviewError}
                </p>
              ) : reviews.length ? (
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
                    <time
                      className="product-review-date"
                      dateTime={review.date || undefined}
                    >
                      {formatReviewDate(review.date) || "Date unavailable"}
                    </time>
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

            {customerId ? (
              <form className="product-review-form" onSubmit={submitReview}>
                <h3>Write a Review</h3>
                <label htmlFor="product-review-name">Your name</label>
                <input
                  id="product-review-name"
                  name="name"
                  value={customerName}
                  readOnly
                />
                <fieldset className="product-review-rating">
                  <legend>Your rating</legend>
                  <div>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        type="button"
                        key={rating}
                        className={rating <= reviewRating ? "selected" : ""}
                        onClick={() => {
                          setReviewRating(rating);
                          setReviewMessage("");
                        }}
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
                  onChange={(event) => {
                    setReviewText(event.target.value);
                    setReviewMessage("");
                  }}
                  required
                />
                <button
                  type="submit"
                  className="product-review-submit"
                  disabled={isSubmittingReview}
                >
                  {isSubmittingReview ? "SUBMITTING..." : "SUBMIT REVIEW"}
                </button>
                {reviewMessage && (
                  <p className="product-review-message" role="status">
                    {reviewMessage}
                  </p>
                )}
                <p className="product-review-disclaimer">
                  Reviews are linked to your signed-in customer account.
                </p>
              </form>
            ) : (
              <div className="product-review-sign-in">
                <h3>Write a Review</h3>
                <p>Sign in to share your experience with this product.</p>
              </div>
            )}
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
