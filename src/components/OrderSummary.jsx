import "./OrderSummary.css";

function OrderSummary({ order, onContinueShopping }) {
  if (!order) {
    return (
      <main className="order-summary-page">
        <section className="order-summary-card">
          <h1>No order found</h1>
          <button type="button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </section>
      </main>
    );
  }

  const { address } = order;

  return (
    <main className="order-summary-page">
      <section className="order-summary-card">
        <p className="order-summary-eyebrow">Order placed successfully</p>
        <h1>Thank you for your order!</h1>
        <p className="order-summary-message">
          Your order has been confirmed and will be delivered to the address
          below.
        </p>

        <div className="order-summary-content">
          <div>
            <h2>Items</h2>
            {order.items.map((item) => (
              <div
                className="order-summary-item"
                key={`${item.id}-${item.selectedSize}`}
              >
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                  <p>Quantity: {item.quantity || 1}</p>
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

          <div className="order-summary-address">
            <h2>Delivery address</h2>
            <p><strong>{address.full_name}</strong></p>
            <p>{address.phone}</p>
            <p>{address.address_line1}</p>
            {address.address_line2 && <p>{address.address_line2}</p>}
            <p>{address.city}, {address.state}</p>
            <p>{address.pincode}, {address.country}</p>
          </div>
        </div>

        <div className="order-summary-totals">
          <p><span>Subtotal</span><span>₹{order.subtotal.toFixed(2)}</span></p>
          <p><span>Discount</span><span>-₹{order.discount.toFixed(2)}</span></p>
          <p><span>Shipping</span><span>₹{order.shipping.toFixed(2)}</span></p>
          <p><span>GST</span><span>₹{order.gst.toFixed(2)}</span></p>
          <p className="order-summary-total">
            <strong>Total</strong>
            <strong>₹{order.total.toFixed(2)}</strong>
          </p>
        </div>

        <button
          type="button"
          className="order-summary-continue"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
      </section>
    </main>
  );
}

export default OrderSummary;
