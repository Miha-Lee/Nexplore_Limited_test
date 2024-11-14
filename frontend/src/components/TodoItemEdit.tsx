import React, { useState } from "react";
import { Modal, Input, Spin } from "antd";
import { openNotificationWithIcon } from "../utils/notification";

interface Todo {
  id: number;
  name: string;
}

interface TodoEdit {
  open: boolean;
  name: string;
  setEditModalOpen: (action: boolean) => void;
  todos: Todo[];
  setTodos: (action: Todo[]) => void;
  id: number;
}

const TodoItemEdit: React.FC<TodoEdit> = ({
  open,
  name,
  setEditModalOpen,
  todos,
  setTodos,
  id,
}): React.ReactElement => {
  const [todoName, setTodoName] = useState<string>(name);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const editTodoItem = (): void => {
    setLoading(true);

    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: todoName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("There is something wrong while updating todo item");
        }

        return response.json();
      })
      .then((data) => {
        setLoading(false);

        if (data.success) {
          const todosMapping = todos.map((t) => {
            if (t.id === id) {
              return { ...t, name: todoName };
            } else {
              return { ...t };
            }
          });

          setTodos(todosMapping);
          setEditModalOpen(false);
          // setTodoName(todoName);
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
        <div style={{ display: "flex" }} data-testid="edit_todo_item">
          <p style={{ margin: "0 10px 0 0" }}>Edit Item</p>
          {loading && <Spin />}
        </div>
      }
      onOk={() => {
        if (!todoName) {
          setError(true);
        } else {
          setError(false);
          editTodoItem();
        }
      }}
      onCancel={() => {
        setTodoName(name);
        setError(false);
        setEditModalOpen(false);
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

export default TodoItemEdit;
