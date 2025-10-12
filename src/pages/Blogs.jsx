import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import BlogsHero from "../components/blogs/BlogsHero";
import FeaturedPost from "../components/blogs/FeaturedPost";
import CategoryFilter from "../components/blogs/CategoryFilter";
import BlogsGrid from "../components/blogs/BlogsGrid";
import NewsletterSignup from "../components/blogs/NewsletterSignup";

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
