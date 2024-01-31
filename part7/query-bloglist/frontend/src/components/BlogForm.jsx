import { useState, useEffect } from "react";

const BlogForm = ({ createBlog }) => {
  const blogStructure = {
    title: "",
    author: "",
    url: "",
  };

  const [newBlog, setNewBlog] = useState(blogStructure);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog(blogStructure);
  };

  const handleBlogChanges = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  return (
    <div>
      <form id="blog-form" onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            id="title"
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
            id="author"
            onChange={handleBlogChanges}
          ></input>
        </div>

        <div>
          Url:
          <input
            type="url"
            value={newBlog.url}
            name="url"
            id="url"
            onChange={handleBlogChanges}
            required
          ></input>
        </div>

        <button id="create" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
