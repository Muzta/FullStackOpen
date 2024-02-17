import CommentForm from "./CommentForm";

const Comments = ({ blog }) => {
  return (
    <div className="comments-section">
      <h3 className="py-2 font-semibold text-center text-base">Comments</h3>
      <CommentForm blogId={blog.id} />
      {blog.comments.length !== 0 && (
        <ul className="divide-y py-4">
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
