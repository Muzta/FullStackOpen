import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";

const CommentForm = ({ blogId }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      dispatch(addComment(blogId, { comment: commentText }));
      dispatch(
        createNotification({
          message: "A new comment was added",
        })
      );
      setCommentText("");
    } catch (error) {
      dispatch(
        createNotification({ message: error.response.data.error, error: true })
      );
    }
  };

  return (
    <div>
      <form id="comment-form" onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          type="text"
          name="commentText"
          id="commentText"
          value={commentText}
          onChange={handleCommentChange}
          required
        ></input>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-4 px-5 py-2.5 text-center"
        >
          Add comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
