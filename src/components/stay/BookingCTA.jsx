const BookingCTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto text-center text-light">
        <h2 className="text-4xl md:text-5xl font-primary mb-6">
          Ready to Experience Sustainable Luxury?
        </h2>
        <p className="text-xl font-secondary mb-8 leading-relaxed">
          Book your stay and become part of our regenerative tourism story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-light text-secondary px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-primary hover:text-light transition-all duration-300 shadow-lg">
            CHECK AVAILABILITY
          </button>
          <button className="border-2 border-light text-light px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-light hover:text-secondary transition-all duration-300">
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
