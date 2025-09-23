import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/logo/logo.png'; // Make sure the path to your logo is correct

// --- Data for Footer Links ---
const footerNavLinks = [
  { name: 'About Us', href: '#why-us' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Our Blog', href: '#blog' },
  { name: 'Guest Reviews', href: '#testimonials' }
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: <FaFacebookF size={16} /> },
  { name: 'Instagram', href: '#', icon: <FaInstagram size={16} /> },
  { name: 'Twitter', href: '#', icon: <FaTwitter size={16} /> }
];

const Footer = () => {
  return (
    <footer className="bg-light font-secondary text-main-text">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Logo, About & Socials */}
          <div className="space-y-4">
            <img src={logo} alt="Toroland Logo" className="h-20" />
            <p className="text-sm text-main-text/80 leading-relaxed">
              A sanctuary where luxury coexists with nature, offering an unforgettable and eco-conscious retreat in the heart of Munnar.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  className="text-main-text/70 transition-colors duration-300 hover:text-secondary"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-primary text-lg text-primary mb-4 tracking-wide">Explore</h3>
            <ul className="space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm transition-colors duration-300 hover:text-secondary">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-primary text-lg text-primary mb-4 tracking-wide">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
                <span>Chithirapuram, Munnar, Kerala 685565, India</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-secondary" />
                <a href="tel:+911234567890" className="hover:text-secondary">+91 123 456 7890</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-secondary" />
                <a href="mailto:info@toroland.com" className="hover:text-secondary">info@toroland.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-primary text-lg text-primary mb-4 tracking-wide">Stay Updated</h3>
            <p className="text-sm mb-4 text-main-text/80">
              Receive our latest news and special offers directly to your inbox.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="w-full px-4 py-2 bg-background border border-transparent focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit"
                className="bg-secondary text-light px-4 py-2 transition-opacity duration-300 hover:opacity-90"
                aria-label="Subscribe to newsletter"
              >
                Go
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-main-text/10 text-center">
          <p className="text-xs text-main-text/60">
            © {new Date().getFullYear()} Toroland Sanctuary. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;