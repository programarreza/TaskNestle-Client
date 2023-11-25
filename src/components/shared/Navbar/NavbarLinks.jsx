import { NavLink } from 'react-router-dom';

const NavbarLinks = () => {
	return (
		<div className="flex gap-4">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Home
      </NavLink>
      <NavLink
        to="join-employee"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Join as Employee
      </NavLink>
      <NavLink
        to="join-admin"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Join as Admin
      </NavLink>
      <NavLink
        to="login"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Login
      </NavLink>
      
    </div>
	);
};

export default NavbarLinks;