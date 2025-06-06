import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useAuth } from '../../src/context/useAuth';

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [renderPanel, setRenderPanel] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const openMenu = () => {
    setRenderPanel(true);
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setRenderPanel(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  const handleLogin = () => {
    navigate('/login');
    closeMenu();
  };

  return (
    <header className="lg:hidden bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost normal-case text-xl">
            Malonda Pa Malawi
          </NavLink>
        </div>
        <div className="flex-none">
          <button type='button' title='isOpen' className="btn btn-square btn-ghost" onClick={openMenu}>
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
                src={user?.photoURL ?? '/avatar-default-svgrepo-com.svg'}
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-base">
                {user?.displayName ?? 'Not Signed In'}
              </span>
            </div>

            <ul className="menu menu-vertical gap-2 p-4">
              {user ? (
                <>
                  <li>
                    <NavLink to="/profile" onClick={closeMenu}>
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleLogin} className="btn btn-primary w-full">
                    Login Now
                  </button>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

export default MobileHeader;
