import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useAuth } from '../../src/context/AuthContext';

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [renderPanel, setRenderPanel] = useState(false);
  const { user, logout } = useAuth();

  const openMenu = () => {
    setRenderPanel(true); // Start rendering
    requestAnimationFrame(() => {
      setIsOpen(true); // Animate on next frame
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      // Wait for animation to end before unmounting
      const timeout = setTimeout(() => setRenderPanel(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

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
            onClick={openMenu}
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Side Menu with Blur and Animation */}
      {renderPanel && (
        <>
          {/* Blur overlay */}
          <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeMenu}
          />

          {/* Slide-in Panel */}
          <div
            className={`fixed top-0 right-0 w-4/5 max-w-xs h-full bg-base-100 z-50 shadow-lg transform transition-transform duration-500 ease-in-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-4 border-b flex items-center gap-3">
              <img
                src={user?.photoURL ?? '/default-avatar.png'}
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-base">
                {user?.displayName ?? 'User'}
              </span>
            </div>
            <ul className="menu menu-vertical gap-2 p-4">
              <li>
                <NavLink to="/profile" onClick={closeMenu}>
                  My Profile
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

export default MobileHeader;
