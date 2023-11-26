import useAuth from "../../../Hooks/useAuth";

const DropDown = () => {
  const {user, logOut} = useAuth()
  
  return (
    <>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {user ? <img
            alt="user profile"
            src={user?.photoURL}
          />
          : <img
            alt="user profile"
            src="https://i.postimg.cc/7PS6bh1w/profile.png"
          />}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">
            {user?.displayName}
          </a>
        </li>
        
        <li>
          <p onClick={logOut}>logout</p>
        </li>
      </ul>
    </div>
    
    </>
  );
};

export default DropDown;
