import { useState } from 'react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What's included in the room rate?",
      answer: "Our room rates include accommodation, daily breakfast, access to all common areas, complimentary Wi-Fi, nature walks, tea tasting sessions, and use of our wellness facilities. Some premium activities and experiences have additional charges."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 2-4 weeks in advance, especially during peak seasons (October to March). However, we're happy to accommodate last-minute bookings based on availability."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Free cancellation up to 7 days before arrival. Cancellations within 7 days are subject to a 50% charge. No-shows are charged the full amount. We understand plans can change and will work with you to find the best solution."
    },
    {
      question: "Do you provide transportation from the airport?",
      answer: "Yes! We offer airport pickup and drop-off services from Cochin International Airport (110 km away). This can be arranged at an additional cost and must be booked in advance."
    },
    {
      question: "Are children welcome? What facilities do you have for families?",
      answer: "Absolutely! We welcome children of all ages. We have family-friendly activities, a children's play area, safe swimming spots, and can arrange special meals for kids. Our team loves making young guests feel at home."
    },
    {
      question: "What should I pack for my stay?",
      answer: "Comfortable walking shoes, light cotton clothes, a warm jacket for evenings, sunscreen, insect repellent, and a reusable water bottle. We provide eco-friendly toiletries, but you're welcome to bring your own."
    },
    {
      question: "Do you cater to dietary restrictions?",
      answer: "Yes! Our kitchen can accommodate various dietary needs including vegetarian, vegan, gluten-free, and other specific requirements. Please inform us in advance so we can prepare accordingly."
    },
    {
      question: "What makes Toroland different from other resorts?",
      answer: "We're committed to regenerative tourism - our practices actively heal the environment while providing luxury experiences. We use 100% renewable energy, grow our own organic produce, and all our activities are designed to give back to nature and local communities."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto mb-6"></div>
          <p className="font-secondary text-main-text/80 text-lg">
            Got questions? We've got answers! If you don't see your question here, feel free to ask in your enquiry.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-background shadow-md border-2 border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
              >
                <h3 className="font-primary text-primary text-lg pr-4">{faq.question}</h3>
                <div className={`transform transition-transform ${openFAQ === index ? 'rotate-45' : ''}`}>
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <p className="font-secondary text-main-text/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-secondary text-main-text/70 mb-4">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919876543210" 
              className="bg-primary text-light px-6 py-3 font-secondary font-semibold hover:bg-secondary transition-all duration-300 flex items-center gap-3 justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us Now
            </a>
            <a 
              href="mailto:info@torolandmunnar.com" 
              className="border-2 border-primary text-primary px-6 py-3 font-secondary font-semibold hover:bg-primary hover:text-light transition-all duration-300 flex items-center gap-3 justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
