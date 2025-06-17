import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const footerLinks = {
    support: [
      { name: 'Help', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
    ],
    resources: [
      { name: 'Guides', href: '#' },
      { name: 'Cooking Tips', href: '#' },
      { name: 'Meal Plans', href: '#' },
      { name: 'Ingredient Substitutes', href: '#' },
    ],
    community: [
      { name: 'Forums', href: '#' },
      { name: 'Cooking Challenges', href: '#' },
      { name: 'Events', href: '#' },
      { name: 'Ambassadors', href: '#' },
    ],
    company: [
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partners', href: '#' },
    ],
  };

  return (
    <footer className="bg-blue-500 px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Left side: Thank you & social icons */}
        <div className="md:w-1/3">
          <p className="text-lg font-semibold mb-4">Thank you for Visiting</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center  hover:text-xl hover:bg-gray-300 transition duration-75">
              <FontAwesomeIcon icon={faLinkedin} className="text-blue-950" />
            </a>
            <a href="#" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gray-300 transition hover:text-xl duration-75">
              <FontAwesomeIcon icon={faFacebook} className="text-blue-950" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-200 bg-opacity-20 rounded-full flex items-center justify-center hover:text-xl hover:text-blue-600 hover:bg-gray-300  transition duration-200 ">
              <FontAwesomeIcon icon={faInstagram} className="text-blue-950 " />
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
                    <a href={link.href} className="text-white hover:underline hover:text-gray-200">
                      {link.name}
                    </a>
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
