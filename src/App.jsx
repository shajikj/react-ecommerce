import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import ProductSlider from "./components/ProductSlider";
import Categories from "./components/Categories";
import Features from "./components/Features";
import CustomerReviews from "./components/CustomerReviews";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";
import { products } from "./components/ProductSlider";
import ProductView from "./pages/ProductView";
import About from "./pages/About";
import Indoor from "./pages/Indoor";
import Outdoor from "./pages/Outdoor";
import AllProducts from "./pages/AllProducts";

function App() {
  const getLocationState = () => {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("product"));

    const page = params.get("page");

    return {
      product: products.find((product) => product.id === productId) || null,
      page: ["about", "indoor", "outdoor", "all-products"].includes(page)
        ? page
        : null,
    };
  };

  const [selectedProduct, setSelectedProduct] = useState(
    () => getLocationState().product,
  );
  const [activePage, setActivePage] = useState(() => getLocationState().page);

  useEffect(() => {
    const handlePopState = () => {
      const locationState = getLocationState();
      setSelectedProduct(locationState.product);
      setActivePage(locationState.page);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openProduct = (product) => {
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?product=${product.id}`,
    );
    setSelectedProduct(product);
    setActivePage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeProduct = () => {
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?page=all-products`,
    );

    setSelectedProduct(null);
    setActivePage("all-products");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPage = (page) => {
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?page=${page}`,
    );
    setSelectedProduct(null);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header
        onAboutSelect={() => openPage("about")}
        onIndoorSelect={() => openPage("indoor")}
        onOutdoorSelect={() => openPage("outdoor")}
        onAllAllProductsSelect={() => onpagehide("all-products")}
      />
      {selectedProduct ? (
        <ProductView
          key={selectedProduct.id}
          product={selectedProduct}
          products={products}
          onBack={closeProduct}
          onProductSelect={openProduct}
        />
      ) : activePage === "about" ? (
        <About />
      ) : activePage === "indoor" ? (
        <Indoor products={products} onProductSelect={openProduct} />
      ) : activePage === "outdoor" ? (
        <Outdoor products={products} onProductSelect={openProduct} />
      ) : activePage === "all-products" ? (
        <AllProducts products={products} onProductSelect={openProduct} />
      ) : (
        <>
          <HeroSlider />
          <ProductSlider onProductSelect={openProduct} />
          <Categories />
          <Features />
          <CustomerReviews />
          <Subscribe />
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
