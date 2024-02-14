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
          type="text"
          name="commentText"
          id="commentText"
          value={commentText}
          onChange={handleCommentChange}
          required
        ></input>
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
