import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useCreateNotification } from "../NotificationContext";
import { addBlog } from "../requests";

const BlogForm = ({ blogFormRef }) => {
  const blogStructure = {
    title: "",
    author: "",
    url: "",
  };

  const queryClient = useQueryClient();
  const createNotification = useCreateNotification();
  const [newBlog, setNewBlog] = useState(blogStructure);

  const newBlogMutation = useMutation({
    mutationFn: addBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      createNotification({ message: "A new blog was added" });
      blogFormRef.current.toggleVisibility();
    },
    onError: (error) => {
      createNotification({ message: error.response.data.error, error: true });
    },
  });

  const handleBlogChanges = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const onCreate = (event) => {
    event.preventDefault();
    const blog = {};
    // Assign each value of the form elements to the new blog object
    const formElements = new FormData(event.target);
    formElements.forEach((value, key) => (blog[key] = value));
    // Reset the blog values
    setNewBlog(blogStructure);
    newBlogMutation.mutate(blog);
  };

  return (
    <div>
      <form id="blog-form" onSubmit={onCreate}>
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
