import { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

// --- Mock Data: (No changes) ---
const blogPostsData = [
  {
    id: "a-day-in-the-western-ghats",
    title: "A Day in the Western Ghats: A Hiker's Journal",
    category: "Adventure",
    date: "September 18, 2025",
    excerpt: "Join us on a trek through misty trails as we uncover the hidden waterfalls and breathtaking vistas of Munnar.",
    imageUrl: "https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,g_auto,f_auto,q_auto/v1756912996/local_amenities_1_klaedb.jpg"
  },
  {
    id: "the-art-of-local-keralan-cuisine",
    title: "The Art of Local Keralan Cuisine",
    category: "Culture",
    date: "September 15, 2025",
    excerpt: "Discover the secrets behind the region's most flavorful dishes, from sourcing spices to traditional cooking methods.",
    imageUrl: "https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,g_auto,f_auto,q_auto/v1756913001/local_amenities_3_bymxit.jpg"
  },
  {
    id: "finding-serenity-in-the-hills",
    title: "Finding Serenity: A Guide to Mindfulness in the Hills",
    category: "Wellness",
    date: "September 12, 2025",
    excerpt: "Learn how the tranquil environment of Munnar can be the perfect backdrop for your wellness and meditation journey.",
    imageUrl: "https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,g_auto,f_auto,q_auto/v1756913006/local_amenities_2_pdbzpz.jpg"
  }
];

// --- Custom Hook: (No changes) ---
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


const BlogSection = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section ref={sectionRef} id="blog" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-light">
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
          {blogPostsData.map((post, index) => (
            // ====== NEW CARD DESIGN ======
            // NOTE: Replace <a> with your router's <Link> component if needed
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className={`group block bg-background shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <p className="font-secondary text-secondary text-xs tracking-widest uppercase mb-2">
                  {post.category}
                </p>
                <h3 className="text-xl font-primary text-primary mb-3 transition-colors duration-300 group-hover:text-secondary flex-grow">
                  {post.title}
                </h3>
                <p className="text-main-text/80 font-secondary text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="mt-auto font-secondary text-secondary text-sm font-semibold flex items-center gap-2">
                  Read More
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View More Button (No changes) */}
        <div className={`flex justify-center mt-20 transition-all duration-700 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a 
            href="/blogs"
            className="inline-flex items-center gap-3 font-secondary text-secondary border-2 border-secondary py-3 px-8 uppercase text-sm tracking-widest transition-all duration-300 hover:bg-secondary hover:text-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-light"
          >
            View All Posts
            <FaArrowRight />
          </a>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;