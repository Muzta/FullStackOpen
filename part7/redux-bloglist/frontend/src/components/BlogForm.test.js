import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test user",
    url: "http://test.com",
  };
  let component, doCreate, sendButton, titleInput, authorInput, urlInput, user;

  beforeEach(() => {
    doCreate = jest.fn();
    component = render(<BlogForm createBlog={doCreate} />);
    sendButton = screen.getByText("Create");
    titleInput = component.container.querySelector("[name='title']");
    authorInput = component.container.querySelector("[name='author']");
    urlInput = component.container.querySelector("[name='url']");
    user = userEvent.setup();
  });

  test("Updates parent state and calls onSubmit", async () => {
    await user.type(titleInput, blog.title);
    await user.type(authorInput, blog.author);
    await user.type(urlInput, blog.url);
    await user.click(sendButton);

    expect(doCreate.mock.calls).toHaveLength(1);
    expect(doCreate).toHaveBeenCalledWith(blog);
  });

  test("Updates parent state and calls onSubmit even if no author is passed", async () => {
    await user.type(titleInput, blog.title);
    await user.type(urlInput, blog.url);
    await user.click(sendButton);

    expect(doCreate).toHaveBeenCalled();
    expect(doCreate).not.toHaveBeenCalledWith(blog);
  });

  test("Error when no title is passed and calls onSubmit", async () => {
    await user.type(urlInput, blog.url);
    await user.click(sendButton);

    expect(doCreate).not.toHaveBeenCalled();
  });

  test("Error when no url is passed and calls onSubmit", async () => {
    await user.type(titleInput, blog.title);
    await user.click(sendButton);

    expect(doCreate).not.toHaveBeenCalled();
  });
});
