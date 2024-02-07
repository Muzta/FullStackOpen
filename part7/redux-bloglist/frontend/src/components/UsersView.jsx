/* eslint-disable indent */
import ld from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createUsersDictionary } from "../reducers/usersViewReducer";

const UsersView = () => {
  const dispatch = useDispatch();
  const usersView = useSelector((state) => state.usersView);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(createUsersDictionary());
  }, [dispatch, blogs]);

  if (!ld.isEmpty(usersView)) {
    const userRows = Object.entries(usersView).map(([name, blogCount]) => {
      return (
        <tr key={uuidv4()}>
          <td>{name}</td>
          <td>{blogCount}</td>
        </tr>
      );
    });

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
