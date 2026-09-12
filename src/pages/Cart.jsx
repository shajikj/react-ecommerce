import "./Cart.css";

function Cart({
  cart = [],
  onBack,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
  onProductSelect,
}) {
  const subtotal = (cart || []).reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = subtotal > 0 ? 100 : 0;
  const discount = 0;
  const total = subtotal + shipping - discount;
  const totalItems = (cart || []).reduce(
    (count, item) => count + Number(item.quantity || 1),
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Navigation Breadcrumb / Header */}
        <div className="cart-header">
          <button type="button" className="cart-back-link" onClick={onBack}>
            <i className="bi bi-arrow-left"></i>
            <span>Continue Shopping</span>
          </button>
          <div className="cart-title-row">
            <h1>Shopping Cart</h1>
            {totalItems > 0 && (
              <span className="cart-items-badge">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <p className="cart-subtitle">
            Review your selected gear before proceeding to checkout
          </p>
        </div>

        {!cart || cart.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon-wrap">
              <i className="bi bi-bag"></i>
            </div>
            <h2>Your cart is empty</h2>
            <p>
              Looks like you haven't added any gear to your cart yet. Explore our
              collection to find the perfect footwear and equipment.
            </p>
            <button type="button" className="cart-explore-btn" onClick={onBack}>
              Explore Products
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left Column: Cart Items List */}
            <div className="cart-main">
              <div className="cart-items-card">
                <div className="cart-items-header">
                  <span>Product</span>
                  <span className="hide-on-mobile text-center">Quantity</span>
                  <span className="hide-on-mobile text-right">Total</span>
                </div>

                <div className="cart-items-list">
                  {cart.map((item) => {
                    const itemPrice = Number(item.price) || 0;
                    const itemQty = Number(item.quantity) || 1;
                    const itemTotal = itemPrice * itemQty;

                    return (
                      <div
                        className="cart-item-row"
                        key={`${item.id}-${item.selectedSize}`}
                      >
                        {/* Product Image & Details */}
                        <div className="cart-item-product">
                          <div
                            className={`cart-item-img-wrap ${
                              onProductSelect ? "clickable" : ""
                            }`}
                            onClick={() =>
                              onProductSelect && onProductSelect(item)
                            }
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="cart-item-image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/categories/football.webp";
                              }}
                            />
                          </div>

                          <div className="cart-item-details">
                            <h3
                              className={`cart-item-title ${
                                onProductSelect ? "clickable" : ""
                              }`}
                              onClick={() =>
                                onProductSelect && onProductSelect(item)
                              }
                            >
                              {item.name}
                            </h3>

                            {item.selectedSize && (
                              <div className="cart-item-meta">
                                <span className="meta-label">Size:</span>
                                <span className="meta-value">
                                  {item.selectedSize}
                                </span>
                              </div>
                            )}

                            <div className="cart-item-unit-price">
                              ₹{itemPrice.toFixed(2)} each
                            </div>

                            {/* Mobile-only Quantity and Actions row */}
                            <div className="cart-item-mobile-actions">
                              <div className="cart-qty-stepper">
                                <button
                                  type="button"
                                  className="qty-btn"
                                  onClick={() =>
                                    onUpdateQuantity &&
                                    onUpdateQuantity(
                                      item.id,
                                      item.selectedSize,
                                      -1
                                    )
                                  }
                                  disabled={itemQty <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="qty-value">{itemQty}</span>
                                <button
                                  type="button"
                                  className="qty-btn"
                                  onClick={() =>
                                    onUpdateQuantity &&
                                    onUpdateQuantity(
                                      item.id,
                                      item.selectedSize,
                                      1
                                    )
                                  }
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <span className="cart-item-mobile-total">
                                ₹{itemTotal.toFixed(2)}
                              </span>

                              {onRemoveItem && (
                                <button
                                  type="button"
                                  className="cart-item-remove-btn"
                                  onClick={() =>
                                    onRemoveItem(item.id, item.selectedSize)
                                  }
                                  title="Remove item"
                                  aria-label="Remove item"
                                >
                                  <i className="bi bi-trash3"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Desktop Quantity Stepper */}
                        <div className="cart-item-quantity hide-on-mobile">
                          <div className="cart-qty-stepper">
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() =>
                                onUpdateQuantity &&
                                onUpdateQuantity(
                                  item.id,
                                  item.selectedSize,
                                  -1
                                )
                              }
                              disabled={itemQty <= 1}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="qty-value">{itemQty}</span>
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() =>
                                onUpdateQuantity &&
                                onUpdateQuantity(item.id, item.selectedSize, 1)
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {onRemoveItem && (
                            <button
                              type="button"
                              className="cart-item-remove-text-btn"
                              onClick={() =>
                                onRemoveItem(item.id, item.selectedSize)
                              }
                            >
                              <i className="bi bi-trash3"></i> Remove
                            </button>
                          )}
                        </div>

                        {/* Desktop Item Total */}
                        <div className="cart-item-total-col hide-on-mobile">
                          <span className="cart-item-total-price">
                            ₹{itemTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Banner */}
              <div className="cart-shipping-notice">
                <i className="bi bi-truck"></i>
                <div className="shipping-notice-text">
                  <strong>Fast & Reliable Delivery across India</strong>
                  <span>Standard delivery within 6-8 days with live tracking.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="cart-sidebar">
              <div className="cart-summary-card">
                <h2>Order Summary</h2>

                <div className="cart-summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span>
                    {shipping > 0 ? `₹${shipping.toFixed(2)}` : "Free"}
                  </span>
                </div>

                <div className="cart-summary-divider"></div>

                <div className="cart-summary-total-row">
                  <span>Estimated Total</span>
                  <strong>₹{total.toFixed(2)}</strong>
                </div>

                <button
                  type="button"
                  className="cart-checkout-cta"
                  onClick={onCheckout}
                >
                  <span>Proceed to Checkout</span>
                  <i className="bi bi-arrow-right"></i>
                </button>

                <button
                  type="button"
                  className="cart-continue-cta"
                  onClick={onBack}
                >
                  ← Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="cart-trust-badges">
                  <div className="trust-item">
                    <i className="bi bi-shield-check"></i>
                    <span>Secure 256-bit SSL Checkout</span>
                  </div>
                  <div className="trust-item">
                    <i className="bi bi-arrow-clockwise"></i>
                    <span>Easy 7-Day Returns & Exchanges</span>
                  </div>
                  <div className="trust-item">
                    <i className="bi bi-patch-check"></i>
                    <span>100% Authentic Products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;