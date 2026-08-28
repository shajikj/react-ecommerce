function Categories() {
  const categories = [
    {
      id: 1,
      image: "/categories/indoor.webp",
      link: "?page=indoor",
    },
    {
      id: 2,
      image: "/categories/outdoor.webp",
      link: "?page=outdoor",
    },
    {
      id: 3,
      image: "/categories/football.webp",
      link: "/football",
    },
    {
      id: 4,
      image: "/categories/socks.webp",
      link: "/socks",
    },
  ];

  return (
    <section className="categories">
      {categories.map((category) => (
        <a
          href={category.link}
          className="category-card"
          key={category.id}
        >
          <img src={category.image} alt={category.name} />

          <div className="category-overlay">
            <h2>{category.name}</h2>
          </div>
        </a>
      ))}
    </section>
  );
}

export default Categories;