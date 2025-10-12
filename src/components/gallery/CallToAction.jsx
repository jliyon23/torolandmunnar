const CallToAction = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-4xl mx-auto text-center text-light">
        <h2 className="text-4xl md:text-5xl font-primary mb-6">
          Experience It Yourself
        </h2>
        <p className="text-xl font-secondary mb-8 leading-relaxed">
          These moments are waiting for you. Book your sustainable luxury experience at Toroland today.
        </p>
        <button className="bg-light text-primary px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-accent hover:text-light transition-all duration-300 shadow-lg hover:shadow-xl">
          BOOK NOW
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
