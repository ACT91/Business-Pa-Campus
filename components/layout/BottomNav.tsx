import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaUserFriends,
  FaBell,
  FaEnvelope,
  FaUser
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const BottomNav = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY) {
        setVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
  className={`btm-nav fixed w-full bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 lg:hidden transition-transform duration-300 ease-in-out bg-white dark:bg-black ${
    visible ? 'translate-y-0' : 'translate-y-full'
  }`}
>

      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaHome className="text-xl mx-auto" />
      </NavLink>
      <NavLink to="/connections" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaUserFriends className="text-xl mx-auto" />
      </NavLink>
      <NavLink to="/notifications" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaBell className="text-xl mx-auto" />
      </NavLink>
      <NavLink to="/messages" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaEnvelope className="text-xl mx-auto" />
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaUser className="text-xl mx-auto" />
      </NavLink>
    </nav>
  );
};

export default BottomNav;
