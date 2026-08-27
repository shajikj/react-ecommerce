function Features() {
  const features = [
    {
      id: 1,
      icon: "bi-activity",
      title: "BUILT FOR INDIAN PITCHES",
      description: "Designed for local ground conditions",
    },
    {
      id: 2,
      icon: "bi-rulers",
      title: "WIDE-FIT COMFORT",
      description: "No pinch, no foot pain",
    },
    {
      id: 3,
      icon: "bi-shield-check",
      title: "A+ GRADE TPU",
      description: "Grip and durability that lasts",
    },
    {
      id: 4,
      icon: "bi-people",
      title: "PLAYER TESTED",
      description: "Tested by real players",
    },
  ];

  return (
    <section className="features-section">
      {features.map((feature) => (
        <div className="feature-card" key={feature.id}>

          <div className="feature-icon">
            <i className={`bi ${feature.icon}`}></i>
          </div>

          <h3>{feature.title}</h3>

          <p>{feature.description}</p>

        </div>
      ))}
    </section>
  );
}

export default Features;