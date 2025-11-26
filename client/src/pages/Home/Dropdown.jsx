import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options = [], selected = [], setSelected, placeholder = "Select...", singleSelect = false }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    if (singleSelect) {
      setSelected([option]);
      setOpen(false);
    } else {
      if (selected.includes(option)) {
        setSelected(selected.filter(o => o !== option));
      } else {
        setSelected([...selected, option]);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {selected.length ? selected.join(", ") : placeholder}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map(option => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => toggleOption(option)}
            >
              {!singleSelect && (
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  readOnly
                  className="mr-2"
                />
              )}
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
