/* eslint-disable indent */
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersViewAll = () => {
  const usersView = useSelector((state) => state.usersView);

  if (isEmpty(usersView)) return null;

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>
            <b>Blogs created</b>
          </th>
        </tr>
      </thead>
      <tbody>
        {usersView.map((userRowObject) => (
          <tr key={userRowObject.id}>
            <td>
              <Link to={`/users/${userRowObject.id}`}>
                {userRowObject.name}
              </Link>
            </td>
            <td>{userRowObject.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersViewAll;
