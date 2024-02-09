/* eslint-disable indent */
import ld from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeUsersDictionary } from "../reducers/usersViewReducer";

const UsersView = () => {
  const dispatch = useDispatch();
  const usersView = useSelector((state) => state.usersView);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (ld.isEmpty(usersView)) dispatch(initializeUsersDictionary());
  }, [dispatch, blogs, usersView]);

  if (!ld.isEmpty(usersView)) {
    // Initialize a user dictionary with only the necessary data
    const userRowData = {};
    usersView.map((userRowObject) => {
      userRowData[userRowObject.id] = {
        name: userRowObject.name,
        nBlogs: userRowObject.blogs.length,
      };
    });

    const userRows = Object.entries(userRowData).map(
      ([id, { name, nBlogs }]) => {
        return (
          <tr key={id}>
            <td>
              <Link to={`/users/${id}`}>{name}</Link>
            </td>
            <td>{nBlogs}</td>
          </tr>
        );
      }
    );

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
        <tbody>{userRows}</tbody>
      </table>
    );
  }
};

export default UsersView;
