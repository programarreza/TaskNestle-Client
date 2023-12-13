import { useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import NavbarLinks from "./NavbarLinks";
import Theme from "./theme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              onClick={() => setIsOpen(!isOpen)}
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {isOpen && (
              <>
                {" "}
                <ul
                  tabIndex={0}
                  className="menu absolute flex h-auto  menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box  md:w-[600px] "
                >
                  {/* all nav links */}
                  <NavbarLinks />
                </ul>
              </>
            )}
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <img
              className="w-20"
              src="https://i.postimg.cc/RFRx86f7/Layer-601321.png"
              alt=""
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavbarLinks />
          </ul>
        </div>
        <div className="navbar-end ">
          {/* user profile */}
          <Theme />
          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
