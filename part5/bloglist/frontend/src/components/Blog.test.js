import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  let component;

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  test("Displaying a blog only renders its title and author by default", () => {
    const blogData = component.container.querySelector("#blog-data");
    const blogContent = component.container.querySelector("#blog-content");

    expect(blogData).toHaveTextContent(blog.title);
    expect(blogData).not.toHaveTextContent("http://test.com");
    expect(blogContent).toBeNull();
  });

  test("Url and likes are shown when toggle button is clicked", async () => {
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(`Likes ${blog.likes}`);

    const user = userEvent.setup();
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(`Likes ${blog.likes}`);
  });

  test("Url and likes are hidden when toggle button is clicked twice", async () => {
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(`Likes ${blog.likes}`);

    const user = userEvent.setup();
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(`Likes ${blog.likes}`);

    const hideButton = screen.getByText("Hide");
    await user.click(hideButton);

    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(`Likes ${blog.likes}`);
  });
});
