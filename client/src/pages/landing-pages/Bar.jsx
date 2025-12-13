import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Bar = () => {
  const [activeLink, setActiveLink] = useState('#popular');
  const observer = useRef(null);
  const barLinks = [
    { href: '#popular', label: 'Popular' },
    { href: '#about', label: 'About Us' },
    { href: '#features', label: 'Features' },
    { href: '#testimonials', label: 'Testimonials' },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;
    let intervalId;

    function startObserving() {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveLink(`#${entry.target.id}`);
            }
          });
        },
        { threshold: 0.6 }
      );

      barLinks.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (section) {
          observer.current.observe(section);
        }
      });
    }

    intervalId = setInterval(() => {
      const allFound = barLinks.every(({ href }) => document.querySelector(href));
      attempts++;

      if (allFound || attempts >= maxAttempts) {
        clearInterval(intervalId);
        if (allFound) {
          startObserving();
        }
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveLink(href);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white/30 backdrop-blur-md py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-center px-4">


        <div className="flex gap-10 text-lg font-semibold">
          {barLinks.map(({ href, label }, index) => (
            <a
              key={index}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className={`relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${activeLink === href
                ? 'text-blue-600 after:w-full'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {label}
            </a>
          ))}
        </div>


        <div className="absolute right-5 font-semibold ">
          <button className='bg-blue-600 text-white py-1.5 px-2 text-center rounded-2xl cursor-pointer'
            onClick={() => {
              navigate('/login')
            }}>
            Login
          </button>
        </div>

      </div>
    </div>
  );

};

export default Bar;
