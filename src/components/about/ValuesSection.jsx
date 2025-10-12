const ValuesSection = () => {
  const values = [
    {
      title: "Sustainability",
      description: "Every decision we make considers its impact on the environment and future generations.",
      icon: "🌱"
    },
    {
      title: "Authenticity",
      description: "We celebrate and preserve local culture, traditions, and natural heritage.",
      icon: "🏛️"
    },
    {
      title: "Community",
      description: "We believe in empowering local communities and creating shared prosperity.",
      icon: "🤝"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
            Our Values
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-8 bg-light">
              <div className="text-5xl mb-6">{value.icon}</div>
              <h3 className="text-2xl font-primary text-primary mb-4">{value.title}</h3>
              <p className="font-secondary text-main-text/80 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
