import { useState } from "react";

function CustomerReviews() {

    const reviews = [
        {
            id: 1, 
            name: "Rahul",
            role: "MIDFIELDER",
            rating: 5,
            message:
                "Grip held up on wet turf when nothing else has. Comfortable, stable and ready for every session.",
            image: "/reviews/review1.webp",
        },
        {
            id: 2,
            name: "Arjun",
            role: "STRIKER",
            rating: 5,
            message:
                "Wide-fit comfort finally means my toes aren't cramped after 90 minutes. The traction on firm ground is unreal.",
            image: "/reviews/review2.webp",
        },
        {
            id: 3,
            name: "Vijay",
            role: "WINGER",
            rating: 4,
            message:
                "Lightweight without feeling flimsy. Took a few sessions to break in, but now it feels like a second skin.",
            image: "/reviews/review3.webp",
        },
    ];

    const [currentReview, setCurrentReview] = useState(0);

    const nextReview = () => {
        setCurrentReview((currentReview + 1) % reviews.length);
    };

    const previousReview = () => {
        setCurrentReview(
            (currentReview - 1 + reviews.length) % reviews.length
        );
    };

    const review = reviews[currentReview];

    return (
        <section className="reviews-section">

            {/* Heading */}
            <div className="reviews-heading">
                <h2>FROM THE PITCH</h2>
            </div>

            {/* Review Slider */}
            <div className="review-slider">

                {/* Left Arrow */}
                <button
                    className="review-arrow review-prev"
                    onClick={previousReview}
                    aria-label="Previous review"
                >
                    ‹
                </button>

                {/* Image */}
                <div className="review-image">
                    <img
                        src={review.image}
                        alt={`${review.name} review`}
                    />
                </div>

                {/* Content */}
                <div className="review-card-content">

                    <div className="review-stars">
                        {"★".repeat(review.rating)}
                    </div>

                    <h3>
                        TRUE TO SIZE, TRUE TO FORM.
                    </h3>

                    <p className="review-message">
                        {review.message}
                    </p>

                    <div className="review-author">
                        {review.name.toUpperCase()}
                        <span>•</span>
                        {review.role}
                    </div>

                </div>

                {/* Right Arrow */}
                <button
                    className="review-arrow review-next"
                    onClick={nextReview}
                    aria-label="Next review"
                >
                    ›
                </button>

            </div>

            {/* Dots */}
            <div className="review-dots">
                {reviews.map((item, index) => (
                    <button
                        key={item.id}
                        className={index === currentReview ? "active" : ""}
                        onClick={() => setCurrentReview(index)}
                        aria-label={`Go to review ${index + 1}`}
                    />
                ))}
            </div>

        </section>
    );
}

export default CustomerReviews;