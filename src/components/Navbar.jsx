import MyLogo from '../assets/MyLogo.png';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-black text-white shadow-lg">
      <div className="logo">
        <img
          src={MyLogo}
          alt="horse"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link active text-red-500' : 'nav-link text-white hover:text-red-400'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/coaches"
          className={({ isActive }) =>
            isActive ? 'nav-link active text-red-500' : 'nav-link text-white hover:text-red-400'
          }
        >
          Coaches
        </NavLink>

        <NavLink
          to="/premium"
          className={({ isActive }) =>
            isActive ? 'nav-link active text-red-500' : 'nav-link text-white hover:text-red-400'
          }
        >
          Premium
        </NavLink>
      </div>

      <div className="auth-buttons flex gap-4">
        <Link to="/login">
          <button className="button-red bg-red-600 hover:bg-red-700 text-white">Login</button>
        </Link>
        <Link to="/register">
          <button className="button-red bg-red-600 hover:bg-red-700 text-white">Register</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
