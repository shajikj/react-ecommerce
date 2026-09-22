import { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders({ customer, onViewOrder }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getItemCount = (order) => {
    if (order.item_count != null) {
      return Number(order.item_count);
    }

    if (order.items_count != null) {
      return Number(order.items_count);
    }

    if (Array.isArray(order.items)) {
      return order.items.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0,
      );
    }

    return null;
  };

  const getThumbnail = (order) => {
    const item = Array.isArray(order.items) ? order.items[0] : null;

    return (
      item?.product_image ||
      item?.image ||
      order.product_image ||
      order.thumbnail ||
      null
    );
  };

  useEffect(() => {
    if (!customer?.id && !customer?.customer_id) {
      setError("Please login to view your orders.");
      setLoading(false);
      return;
    }

    const customerId = customer.id ?? customer.customer_id;

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost/react-backend/api/order/list.php?customer_id=${customerId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        console.log("MY ORDERS API RESPONSE:", data);

        if (!response.ok || !data.status) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data.data || []);
      } catch (error) {
        console.error("MY ORDERS ERROR:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customer]);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="my-orders">
        <div className="my-orders-container">
          <div className="my-orders-heading">
            <span className="my-orders-kicker">Account</span>
            <h1>My Orders</h1>
            <p>Keep track of your recent purchases and order status.</p>
          </div>
          <div className="orders-message orders-message-loading">
            <span className="orders-spinner" aria-hidden="true" />
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error) {
    return (
      <div className="my-orders">
        <div className="my-orders-container">
          <div className="my-orders-heading">
            <span className="my-orders-kicker">Account</span>
            <h1>My Orders</h1>
            <p>Keep track of your recent purchases and order status.</p>
          </div>
          <div className="orders-message">
            <div className="orders-message-icon" aria-hidden="true">
              !
            </div>
            <h2>We couldn't load your orders</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // NO ORDERS
  // ==============================

  if (orders.length === 0) {
    return (
      <div className="my-orders">
        <div className="my-orders-container">
          <div className="my-orders-heading">
            <span className="my-orders-kicker">Account</span>
            <h1>My Orders</h1>
            <p>Keep track of your recent purchases and order status.</p>
          </div>
          <div className="orders-message">
            <div className="orders-message-icon" aria-hidden="true">
              <i className="bi bi-bag" />
            </div>
            <h2>No orders yet</h2>
            <p>Your future purchases will appear here once you place an order.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // DISPLAY ORDERS
  // ==============================

  return (
    <div className="my-orders">
      <div className="my-orders-container">
        <div className="my-orders-heading">
          <span className="my-orders-kicker">Account</span>
          <div className="my-orders-title-row">
            <div>
              <h1>My Orders</h1>
              <p>Keep track of your recent purchases and order status.</p>
            </div>
            <span className="orders-count">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </span>
          </div>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.order_id}>
              <div className="order-header">
                <div className="order-number">
                  {getThumbnail(order) ? (
                    <img
                      className="order-thumbnail"
                      src={getThumbnail(order)}
                      alt=""
                    />
                  ) : (
                    <span className="order-thumbnail order-thumbnail-placeholder">
                      <i className="bi bi-bag" aria-hidden="true" />
                    </span>
                  )}
                  <span className="order-label">Order number</span>
                  <strong>#{order.order_id}</strong>
                  <p>Placed on: {order.created_at}</p>
                </div>
                <span className="order-status">{order.order_status}</span>
              </div>

              <div className="order-info">
                <div>
                  <span>Payment method</span>
                  <strong>{order.payment_method}</strong>
                </div>
                <div>
                  <span>Items</span>
                  <strong>
                    {getItemCount(order) == null ? "—" : getItemCount(order)}
                  </strong>
                </div>
                <div>
                  <span>Order total</span>
                  <strong>₹{Number(order.total).toFixed(2)}</strong>
                </div>
              </div>

              <div className="order-card-footer">
                <span>View your complete order summary and delivery details.</span>
                <button
                  type="button"
                  className="view-order-btn"
                  onClick={() => onViewOrder(order.order_id)}
                >
                  View Order
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
