import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/LoginContext'; // Import the useLogin hook

function Header() {
  const { isLoggedIn, username, login, logout } = useLogin(); // Access login context
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    // Auto login if session storage has username
    const storedUsername = window.sessionStorage.getItem('uname');
    if (storedUsername) {
      login(storedUsername); // Set the user as logged in using context
    }
  }, [login]);

  const handleLogout = () => {
    logout(); // Update the global login state when logging out
    window.sessionStorage.clear();
    alert('You are successfully logged out');
    navigate('/')
  };

  return (
    <nav className="text-lg tracking-wide p-4 bg-gradient-to-tl from-blue-500 to-slate-300 z-50 sticky top-0 grid grid-cols-4 justify-between shadow-md select-none">
      <NavLink to="/">
        <h1 className="col-span-1 text-4xl font-extrabold text-gray-800 select-none">ShopKaro</h1>
      </NavLink>

      <div className="col-span-1 col-start-4 w-3/4 flex justify-end ">
        {!isLoggedIn ? (
          <NavLink
            to="/login"
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
          >
            Login
          </NavLink>
        ) : (
          <div>
            {/* Dropdown Button */}
            <button
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="px-4 py-2 bg-gray-800  text-white rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              {username}
            </button>
            {/* Dropdown Content */}
            {dropdownVisible && (
              <div className="absolute right-12 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:rounded-t-lg"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/cart"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Cart
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Wishlist
                </NavLink>
                <NavLink
                  to="/orders"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Orders
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 hover:rounded-b-lg"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
