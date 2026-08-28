/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import ProductCard from "./ProductCard";

// Kept here because this slider is the current source of product data.
export const products = [
    {
      id: 1,
      name: "UNITED 007",
      price: "1,899",
      image: "/products/pro1.webp",
      category: "Outdoor",
      selectOptions: true,
    },
    {
      id: 2,
      name: "S90 OUTDOOR",
      price: "1,699",
      image: "/products/pro2.webp",
      category: "Indoor",
      selectOptions: true,
    },
    {
      id: 3,
      name: "REAPER",
      price: "1,699",
      image: "/products/pro3.webp",
      category: "Outdoor",
      colors: "2 colors",
      selectOptions: true,
    },
    {
      id: 4,
      name: "PHAMTOM",
      price: "1,799",
      image: "/products/pro4.webp",
      category: "Outdoor",
      selectOptions: true,
    },
    {
      id: 5,
      name: "ZETA+",
      price: "1,999",
      image: "/products/pro5.webp",
      category: "Indoor",
      selectOptions: true,
    },
    {
      id: 6,
      name: "UNITED 007",
      price: "1,899",
      image: "/products/pro6.webp",
      category: "Outdoor",
      selectOptions: true,
    },
];

function ProductSlider({ onProductSelect }) {

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
