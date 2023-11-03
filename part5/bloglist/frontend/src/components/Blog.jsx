import Togglable from "./Togglable.jsx";

const Blog = ({ blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} <i>{blog.author}</i>
      <Togglable buttonLabel="View" hideLabel="Hide">
        <div>
          {blog.url}
          <br></br>
          Likes {blog.likes} <button onClick={handleLike}>Like</button>
          <br></br>
          {blog.user.name}
          <br></br>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
