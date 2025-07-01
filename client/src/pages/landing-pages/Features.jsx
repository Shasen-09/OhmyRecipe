import React from 'react';
import { FaSearch, FaBookmark, FaUtensils, FaHeart, FaRegBell } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const features = [
  {
    icon: <FaSearch size={24} />,
    title: 'Smart Search',
    desc: 'Find the perfect recipe by ingredients, cuisine, or dietary needs.',
  },
  {
    icon: <FaBookmark size={24} />,
    title: 'Save Favorites',
    desc: 'Bookmark recipes you love and access them anytime.',
  },
  {
    icon: <FaUtensils size={24} />,
    title: 'Step-by-Step Mode',
    desc: 'Cook with our interactive guide that keeps you on track.',
  },
  {
    icon: <FaRegBell size={24} />,
    title: 'Real-Time Notifications',
    desc: 'Stay updated on new recipes and community comments.',
  },
  {
    icon: <FaHeart size={24} />,
    title: 'Community Tips',
    desc: 'Get useful advice from other food lovers and home cooks.',
  },
];

const Features = () => {
  return (
    <section id='features' className='bg-gray-50 py-12 px-4 scroll-m-12'>
      <div className='max-w-7xl mx-auto text-center'>
        <h2 className='text-4xl font-bold text-blue-600 mb-8'>Features</h2>
        <div className='grid gap-8 grid-cols-3'>
          {features.map((feature, index) => (
            <div key={index} className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all'>
              <div className='text-blue-600 mb-4'>{feature.icon}</div>
              <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
