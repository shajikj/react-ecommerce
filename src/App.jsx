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
import { apiUrl, readApiResponse } from "./api";

const CART_STORAGE_KEY = "shoppingCart";
const MAX_ORDER_QUANTITY = 10;

function readStoredCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) return [];

    const quantitiesByProduct = new Map();
    return parsedCart.flatMap((item) => {
      const id = Number(item?.id);
      const quantity = Number(item?.quantity);
      const price = Number(item?.price);
      const originalPrice = Number(item?.originalPrice ?? item?.price);
      const discount = Number(item?.discount ?? 0);

      if (
        !Number.isSafeInteger(id) ||
        id <= 0 ||
        !Number.isSafeInteger(quantity) ||
        quantity <= 0 ||
        !Number.isFinite(originalPrice) ||
        originalPrice < 0 ||
        !Number.isFinite(price) ||
        price < 0 ||
        !Number.isFinite(discount) ||
        discount < 0 ||
        discount > 100 ||
        typeof item?.name !== "string"
      ) {
        return [];
      }

      const alreadyInCart = quantitiesByProduct.get(id) || 0;
      const validQuantity = Math.min(
        quantity,
        MAX_ORDER_QUANTITY - alreadyInCart,
      );
      if (validQuantity <= 0) return [];
      quantitiesByProduct.set(id, alreadyInCart + validQuantity);

      return [
        {
          ...item,
          id,
          quantity: validQuantity,
          price,
          originalPrice,
          discount,
          selectedSize:
            item.selectedSize == null ? null : String(item.selectedSize),
        },
      ];
    });
  } catch (error) {
    console.error("Saved cart could not be loaded:", error);
    return [];
  }
}

function readSavedOrderId() {
  try {
    const savedOrderId =
      sessionStorage.getItem("completedOrderId") ||
      sessionStorage.getItem("completedOrder");
    if (!savedOrderId) return null;

    let orderId = savedOrderId;
    try {
      const legacyOrder = JSON.parse(savedOrderId);
      if (legacyOrder && typeof legacyOrder === "object") {
        orderId = legacyOrder.orderId;
      }
    } catch {
      // The current format is a plain order ID.
    }

    sessionStorage.removeItem("completedOrder");
    if (orderId == null || String(orderId).trim() === "") return null;

    const normalizedOrderId = String(orderId).trim();
    sessionStorage.setItem("completedOrderId", normalizedOrderId);
    return normalizedOrderId;
  } catch (error) {
    console.error("Saved order reference could not be loaded:", error);
    return null;
  }
}

