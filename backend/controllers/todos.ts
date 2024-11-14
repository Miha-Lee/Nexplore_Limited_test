import { Request, Response } from "express";
import pool from "../db/connect";

interface Todo {
  id: number;
  name: string;
}

interface Name {
  name: string;
}

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    const todos: Todo[] = result.rows;
    res.status(200).json({ success: true, todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Error fetching todos" });
  }
};

const createTodo = async (req: Request, res: Response): Promise<any> => {
  const { name }: Name = req.body;

  if (!name.trim()) {
    return res.status(200).json({ success: false, msg: "Invalid todo name" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO todos (name) VALUES ($1) RETURNING *",
      [name]
    );
    const createdTodo = result.rows[0];
    res.status(201).json({
      success: true,
      msg: "Created todo item successfully",
      todo: createdTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Error creating todo" });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<any> => {
  const { name } = req.body;
  const { id } = req.params;
  const idValue: number = Number(id);
  const nameValue: string = name;

  if (!nameValue.trim()) {
    return res.status(200).json({ success: false, msg: "Invalid todo name" });
  }

  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
      idValue,
    ]);
    const todo: Todo[] = result.rows;

    if (todo.length === 0) {
      return res.status(200).json({
        success: false,
        msg: "Todo Item cannot be found in the table",
      });
    }

    await pool.query("UPDATE todos SET name = $1 WHERE id = $2", [
      nameValue,
      idValue,
    ]);

    res.status(200).json({ success: true, msg: "Updating todo item success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Error updating todo" });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const idValue: number = Number(id);

  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
      idValue,
    ]);
    const todo: Todo[] = result.rows;

    if (todo.length === 0) {
      return res.status(200).json({
        success: false,
        msg: "Todo Item cannot be found in the table",
      });
    }

    await pool.query("DELETE FROM todos WHERE id = $1", [idValue]);

    res.status(200).json({ success: true, msg: "Deleting todo item success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Error deleting todo" });
  }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo };
