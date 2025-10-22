import { useState } from 'react';
import { supabaseHelpers } from '../../config/supabase';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    guests: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      await supabaseHelpers.addEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        check_in_date: formData.checkInDate,
        check_out_date: formData.checkOutDate,
        guests: parseInt(formData.guests),
        message: formData.message,
        status: 'pending',
      });

      alert('Thank you for your enquiry! We will get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkInDate: '',
        checkOutDate: '',
        guests: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-light p-8 shadow-xl border-2 border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-primary text-primary mb-4">Send Us Your Enquiry</h2>
        <p className="font-secondary text-main-text/70">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-secondary text-primary mb-2" htmlFor="name">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
            placeholder="Your full name"
          />
        </div>

        {/* Contact Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-secondary text-primary mb-2" htmlFor="email">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="block font-secondary text-primary mb-2" htmlFor="phone">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
              placeholder="+91 12345 67890"
            />
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block font-secondary text-primary mb-2" htmlFor="checkInDate">
              Check-in Date *
            </label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              required
              value={formData.checkInDate}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
            />
          </div>
          <div>
            <label className="block font-secondary text-primary mb-2" htmlFor="checkOutDate">
              Check-out Date *
            </label>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              required
              value={formData.checkOutDate}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
            />
          </div>
          <div>
            <label className="block font-secondary text-primary mb-2" htmlFor="guests">
              Number of Guests *
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              required
              min="1"
              max="20"
              value={formData.guests}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
              placeholder="2"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block font-secondary text-primary mb-2" htmlFor="message">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white resize-none"
            placeholder="Tell us about your preferences, special requests, or any questions you have..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 font-secondary font-semibold tracking-wider transition-all duration-300 ${
              isSubmitting 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-primary text-light hover:bg-secondary'
            }`}
          >
            {isSubmitting ? 'SENDING...' : 'SEND ENQUIRY'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
