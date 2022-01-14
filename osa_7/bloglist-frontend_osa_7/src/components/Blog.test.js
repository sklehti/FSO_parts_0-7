import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "testi",
      author: "testi käyttäjä",
      url: "ei ole määritelty",
      likes: 100,
      user: {
        username: "sara",
        name: "sl",
      },
    };

    component = render(<Blog blog={blog} toggleImportance={mockHandler} />);
  });

  test("renders show only blogs title and author", () => {
    expect(component.container).toHaveTextContent("testi");
    expect(component.container).toHaveTextContent("testi käyttäjä");
    expect(component.container).not.toHaveTextContent("ei ole määritelty");
    expect(component.container).not.toHaveTextContent(100);
  });

  test("clicking the  button calls eventhandler once and show all elements", async () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("testi");
    expect(component.container).toHaveTextContent("testi käyttäjä");
    expect(component.container).toHaveTextContent("ei ole määritelty");
    expect(component.container).toHaveTextContent(100);
    expect(component.container).toHaveTextContent("sara");
  });

  test("if like is pressed two times,there is two event handler calls", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const button_2 = component.getByText("like");
    fireEvent.click(button_2);
    fireEvent.click(button_2);

    expect(mockHandler.mock.calls).toHaveLength(2);

    expect(component.container).toHaveTextContent(102);
  });
});
