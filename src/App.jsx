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
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {

  /* =========================
     GET CURRENT URL STATE
  ========================= */

  const getLocationState = () => {

    const params = new URLSearchParams(window.location.search);

    const productId = Number(params.get("product"));

    const page = params.get("page");

    return {
      product:
        products.find((product) => product.id === productId) || null,

      page: [
        "about",
        "indoor",
        "outdoor",
        "all-products",
        "contact",
        "login",
        "register",
      ].includes(page)
        ? page
        : null,
    };
  };


  /* =========================
     PAGE STATES
  ========================= */

  const [selectedProduct, setSelectedProduct] = useState(
    () => getLocationState().product
  );

  const [activePage, setActivePage] = useState(
    () => getLocationState().page
  );


  /* =========================
     CUSTOMER AUTHENTICATION
  ========================= */

  const [customer, setCustomer] = useState(null);

  const [checkingSession, setCheckingSession] = useState(true);


  /* =========================
     CHECK PHP SESSION
  ========================= */

  useEffect(() => {

    const checkSession = async () => {

      try {

        const response = await fetch(
          "http://localhost/react-backend/api/customer/check-session.php",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log("Session Check:", data);

        if (data.logged_in) {

          setCustomer(data.customer);

        } else {

          setCustomer(null);

        }

      } catch (error) {

        console.error(
          "Session check failed:",
          error
        );

        setCustomer(null);

      } finally {

        setCheckingSession(false);

      }
    };

    checkSession();

  }, []);


  /* =========================
     BROWSER BACK / FORWARD
  ========================= */

  useEffect(() => {

    const handlePopState = () => {

      const locationState = getLocationState();

      setSelectedProduct(locationState.product);

      setActivePage(locationState.page);

    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {

      window.removeEventListener(
        "popstate",
        handlePopState
      );

    };

  }, []);


  /* =========================
     OPEN PRODUCT
  ========================= */

  const openProduct = (product) => {

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?product=${product.id}`
    );

    setSelectedProduct(product);

    setActivePage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================
     CLOSE PRODUCT
  ========================= */

  const closeProduct = () => {

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?page=all-products`
    );

    setSelectedProduct(null);

    setActivePage("all-products");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================
     OPEN PAGE
  ========================= */

  const openPage = (page) => {

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?page=${page}`
    );

    setSelectedProduct(null);

    setActivePage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================
     LOGIN SUCCESS
  ========================= */

  const handleLoginSuccess = (customerData) => {

    setCustomer(customerData);

    // Go to home page
    openPage(null);

  };


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = async () => {

    try {

      const response = await fetch(
        "http://localhost/react-backend/api/customer/logout.php",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Logout Response:", data);

      if (data.success) {

        setCustomer(null);

        openPage(null);

      }

    } catch (error) {

      console.error(
        "Logout failed:",
        error
      );

    }
  };


  /* =========================
     SESSION CHECK LOADING
  ========================= */

  if (checkingSession) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Checking login...
      </div>
    );

  }


  /* =========================
     RENDER
  ========================= */

  return (
    <>

      {/* =========================
          HEADER
      ========================= */}

      <Header

        customer={customer}

        onLogout={handleLogout}

        onAboutSelect={() =>
          openPage("about")
        }

        onIndoorSelect={() =>
          openPage("indoor")
        }

        onOutdoorSelect={() =>
          openPage("outdoor")
        }

        onAllAllProductsSelect={() =>
          openPage("all-products")
        }

        onContactSelect={() =>
          openPage("contact")
        }

        onLoginSelect={() =>
          openPage("login")
        }

        onRegisterSelect={() =>
          openPage("register")
        }
        

      />


      {/* =========================
          PRODUCT VIEW
      ========================= */}

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

        <Indoor
          products={products}
          onProductSelect={openProduct}
        />

      ) : activePage === "outdoor" ? (

        <Outdoor
          products={products}
          onProductSelect={openProduct}
        />

      ) : activePage === "all-products" ? (

        <AllProducts
          products={products}
          onProductSelect={openProduct}
        />

      ) : activePage === "contact" ? (

        <Contact />

      ) : activePage === "login" ? (

        <Login
          onRegister={() =>
            openPage("register")
          }

          onLoginSuccess={handleLoginSuccess}
        />

      ) : activePage === "register" ? (

        <Register
          onLogin={() =>
            openPage("login")
          }
        />

      ) : (

        /* =========================
           HOME PAGE
        ========================= */

        <>
          <HeroSlider />

          <ProductSlider
            onProductSelect={openProduct}
          />

          <Categories />

          <Features />

          <CustomerReviews />

          <Subscribe />
        </>

      )}


      {/* =========================
          FOOTER
      ========================= */}

      <Footer />

    </>
  );
}


export default App;