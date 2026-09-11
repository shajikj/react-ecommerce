function Cart({ cart, onBack, onCheckout }) {
  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div style={{ padding: "50px" }}>
      <h1>My Cart</h1>

      <button onClick={onBack}>
        ← Continue Shopping
      </button>

      <p>Cart items: {cart.length}</p>

      {cart.length === 0 ? (
        <div>
          <h2>Your cart is empty</h2>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              style={{
                marginTop: "20px",
                padding: "20px",
                border: "1px solid #ddd",
              }}
            >
              <h2>{item.name}</h2>

              <p>
                Size: {item.selectedSize || "N/A"}
              </p>

              <p>
                Quantity: {item.quantity}
              </p>

              <p>
                Price: ₹{Number(item.price)}
              </p>

              <p>
                Item Total: ₹
                {Number(item.price) * Number(item.quantity)}
              </p>
            </div>
          ))}

          <h2>
            Subtotal: ₹{subtotal.toFixed(2)}
          </h2>

          <button onClick={onCheckout}>
            Proceed to Checkout →
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;