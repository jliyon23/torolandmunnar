import { NavLink } from "react-router-dom";

const FeaturedPost = ({ featuredPost }) => {
  if (!featuredPost) return null;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
            Featured Article
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
            Latest Insights
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
        </div>

        <article className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-2 bg-primary text-light text-sm font-secondary font-semibold tracking-wider">
                {featuredPost.category.toUpperCase()}
              </span>
              <span className="text-main-text/60 font-secondary text-sm">
                {featuredPost.readTime}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-primary text-primary mb-4 leading-tight">
              {featuredPost.title}
            </h3>
            <p className="text-lg font-secondary text-main-text/80 leading-relaxed mb-6">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-secondary font-semibold text-primary">
                By {featuredPost.author}
              </span>
              <span className="text-main-text/60 font-secondary">
                {featuredPost.date}
              </span>
            </div>
            <NavLink 
              to={`/blog/${featuredPost.id}`}
              className="inline-flex items-center gap-2 bg-primary text-light px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              READ FULL ARTICLE
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>
          </div>
          
          <div className="order-1 lg:order-2">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full aspect-[4/3] object-cover shadow-2xl"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default FeaturedPost;
