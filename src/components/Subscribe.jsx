import { useState } from "react";

function Subscribe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "") {
      setMessage("Please enter your email.");
      return;
    }

    setMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="subscribe-section">
      <div className="subscribe-content">
        <h2>JOIN THE SQUAD</h2>

        <p>
         Drops, restocks, and match-day offers - straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="subscribe-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <button type="submit">
            SUBSCRIBE
          </button>
        </form>

        {message && (
          <p className="subscribe-message">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

export default Subscribe;