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

  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogsPerAuthor = lodash.countBy(blogs, "author");
  //   Make a list of pairs Author: blogs, and get the object with the highest [1] (num of blogs) property
  const topAuthor = lodash.maxBy(
    lodash.toPairs(blogsPerAuthor),
    (pair) => pair[1]
  );
  return { author: topAuthor[0], blogs: topAuthor[1] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const blogsModifed = blogs.map((blog) => ({
    author: blog.author,
    likes: blog.likes,
  }));
  const blogsByAuthor = lodash.groupBy(blogsModifed, "author");
  const likesByAuthor = lodash.mapValues(blogsByAuthor, (list) =>
    lodash.sumBy(list, "likes")
  );
  const topAuthor = lodash.maxBy(
    lodash.toPairs(likesByAuthor),
    (pair) => pair[1]
  );

  return topAuthor;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
