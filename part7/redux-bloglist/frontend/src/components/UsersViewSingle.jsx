/* eslint-disable indent */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UsersViewSingle = () => {
  const usersView = useSelector((state) => state.usersView);
  const id = useParams().id;
  const user = usersView.find((u) => u.id === id);

  if (!user) return null;

  return (
    <div id="user-blogs">
      <b>Added blogs</b>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default UsersViewSingle;
