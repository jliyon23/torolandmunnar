const NewsletterSignup = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-4xl mx-auto text-center text-light">
        <h2 className="text-4xl md:text-5xl font-primary mb-6">
          Stay Updated
        </h2>
        <p className="text-xl font-secondary mb-8 leading-relaxed">
          Subscribe to our newsletter for the latest stories on sustainable travel, conservation efforts, and exclusive insights from Toroland.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 text-primary font-secondary outline-none"
          />
          <button className="bg-secondary text-light px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-accent hover:text-primary transition-all duration-300 whitespace-nowrap">
            SUBSCRIBE
          </button>
        </div>
        <p className="text-light/70 font-secondary text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;
