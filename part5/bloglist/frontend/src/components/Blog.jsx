import Togglable from "./Togglable.jsx";

const Blog = ({ blog, handleLike, handleRemove, loggedUsername }) => {
  console.log("MIRAR", blog);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div id="blog-data" style={blogStyle}>
      {blog.title} <i>{blog.author}</i>
      <Togglable buttonLabel="View" hideLabel="Hide">
        <div id="blog-content">
          {blog.url}
          <br></br>
          Likes {blog.likes}{" "}
          <button id="like-button" onClick={handleLike}>
            Like
          </button>
          <br></br>
          {blog.user.name}
          <br></br>
          {loggedUsername === blog.user.username ? (
            <button id="remove-button" onClick={handleRemove}>
              Remove
            </button>
          ) : null}
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
