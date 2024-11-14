import React, { useState } from "react";
import { Modal, Input, Spin } from "antd";
import { openNotificationWithIcon } from "../utils/notification";

interface Todo {
  id: number;
  name: string;
}

interface TodoAdd {
  open: boolean;
  setAddModalOpen: (action: boolean) => void;
  todos: Todo[];
  setTodos: (action: Todo[]) => void;
}

const TodoItemAdd: React.FC<TodoAdd> = ({
  open,
  setAddModalOpen,
  todos,
  setTodos,
}): React.ReactElement => {
  const [todoName, setTodoName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const createTodoItem = (): void => {
    setLoading(true);

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: todoName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("There is something wrong while creating todo item");
        }

        return response.json();
      })
      .then((data) => {
        setLoading(false);

        if (data.success) {
          const { todo } = data;
          setTodos([...todos, todo]);
          setTodoName("");
          setAddModalOpen(false);
          openNotificationWithIcon("success", "Success", data.msg);
        } else {
          openNotificationWithIcon("error", "Error", data.msg);
        }
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
        openNotificationWithIcon("error", "Error", error.message);
      });
  };

  return (
    <Modal
      open={open}
      title={
        <div style={{ display: "flex" }} data-testid="create_todo_item">
          <p style={{ margin: "0 10px 0 0" }}>Add Item</p>
          {loading && <Spin />}
        </div>
      }
      onOk={() => {
        if (!todoName) {
          setError(true);
        } else {
          setError(false);
          createTodoItem();
        }
      }}
      onCancel={() => {
        setError(false);
        setTodoName("");
        setAddModalOpen(false);
      }}
      okButtonProps={{ disabled: loading }}
      cancelButtonProps={{ disabled: loading }}
    >
      <Input
        value={todoName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTodoName(e.target.value);
        }}
        status={error ? "error" : ""}
        placeholder="Please input your name"
      />
      {error && (
        <p style={{ margin: 0, color: "#f00" }}>Please input your name</p>
      )}
    </Modal>
  );
};

export default TodoItemAdd;
