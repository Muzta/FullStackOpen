import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import { createNotification } from "../reducers/notificationReducer";

const NavigationMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      dispatch(
        createNotification({
          message: error.response.data.error,
          error: true,
        })
      );
    }
  };

  return (
    <nav className="bg-gray-800 px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            to={"/"}
          >
            Home
          </Link>
          <Link
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            to={"/blogs"}
          >
            Blogs
          </Link>
          <Link
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            to={"/users"}
          >
            Users
          </Link>
        </div>

        <div className="flex items-center">
          <span className="text-white mr-4">{user.name} logged in</span>
          <button
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
