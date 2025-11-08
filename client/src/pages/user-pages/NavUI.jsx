import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBookmark,
  faBowlFood,
  faMagnifyingGlass,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const NavUI = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  }
  return (
    <nav className="bar h-12 flex items-center sticky top-0 z-50 px-4 text-white font-semibold shadow-md bg-gradient-to-r from-blue-200 via-blue-500 to-blue-700 gap-5">
      <div className="flex flex-row w-full gap-5 cursor-not-allowed">
        <FontAwesomeIcon icon={faBowlFood} className="text-3xl text-white" />
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for Recipes"
            disabled
            className="w-full bg-gray-200 text-gray-500 placeholder-gray-400 px-5 py-1 rounded-md shadow-sm cursor-not-allowed"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-5 cursor-not-allowed">
        <FaHome className='text-3xl text-white' />
        <FontAwesomeIcon icon={faBookmark} className="text-2xl" />
        <FontAwesomeIcon icon={faBell} className="text-2xl" />
        <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl hover:text-3xl cursor-pointer" onClick={handleClick} />
      </div>
    </nav>
  );
};

export default NavUI;
