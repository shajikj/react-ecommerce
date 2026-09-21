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

// import { products } from "./components/ProductSlider";

import ProductView from "./pages/ProductView";

import About from "./pages/About";

import Indoor from "./pages/Indoor";

import Outdoor from "./pages/Outdoor";

import AllProducts from "./pages/AllProducts";

import Contact from "./pages/Contact";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Cart from "./pages/Cart";

import CheckOut from "./components/CheckOut";

import Profile from "./components/Profile";

import OrderSummary from "./components/OrderSummary";

import OrderSuccess from "./components/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

function App() {
  /* =========================
     GET CURRENT URL STATE
  ========================= */

  const getLocationState = () => {
    const params = new URLSearchParams(window.location.search);

    const productId = params.get("product");
    const page = params.get("page");

    return {
      productId: productId ? Number(productId) : null,

      page: [
        "about",
        "indoor",
        "outdoor",
        "all-products",
        "contact",
        "login",
        "register",
        "cart",
        "checkout",
        "profile",
        "order-summary",
        "order-success",
        "my-orders",
        "order-details",
      ].includes(page)
        ? page
        : null,
    };
  };

  /* =========================
     PAGE STATES
  ========================= */

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedProductId, setSelectedProductId] = useState(
    () => getLocationState().productId,
  );

  const [activePage, setActivePage] = useState(() => getLocationState().page);

  const [previousPage, setPreviousPage] = useState("all-products");

  /* =========================
     CUSTOMER AUTHENTICATION
  ========================= */

  const [customer, setCustomer] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [checkingSession, setCheckingSession] = useState(true);

  const [apiProducts, setApiProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);

  const [completedOrder, setCompletedOrder] = useState(() => {
    try {
      const savedOrder = sessionStorage.getItem("completedOrder");

      return savedOrder ? JSON.parse(savedOrder) : null;
    } catch (error) {
      console.error("Saved order could not be loaded:", error);

      return null;
    }
  });

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  /* =========================
     CART SECTION
  ========================= */

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) =>
          item.id === product.id && item.selectedSize === product.selectedSize,
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item,
        );
      }

      return [...prevCart, product];
    });
  };

  const updateCartQuantity = (id, selectedSize, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id && item.selectedSize === selectedSize) {
            const newQty = item.quantity + delta;

            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }

          return item;
        })
        .filter(Boolean),
    );
  };

  const removeFromCart = (id, selectedSize) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize),
      ),
    );
  };

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
          },
        );

        const data = await response.json();

        console.log("Session Check:", data);

        if (data.logged_in) {
          setCustomer(data.customer);
        } else {
          setCustomer(null);
        }
      } catch (error) {
        console.error("Session check failed:", error);

        setCustomer(null);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost/react-backend/api/product/list.php",
        );

        const data = await response.json();

        console.log("Product API Response:", data);

        if (data.status) {
          const formattedProducts = data.data.map((product) => ({
            id: Number(product.product_id),

            name: product.product_name,

            image: product.product_image
              ? `http://localhost/react-backend/api/assets/images/products/${product.product_image}`
              : "",

            price: product.Price,

            colors: product.product_color,

            shoeSize: product.shoe_size,

            description: product.description,

            details: product.product_details,

            categoryId: Number(product.category_id),

            categoryName: product.category_name,

            status: Number(product.status),
          }));

          setApiProducts(formattedProducts);
        }
      } catch (error) {
        console.error("Product fetch failed:", error);
      }
    };

    fetchProducts();
  }, []);

  /* =========================
     RESTORE PRODUCT FROM URL
  ========================= */

  useEffect(() => {
    if (!selectedProductId || apiProducts.length === 0) {
      return;
    }

    const foundProduct = apiProducts.find(
      (item) => item.id === selectedProductId,
    );

    if (foundProduct) {
      setSelectedProduct(foundProduct);
      setActivePage(null);
    }
  }, [selectedProductId, apiProducts]);

  /* =========================
     BROWSER BACK / FORWARD
  ========================= */

  useEffect(() => {
    const handlePopState = () => {
      const locationState = getLocationState();

      setSelectedProductId(locationState.productId);

      setSelectedProduct(null);

      setActivePage(locationState.page);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  /* =========================
     OPEN PRODUCT
  ========================= */

  const openProduct = (product) => {
    if (activePage) {
      setPreviousPage(activePage);
    } else {
      setPreviousPage("home");
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?product=${product.id}`,
    );

    setSelectedProductId(product.id);

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
    if (previousPage === "home") {
      window.history.pushState({}, "", window.location.pathname);
    } else {
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?page=${previousPage}`,
      );
    }

    setSelectedProduct(null);

    setSelectedProductId(null);

    setActivePage(previousPage === "home" ? null : previousPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     OPEN PAGE
  ========================= */

  const openPage = (page) => {
    if (page) {
      setPreviousPage(page);
    }

    window.history.pushState(
      {},
      "",
      page
        ? `${window.location.pathname}?page=${page}`
        : window.location.pathname,
    );

    setSelectedProduct(null);

    setSelectedProductId(null);

    setActivePage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     PLACE ORDER
  ========================= */
  const handlePlaceOrder = async (order) => {
    console.log("ORDER RECEIVED IN APP:", order);

    // ==========================================
    // CHECK CUSTOMER
    // ==========================================

    if (!customer?.id && !customer?.customer_id) {
      alert("Customer information not found.");
      return;
    }

    const customerId = customer.id ?? customer.customer_id;

    // ==========================================
    // PREPARE ORDER DATA
    // ==========================================

    const orderData = {
      customer_id: Number(customerId),

      address_id: Number(order.address?.address_id),

      payment_method: order.paymentMethod,

      items: order.items.map((item) => ({
        productId: Number(item.productId ?? item.id),
        name: item.name,
        quantity: Number(item.quantity || 1),
        price: Number(item.price || 0),
        selectedSize: item.selectedSize ?? null,
      })),

      subtotal: Number(order.subtotal || 0),
      discount: Number(order.discount || 0),
      shipping: Number(order.shipping || 0),
      gst: Number(order.gst || 0),
      total: Number(order.total || 0),
    };

    console.log("ORDER DATA SENT TO API:", orderData);

    // ==========================================
    // SEND ORDER TO PHP API
    // ==========================================

    try {
      const response = await fetch(
        "http://localhost/react-backend/api/order/create.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(orderData),
        },
      );

      const data = await response.json();

      console.log("CREATE ORDER API RESPONSE:", data);

      // ==========================================
      // CHECK API RESPONSE
      // ==========================================

      if (!data.status) {
        alert(data.message || "Failed to create order.");
        return;
      }

      // ==========================================
      // CREATE DELIVERY DATE
      // ==========================================

      const deliveryStart = new Date();

      deliveryStart.setDate(deliveryStart.getDate() + 6);

      const deliveryEnd = new Date(deliveryStart);

      deliveryEnd.setDate(deliveryEnd.getDate() + 3);

      const formatDeliveryDate = (date) =>
        date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

      // ==========================================
      // CREATE COMPLETED ORDER DATA
      // ==========================================

      const completedOrderData = {
        ...order,

        orderId: data.data.order_id,

        estimatedDelivery: `${formatDeliveryDate(
          deliveryStart,
        )} – ${formatDeliveryDate(deliveryEnd)}`,
      };

      // ==========================================
      // SAVE ORDER FOR ORDER SUCCESS PAGE
      // ==========================================

      setCompletedOrder(completedOrderData);

      sessionStorage.setItem(
        "completedOrder",
        JSON.stringify(completedOrderData),
      );

      // ==========================================
      // GO TO ORDER SUCCESS
      // ==========================================

      openPage("order-success");
    } catch (error) {
      console.error("CREATE ORDER ERROR:", error);
      alert("Unable to place the order. Please try again.");
    }
  };
  /* =========================
     LOGIN SUCCESS
  ========================= */

  const handleLoginSuccess = (customerData) => {
    setCustomer(customerData);

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
        },
      );

      const data = await response.json();

      console.log("Logout Response:", data);

      if (data.success) {
        setCustomer(null);

        openPage(null);
      }
    } catch (error) {
      console.error("Logout failed:", error);
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
        products={apiProducts}
        customer={customer}
        onLogout={handleLogout}
        cart={cart}
        cartCount={cartCount}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        onAboutSelect={() => openPage("about")}
        onIndoorSelect={() => openPage("indoor")}
        onOutdoorSelect={() => openPage("outdoor")}
        onAllProductsSelect={() => openPage("all-products")}
        onLoginSelect={() => openPage("login")}
        onRegisterSelect={() => openPage("register")}
        onContactSelect={() => openPage("contact")}
        onCheckout={() => openPage("checkout")}
        onProfileSelect={() => openPage("profile")}
        onHomeSelect={() => openPage(null)}
        onProductSelect={openProduct}
      />

      {/* =========================
          PRODUCT VIEW
      ========================= */}

      {selectedProduct ? (
        <ProductView
          key={selectedProduct.id}
          product={selectedProduct}
          products={apiProducts}
          onBack={closeProduct}
          onProductSelect={openProduct}
          addToCart={addToCart}
          onCheckout={() => openPage("checkout")}
        />
      ) : activePage === "about" ? (
        <About />
      ) : activePage === "indoor" ? (
        <Indoor products={apiProducts} onProductSelect={openProduct} />
      ) : activePage === "outdoor" ? (
        <Outdoor products={apiProducts} onProductSelect={openProduct} />
      ) : activePage === "all-products" ? (
        <AllProducts products={apiProducts} onProductSelect={openProduct} />
      ) : activePage === "cart" ? (
        <Cart
          cart={cart}
          onBack={() => openPage("all-products")}
          onCheckout={() => openPage("checkout")}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onProductSelect={openProduct}
        />
      ) : activePage === "checkout" ? (
        <CheckOut
          cart={cart}
          customer={customer}
          onBack={() => openPage("cart")}
          onPlaceOrder={handlePlaceOrder}
        />
      ) : activePage === "profile" ? (
        <Profile customer={customer} />
      ) : activePage === "my-orders" ? (
  <MyOrders
    customer={customer}
    onViewOrder={(orderId) => {
      setSelectedOrderId(orderId);
      openPage("order-details");
    }}
  />
      ) : activePage === "order-summary" ? (
        <OrderSummary
          order={completedOrder}
          onContinueShopping={() => openPage(null)}
        />
      ) : activePage === "order-success" ? (
        <OrderSuccess
          order={completedOrder}
          onContinueShopping={() => openPage(null)}
          onViewMyOrders={() => openPage("my-orders")}
        />
      ) : activePage === "contact" ? (
        <Contact />
      ) : activePage === "login" ? (
        <Login
          onRegister={() => openPage("register")}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : activePage === "register" ? (
        <Register onLogin={() => openPage("login")} />
      ) : (
        <>
          <HeroSlider />

          <ProductSlider products={apiProducts} onProductSelect={openProduct} />

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
