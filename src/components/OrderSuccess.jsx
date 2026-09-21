import "./OrderSuccess.css";

function OrderSuccess({
  order,
  onContinueShopping,
  onViewMyOrders
}) {
  if (!order) {
    return (
      <main className="order-success-page">
        <section className="order-success-card">
          <h1>Order details unavailable</h1>
          <button type="button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </section>
      </main>
    );
  }

  const address = order.address || {};

  return (
    <main className="order-success-page">
      <section className="order-success-card">
        <div className="order-success-icon" aria-hidden="true">
          ✓
        </div>
        <p className="order-success-eyebrow">Order placed successfully</p>
        <h1>Thank you for your order!</h1>
        <p className="order-success-id">Order ID: #{order.orderId}</p>

        <div className="order-success-section">
          <h2>Product Details</h2>
          {order.items?.map((item) => (
            <div
              className="order-success-product"
              key={`${item.id}-${item.selectedSize}`}
            >
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                <p>Quantity: {item.quantity || 1}</p>
                <p>Price: ₹{Number(item.price).toFixed(2)}</p>
              </div>
              <strong>
                ₹
                {(
                  Number(item.price) * Number(item.quantity || 1)
                ).toFixed(2)}
              </strong>
            </div>
          ))}
        </div>

        <div className="order-success-section order-success-total">
          <h2>Order Total</h2>
          <p><span>Subtotal</span><span>₹{order.subtotal.toFixed(2)}</span></p>
          <p><span>Discount</span><span>-₹{order.discount.toFixed(2)}</span></p>
          <p><span>Shipping</span><span>₹{order.shipping.toFixed(2)}</span></p>
          <p><span>GST</span><span>₹{order.gst.toFixed(2)}</span></p>
          <p className="order-success-grand-total">
            <strong>Total</strong>
            <strong>₹{order.total.toFixed(2)}</strong>
          </p>
        </div>

        <div className="order-success-section">
          <h2>Delivery Address</h2>
          <p><strong>{address.full_name}</strong></p>
          <p>{address.phone}</p>
          <p>{address.address_line1}</p>
          {address.address_line2 && <p>{address.address_line2}</p>}
          <p>{address.city}, {address.state}</p>
          <p>{address.pincode}, {address.country}</p>
        </div>

        <div className="order-success-delivery">
          <h2>Estimated Delivery</h2>
          <p>{order.estimatedDelivery}</p>
        </div>

        <div className="order-success-actions">
         <button
  onClick={onViewMyOrders}
  className="view-orders-btn"
>
  View My Orders
</button>
          <button
            type="button"
            className="order-success-continue"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;
