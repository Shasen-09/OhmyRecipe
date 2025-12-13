import { useState } from 'react';
import { GoHomeFill } from "react-icons/go";

import { FaUser, FaBookmark, FaBars, FaSearch, FaRupeeSign, FaInfo } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { TbPremiumRights } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/store/authSlice';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const toggleUserSection = () => setUserOpen(prev => !prev);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <GoHomeFill className="text-xl" />, path: '/home' },
    { name: 'Premium', icon: <FaRupeeSign className="text-xl" />, path: '/premium' },
    { name: 'Bookmark', icon: <FaBookmark className="text-xl" />, path: '/bookmark' },
    { name: 'Ingredient Information', icon: <FaInfo className="text-xl" />, path: '/ingredientinfo  ' },
    { name: 'Search Recipes', icon: <FaSearch className="text-xl" />, path: '/searchrecipes' },
  ];

  const userItems = [
    { name: 'Profile', icon: <CgProfile className="text-xl" />, path: '/profile' },
    { name: 'Settings', icon: <IoIosSettings className="text-xl" />, path: '/settings' },
    { name: 'Help', icon: <IoMdHelpCircleOutline className="text-xl" />, path: '/help' }
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-blue-700 text-white flex flex-col
        transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-16'}`}
    >
      {/* Top: Toggle & Logo */}
      <div className="flex flex-col">
        <button
          onClick={toggleSidebar}
          className="p-3 m-2 rounded hover:bg-blue-600/80 transition-colors flex justify-center items-center cursor-pointer"
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <FaBars className="text-xl " />
        </button>
        <div className="flex items-center justify-center my-4">
          {isOpen && <span className="font-semibold text-lg">FoodApp</span>}
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex flex-col flex-1 gap-2 px-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className="flex items-center gap-3 p-3 rounded hover:bg-blue-600/80 transition-colors text-left cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {isOpen && <span className="font-medium">{item.name}</span>}
          </button>
        ))}

        {/* User Section */}
        {token && (
          <div className="flex flex-col mt-2">
            <button
              className="flex items-center gap-3 p-3 rounded hover:bg-blue-600/80 transition-colors cursor-pointer"
              onClick={toggleUserSection}
            >
              <FaUser
                className="text-xl" />
              {isOpen && <span className="font-medium">User</span>}
            </button>

            {userOpen && (
              <div className="flex flex-col ml-6 mt-1 gap-1">
                {userItems.map(item => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-3 p-2 rounded hover:bg-blue-600/70 text-sm transition-colors cursor-pointer"
                  >
                    {item.icon}
                    {isOpen && <span>{item.name}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logout at bottom */}
      <div className="mt-auto px-2 mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded hover:bg-red-600/80 transition-colors w-full cursor-pointer"
        >
          <IoIosLogOut className="text-xl" />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
