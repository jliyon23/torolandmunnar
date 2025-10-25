import { useState, useEffect } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import BlogsHero from "../components/blogs/BlogsHero";
import FeaturedPost from "../components/blogs/FeaturedPost";
import CategoryFilter from "../components/blogs/CategoryFilter";
import BlogsGrid from "../components/blogs/BlogsGrid";
import NewsletterSignup from "../components/blogs/NewsletterSignup";
import { supabaseHelpers } from "../config/supabase";

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await supabaseHelpers.getBlogs();
      // Transform data to match component format
      const formattedBlogs = data
        .filter(blog => blog.published)
        .map(blog => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt || blog.content.substring(0, 150) + '...',
          category: blog.category || 'general',
          author: blog.author || 'Toroland Team',
          date: new Date(blog.publish_date || blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: blog.read_time || '5 min read',
          image: blog.featured_image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
          featured: blog.featured || false
        }));
      setBlogPosts(formattedBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
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

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'sustainability', name: 'Sustainability', count: blogPosts.filter(post => post.category === 'sustainability').length },
    { id: 'nature', name: 'Nature & Wildlife', count: blogPosts.filter(post => post.category === 'nature').length },
    { id: 'culture', name: 'Culture & Heritage', count: blogPosts.filter(post => post.category === 'culture').length }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];

  return (
    <div className="min-h-screen">
      <Navbar />
      <BlogsHero />
      <FeaturedPost featuredPost={featuredPost} />
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <BlogsGrid posts={filteredPosts} />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Blogs;
