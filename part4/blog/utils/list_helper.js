const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  const blog = blogs.reduce(
    (currentMax, blog) => (blog.likes > currentMax.likes ? blog : currentMax),
    blogs[0]
  );
  const { title, author, likes } = blog;
  console.log("Propiedades", { title, author, likes });
  return { title, author, likes };
};

module.exports = { dummy, totalLikes, favoriteBlog };
