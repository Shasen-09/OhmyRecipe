import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBookmark,
  faBowlFood,
  faCircleQuestion,
  faGear,
  faMagnifyingGlass,
  faRightFromBracket,
  faToggleOn,
  faUser,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/store/authSlice'; // Adjust path if needed

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use token from Redux state instead of localStorage for better sync
  const token = useSelector((state) => state.auth.token);

  const [dropdownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropDownOpen(prev => !prev);

  const handleLogout = () => {
    dispatch(logout());  // Clear redux auth state
    setDropDownOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bar h-12 flex items-center px-4 text-white font-semibold shadow-md bg-gradient-to-r from-blue-200 via-blue-500 to-blue-700 gap-5">
      <div className="flex flex-row w-full gap-5">
        <FontAwesomeIcon icon={faBowlFood} className="text-3xl text-white" />
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for Recipes"
            className="w-full bg-white text-gray-800 placeholder-gray-400 px-5 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button>
          <FontAwesomeIcon icon={faToggleOn} className="text-2xl" />
        </button>

        <FontAwesomeIcon icon={faBookmark} className="text-2xl" />
        <FontAwesomeIcon icon={faBell} className="text-2xl" />

        {/* User Icon + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} className="text-2xl hover:bg-gray-500 cursor-pointer" />
          </button>

          {dropdownOpen && token && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50 text-sm">
              <button
                onClick={() => {
                  setDropDownOpen(false);
                  navigate('/profile');
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faUserCircle} />
                Profile
              </button>
              <button
                onClick={() => {
                  setDropDownOpen(false);
                  navigate('/settings');
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faGear} />
                Settings
              </button>
              <button
                onClick={() => {
                  setDropDownOpen(false);
                  navigate('/help');
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faCircleQuestion} />
                Help
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-100"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
