import MyLogo from '../assets/MyLogo.png';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={MyLogo}
          alt="horse"
          style={{
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/coaches"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Coaches
        </NavLink>

        <NavLink
          to="/premium"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Premium
        </NavLink>
      </div>

      <div className="auth-buttons">
        <Link to="/login">
          <button className="button-red">Login</button>
        </Link>
        <span className="or"> </span>
        <Link to="/register">
          <button className="button-red">Register</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
