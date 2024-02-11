import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";

const NavigationMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const divStyle = { padding: 2, background: "#d3d3d3", marginBottom: 5 };
  const elementStyle = { margin: 5 };

  return (
    <div id="navigation-menu" style={divStyle}>
      <Link style={elementStyle} to={"/"}>
        Home
      </Link>
      <Link style={elementStyle} to={"/blogs"}>
        Blogs
      </Link>
      <Link style={elementStyle} to={"/users"}>
        Users
      </Link>
      <span style={elementStyle}>{user.name} logged in </span>
      <button
        style={elementStyle}
        id="logout"
        onClick={() => dispatch(logout())}
      >
        Log out
      </button>
    </div>
  );
};

export default NavigationMenu;
