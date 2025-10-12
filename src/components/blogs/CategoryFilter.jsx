const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-3 font-secondary font-semibold tracking-wider transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-light shadow-lg'
                  : 'bg-background text-primary hover:bg-secondary hover:text-light'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
