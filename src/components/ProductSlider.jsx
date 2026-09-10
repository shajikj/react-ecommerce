import { useState } from "react";
import ProductCard from "./ProductCard";

// export const products = [];

function ProductSlider({products, onProductSelect }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleProducts = 4;
  const maxIndex = products.length - visibleProducts;

  // Next product
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < maxIndex ? prevIndex + 1 : 0
    );
  };

  // Previous product
  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : maxIndex
    );
  };

  // Two-finger horizontal touchpad scrolling
  const handleWheel = (event) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      if (event.deltaX > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }
  };

  return (
    <section className="product-slider-section">

      <div className="product-carousel">

        {/* Left arrow */}
        <button
          className="product-side-arrow product-left-arrow"
          onClick={previousSlide}
        >
          ←
        </button>

        {/* Product slider */}
        <div
          className="product-slider-window"
          onWheel={handleWheel}
        >
          <div
            className="product-slider-track"
            style={{
              transform: `translateX(-${currentIndex * 25}%)`,
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onProductSelect}
              />
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          className="product-side-arrow product-right-arrow"
          onClick={nextSlide}
        >
          →
        </button>

      </div>

    </section>
  );
}

export default ProductSlider;
