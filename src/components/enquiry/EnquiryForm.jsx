import { useState } from 'react';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    
    // Trip Details
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: '',
    adults: '',
    children: '',
    
    // Accommodation Preferences
    roomType: '',
    specialRequests: '',
    
    // Activities & Interests
    activities: [],
    dietaryRestrictions: '',
    
    // Additional Information
    occasion: '',
    budgetRange: '',
    howDidYouHear: '',
    additionalComments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        activities: checked 
          ? [...prev.activities, value]
          : prev.activities.filter(activity => activity !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Connect to backend API
    console.log('Form Data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your enquiry! We will get back to you within 24 hours.');
      setIsSubmitting(false);
      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', country: '',
        checkInDate: '', checkOutDate: '', numberOfGuests: '', adults: '', children: '',
        roomType: '', specialRequests: '', activities: [], dietaryRestrictions: '',
        occasion: '', budgetRange: '', howDidYouHear: '', additionalComments: ''
      });
    }, 2000);
  };

  const availableActivities = [
    'Nature Walks', 'Tea Tasting', 'Tribal Cooking Class', 'Waterfall Visits',
    'Wildlife Safari', 'Yoga & Meditation', 'Photography Tours', 'Cultural Experiences'
  ];

  return (
    <div className="bg-light p-8 shadow-xl border-2 border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-primary text-primary mb-4">Send Us Your Enquiry</h2>
        <p className="font-secondary text-main-text/70">
          Fill out the form below with your travel details and preferences. Our team will create a personalized itinerary just for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-primary text-primary mb-4 border-b border-secondary/30 pb-2">
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-secondary text-primary mb-2" htmlFor="firstName">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
                placeholder="Your first name"
              />
            </div>
            <div>
              <label className="block font-secondary text-primary mb-2" htmlFor="lastName">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
                placeholder="Your last name"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
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
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-secondary text-primary mb-2" htmlFor="country">
              Country/Region
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
              placeholder="Your country or region"
            />
          </div>
        </div>

        {/* Trip Details */}
        <div>
          <h3 className="text-xl font-primary text-primary mb-4 border-b border-secondary/30 pb-2">
            Trip Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
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
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block font-secondary text-primary mb-2" htmlFor="adults">
                Adults *
              </label>
              <select
                id="adults"
                name="adults"
                required
                value={formData.adults}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
              >
                <option value="">Select adults</option>
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-secondary text-primary mb-2" htmlFor="children">
                Children (0-12 years)
              </label>
              <select
                id="children"
                name="children"
                value={formData.children}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
              >
                <option value="">Select children</option>
                {[0,1,2,3,4].map(num => (
                  <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-secondary text-primary mb-2" htmlFor="roomType">
                Preferred Room Type
              </label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
              >
                <option value="">Select room type</option>
                <option value="forest-villa">Forest Villa</option>
                <option value="canopy-suite">Canopy Suite</option>
                <option value="treehouse">Luxury Treehouse</option>
                <option value="earth-lodge">Earth Lodge</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activities & Interests */}
        <div>
          <h3 className="text-xl font-primary text-primary mb-4 border-b border-secondary/30 pb-2">
            Activities & Interests
          </h3>
          <div>
            <label className="block font-secondary text-primary mb-4">
              Which activities interest you? (Select all that apply)
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {availableActivities.map((activity) => (
                <label key={activity} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={activity}
                    checked={formData.activities.includes(activity)}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                  />
                  <span className="font-secondary text-main-text">{activity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-secondary text-primary mb-2" htmlFor="dietaryRestrictions">
              Dietary Restrictions or Food Allergies
            </label>
            <textarea
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              rows="3"
              value={formData.dietaryRestrictions}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white resize-none"
              placeholder="Please mention any dietary restrictions, allergies, or special dietary requirements..."
            />
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-xl font-primary text-primary mb-4 border-b border-secondary/30 pb-2">
            Additional Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-secondary text-primary mb-2" htmlFor="occasion">
                Special Occasion
              </label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
              >
                <option value="">Select occasion</option>
                <option value="honeymoon">Honeymoon</option>
                <option value="anniversary">Anniversary</option>
                <option value="birthday">Birthday</option>
                <option value="family-vacation">Family Vacation</option>
                <option value="romantic-getaway">Romantic Getaway</option>
                <option value="wellness-retreat">Wellness Retreat</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-secondary text-primary mb-2" htmlFor="budgetRange">
                Budget Range (per night)
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
              >
                <option value="">Select budget range</option>
                <option value="under-15000">Under ₹15,000</option>
                <option value="15000-25000">₹15,000 - ₹25,000</option>
                <option value="25000-35000">₹25,000 - ₹35,000</option>
                <option value="35000-50000">₹35,000 - ₹50,000</option>
                <option value="above-50000">Above ₹50,000</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-secondary text-primary mb-2" htmlFor="howDidYouHear">
              How did you hear about us?
            </label>
            <select
              id="howDidYouHear"
              name="howDidYouHear"
              value={formData.howDidYouHear}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
            >
              <option value="">Select source</option>
              <option value="google">Google Search</option>
              <option value="social-media">Social Media</option>
              <option value="travel-blog">Travel Blog</option>
              <option value="friend-family">Friend/Family</option>
              <option value="travel-agent">Travel Agent</option>
              <option value="advertisement">Advertisement</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="block font-secondary text-primary mb-2" htmlFor="additionalComments">
              Additional Comments or Special Requests
            </label>
            <textarea
              id="additionalComments"
              name="additionalComments"
              rows="5"
              value={formData.additionalComments}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white resize-none"
              placeholder="Tell us about any special requirements, preferences, or questions you have about your stay..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-secondary/30">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 font-secondary font-semibold tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl ${
              isSubmitting 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-primary text-light hover:bg-secondary'
            }`}
          >
            {isSubmitting ? 'SENDING ENQUIRY...' : 'SEND ENQUIRY'}
          </button>
          <p className="text-center text-sm font-secondary text-main-text/60 mt-4">
            We'll respond to your enquiry within 24 hours with a personalized itinerary and pricing.
          </p>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
