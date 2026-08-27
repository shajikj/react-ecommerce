import "./App.css";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import ProductSlider from "./components/ProductSlider";
import Categories from "./components/Categories";
import Features from "./components/Features";
import CustomerReviews from "./components/CustomerReviews";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <HeroSlider />
      <ProductSlider/>
      <Categories/>
      <Features/>
      <CustomerReviews/>
      <Subscribe/>
      <Footer/>
      <main>
      </main>
    </>
  );
}

export default App;