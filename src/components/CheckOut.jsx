import "./CheckOut.css";

function CheckOut({ cart = [], onBack }) {
  const subtotal = (cart || []).reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = subtotal > 0 ? 100 : 0;

  const discount = 0;

  const total = subtotal + shipping - discount;

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
              />
            </div>


            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>


            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                placeholder="Enter your mobile number"
              />
            </div>

          </section>


          {/* DELIVERY ADDRESS */}
          <section className="checkout-section">

            <h2>02 Delivery Address</h2>

            <div className="form-group">
              <label>Address</label>

              <textarea
                placeholder="House / Street / Area"
              />
            </div>


            <div className="form-row">

              <div className="form-group">
                <label>City</label>

                <input
                  type="text"
                  placeholder="City"
                />
              </div>


              <div className="form-group">
                <label>State</label>

                <input
                  type="text"
                  placeholder="State"
                />
              </div>

            </div>


            <div className="form-group">

              <label>PIN Code</label>

              <input
                type="text"
                placeholder="PIN Code"
              />

            </div>

          </section>


          {/* PAYMENT */}
          <section className="checkout-section">

            <h2>03 Payment Method</h2>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="upi"
              />

              <span>UPI</span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="card"
              />

              <span>Credit / Debit Card</span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="cod"
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

            {cart.map((item) => (

              <div
                className="checkout-product"
                key={`${item.id}-${item.selectedSize}`}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />


                <div className="product-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Qty: {item.quantity}
                  </p>

                  {item.selectedSize && (
                    <p>
                      Size: {item.selectedSize}
                    </p>
                  )}

                </div>


                <strong>
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </strong>

              </div>

            ))}


            {/* SUBTOTAL */}

            <div className="summary-line">

              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal.toFixed(2)}
              </span>

            </div>


            {/* SHIPPING */}

            <div className="summary-line">

              <span>
                Shipping
              </span>

              <span>
                ₹{shipping.toFixed(2)}
              </span>

            </div>


            {/* DISCOUNT */}

            <div className="summary-line">

              <span>
                Discount
              </span>

              <span>
                -₹{discount.toFixed(2)}
              </span>

            </div>


            {/* TOTAL */}

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total.toFixed(2)}
              </strong>

            </div>


            {/* PLACE ORDER */}

            <button className="place-order-btn">
              Place Order →
            </button>


            {/* BACK */}

            <button
              className="back-cart-btn"
              onClick={onBack}
            >
              ← Back to Cart
            </button>

          </section>

        </div>

      </div>

    </div>
  );
}

export default CheckOut;