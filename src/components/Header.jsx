import { useState } from "react";
import "./Header.css";

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);

  return (  
    <header className="site-header">

      {/* Top shipping bar */}
      <div className="shipping-bar">
        FREE SHIPPING ACROSS INDIA · SHIPS WITHIN 6 DAYS
      </div>

      {/* Main navigation */}
      <div className="navbar">

        {/* Logo */}
        <div className="logo">
          <img src="/logo.webp" alt="My Store" />
        </div>

        {/* Navigation links */}
        <nav className="nav-links">

          {/* INDOOR */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setActiveMenu("indoor")}
          >
            <a href="#">INDOOR</a>

            {activeMenu === "indoor" && (
              <div
                className="mega-menu"
                onMouseLeave={() => setActiveMenu(null)}
              >

                {/* Featured product */}
                <div className="featured-menu-product">

                  <div className="menu-title">
                    INDOOR
                  </div>

                  <img
                    src="/products/indoor-main.webp"
                    alt="Indoor"
                  />

                  <button>SHOP ALL</button>

                </div>


                {/* Product 1 */}
                <div className="menu-product">

                  <img
                    src="/products/midfield.webp"
                    alt="Midfield"
                  />

                  <h3>MIDFIELD</h3>

                </div>


                {/* Product 2 */}
                <div className="menu-product">

                  <img
                    src="/products/turf.webp"
                    alt="Turf"
                  />

                  <h3>
                    TURF, STRIKERS,
                    <br />
                    MIDFIELDERS
                  </h3>

                </div>


                {/* Product 3 */}
                <div className="menu-product">

                  <img
                    src="/products/wingers.webp"
                    alt="Wingers"
                  />

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
                    href="#"
                    className="view-all"
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
            <a href="#">OUTDOOR</a>

            {activeMenu === "outdoor" && (
              <div
                className="mega-menu"
                onMouseLeave={() => setActiveMenu(null)}
              >

                <div className="featured-menu-product">

                  <div className="menu-title">
                    OUTDOOR
                  </div>

                  <img
                    src="/products/outdoor-main.webp"
                    alt="Outdoor"
                  />

                  <button>SHOP ALL</button>

                </div>


                <div className="menu-product">

                  <img
                    src="/products/outdoor1.webp"
                    alt="Outdoor"
                  />

                  <h3>FORWARD</h3>

                </div>


                <div className="menu-product">

                  <img
                    src="/products/outdoor2.webp"
                    alt="Outdoor"
                  />

                  <h3>
                    MIDFIELD,
                    <br />
                    CONTROL
                  </h3>

                </div>


                <div className="menu-product">

                  <img
                    src="/products/outdoor3.webp"
                    alt="Outdoor"
                  />

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
                    href="#"
                    className="view-all"
                  >
                    VIEW ALL OUTDOOR
                  </a>

                </div>

              </div>
            )}

          </div>


          {/* Other links */}
          <a href="#">ALL PRODUCTS</a>
          <a href="#">ABOUT</a>

        </nav>


        {/* Right side */}
        <div className="header-actions">

          <div className="search-box">

            <input
              type="text"
              placeholder="Search"
            />

            <button type="button">
              🔍
            </button>

          </div>


          <button
            className="header-icon"
            type="button"
          >
            ♙
          </button>


          <button
            className="header-icon cart-icon"
            type="button"
          >
            🛍
          </button>

        </div>

      </div>

    </header>
  );
}

export default Header;