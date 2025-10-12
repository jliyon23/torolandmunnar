const FilterSection = ({ activeFilter, setActiveFilter, categories }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-8 py-3 font-secondary font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-primary text-light shadow-lg'
                  : 'bg-light text-primary hover:bg-secondary hover:text-light'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
