import { useState } from "react";
import "./Header.css";

function Header({
  onAboutSelect,
  onIndoorSelect,
  onOutdoorSelect,
  onAllProductsSelect,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

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
          {/* INDOOR */}
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
                {/* Featured product */}
                <div className="featured-menu-product">
                  <div className="menu-title">INDOOR</div>

                  <img src="/products/pro1.webp" alt="Indoor" />

                  <button type="button" onClick={onIndoorSelect}>
                    SHOP ALL
                  </button>
                </div>

                {/* Product 1 */}
                <div className="menu-product">
                  <img src="/products/pro2.webp" alt="Midfield" />

                  <h3>MIDFIELD</h3>
                </div>

                {/* Product 2 */}
                <div className="menu-product">
                  <img src="/products/pro3.webp" alt="Turf" />

                  <h3>
                    TURF, STRIKERS,
                    <br />
                    MIDFIELDERS
                  </h3>
                </div>

                {/* Product 3 */}
                <div className="menu-product">
                  <img src="/products/pro4.webp" alt="Wingers" />

                  <h3>WINGERS</h3>
                </div>

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

          {/* OUTDOOR */}
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
                <div className="featured-menu-product">
                  <div className="menu-title">OUTDOOR</div>

                  <img src="/products/pro1.webp" alt="Outdoor" />

                  <button type="button" onClick={onOutdoorSelect}>
                    SHOP ALL
                  </button>
                </div>

                <div className="menu-product">
                  <img src="/products/pro2.webp" alt="Outdoor" />

                  <h3>FORWARD</h3>
                </div>

                <div className="menu-product">
                  <img src="/products/pro3.webp" alt="Outdoor" />

                  <h3>
                    MIDFIELD,
                    <br />
                    CONTROL
                  </h3>
                </div>

                <div className="menu-product">
                  <img src="/products/pro4.webp" alt="Outdoor" />

                  <h3>DEFENDERS</h3>
                </div>

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

          {/* Other links */}

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

        {/* Right side */}
        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Search" />

            <button type="button">
              <i class="bi bi-search icon-16"></i>
            </button>
          </div>

          <button className="header-icon" type="button">
            <i class="bi bi-person icon-28"></i>
          </button>

          <button className="header-icon cart-icon" type="button">
            <i class="bi bi-bag icon-28"></i>
          </button>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
        >
          ☰
        </button>
        <div className={`mobile-sidebar ${mobileMenuOpen ? "open" : ""}`}>
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
