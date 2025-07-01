import React, { useEffect, useState, useRef } from 'react';

const Bar = () => {
  const [activeLink, setActiveLink] = useState('#popular');
  const observer = useRef(null);
  const barLinks = [
    { href: '#popular', label: 'Popular' },
    { href: '#about', label: 'About Us' },
    { href: '#features', label: 'Features' },
    { href: '#testimonials', label: 'Testimonials' },
  ];

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
    <div className="flex justify-center sticky z-50 top-12 gap-10 text-sm font-semibold bg-white py-2">
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
  );
};

export default Bar;
