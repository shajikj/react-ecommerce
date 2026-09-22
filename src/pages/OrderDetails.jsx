import { useEffect, useState } from "react";
import "./OrderDetails.css";

function OrderDetails({ orderId, onBackToOrders }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("Order ID is missing.");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost/react-backend/api/order/details.php?order_id=${orderId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        console.log("ORDER DETAILS API RESPONSE:", data);

        if (!response.ok || !data.status) {
          throw new Error(data.message || "Failed to fetch order details");
        }

        setOrder(data.data);
      } catch (error) {
        console.error("ORDER DETAILS ERROR:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-details-page">
        <div className="order-details-shell">
          <div className="order-details-message">
            <span className="order-details-spinner" aria-hidden="true" />
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="order-details-shell">
          <div className="order-details-message">
            <div className="order-details-message-icon" aria-hidden="true">
              {error ? "!" : "—"}
            </div>
            <h2>{error ? "Unable to load this order" : "Order not found"}</h2>
            <p>{error || "This order could not be found."}</p>
            <button type="button" onClick={onBackToOrders}>
              Back to My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="order-details-shell">
        <button
          type="button"
          className="order-back-button"
          onClick={onBackToOrders}
        >
          <i className="bi bi-arrow-left" aria-hidden="true" />
          Back to My Orders
        </button>

        <header className="order-details-hero">
          <div>
            <span className="order-details-kicker">Order details</span>
            <h1>Order #{order.order_id}</h1>
            <p>Placed on {order.created_at}</p>
          </div>
          <span className="order-details-status">{order.order_status}</span>
        </header>

        <section className="order-meta-card" aria-label="Order information">
          <div>
            <span>Order date</span>
            <strong>{order.created_at}</strong>
          </div>
          <div>
            <span>Payment method</span>
            <strong>{order.payment_method}</strong>
          </div>
          <div>
            <span>Order status</span>
            <strong>{order.order_status}</strong>
          </div>
        </section>

        <section className="order-tracking-card" aria-labelledby="tracking-title">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Your order</span>
              <h2 id="tracking-title">Order status</h2>
            </div>
            <i className="bi bi-box-seam" aria-hidden="true" />
          </div>
          <div className="tracking-line">
            <span className="tracking-step tracking-step-active">
              <i className="bi bi-check2" aria-hidden="true" />
            </span>
            <span className="tracking-connector" />
            <span className="tracking-step">
              <i className="bi bi-truck" aria-hidden="true" />
            </span>
            <span className="tracking-connector" />
            <span className="tracking-step">
              <i className="bi bi-house-check" aria-hidden="true" />
            </span>
          </div>
          <div className="tracking-labels">
            <span>Order placed</span>
            <span>On the way</span>
            <span>Delivered</span>
          </div>
          <p className="tracking-note">
            Current status: <strong>{order.order_status}</strong>
          </p>
        </section>

        <div className="order-details-grid">
          <div className="order-details-main">
            <section className="order-section-card" aria-labelledby="products-title">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">Items in your order</span>
                  <h2 id="products-title">Products</h2>
                </div>
                <span className="item-count">
                  {order.items?.length || 0}{" "}
                  {order.items?.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="order-products">
                {order.items?.map((item) => (
                  <article className="order-product" key={item.order_item_id}>
                    <div className="order-product-image" aria-hidden="true">
                      <i className="bi bi-bag" />
                    </div>
                    <div className="order-product-details">
                      <h3>{item.product_name}</h3>
                      <p>Size: {item.size || "N/A"}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="order-product-prices">
                      <span>₹{Number(item.price).toFixed(2)} each</span>
                      <strong>₹{Number(item.subtotal).toFixed(2)}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="order-section-card" aria-labelledby="address-title">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">Shipping information</span>
                  <h2 id="address-title">Delivery Address</h2>
                </div>
                <i className="bi bi-geo-alt" aria-hidden="true" />
              </div>
              {order.address ? (
                <address className="delivery-address">
                  <strong>{order.address.full_name}</strong>
                  <span>{order.address.phone}</span>
                  <span>{order.address.address_line1}</span>
                  {order.address.address_line2 && (
                    <span>{order.address.address_line2}</span>
                  )}
                  <span>
                    {order.address.city}, {order.address.state}
                  </span>
                  <span>
                    {order.address.pincode}, {order.address.country}
                  </span>
                </address>
              ) : (
                <p className="muted-copy">Delivery address unavailable.</p>
              )}
            </section>
          </div>

          <aside className="order-summary-card" aria-labelledby="summary-title">
            <div className="section-heading">
              <div>
                <span className="section-kicker">Payment breakdown</span>
                <h2 id="summary-title">Order Summary</h2>
              </div>
            </div>
            <div className="summary-rows">
              <p>
                <span>Subtotal</span>
                <strong>₹{Number(order.subtotal).toFixed(2)}</strong>
              </p>
              <p>
                <span>Discount</span>
                <strong>-₹{Number(order.discount).toFixed(2)}</strong>
              </p>
              <p>
                <span>Shipping</span>
                <strong>₹{Number(order.shipping).toFixed(2)}</strong>
              </p>
              <p>
                <span>GST</span>
                <strong>₹{Number(order.gst).toFixed(2)}</strong>
              </p>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>₹{Number(order.total).toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
