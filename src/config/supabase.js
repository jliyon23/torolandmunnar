import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for database operations
export const supabaseHelpers = {
  // Images
  async getImages() {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async addImage(imageData) {
    const { data, error } = await supabase
      .from('images')
      .insert([imageData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteImage(id) {
    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // Blogs
  async getBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async addBlog(blogData) {
    const { data, error } = await supabase
      .from('blogs')
      .insert([blogData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateBlog(id, blogData) {
    const { data, error } = await supabase
      .from('blogs')
      .update(blogData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteBlog(id) {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // Hero Settings
  async getHeroSettings() {
    const { data, error } = await supabase
      .from('hero_settings')
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },

  async updateHeroSettings(settings) {
    const { data, error } = await supabase
      .from('hero_settings')
      .upsert(settings)
      .select();
    if (error) throw error;
    return data[0];
  },

  // Gallery
  async getGalleryImages() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data;
  },

  async addGalleryImage(galleryData) {
    const { data, error } = await supabase
      .from('gallery')
      .insert([galleryData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteGalleryImage(id) {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // Enquiries
  async getEnquiries() {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async addEnquiry(enquiryData) {
    const { data, error } = await supabase
      .from('enquiries')
      .insert([enquiryData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateEnquiryStatus(id, status) {
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteEnquiry(id) {
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};
