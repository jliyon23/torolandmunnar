import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { supabaseHelpers } from "../config/supabase";
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaTag,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp
} from "react-icons/fa";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadBlog();
      loadRelatedBlogs();
    }
  }, [id]);

  const loadBlog = async () => {
    try {
      const data = await supabaseHelpers.getBlogById(id);
      if (!data.published) {
        setError("This blog post is not available.");
        return;
      }
      
      const formattedBlog = {
        id: data.id,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || data.content.substring(0, 200) + '...',
        category: data.category || 'general',
        author: data.author || 'Toroland Team',
        date: new Date(data.publish_date || data.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        readTime: data.read_time || calculateReadTime(data.content),
        image: data.featured_image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
        featured: data.featured || false,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [],
        seoTitle: data.seo_title || data.title,
        seoDescription: data.seo_description || data.excerpt
      };
      
      setBlog(formattedBlog);
    } catch (error) {
      console.error('Error loading blog:', error);
      setError("Blog post not found.");
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedBlogs = async () => {
    try {
      const allBlogs = await supabaseHelpers.getBlogs();
      const related = allBlogs
        .filter(b => b.id !== id && b.published)
        .slice(0, 3)
        .map(blog => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt || blog.content.substring(0, 100) + '...',
          category: blog.category || 'general',
          image: blog.featured_image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
          readTime: blog.read_time || '5 min read'
        }));
      setRelatedBlogs(related);
    } catch (error) {
      console.error('Error loading related blogs:', error);
    }
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog.title);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title} ${url}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-primary text-primary mb-4">Blog Not Found</h1>
            <p className="text-main-text/80 mb-8">{error}</p>
            <Link 
              to="/blogs" 
              className="inline-flex items-center gap-2 bg-primary text-light px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              <FaArrowLeft /> Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Fixed Image */}
      <section className="relative">
        <div className="w-full h-[500px] md:h-[600px] overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-contain bg-gray-100"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              {/* Back Button */}
              <button 
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-6 transition-colors"
              >
                <FaArrowLeft /> Back
              </button>
              
              {/* Category */}
              <span className="inline-block bg-amber-600 text-white px-3 py-1 text-sm uppercase font-secondary mb-4">
                {blog.category}
              </span>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-primary text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <FaUser className="text-sm" />
                  <span className="font-secondary">{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-sm" />
                  <span className="font-secondary">{blog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-sm" />
                  <span className="font-secondary">{blog.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              
              {/* Article Content */}
              <article className="lg:col-span-3">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="font-secondary text-gray-600 leading-relaxed"
                    style={{
                      fontSize: '18px',
                      lineHeight: '1.8'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: blog.content.replace(/\n/g, '<br />') 
                    }} 
                  />
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-3 flex-wrap">
                      <FaTag className="text-amber-600" />
                      <span className="font-secondary text-gray-600">Tags:</span>
                      {blog.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-800 px-3 py-1 text-sm font-secondary border border-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-primary text-gray-800 text-xl mb-4">Share this article</h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
                    >
                      <FaFacebook /> Facebook
                    </button>
                    <button 
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 hover:bg-blue-500 transition-colors"
                    >
                      <FaTwitter /> Twitter
                    </button>
                    <button 
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 hover:bg-blue-900 transition-colors"
                    >
                      <FaLinkedin /> LinkedIn
                    </button>
                    <button 
                      onClick={() => handleShare('whatsapp')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition-colors"
                    >
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  
                  {/* Author Info */}
                  <div className="bg-white p-6 border border-gray-200">
                    <h3 className="font-primary text-gray-800 text-lg mb-3">About the Author</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-amber-600" />
                      </div>
                      <div>
                        <p className="font-secondary font-semibold text-gray-800">{blog.author}</p>
                        <p className="text-sm text-gray-600">Writer</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 font-secondary">
                      Passionate about sustainable tourism and sharing the beauty of Munnar with the world.
                    </p>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="bg-amber-50 p-6 border border-amber-200">
                    <h3 className="font-primary text-gray-800 text-lg mb-3">Stay Updated</h3>
                    <p className="text-sm text-gray-600 font-secondary mb-4">
                      Subscribe for the latest stories on sustainable travel and conservation.
                    </p>
                    <Link 
                      to="/blogs#newsletter"
                      className="block w-full bg-amber-600 text-white text-center py-2 hover:bg-amber-700 transition-colors font-secondary"
                    >
                      Subscribe Now
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-primary text-gray-800 text-center mb-12">
              Related Articles
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link 
                  key={relatedBlog.id}
                  to={`/blog/${relatedBlog.id}`}
                  className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={relatedBlog.image} 
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-amber-600 uppercase font-secondary mb-2 block">
                      {relatedBlog.category}
                    </span>
                    <h3 className="font-primary text-gray-800 text-lg mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-secondary line-clamp-2 mb-3">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-secondary">{relatedBlog.readTime}</span>
                      <span className="text-amber-600 font-secondary">Read More →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/blogs"
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-3 hover:bg-amber-700 transition-colors font-secondary"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;