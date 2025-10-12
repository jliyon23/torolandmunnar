const ContactInfo = () => {
  return (
    <div className="space-y-8">
      {/* Quick Contact */}
      <div className="bg-primary text-light p-8 border-2 border-primary">
        <h3 className="text-2xl font-primary mb-6">Need Immediate Assistance?</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-light flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="font-secondary font-semibold">Call Us</p>
              <p className="text-light/90">+91 98765 43210</p>
              <p className="text-light/90">+91 87654 32109</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-light flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-secondary font-semibold">Email Us</p>
              <p className="text-light/90">reservations@torolandmunnar.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-light flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="font-secondary font-semibold">WhatsApp</p>
              <p className="text-light/90">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-light p-8 border-2 border-secondary/20">
        <h3 className="text-xl font-primary text-primary mb-6">Why Choose Toroland?</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8  text-primary flex items-center justify-center mt-1">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-secondary font-semibold text-primary">100% Sustainable</h4>
              <p className="text-sm text-main-text/80">Carbon-neutral luxury accommodation</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 text-primary flex items-center justify-center mt-1">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-secondary font-semibold text-primary">Unique Location</h4>
              <p className="text-sm text-main-text/80">Heart of Munnar's pristine wilderness</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 text-primary flex items-center justify-center mt-1">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-secondary font-semibold text-primary">Authentic Experiences</h4>
              <p className="text-sm text-main-text/80">Local culture & traditional activities</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 text-primary flex items-center justify-center mt-1">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-secondary font-semibold text-primary">Personalized Service</h4>
              <p className="text-sm text-main-text/80">Tailored to your preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-secondary/10 p-6 border-2 border-secondary/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-secondary text-light flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="font-primary text-primary">Response Time</h4>
        </div>
        <p className="font-secondary text-main-text/80 text-sm leading-relaxed">
          Our team typically responds to enquiries within <strong>2-4 hours</strong> during business hours 
          (9 AM - 8 PM IST) and within <strong>24 hours</strong> on weekends and holidays.
        </p>
      </div>

      {/* What to Expect */}
      <div className="bg-accent/10 p-6 border-2 border-accent/20">
        <h4 className="font-primary text-primary mb-4">What to Expect Next</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-light w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
            <p className="font-secondary text-main-text/80">We'll review your requirements and preferences</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-light w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
            <p className="font-secondary text-main-text/80">Create a personalized itinerary just for you</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-light w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
            <p className="font-secondary text-main-text/80">Send you detailed pricing and availability</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-light w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
            <p className="font-secondary text-main-text/80">Schedule a call to discuss and finalize details</p>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="text-center">
        <div className="flex justify-center gap-4 mb-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-light flex items-center justify-center mb-2 mx-auto">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16L3 14l5.5-5.5L16 16l-5.5 5.5z" />
                <path d="M19 7.5L16.5 5 21 .5 23.5 3z" />
              </svg>
            </div>
            <p className="text-xs font-secondary text-main-text/80">Award Winning</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary text-light flex items-center justify-center mb-2 mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-xs font-secondary text-main-text/80">Eco Certified</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-accent text-light flex items-center justify-center mb-2 mx-auto">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="text-xs font-secondary text-main-text/80">5 Star Rated</p>
          </div>
        </div>
        <p className="text-xs font-secondary text-main-text/60">
          Trusted by over 1,000+ guests worldwide
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
