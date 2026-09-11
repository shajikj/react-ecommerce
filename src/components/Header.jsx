import { useState } from "react";
import "./Header.css";

function Header({
  products,
  onAboutSelect,
  onIndoorSelect,
  onOutdoorSelect,
  onAllProductsSelect,
  onLoginSelect,
  customer,
  onLogout,
  onProductSelect,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get Indoor products
  const indoorProducts = (products || []).filter(
    (product) => Number(product.categoryId) === 1
  );

  // Get Outdoor products
  const outdoorProducts = (products || []).filter(
    (product) => Number(product.categoryId) === 2
  );

  return (
    <header className="site-header">

      {/* Top shipping bar */}
      <div className="shipping-bar">
        <div className="shipping-text">
          FREE SHIPPING ACROSS INDIA · SHIPS WITHIN 6-8 DAYS
        </div>
      </div>

      {/* Main navigation */}
      <div className="navbar">

        {/* Logo */}
        <div className="logo">
          <a href="/">
            <img src="/logo.webp" alt="Logo" />
          </a>
        </div>

        {/* Navigation links */}
        <nav className="nav-links">

          {/* ================= INDOOR ================= */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setActiveMenu("indoor")}
          >
            <a
              href="?page=indoor"
              onClick={(event) => {
                if (onIndoorSelect) {
                  event.preventDefault();
                  onIndoorSelect();
                }
              }}
            >
              INDOOR
            </a>

            {activeMenu === "indoor" && (
              <div
                className="mega-menu"
                onMouseLeave={() => setActiveMenu(null)}
              >

                {/* Featured Indoor Product */}
                {indoorProducts.length > 0 && (
                  <div
                    className="featured-menu-product"
                    onClick={() =>
                      onProductSelect?.(indoorProducts[0])
                    }
                  >
                    <div className="menu-title">INDOOR</div>

                    <img
                      src={indoorProducts[0].image}
                      alt={indoorProducts[0].name}
                    />

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (onIndoorSelect) {
                          onIndoorSelect();
                        }
                      }}
                    >
                      SHOP ALL
                    </button>
                  </div>
                )}

                {/* Indoor Products 2, 3 and 4 */}
                {indoorProducts.slice(1, 4).map((product) => (
                  <div
                    className="menu-product"
                    key={product.id}
                    onClick={() =>
                      onProductSelect?.(product)
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <h3>{product.name}</h3>
                  </div>
                ))}

                {/* Right side links */}
                <div className="menu-side-links">

                  <a href="#">NEW IN</a>

                  <a href="#">
                    FIND YOUR
                    <br />
                    SILHOUETTE
                  </a>

                  <a href="#">SIZING GUIDE</a>

                  <a
                    href="?page=indoor"
                    className="view-all"
                    onClick={(event) => {
                      if (onIndoorSelect) {
                        event.preventDefault();
                        onIndoorSelect();
                      }
                    }}
                  >
                    VIEW ALL INDOOR
                  </a>

                </div>
              </div>
            )}
          </div>


          {/* ================= OUTDOOR ================= */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setActiveMenu("outdoor")}
          >
            <a
              href="?page=outdoor"
              onClick={(event) => {
                if (onOutdoorSelect) {
                  event.preventDefault();
                  onOutdoorSelect();
                }
              }}
            >
              OUTDOOR
            </a>

            {activeMenu === "outdoor" && (
              <div
                className="mega-menu"
                onMouseLeave={() => setActiveMenu(null)}
              >

                {/* Featured Outdoor Product */}
                {outdoorProducts.length > 0 && (
                  <div
                    className="featured-menu-product"
                    onClick={() =>
                      onProductSelect?.(outdoorProducts[0])
                    }
                  >
                    <div className="menu-title">OUTDOOR</div>

                    <img
                      src={outdoorProducts[0].image}
                      alt={outdoorProducts[0].name}
                    />

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (onOutdoorSelect) {
                          onOutdoorSelect();
                        }
                      }}
                    >
                      SHOP ALL
                    </button>
                  </div>
                )}

                {/* Outdoor Products 2, 3 and 4 */}
                {outdoorProducts.slice(1, 4).map((product) => (
                  <div
                    className="menu-product"
                    key={product.id}
                    onClick={() =>
                      onProductSelect?.(product)
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <h3>{product.name}</h3>
                  </div>
                ))}

                {/* Right side links */}
                <div className="menu-side-links">

                  <a href="#">NEW IN</a>

                  <a href="#">
                    FIND YOUR
                    <br />
                    SILHOUETTE
                  </a>

                  <a href="#">SIZING GUIDE</a>

                  <a
                    href="?page=outdoor"
                    className="view-all"
                    onClick={(event) => {
                      if (onOutdoorSelect) {
                        event.preventDefault();
                        onOutdoorSelect();
                      }
                    }}
                  >
                    VIEW ALL OUTDOOR
                  </a>

                </div>
              </div>
            )}
          </div>


          {/* ================= ALL PRODUCTS ================= */}
          <a
            href="?page=all-products"
            onClick={(event) => {
              if (onAllProductsSelect) {
                event.preventDefault();
                onAllProductsSelect();
              }
            }}
          >
            ALL PRODUCTS
          </a>


          {/* ================= ABOUT ================= */}
          <a
            href="?page=about"
            onClick={(event) => {
              if (onAboutSelect) {
                event.preventDefault();
                onAboutSelect();
              }
            }}
          >
            ABOUT
          </a>

        </nav>


        {/* ================= RIGHT SIDE ================= */}
        <div className="header-actions">

          {/* Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
            />

            <button type="button">
              <i className="bi bi-search icon-16"></i>
            </button>
          </div>


          {/* Login / Logout */}
          {customer ? (
            <button
              className="header-icon"
              type="button"
              onClick={onLogout}
              title="Logout"
            >
              <i className="bi bi-box-arrow-right icon-28"></i>
            </button>
          ) : (
            <button
              className="header-icon"
              type="button"
              onClick={onLoginSelect}
              title="Login"
            >
              <i className="bi bi-person icon-28"></i>
            </button>
          )}


          {/* Cart */}
          <button
            className="header-icon cart-icon"
            type="button"
          >
            <i className="bi bi-bag icon-28"></i>
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
        >
          ☰
        </button>


        <div
          className={`mobile-sidebar ${
            mobileMenuOpen ? "open" : ""
          }`}
        >

          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </button>

          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/products">All Products</a>
          <a href="/indoor">Indoor</a>
          <a href="/outdoor">Outdoor</a>
          <a href="/contact">Contact</a>

        </div>

      </div>
    </header>
  );
}

export default Header;