const BlogForm = ({ handleSubmit, blog, handleChanges }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type="text"
            value={blog.title}
            name="title"
            onChange={handleChanges}
            required
          ></input>
        </div>

        <div>
          Author:
          <input
            type="text"
            value={blog.author}
            name="author"
            onChange={handleChanges}
          ></input>
        </div>

        <div>
          Url:
          <input
            type="url"
            value={blog.url}
            name="url"
            onChange={handleChanges}
            required
          ></input>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
