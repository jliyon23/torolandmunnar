// src/components/Newsletter.jsx
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // API call to your backend would go here
    console.log("Subscribed with email:", email);
    setIsSubscribed(true);
    setEmail("");

    // Reset success message after 4 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <section 
      className="relative bg-cover bg-center py-20 sm:py-24" 
      style={{ backgroundImage: "url('https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,f_auto,q_auto/v1756798653/_DSC2821_1_mtwrwr.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Side: Text */}
        <div className="text-white md:w-1/2 text-center md:text-left">
          <p className="uppercase tracking-widest text-sm mb-2">
            Stay tuned with Toroland Munnar
          </p>
          <h2 className="font-serif text-3xl md:text-4xl leading-snug">
            Sign up for our newsletter to receive our news, deals and special offers.
          </h2>
        </div>
        
        {/* Right Side: Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col gap-4">
          <input
            placeholder="Enter Email"
            className="bg-transparent border border-white text-white px-4 py-3 placeholder-white outline-none focus:ring-2 focus:ring-[#5d9f5c] transition-all duration-300"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#5d9f5c] text-white py-3 px-6 text-lg font-medium hover:bg-green-700 transition-all duration-300"
          >
            Submit
          </button>
          
          {/* Form Messages */}
          <div className="min-h-[24px] text-center">
            {isSubscribed && <p className="text-green-300">Thank you for subscribing!</p>}
            {error && <p className="text-red-400">{error}</p>}
          </div>
        </form>
        
      </div>
    </section>
  );
};

export default Newsletter;