function App() {
  /* =========================
     GET CURRENT URL STATE
  ========================= */

  const getLocationState = () => {
    const params = new URLSearchParams(window.location.search);

    const productId = params.get("product");
    const page = params.get("page");
    const orderId = params.get("order_id");

    return {
      productId: productId ? Number(productId) : null,
      orderId: orderId || null,

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

  const [selectedProductId, setSelectedProductId] = useState(
    () => getLocationState().productId,
  );

  const [activePage, setActivePage] = useState(() => getLocationState().page);

  const [previousPage, setPreviousPage] = useState("all-products");

  /* =========================
     CUSTOMER AUTHENTICATION
  ========================= */

  const [customer, setCustomer] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(
    () => getLocationState().orderId,
  );

  const [checkingSession, setCheckingSession] = useState(true);

  const [apiProducts, setApiProducts] = useState([]);

  const [cart, setCart] = useState(readStoredCart);

  const [cartOpen, setCartOpen] = useState(false);

  const [completedOrder, setCompletedOrder] = useState(null);
  const [completedOrderId, setCompletedOrderId] = useState(readSavedOrderId);
  const selectedProduct =
    apiProducts.find((item) => item.id === selectedProductId) || null;

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Cart could not be saved:", error);
    }
  }, [cart]);

  /* =========================
     CART SECTION
  ========================= */

  const addToCart = (product) => {
    if (
      !Number.isSafeInteger(Number(product.id)) ||
      Number(product.id) <= 0 ||
      !Number.isSafeInteger(Number(product.quantity)) ||
      Number(product.quantity) <= 0 ||
      Number(product.quantity) > MAX_ORDER_QUANTITY
    ) {
      return;
    }

    setCart((prevCart) => {
      const quantityForProduct = prevCart
        .filter((item) => item.id === product.id)
        .reduce((total, item) => total + item.quantity, 0);
      const quantityToAdd = Math.min(
        product.quantity,
        MAX_ORDER_QUANTITY - quantityForProduct,
      );
      if (quantityToAdd <= 0) return prevCart;

      const existingProduct = prevCart.find(
        (item) =>
          item.id === product.id && item.selectedSize === product.selectedSize,
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? {
                ...item,
                quantity: item.quantity + quantityToAdd,
              }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: quantityToAdd }];
    });
  };

  const updateCartQuantity = (id, selectedSize, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id && item.selectedSize === selectedSize) {
            const quantityForOtherSizes = prevCart
              .filter(
                (otherItem) =>
                  otherItem.id === id &&
                  otherItem.selectedSize !== selectedSize,
              )
              .reduce((total, otherItem) => total + otherItem.quantity, 0);
            const newQty = item.quantity + delta;

            return newQty > 0
              ? {
                  ...item,
                  quantity: Math.min(
                    MAX_ORDER_QUANTITY - quantityForOtherSizes,
                    newQty,
                  ),
                }
              : null;
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
          apiUrl("customer/check-session.php"),
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await readApiResponse(response);

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
        const response = await fetch(apiUrl("product/list.php"));
        const data = await readApiResponse(response);

        if (!data.status || !Array.isArray(data.data)) {
          throw new Error("The product service returned an invalid response.");
        }

        const formattedProducts = data.data.map((product) => {
          const originalPrice = Number(product.Price);
          const discount = Number(product.discount) || 0;
          if (
            !Number.isFinite(originalPrice) ||
            originalPrice < 0 ||
            !Number.isFinite(discount) ||
            discount < 0 ||
            discount > 100
          ) {
            throw new Error("The product service returned invalid pricing.");
          }
          const price =
            Math.round(originalPrice * (1 - discount / 100) * 100) / 100;

          return {
            id: Number(product.product_id),

            name: product.product_name,

            image: product.product_image
              ? apiUrl(`assets/images/products/${product.product_image}`)
              : "",

            price,
            originalPrice,
            discount,

            colors: product.product_color,

            shoeSize: product.shoe_size,

            description: product.description,

            details: product.product_details,

            categoryId: Number(product.category_id),

            categoryName: product.category_name,

            status: Number(product.status),
          };
        });

        setApiProducts(formattedProducts);
        setCart((previousCart) =>
          previousCart.flatMap((item) => {
            const currentProduct = formattedProducts.find(
              (product) => product.id === Number(item.id),
            );
            return currentProduct
              ? [
                  {
                    ...currentProduct,
                    selectedSize: item.selectedSize,
                    quantity: item.quantity,
                  },
                ]
              : [];
          }),
        );
      } catch (error) {
        console.error("Product fetch failed:", error);
      }
    };

    fetchProducts();
  }, []);

  /* =========================
     BROWSER BACK / FORWARD
  ========================= */

  useEffect(() => {
    const handlePopState = () => {
      const locationState = getLocationState();

      setSelectedProductId(locationState.productId);

      setSelectedOrderId(locationState.orderId);

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

    setSelectedProductId(null);

    setActivePage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openOrderDetails = (orderId) => {
    const normalizedOrderId = String(orderId ?? "").trim();

    if (!normalizedOrderId) {
      console.error("Cannot open order details without an order ID.");
      return;
    }

    const params = new URLSearchParams({
      page: "order-details",
      order_id: normalizedOrderId,
    });

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`,
    );

    setSelectedProductId(null);
    setSelectedOrderId(normalizedOrderId);
    setActivePage("order-details");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     PLACE ORDER
  ========================= */
  const handlePlaceOrder = async (order) => {
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

    // ==========================================
    // SEND ORDER TO PHP API
    // ==========================================

    try {
      const response = await fetch(
        apiUrl("order/create.php"),
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(orderData),
        },
      );

      const data = await readApiResponse(response);

      // ==========================================
      // CHECK API RESPONSE
      // ==========================================

      if (!data.status) {
        alert("Failed to create order. Please verify your details and try again.");
        return;
      }

      const orderId = data.data?.order_id;
      if (orderId == null || String(orderId).trim() === "") {
        alert("The order was submitted, but its confirmation number is unavailable.");
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

        orderId,

        estimatedDelivery: `${formatDeliveryDate(
          deliveryStart,
        )} – ${formatDeliveryDate(deliveryEnd)}`,
      };

      // ==========================================
      // SAVE ORDER FOR ORDER SUCCESS PAGE
      // ==========================================

      setCompletedOrder(completedOrderData);
      setCompletedOrderId(String(orderId));
      try {
        sessionStorage.setItem("completedOrderId", String(orderId));
        sessionStorage.removeItem("completedOrder");
      } catch (error) {
        console.error("Order reference could not be saved:", error);
      }

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
        apiUrl("customer/logout.php"),
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await readApiResponse(response);

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
          customer={customer}
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
        <Profile
          customer={customer}
          onViewOrders={() => openPage("my-orders")}
        />
      ) : activePage === "my-orders" ? (
        <MyOrders customer={customer} onViewOrder={openOrderDetails} />
      ) : activePage === "order-details" ? (
        <OrderDetails
          orderId={selectedOrderId}
          onBackToOrders={() => openPage("my-orders")}
        />
      ) : activePage === "order-summary" ? (
        <OrderSummary
          order={completedOrder}
          onContinueShopping={() => openPage(null)}
        />
      ) : activePage === "order-success" ? (
        <OrderSuccess
          orderId={completedOrderId}
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
