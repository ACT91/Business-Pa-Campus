import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUserFriends, 
  FaBell, 
  FaEnvelope, 
  FaUser 
} from 'react-icons/fa';

const Header = () => {
  return (
    <header className="hidden lg:block bg-base-100 shadow-lg">
      <div className="navbar">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost normal-case text-xl">
            Malonda Malawi
          </NavLink>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <NavLink to="/" className="flex items-center gap-1">
                <FaHome />
                <span className="hidden lg:inline">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/connections" className="flex items-center gap-1">
                <FaUserFriends />
                <span className="hidden lg:inline">Connections</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications" className="flex items-center gap-1">
                <FaBell />
                <span className="hidden lg:inline">Notifications</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/messages" className="flex items-center gap-1">
                <FaEnvelope />
                <span className="hidden lg:inline">Messages</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="flex items-center gap-1">
                <FaUser />
                <span className="hidden lg:inline">Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;