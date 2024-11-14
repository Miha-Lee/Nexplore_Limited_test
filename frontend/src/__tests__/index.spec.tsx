import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import TodoItem from "../components/TodoItem";
import TodoItemAdd from "../components/TodoItemAdd";
import TodoItemEdit from "../components/TodoItemEdit";

describe("App.tsx", () => {
  test("test the main page has been rendered correctly", async () => {
    render(<App />);
    expect(screen.getByText("Nexplore Limited Test")).toBeInTheDocument();
  });
});

describe("TodoItem.tsx", () => {
  test("test the todo item component has been rendered correctly", async () => {
    const obj = {
      id: 1,
      name: "demo",
      todos: [{ id: 1, name: "demo" }],
      setTodos: jest.fn(),
      setLoading: jest.fn,
    };

    const { getByTestId } = render(
      <TodoItem
        id={obj.id}
        name={obj.name}
        todos={obj.todos}
        setTodos={obj.setTodos}
        setLoading={obj.setLoading}
      />
    );

    expect(getByTestId("todo_item_1")).toBeTruthy();
  });
});

describe("TodoItemAdd.tsx", () => {
  test("test the todo item add component has been rendered correctly", async () => {
    const obj = {
      open: true,
      setAddModalOpen: jest.fn(),
      todos: [{ id: 1, name: "demo" }],
      setTodos: jest.fn(),
    };

    const { getByTestId } = render(
      <TodoItemAdd
        open={obj.open}
        setAddModalOpen={obj.setAddModalOpen}
        todos={obj.todos}
        setTodos={obj.setTodos}
      />
    );

    expect(getByTestId("create_todo_item")).toBeTruthy();
  });
});

describe("TodoItemEdit.tsx", () => {
  test("test the todo item edit component has been rendered correctly", async () => {
    const obj = {
      open: true,
      name: "demo",
      setEditModalOpen: jest.fn(),
      todos: [{ id: 1, name: "demo" }],
      setTodos: jest.fn(),
      id: 1,
    };

    const { getByTestId } = render(
      <TodoItemEdit
        open={obj.open}
        name={obj.name}
        setEditModalOpen={obj.setEditModalOpen}
        todos={obj.todos}
        setTodos={obj.setTodos}
        id={obj.id}
      />
    );

    expect(getByTestId("edit_todo_item")).toBeTruthy();
  });
});
