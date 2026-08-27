import { useState, useEffect } from "react";

function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: "/slider/slider1.webp",
    },
    {
      id: 2,
      image: "/slider/slider2.webp",

    },
    {
      id: 3,
      image: "/slider/slider3.webp",
    },
  ];

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
      setCurrentSlide((currentSlide) => 
        (currentSlide + 1) % slides.length
      );
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