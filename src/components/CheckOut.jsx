import { useEffect, useState } from "react";
import "./CheckOut.css";

function CheckOut({ cart = [], customer, onBack, onPlaceOrder }) {
  /* =================================
     ADDRESS STATES
  ================================= */

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const [addressError, setAddressError] = useState("");
  const customerId = customer?.id ?? customer?.customer_id;
  const [paymentMethod, setPaymentMethod] = useState("upi");
  console.log("Customer received in Checkout:", customer);
  console.log("Customer ID:", customerId);

  /* =================================  
     FETCH ADDRESSES
  ================================= */

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!customerId) {
        setAddresses([]);
        setSelectedAddress(null);
        setAddressLoading(false);
        return;
      }

      try {
        setAddressLoading(true);
        setAddressError("");

        const response = await fetch(
          `http://localhost/react-backend/api/customer/address/list.php?customer_id=${customerId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        console.log("Checkout Address Response:", data);

        if (data.status) {
          const addressList = data.data || [];

          setAddresses(addressList);

          const defaultAddress = addressList.find(
            (address) => Number(address.is_default) === 1,
          );

          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          } else if (addressList.length > 0) {
            setSelectedAddress(addressList[0]);
          } else {
            setSelectedAddress(null);
          }
        } else {
          setAddresses([]);
          setSelectedAddress(null);
          setAddressError(data.message || "Failed to load addresses.");
        }
      } catch (error) {
        console.error("Checkout address error:", error);

        setAddresses([]);
        setSelectedAddress(null);
        setAddressError("Unable to connect to the server.");
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddresses();
  }, [customerId]);

  /* =================================
     CART CALCULATION
  ================================= */

  const subtotal = (cart || []).reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0,
  );

  const shipping = subtotal > 0 ? 100 : 0;

  const discount = 0;

  const buyNowItem =
    typeof window !== "undefined"
      ? window.history.state?.buyNowItem ||
        window.history.state?.usr?.buyNowItem
      : null;
  const orderItems = buyNowItem ? [buyNowItem] : cart || [];
  const orderSubtotal = orderItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity || 1),
    0,
  );
  const orderShipping = orderSubtotal > 0 ? shipping || 100 : 0;
  const gst = orderSubtotal * 0.18;
  const total = orderSubtotal + orderShipping + gst - discount;

  return (
    <div className="checkout-page">
      {/* HEADER */}
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order securely</p>
      </div>

      <div className="checkout-container">
        {/* =================================
            LEFT SIDE
        ================================= */}
        <div className="checkout-left">
          {/* CONTACT */}
          <section className="checkout-section">
            <h2>01 Contact Information</h2>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                defaultValue={customer?.name || ""}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                defaultValue={customer?.email || ""}
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                placeholder="Enter your mobile number"
                defaultValue={customer?.phone || ""}
              />
            </div>
          </section>

          {/* DELIVERY ADDRESS */}
          <section className="checkout-section">
            <h2>02 Delivery Address</h2>

            {/* LOADING */}
            {addressLoading ? (
              <div className="text-center py-3">
                <div className="spinner-border"></div>
                <p className="mt-2">Loading addresses...</p>
              </div>
            ) : addressError ? (
              /* ERROR */
              <div className="alert alert-danger">{addressError}</div>
            ) : addresses.length === 0 ? (
              /* NO ADDRESS */
              <div className="address-empty">
                <p>No saved address found.</p>

                <p className="text-muted">
                  Please add an address before placing your order.
                </p>
              </div>
            ) : (
              /* ADDRESS LIST */
              <div className="checkout-address-list">
                {addresses.map((address) => (
                  <label
                    className={`checkout-address-card ${
                      selectedAddress?.address_id === address.address_id
                        ? "selected"
                        : ""
                    }`}
                    key={address.address_id}
                  >
                    <div className="checkout-address-radio">
                      <input
                        type="radio"
                        name="checkoutAddress"
                        checked={
                          selectedAddress?.address_id === address.address_id
                        }
                        onChange={() => setSelectedAddress(address)}
                      />
                    </div>

                    <div className="checkout-address-content">
                      <div className="checkout-address-header">
                        <strong>{address.full_name}</strong>

                        {Number(address.is_default) === 1 && (
                          <span className="checkout-default-badge"></span>
                        )}
                      </div>

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
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* PAYMENT */}
          <section className="checkout-section">
            <h2>03 Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span>UPI</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span>Credit / Debit Card</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span>Cash on Delivery</span>
            </label>
          </section>
        </div>

        {/* =================================
            RIGHT SIDE
        ================================= */}
        <div className="checkout-right">
          <section className="order-summary">
            <h2>Order Summary</h2>

            {/* PRODUCTS */}

            {orderItems.length === 0 ? (
              <p className="order-empty">Your order is empty.</p>
            ) : (
              orderItems.map((item) => (
                <div
                  className="checkout-product"
                  key={`${item.id}-${item.selectedSize}`}
                >
                  <img src={item.image} alt={item.name} />

                  <div className="product-info">
                    <h3>{item.name}</h3>

                    <p>Qty: {item.quantity}</p>

                    {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                  </div>

                  <strong>
                    ₹
                    {(Number(item.price) * Number(item.quantity || 1)).toFixed(
                      2,
                    )}
                  </strong>
                </div>
              ))
            )}

            {/* SUBTOTAL */}

            <div className="summary-line">
              <span>Subtotal</span>

              <span>₹{orderSubtotal.toFixed(2)}</span>
            </div>

            {/* SHIPPING */}

            <div className="summary-line">
              <span>Shipping</span>

              <span>₹{orderShipping.toFixed(2)}</span>
            </div>

            {/* DISCOUNT */}

            <div className="summary-line">
              <span>Discount</span>

              <span>-₹{discount.toFixed(2)}</span>
            </div>

            {/* GST */}

            <div className="summary-line">
              <span>GST (18%)</span>

              <span>₹{gst.toFixed(2)}</span>
            </div>

            {/* TOTAL */}

            <div className="summary-total">
              <span>Total</span>

              <strong>₹{total.toFixed(2)}</strong>
            </div>

            {/* PLACE ORDER */}

            <button
              type="button"
              className="place-order-btn"
              disabled={!selectedAddress || orderItems.length === 0}
              onClick={() =>
                onPlaceOrder({
                  items: orderItems,
                  address: selectedAddress,
                  paymentMethod: paymentMethod,
                  subtotal: orderSubtotal,
                  discount,
                  shipping: orderShipping,
                  gst,
                  total,
                })
              }
            >
              Place Order — ₹{total.toFixed(2)}
            </button>

            {/* BACK */}

            <button className="back-cart-btn" onClick={onBack}>
              ← Back to Cart
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
