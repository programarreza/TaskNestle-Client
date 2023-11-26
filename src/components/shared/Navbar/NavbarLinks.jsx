import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const NavbarLinks = () => {
  const { user } = useAuth();

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
      
      {
        user ? <>
        {/* For Normal Employee (after Login) */}
        <NavLink
        to="my-assets"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        My Assets
      </NavLink>
      <NavLink
        to="my-team"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        My Team
      </NavLink>
      <NavLink
        to="request-asset"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Request for an Asset
      </NavLink>
      <NavLink
        to="custom-request"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
         Make a Custom Request
      </NavLink>
        </>
        :
        <>
        {/* Without Login */}
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
        </>
      }
           
    </div>
  );
};

export default NavbarLinks;
