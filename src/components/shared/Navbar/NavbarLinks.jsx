import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";

const NavbarLinks = () => {
  const { user } = useAuth();
  const [userRole] = useUserRole();

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
      <Link to={"/payment"}>
        <button>payment</button>
      </Link>

      {!user || userRole === "user" && <p className="text-red-500 font-bold bg-[#c7bfbf] p-1">Please Contact Your HR  </p> }

      {/* Without Login */}
      { (!user || userRole === "pending") &&   <>
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
      </> }

      {/* For Normal Employee (after Login) */}
      {( user && userRole === "employee") && (
        <>
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
      )}

      {/* Admin (after Login) */}
      {(user && userRole === "admin") && <><NavLink
        to="asset-list"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Asset List
      </NavLink>
      <NavLink
        to="add-asset"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Add An Asset
      </NavLink>
      <NavLink
        to="all-request"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        All Request
      </NavLink>
      <NavLink
        to="custom-request-list"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Custom Request List
      </NavLink>
      <NavLink
        to="my-employee-list"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        My Employee List
      </NavLink>
      <NavLink
        to="add-employee"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Add An Employee
      </NavLink></>}

    </div>
  );
};

export default NavbarLinks;
