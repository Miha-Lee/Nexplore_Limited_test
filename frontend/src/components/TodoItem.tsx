import React, { useState } from "react";
import { Card, Col, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TodoItemEdit from "./TodoItemEdit";
import { openNotificationWithIcon } from "../utils/notification";

interface Todo {
  id: number;
  name: string;
}

interface TodoItem {
  id: number;
  name: string;
  todos: Todo[];
  setTodos: (action: Todo[]) => void;
  setLoading: (action: boolean) => void;
}

const TodoItem: React.FC<TodoItem> = ({
  id,
  name,
  todos,
  setTodos,
  setLoading,
}): React.ReactElement => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const deleteTodoItem = (): void => {
    setLoading(true);

    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("There is something wrong while deleting todo item");
        }

        return response.json();
      })
      .then((data) => {
        setLoading(false);

        if (data.success) {
          const filterTodos = todos.filter((td) => td.id !== id);
          setTodos(filterTodos);
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

  const confirmDelete = (): void => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteTodoItem();
      },
    });
  };

  return (
    <>
      <Col
        span={8}
        style={{ marginBottom: 10 }}
        data-testid={`todo_item_${id}`}
      >
        <Card>
          <p style={{ marginTop: 0, wordBreak: "break-word" }}>{name}</p>
          <div style={{ textAlign: "right" }}>
            <Button
              type="primary"
              style={{ marginRight: 5 }}
              onClick={() => {
                setEditModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                confirmDelete();
              }}
            >
              Delete
            </Button>
          </div>
        </Card>
      </Col>
      <TodoItemEdit
        open={editModalOpen}
        name={name}
        setEditModalOpen={setEditModalOpen}
        todos={todos}
        setTodos={setTodos}
        id={id}
      />
    </>
  );
};

export default TodoItem;
