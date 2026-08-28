import "./About.css";

function About() {
  return (
    <main className="about-page">
      <article className="about-editorial">
        <header className="about-intro" aria-labelledby="about-heading">
          <h1 id="about-heading">ABOUT US</h1>
          <h2 className="about-subtitle">MADE FOR THE LOVE OF THE GAME</h2>
        </header>

        <figure className="about-feature-image">
          <img src="/slider/slider3.webp" alt="Football mentors inspiring the next generation" />
        </figure>

        <section className="about-section about-introduction" aria-label="About Spika">
          <p>Spika is for the players who make time for the game—before school, after work, and whenever the pitch calls. We create football footwear and essentials that help every player feel ready to perform.</p>
          <p>Our purpose is simple: make dependable, comfortable gear more accessible, so more people can enjoy the game with confidence.</p>
        </section>

        <section className="about-section" aria-labelledby="belief-heading">
          <h2 id="belief-heading">OUR BELIEF</h2>
          <p>Great football starts with the freedom to play. We believe ability is built through repetition, resilience, and joy—not by what holds you back.</p>
          <p>That is why we focus on fit, grip, comfort, and durability: the details that let you focus on the next touch, tackle, and goal.</p>
        </section>

        <section className="about-section" aria-labelledby="range-heading">
          <h2 id="range-heading">THE RANGE</h2>
          <p>Our range is built for every kind of player and every surface.</p>
          <ul className="about-range-list">
            <li><strong>Indoor</strong><span>Control and comfort for fast indoor play.</span></li>
            <li><strong>Outdoor</strong><span>Dependable footwear for the demands of the open pitch.</span></li>
            <li><strong>Football essentials</strong><span>Gear that supports every training session and match day.</span></li>
            <li><strong>Accessories</strong><span>The finishing touches that keep you moving.</span></li>
          </ul>
        </section>

        <section className="about-section about-why" aria-labelledby="why-heading">
          <h2 id="why-heading">WHY SPIKA</h2>
          <p>We make products that earn a place in your kit: reliable quality, a comfort-first fit, honest value, and service that stays with you from checkout to the pitch.</p>
          <p>With free shipping across India and gear tested for real players, Spika is here to help you play more and play with purpose.</p>
        </section>
      </article>
    </main>
  );
}

export default About;
