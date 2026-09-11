function Cart({ cart, onBack }) {
  return (
    <div style={{ padding: "50px" }}>
      <h1>My Cart</h1>

      <button onClick={onBack}>
        ← Continue Shopping
      </button>

      <p>Cart items: {cart.length}</p>

      {cart.map((item) => (
        <div key={`${item.id}-${item.selectedSize}`}>
          <h2>{item.name}</h2>
          <p>Size: {item.selectedSize}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;