const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

test("Dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("Total likes", () => {
  const blogs = helper.initialBlogs;
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7);
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe("Favorite blog", () => {
  const blogs = helper.initialBlogs;
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test("when list has only one blog, equals that blog", () => {
    const blog = blogs[0];
    const { title, author, likes } = blog;
    expect(listHelper.favoriteBlog([blog])).toEqual({ title, author, likes });
  });

  test("of a bigger list is calculated right", () => {
    const expectedBlog = blogs[2];
    const { title, author, likes } = expectedBlog;
    expect(listHelper.favoriteBlog(blogs)).toEqual({ title, author, likes });
  });
});

describe("Author with most blogs", () => {
  const blogs = helper.initialBlogs;
  test("of empty list is null", () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test("when list has only one blog, equals that author", () => {
    const blog = blogs[0];
    expect(listHelper.mostBlogs([blog])).toEqual({
      author: blog.author,
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: blogs[3].author,
      blogs: 3,
    });
  });
});

describe("Author with most likes", () => {
  const blogs = helper.initialBlogs;
  test("of empty list is null", () => {
    expect(listHelper.mostLikes([])).toBe(null);
  });

  test("when list has only one blog, equals likes of that one", () => {
    const blog = blogs[0];
    expect(listHelper.mostLikes([blog])).toEqual([blog.author, blog.likes]);
  });

  test("of a bigger list is calculated right", () => {
    const mostLikedAuthor = blogs[1].author;
    expect(listHelper.mostLikes(blogs)).toEqual([mostLikedAuthor, 17]);
  });
});
