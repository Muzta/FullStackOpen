import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";

const NavigationMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const divStyle = { padding: 2, background: "#d3d3d3", marginBottom: 5 };
  const elementStyle = { margin: 5 };

  return (
    <nav className="bg-gray-800" id="navigation-menu">
      <div className="flex space-x-4 flex-1 items-center justify-start">
        <Link
          className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
          aria-current="page"
          to={"/"}
        >
          Home
        </Link>
        <Link
          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          to={"/blogs"}
        >
          Blogs
        </Link>
        <Link
          style={elementStyle}
          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          to={"/users"}
        >
          Users
        </Link>
        <div className="flex items-center pr-2">
          <span style={elementStyle}>{user.name} logged in </span>
          <button
            style={elementStyle}
            id="logout"
            onClick={() => dispatch(logout())}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
