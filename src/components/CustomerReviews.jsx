import { useState } from "react";

function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Rahul",
      rating: 5,
      message: "Grip held up on wet turf when nothing else has. Comfortable, stable and ready for every session.",
    },
    {
      id: 2,
      name: "Arjun",
      rating: 5,
      message: "Wide-fit comfort finally means my toes aren't cramped after 90 minutes. The traction on firm ground is unreal.",
    },
    {
      id: 3,
      name: "Vijay",
      rating: 4,
      message: "Lightweight without feeling flimsy. Took a few sessions to break in, but now it feels like a second skin.",
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((currentReview + 1) % reviews.length);
  };

  const previousReview = () => {
    setCurrentReview((currentReview - 1 + reviews.length) % reviews.length);
  };

  const review = reviews[currentReview];

  return (
    <section className="reviews-section">
      <h2>FROM THE PITCH</h2>

      <div className="review-slider">
        <button className="review-arrow" onClick={previousReview}>
          ❮
        </button>

        <div className="review-content">
          <div className="review-stars">{"★".repeat(review.rating)}</div>

          <p className="review-message">"{review.message}"</p>

          <h3>{review.name}</h3>
        </div>

        <button className="review-arrow" onClick={nextReview}>
          ❯
        </button>
      </div>

      <div className="review-dots">
        {reviews.map((item, index) => (
          <button
            key={item.id}
            className={index === currentReview ? "active" : ""}
            onClick={() => setCurrentReview(index)}
          >
            ●
          </button>
        ))}
      </div>
    </section>
  );
}

export default CustomerReviews;
