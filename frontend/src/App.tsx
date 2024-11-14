import React, { useState, useEffect } from "react";
import { Row, Button, Spin } from "antd";
import TodoItem from "./components/TodoItem";
import TodoItemAdd from "./components/TodoItemAdd";
import { openNotificationWithIcon } from "./utils/notification";

interface Todos {
  id: number;
  name: string;
}

const App: React.FC = (): React.ReactElement => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTodos = (): void => {
    fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("There is something wrong on the server");
        }

        return response.json();
      })
      .then((data) => {
        setLoading(false);

        if (data.success) {
          const { todos } = data;
          setTodos(todos);
        }
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
        openNotificationWithIcon("error", "Error", error.message);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className="inner-content">
            <div>
              <p className="brand-head">Nexplore Limited Test</p>
            </div>
          </div>
        </div>
      </header>
      {loading ? (
        <Spin size="large" className="spin-position" />
      ) : (
        <div className="container">
          <div className="todo-content">
            <div style={{ textAlign: "right", marginBottom: 10 }}>
              <Button
                type="primary"
                onClick={() => {
                  setAddModalOpen(true);
                }}
              >
                Add
              </Button>
            </div>
            {todos.length > 0 ? (
              <Row gutter={10}>
                {todos.map((d) => {
                  const { id } = d;
                  return (
                    <TodoItem
                      key={id}
                      {...d}
                      todos={todos}
                      setTodos={setTodos}
                      setLoading={setLoading}
                    />
                  );
                })}
              </Row>
            ) : (
              <h1 style={{ textAlign: "center" }}>
                There are no todo items, please add one.
              </h1>
            )}
          </div>
        </div>
      )}
      <TodoItemAdd
        open={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        todos={todos}
        setTodos={setTodos}
      />
    </>
  );
};

export default App;
