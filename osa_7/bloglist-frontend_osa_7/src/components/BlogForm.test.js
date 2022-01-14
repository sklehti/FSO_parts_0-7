import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const inputTitle = component.container.querySelector("#title");
  const inputAuthor = component.container.querySelector("#author");
  const inputUrl = component.container.querySelector("#url");

  const form = component.container.querySelector("form");

  fireEvent.change(inputTitle, {
    target: { value: "Tämä on testi" },
  });

  fireEvent.change(inputAuthor, {
    target: { value: "Teppo Testaaja" },
  });

  fireEvent.change(inputUrl, {
    target: { value: "nettiosoite.." },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);

  expect(createBlog.mock.calls[0][0].title).toBe("Tämä on testi");
  expect(createBlog.mock.calls[0][0].author).toBe("Teppo Testaaja");
  expect(createBlog.mock.calls[0][0].url).toBe("nettiosoite..");
});
