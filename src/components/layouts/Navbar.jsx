// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; 
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo/logo-text.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes (mobile)
  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full transition-all duration-300 flex items-center justify-between px-4 md:px-8 lg:px-20 py-4 z-50 ${
        isScrolled 
          ? 'bg-white/60 backdrop-blur-2xl h-24 shadow-md' 
          : 'bg-gradient-to-b from-black/80 to-transparent border-b-[0.1px] h-24 lg:h-32 border-primary '
      }`}>
        {/* Left - Hamburger (mobile only) */}
        <button
          onClick={() => setIsOpen(true)}
          className={`focus:outline-none md:hidden ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>

        {/* Middle - Logo */}
        <NavLink to="/" className="mx-auto md:mx-0">
          <img src={logo} className="w-28 md:w-44 lg:w-48" alt="Website Logo" />
        </NavLink>

        {/* Desktop Navigation (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-8 font-secondary tracking-wider">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `transition-colors ${isScrolled ? 'text-black hover:text-amber-600' : 'text-white hover:text-amber-300'} ${
                isActive ? (isScrolled ? "text-amber-700" : "text-amber-400") : ""
              }`
            }
          >
            HOME
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `transition-colors ${isScrolled ? 'text-black hover:text-amber-600' : 'text-white hover:text-amber-300'} ${
                isActive ? (isScrolled ? "text-amber-700" : "text-amber-400") : ""
              }`
            }
          >
            ABOUT
          </NavLink>
          <NavLink 
            to="/stay" 
            className={({ isActive }) => 
              `transition-colors ${isScrolled ? 'text-black hover:text-amber-600' : 'text-white hover:text-amber-300'} ${
                isActive ? (isScrolled ? "text-amber-700" : "text-amber-400") : ""
              }`
            }
          >
            STAY
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => 
              `transition-colors ${isScrolled ? 'text-black hover:text-amber-600' : 'text-white hover:text-amber-300'} ${
                isActive ? (isScrolled ? "text-amber-700" : "text-amber-400") : ""
              }`
            }
          >
            GALLERY
          </NavLink>
          
          {/* More Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1 transition-colors ${isScrolled ? 'text-black hover:text-amber-600' : 'text-white hover:text-amber-300'}`}>
              MORE
              <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
              isScrolled ? 'bg-white shadow-xl border border-gray-200' : 'bg-black/90 backdrop-blur-md'
            }`}>
              <NavLink 
                to="/activities" 
                className={({ isActive }) => 
                  `block px-6 py-3 transition-colors ${isScrolled ? 'text-black hover:text-amber-600 hover:bg-gray-50' : 'text-white hover:text-amber-300 hover:bg-white/10'} ${
                    isActive ? (isScrolled ? "text-amber-700 bg-gray-50" : "text-amber-400 bg-white/10") : ""
                  }`
                }
              >
                ACTIVITIES
              </NavLink>
              <NavLink 
                to="/blogs" 
                className={({ isActive }) => 
                  `block px-6 py-3 transition-colors ${isScrolled ? 'text-black hover:text-amber-600 hover:bg-gray-50' : 'text-white hover:text-amber-300 hover:bg-white/10'} ${
                    isActive ? (isScrolled ? "text-amber-700 bg-gray-50" : "text-amber-400 bg-white/10") : ""
                  }`
                }
              >
                BLOGS
              </NavLink>
            </div>
          </div>
          
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `transition-colors ${isScrolled ? 'text-black hover:text-amber-600' : 'text-white hover:text-amber-300'} ${
                isActive ? (isScrolled ? "text-amber-700" : "text-amber-400") : ""
              }`
            }
          >
            CONTACT
          </NavLink>
        </div>

        {/* Right - Enquiry Button (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-6">
          <button className={`border font-medium font-secondary tracking-wider transition rounded-none px-4 py-2 ${
            isScrolled 
              ? 'border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white' 
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}>
            ENQUIRY NOW
          </button>
        </div>

        {/* Mobile Enquiry Button (visible only on mobile) */}
        <button className={`md:hidden border text-sm font-medium font-secondary tracking-wider transition rounded-none px-3 py-1 ${
          isScrolled 
            ? 'border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white' 
            : 'border-white text-white hover:bg-white hover:text-black'
        }`}>
          ENQUIRE
        </button>
      </nav>

      {/* Fullscreen Menu Overlay for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
          {/* Background with black overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dlgdmu6gq/image/upload/v1756798653/_DSC2821_1_mtwrwr.jpg')",
            }}
          >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/85"></div>
          </div>
          
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 left-5 text-white z-10 p-2"
            aria-label="Close menu"
          >
            <X size={30} />
          </button>

          {/* Nav Links */}
          <div className="relative z-10 w-full max-w-4xl px-4">
            <ul className="grid font-secondary grid-cols-1 gap-2 text-white text-2xl font-semibold text-center tracking-wider">
              <li className="flex items-center justify-center">
                <NavLink 
                  to="/" 
                  onClick={handleNavClick}
                  className={({ isActive }) => 
                    `py-5 px-8 w-full hover:text-amber-300 transition-colors ${isActive ? "text-amber-400" : ""}`
                  }
                >
                  HOME
                </NavLink>
              </li>
              <li className="flex items-center justify-center">
                <NavLink 
                  to="/about" 
                  onClick={handleNavClick}
                  className={({ isActive }) => 
                    `py-5 px-8 w-full hover:text-amber-300 transition-colors ${isActive ? "text-amber-400" : ""}`
                  }
                >
                  ABOUT
                </NavLink>
              </li>
              <li className="flex items-center justify-center">
                <NavLink 
                  to="/stay" 
                  onClick={handleNavClick}
                  className={({ isActive }) => 
                    `py-5 px-8 w-full hover:text-amber-300 transition-colors ${isActive ? "text-amber-400" : ""}`
                  }
                >
                  STAY
                </NavLink>
              </li>
              <li className="flex items-center justify-center">
                <NavLink 
                  to="/gallery" 
                  onClick={handleNavClick}
                  className={({ isActive }) => 
                    `py-5 px-8 w-full hover:text-amber-300 transition-colors ${isActive ? "text-amber-400" : ""}`
                  }
                >
                  GALLERY
                </NavLink>
              </li>
              <li className="flex items-center justify-center">
                <NavLink 
                  to="/activities" 
                  onClick={handleNavClick}
                  className={({ isActive }) => 
                    `py-5 px-8 w-full hover:text-amber-300 transition-colors ${isActive ? "text-amber-400" : ""}`
                  }
                >
                  ACTIVITIES
                </NavLink>
              </li>
              <li className="flex items-center justify-center">
                <NavLink 
                  to="/blogs" 
                  onClick={handleNavClick}
                  className={({ isActive }) => 
                    `py-5 px-8 w-full hover:text-amber-300 transition-colors ${isActive ? "text-amber-400" : ""}`
                  }
                >
                  BLOGS
                </NavLink>
              </li>
              <li className="flex items-center justify-center">
                <NavLink 
                  to="/contact" 
                  onClick={handleNavClick}
                  className={({ isActive }) => 
                    `py-5 px-8 w-full hover:text-amber-300 transition-colors ${isActive ? "text-amber-400" : ""}`
                  }
                >
                  CONTACT
                </NavLink>
              </li>
              <li className="flex items-center justify-center mt-6">
                <button className="border-2 border-white text-white px-8 py-3 text-xl font-medium font-secondary tracking-wider hover:bg-white hover:text-black transition rounded-none">
                  ENQUIRY NOW
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;