import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="lg:hidden bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost normal-case text-xl">
            Business Pa Campus
          </NavLink>
        </div>
        <div className="flex-none">
          <button 
            className="btn btn-square btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="bg-base-100 p-4 shadow-md">
          <ul className="menu menu-vertical gap-2">
            <li>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/connections" onClick={() => setIsMenuOpen(false)}>
                Connections
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications" onClick={() => setIsMenuOpen(false)}>
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="/messages" onClick={() => setIsMenuOpen(false)}>
                Messages
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default MobileHeader;