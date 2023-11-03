import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  const user = {
    name: "test name",
    username: "test username",
  };
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test user",
    url: "http://test.com",
    likes: 100,
    user: user,
  };
  let blogRendered;

  beforeEach(() => {
    blogRendered = render(<Blog blog={blog} />);
  });

  test("Displaying a blog only renders its title and author by default", () => {
    const blogData = blogRendered.container.querySelector("#blog-data");
    const blogContent = blogRendered.container.querySelector("#blog-content");
    expect(blogData).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );
    expect(blogData).not.toHaveTextContent("http://test.com");
    expect(blogContent).toBeNull();
  });
});
