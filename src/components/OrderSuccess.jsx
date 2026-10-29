import { useEffect, useState } from "react";
import { apiUrl, readApiResponse } from "../api";
import "./OrderSuccess.css";

function getEstimatedDelivery(createdAt) {
  const start = createdAt ? new Date(createdAt) : null;
  if (!start || Number.isNaN(start.getTime())) return "To be confirmed";

  start.setDate(start.getDate() + 6);
  const end = new Date(start);
  end.setDate(end.getDate() + 3);
  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return `${formatDate(start)} – ${formatDate(end)}`;
}

function OrderSuccess({ orderId, onContinueShopping, onViewMyOrders }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return undefined;

    const controller = new AbortController();
    const loadOrder = async () => {
      try {
        const response = await fetch(
          apiUrl(`order/details.php?order_id=${encodeURIComponent(orderId)}`),
          { credentials: "include", signal: controller.signal },
        );
        const data = await readApiResponse(response);

        if (!data.status || !data.data) {
          throw new Error("Unable to load order details.");
        }

        const savedOrder = data.data;
        setOrder({
          orderId: savedOrder.order_id ?? orderId,
          items: (savedOrder.items || []).map((item) => ({
            id: item.product_id ?? item.order_item_id,
            selectedSize: item.size ?? null,
            name: item.product_name,
            image: item.product_image
              ? /^https?:\/\//i.test(item.product_image)
                ? item.product_image
                : apiUrl(`assets/images/products/${item.product_image}`)
              : "",
            quantity: Number(item.quantity || 1),
            price: Number(item.price || 0),
          })),
          address: savedOrder.address || {},
          subtotal: Number(savedOrder.subtotal || 0),
          discount: Number(savedOrder.discount || 0),
          shipping: Number(savedOrder.shipping || 0),
          gst: Number(savedOrder.gst || 0),
          total: Number(savedOrder.total || 0),
          estimatedDelivery: getEstimatedDelivery(savedOrder.created_at),
        });
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          console.error("Order confirmation could not be loaded:", loadError);
          setError("Order details could not be loaded. Please check My Orders.");
        }
      }
    };

    loadOrder();
    return () => controller.abort();
  }, [orderId]);

  if (!orderId || error) {
    return (
      <main className="order-success-page">
        <section className="order-success-card">
          <h1>{error ? "Unable to load order details" : "Order details unavailable"}</h1>
          {error && <p>{error}</p>}
          <button type="button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </section>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="order-success-page">
        <section className="order-success-card">
          <h1>Loading your order...</h1>
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
                ₹{(Number(item.price) * Number(item.quantity || 1)).toFixed(2)}
              </strong>
            </div>
          ))}
        </div>

        <div className="order-success-section order-success-total">
          <h2>Order Total</h2>
          <p>
            <span>Subtotal</span>
            <span>₹{order.subtotal.toFixed(2)}</span>
          </p>
          <p>
            <span>Discount</span>
            <span>-₹{order.discount.toFixed(2)}</span>
          </p>
          <p>
            <span>Shipping</span>
            <span>₹{order.shipping.toFixed(2)}</span>
          </p>
          <p>
            <span>GST</span>
            <span>₹{order.gst.toFixed(2)}</span>
          </p>
          <p className="order-success-grand-total">
            <strong>Total</strong>
            <strong>₹{order.total.toFixed(2)}</strong>
          </p>
        </div>

        <div className="order-success-section">
          <h2>Delivery Address</h2>
          <p>
            <strong>{address.full_name}</strong>
          </p>
          <p>{address.phone}</p>
          <p>{address.address_line1}</p>
          {address.address_line2 && <p>{address.address_line2}</p>}
          <p>
            {address.city}, {address.state}
          </p>
          <p>
            {address.pincode}, {address.country}
          </p>
        </div>

        <div className="order-success-delivery">
          <h2>Estimated Delivery</h2>
          <p>{order.estimatedDelivery}</p>
        </div>

        <div className="order-success-actions">
          <button
            type="button"
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
