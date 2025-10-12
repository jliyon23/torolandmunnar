const IntroSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-secondary text-secondary tracking-widest uppercase mb-4">
          Eco-Luxury Accommodation
        </p>
        <h2 className="text-4xl md:text-5xl font-primary text-primary mb-8">
          Where Comfort Meets Consciousness
        </h2>
        <div className="w-24 h-[2px] bg-secondary mx-auto mb-8"></div>
        <p className="text-lg font-secondary text-main-text/80 leading-relaxed">
          Our accommodations are thoughtfully designed to minimize environmental impact while maximizing comfort and connection with nature. Each room tells a story of sustainable luxury, crafted with local materials and powered by renewable energy.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
