import { useState, useEffect } from "react";

const BlogForm = ({ createBlog, handleSubmit, blog, handleChanges }) => {
  const [newBlog, setNewBlog] = useState(null);

  const resetBlogState = () => {
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  useEffect(() => {
    resetBlogState();
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    resetBlogState();
  };

  const handleBlogChanges = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  if (newBlog) {
    return (
      <div>
        <form onSubmit={addBlog}>
          <div>
            Title:
            <input
              type="text"
              value={newBlog.title}
              name="title"
              onChange={handleBlogChanges}
              required
            ></input>
          </div>

          <div>
            Author:
            <input
              type="text"
              value={newBlog.author}
              name="author"
              onChange={handleBlogChanges}
            ></input>
          </div>

          <div>
            Url:
            <input
              type="url"
              value={newBlog.url}
              name="url"
              onChange={handleBlogChanges}
              required
            ></input>
          </div>

          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
};

export default BlogForm;
