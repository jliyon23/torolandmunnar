import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { supabaseHelpers } from "../../config/supabase";

// --- Custom Hook: (No changes) ---
const useOnScreen = (ref, threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(true); // Start as TRUE

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { threshold, rootMargin: '100px' }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }
  }, [ref, threshold]);

  return isIntersecting;
};


const BlogSection = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await supabaseHelpers.getBlogs();
      // Only show published blogs, limit to 3 most recent
      const publishedBlogs = data
        .filter(blog => blog.published)
        .slice(0, 3);
      setBlogs(publishedBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="blog" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header (No changes) */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20">
          <div className={`transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              Our Journal
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary">
              Latest Articles & Stories
            </h2>
            <div className="w-24 h-[2px] bg-secondary mt-4"></div>
          </div>
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-main-text/80 font-secondary text-lg leading-relaxed">
              Dive into our stories from the heart of Munnar. Explore travel tips, cultural insights, and the latest news from our serene sanctuary in the hills.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-main-text/80 font-secondary">No blog posts available at the moment.</p>
            </div>
          ) : (
            blogs.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className={`group block bg-light shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="overflow-hidden">
                <img
                  src={post.featured_image || 'https://via.placeholder.com/800x600'}
                  alt={post.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <p className="font-secondary text-secondary text-xs tracking-widest uppercase mb-2">
                  {post.tags || 'Blog'}
                </p>
                <h3 className="text-xl font-primary text-primary mb-3 transition-colors duration-300 group-hover:text-secondary flex-grow">
                  {post.title}
                </h3>
                <p className="text-main-text/80 font-secondary text-sm leading-relaxed mb-4">
                  {post.excerpt || post.content.substring(0, 150) + '...'}
                </p>
                <div className="mt-auto font-secondary text-secondary text-sm font-semibold flex items-center gap-2">
                  Read More
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))
          )}
        </div>

        {/* View More Button */}
        <div className={`flex justify-center mt-20 transition-all duration-700 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link 
            to="/blogs"
            className="inline-flex items-center gap-3 font-secondary text-secondary border-2 border-secondary py-3 px-8 uppercase text-sm tracking-widest transition-all duration-300 hover:bg-secondary hover:text-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-light"
          >
            View All Posts
            <FaArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;