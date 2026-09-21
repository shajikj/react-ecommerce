import { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders({ customer, onViewOrder }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <h2>My Orders</h2>
        <p>Loading orders...</p>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <p>{error}</p>
      </div>
    );
  }

  // ==============================
  // NO ORDERS
  // ==============================

  if (orders.length === 0) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <p>You have not placed any orders yet.</p>
      </div>
    );
  }

  // ==============================
  // DISPLAY ORDERS
  // ==============================

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.order_id}>
          <div className="order-header">
            <div>
              <strong>Order #{order.order_id}</strong>

              <p>{order.created_at}</p>
            </div>

            <span className="order-status">{order.order_status}</span>
          </div>

          <div className="order-info">
            <div>
              <span>Payment</span>
              <strong>{order.payment_method}</strong>
            </div>

            <div>
              <span>Subtotal</span>
              <strong>₹{Number(order.subtotal).toFixed(2)}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>₹{Number(order.total).toFixed(2)}</strong>
            </div>
          </div>

          <button
            className="view-order-btn"
            onClick={() => {
              onViewOrder(order.order_id);
            }}
          >
            View Order
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
