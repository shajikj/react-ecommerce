function Header() {
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
          <a href="#">INDOOR</a>
          <a href="#">OUTDOOR</a>
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

          <button className="header-icon" type="button">
            ♙
          </button>

          <button className="header-icon cart-icon" type="button">
            🛍
          </button>

        </div>

      </div>

    </header>
  );
}

export default Header;