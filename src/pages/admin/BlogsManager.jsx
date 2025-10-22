import { useState, useEffect } from 'react';
import { supabaseHelpers } from '../../config/supabase';

const BlogsManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author: 'Admin',
    tags: '',
    published: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [blogsData, imagesData] = await Promise.all([
        supabaseHelpers.getBlogs(),
        supabaseHelpers.getImages(),
      ]);
      setBlogs(blogsData || []);
      setAllImages(imagesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      featured_image: blog.featured_image,
      author: blog.author,
      tags: blog.tags || '',
      published: blog.published,
    });
    setShowEditor(true);
  };

  const handleNew = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      featured_image: '',
      author: 'Admin',
      tags: '',
      published: true,
    });
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (!blogForm.title || !blogForm.content) {
      alert('Please fill in title and content');
      return;
    }

    try {
      if (editingBlog) {
        await supabaseHelpers.updateBlog(editingBlog.id, blogForm);
      } else {
        await supabaseHelpers.addBlog(blogForm);
      }
      await loadData();
      setShowEditor(false);
      alert('Blog saved successfully!');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      await supabaseHelpers.deleteBlog(id);
      await loadData();
      alert('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const selectImage = (image) => {
    setBlogForm({ ...blogForm, featured_image: image.url });
    setShowImageSelector(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Blogs Manager</h1>
          <p className="text-gray-600">Create and manage your blog posts</p>
        </div>
        <button
          onClick={handleNew}
          className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Blog
        </button>
      </div>

      {/* Blogs List */}
      <div className="bg-white shadow-md">
        {blogs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p>No blogs yet. Create your first blog post!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex gap-6">
                  {blog.featured_image && (
                    <div className="w-48 h-32 flex-shrink-0 overflow-hidden bg-gray-100">
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>By {blog.author}</span>
                          <span>•</span>
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                          {blog.tags && (
                            <>
                              <span>•</span>
                              <span className="text-blue-600">{blog.tags}</span>
                            </>
                          )}
                          <span
                            className={`ml-2 px-2 py-1 text-xs ${
                              blog.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blog Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </h3>
              <button
                onClick={() => setShowEditor(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  rows="2"
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Short description of the blog"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                <div className="flex gap-4">
                  {blogForm.featured_image && (
                    <div className="w-32 h-32 overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={blogForm.featured_image} alt="Featured" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <button
                      onClick={() => setShowImageSelector(true)}
                      className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition mb-2"
                    >
                      Select Image
                    </button>
                    {blogForm.featured_image && (
                      <button
                        onClick={() => setBlogForm({ ...blogForm, featured_image: '' })}
                        className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition ml-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  rows="12"
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none font-mono text-sm"
                  placeholder="Write your blog content here... (supports markdown)"
                />
              </div>

              {/* Author & Tags */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="travel, eco-tourism, munnar"
                  />
                </div>
              </div>

              {/* Published */}
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blogForm.published}
                    onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">Publish immediately</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowEditor(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 transition"
              >
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Selector Modal */}
      {showImageSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">Select Featured Image</h3>
              <button
                onClick={() => setShowImageSelector(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {allImages.map((image) => (
                  <div
                    key={image.id}
                    className="border border-gray-200 hover:border-blue-400 transition-all cursor-pointer"
                    onClick={() => selectImage(image)}
                  >
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={image.url}
                        alt={image.filename}
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <p className="text-xs text-gray-600 truncate">{image.filename}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsManager;
