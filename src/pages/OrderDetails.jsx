import { useEffect, useState } from "react";

function OrderDetails({ orderId }) {
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
          }
        );

        const data = await response.json();

        console.log("ORDER DETAILS API RESPONSE:", data);

        if (!response.ok || !data.status) {
          throw new Error(
            data.message || "Failed to fetch order details"
          );
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
        <h2>Order Details</h2>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-details-page">
        <h2>Order Details</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-page">
        <h2>Order Details</h2>
        <p>Order not found.</p>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <h1>Order #{order.order_id}</h1>

      <p>
        <strong>Status:</strong> {order.order_status}
      </p>

      <p>
        <strong>Order Date:</strong> {order.created_at}
      </p>

      <p>
        <strong>Payment:</strong> {order.payment_method}
      </p>

      <hr />

      <h2>Products</h2>

      {order.items?.map((item) => (
        <div key={item.order_item_id}>
          <h3>{item.product_name}</h3>

          <p>Size: {item.size || "N/A"}</p>

          <p>Quantity: {item.quantity}</p>

          <p>
            Price: ₹{Number(item.price).toFixed(2)}
          </p>

          <p>
            Subtotal: ₹{Number(item.subtotal).toFixed(2)}
          </p>

          <hr />
        </div>
      ))}

      <h2>Delivery Address</h2>

      {order.address && (
        <div>
          <p>
            <strong>{order.address.full_name}</strong>
          </p>

          <p>{order.address.phone}</p>

          <p>{order.address.address_line1}</p>

          {order.address.address_line2 && (
            <p>{order.address.address_line2}</p>
          )}

          <p>
            {order.address.city}, {order.address.state}
          </p>

          <p>
            {order.address.pincode}, {order.address.country}
          </p>
        </div>
      )}

      <h2>Order Summary</h2>

      <p>
        Subtotal: ₹{Number(order.subtotal).toFixed(2)}
      </p>

      <p>
        Discount: -₹{Number(order.discount).toFixed(2)}
      </p>

      <p>
        Shipping: ₹{Number(order.shipping).toFixed(2)}
      </p>

      <p>
        GST: ₹{Number(order.gst).toFixed(2)}
      </p>

      <h2>
        Total: ₹{Number(order.total).toFixed(2)}
      </h2>
    </div>
  );
}

export default OrderDetails;