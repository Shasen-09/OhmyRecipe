import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'; // ✅ use Link for internal routing

const Footer = () => {
  const footerLinks = {
    support: [
      { name: 'Help', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
    resources: [
      { name: 'Guides', href: '/guides' },
      { name: 'Cooking Tips', href: '/cooking-tips' },
      { name: 'Meal Plans', href: '/meal-plans' },
      { name: 'Ingredient Substitutes', href: '/ingredient-subs' },
    ],
    community: [
      { name: 'Forums', href: '/forums' },
      { name: 'Cooking Challenges', href: '/challenges' },
      { name: 'Events', href: '/events' },
      { name: 'Ambassadors', href: '/ambassadors' },
    ],
    company: [
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' },
    ],
  };

  return (
    <footer className="bg-blue-500 px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Left side: Socials */}
        <div className="md:w-1/3">
          <p className="text-lg font-semibold mb-4">Thank you for Visiting</p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/shasen-shrestha-40505a28a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:text-xl hover:bg-gray-300 transition duration-75"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-blue-950" />
            </a>
            <a
              href="https://www.facebook.com/shasen09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gray-300 transition hover:text-xl duration-75"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-blue-950" />
            </a>
            <a
              href="https://www.instagram.com/shasen_zero9/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-200 bg-opacity-20 rounded-full flex items-center justify-center hover:text-xl hover:text-blue-600 hover:bg-gray-300 transition duration-200"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-blue-950" />
            </a>
          </div>
        </div>

        {/* Right side: Footer links */}
        <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-md font-bold mb-3 capitalize">{category}</h3>
              <ul className="space-y-2 text-sm">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-white hover:underline hover:text-gray-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 border-t border-white border-opacity-20 pt-4 text-center text-sm text-white text-opacity-80">
        <p>© {new Date().getFullYear()} Ohmyrecipe.com — All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
