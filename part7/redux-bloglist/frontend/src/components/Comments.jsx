import CommentForm from "./CommentForm";

const Comments = ({ blog }) => {
  if (blog.comments.length !== 0) {
    return (
      <div className="comments-section">
        <h3>Comments</h3>
        <CommentForm blogId={blog.id} />
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Comments;
