import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

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

const Blogs = () => {
  const heroRef = useRef(null);
  const blogsRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const isHeroVisible = useOnScreen(heroRef);
  const isBlogsVisible = useOnScreen(blogsRef);

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Regenerative Tourism: How Toroland is Changing Travel",
      excerpt: "Discover how we're pioneering a new approach to luxury travel that heals rather than harms our planet.",
      category: "sustainability",
      author: "Rajesh Kumar",
      date: "March 15, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Hidden Waterfalls of Munnar: A Nature Lover's Guide",
      excerpt: "Explore the pristine waterfalls around Toroland, from the famous Viripara to secret cascades known only to locals.",
      category: "nature",
      author: "Arjun Thomas",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
      featured: false
    },
    {
      id: 3,
      title: "Traditional Tribal Cooking: Preserving Ancient Flavors",
      excerpt: "Learn about the indigenous cooking methods we use at Toroland and how they connect us to the land.",
      category: "culture",
      author: "Priya Nair",
      date: "March 5, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      featured: false
    },
    {
      id: 4,
      title: "Wildlife Photography in the Western Ghats",
      excerpt: "Tips and techniques for capturing the incredible biodiversity of Munnar while respecting wildlife.",
      category: "nature",
      author: "Arjun Thomas",
      date: "February 28, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      featured: false
    },
    {
      id: 5,
      title: "Zero-Waste Living: Lessons from Our Sustainable Practices",
      excerpt: "How Toroland achieves near-zero waste and what travelers can learn for their own lives.",
      category: "sustainability",
      author: "Rajesh Kumar",
      date: "February 22, 2024",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
      featured: false
    },
    {
      id: 6,
      title: "The Tea Trail: From Leaf to Cup in Munnar",
      excerpt: "Follow the journey of tea from our organic gardens to your morning cup, a story of tradition and sustainability.",
      category: "culture",
      author: "Priya Nair",
      date: "February 18, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      featured: false
    },
    {
      id: 7,
      title: "Monsoon Magic: Why Rainy Season is Perfect for Eco-Tourism",
      excerpt: "Discover the unique beauty and experiences that monsoon brings to the Western Ghats.",
      category: "nature",
      author: "Arjun Thomas",
      date: "February 12, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      featured: false
    },
    {
      id: 8,
      title: "Carbon Positive Hospitality: Our Journey to Climate Action",
      excerpt: "Learn how Toroland goes beyond carbon neutral to become carbon positive through innovative practices.",
      category: "sustainability",
      author: "Rajesh Kumar",
      date: "February 8, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80",
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'sustainability', name: 'Sustainability', count: blogPosts.filter(post => post.category === 'sustainability').length },
    { id: 'nature', name: 'Nature & Wildlife', count: blogPosts.filter(post => post.category === 'nature').length },
    { id: 'culture', name: 'Culture & Heritage', count: blogPosts.filter(post => post.category === 'culture').length }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className={`relative z-10 text-center text-white px-4 max-w-4xl transition-all duration-1000 transform ${
          isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-primary mb-6">Our Blog</h1>
          <p className="text-xl md:text-2xl font-secondary leading-relaxed">
            Stories of sustainability, nature, and conscious travel from the heart of Munnar
          </p>
        </div>
      </section>

      {/* Featured Post */}
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

          {featuredPost && (
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
          )}
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
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

      {/* Blog Posts Grid */}
      <section ref={blogsRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post, index) => (
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

      {/* Newsletter Signup */}
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

      <Footer />
    </div>
  );
};

export default Blogs;
