import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/slider/slider1.webp",
    title: "FOOTBALL PERFORMANCE",
    description: "Built for speed, grip, and match-day confidence.",
  },
  {
    id: 2,
    image: "/slider/slider2.webp",
    title: "ENGINEERED FOR EVERY SURFACE",
    description: "Control, durability, and comfort from training to tournament play.",
  },
  {
    id: 3,
    image: "/slider/slider3.webp",
    title: "PLAY BETTER, FEEL BETTER",
    description: "Premium footwear crafted for Indian pitches and everyday performance.",
  },
];

function HeroSlider() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-slider">

      <img
        src={slides[currentSlide].image}
        alt={slides[currentSlide].title}
        className="hero-image"
      />

      <div className="hero-overlay">
        <h1>{slides[currentSlide].title}</h1>

        <p>{slides[currentSlide].description}</p>
      </div>

      <button
        className="slider-arrow slider-prev"
        onClick={previousSlide}
      >
        ❮
      </button>

      <button
        className="slider-arrow slider-next"
        onClick={nextSlide}
      >
        ❯
      </button>

      <div className="slider-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={index === currentSlide ? "active" : ""}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

    </section>
  );
}

export default HeroSlider;