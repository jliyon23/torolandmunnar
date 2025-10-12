import { useRef, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

// Custom Hook for intersection observer
const useOnScreen = (ref, threshold = 0.2) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, threshold]);

  return isIntersecting;
};

const BlogsGrid = ({ posts }) => {
  const blogsRef = useRef(null);
  const isBlogsVisible = useOnScreen(blogsRef);

  return (
    <section ref={blogsRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.filter(post => !post.featured).map((post, index) => (
            <article
              key={post.id}
              className={`group cursor-pointer transition-all duration-700 transform hover:scale-105 ${
                isBlogsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <NavLink to={`/blog/${post.id}`} className="block">
                <div className="bg-light shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-secondary font-semibold text-light ${
                        post.category === 'sustainability' ? 'bg-primary' :
                        post.category === 'nature' ? 'bg-secondary' :
                        'bg-accent'
                      }`}>
                        {post.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-sm text-main-text/60">
                      <span className="font-secondary">{post.date}</span>
                      <span className="font-secondary">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-primary text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="font-secondary text-main-text/80 leading-relaxed mb-4 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-secondary text-sm font-semibold text-secondary">
                        By {post.author}
                      </span>
                      <div className="flex items-center gap-2 text-primary group-hover:text-secondary transition-colors">
                        <span className="font-secondary text-sm font-semibold">Read More</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-primary text-light px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
            LOAD MORE ARTICLES
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsGrid;
