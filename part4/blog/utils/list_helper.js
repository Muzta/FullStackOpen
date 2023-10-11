const lodash = require("lodash");

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogsPerAuthor = lodash.countBy(blogs, "author");
  //   Make a list of pairs Author: blogs, and get the object with the highest [1] (num of blogs) property
  const topAuthor = lodash.maxBy(
    lodash.toPairs(blogsPerAuthor),
    (blog) => blog[1]
  );
  return { author: topAuthor[0], blogs: topAuthor[1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
