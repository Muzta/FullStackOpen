/* eslint-disable indent */
import ld from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { initializeUsersDictionary } from "../reducers/usersViewReducer";

const UsersViewSingle = () => {
  const dispatch = useDispatch();
  const usersView = useSelector((state) => state.usersView);
  const id = useParams().id;
  const user = usersView.find((u) => u.id === id);

  useEffect(() => {
    if (ld.isEmpty(usersView)) dispatch(initializeUsersDictionary());
  }, [dispatch, usersView]);

  if (user) {
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
  }
};

export default UsersViewSingle;
