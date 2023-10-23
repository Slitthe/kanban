import pg from "pg";
import dotenv from "dotenv";
import { BoardDetails, DbBoardDetails } from "../types/board";
import { ColumnDetails, DbColumnDetails } from "../types/column";
import { DbTaskDetails, TaskDetails } from "../types/task";
import { DbSubtaskDetail, SubtaskDetail } from "../types/subtask";
import { DbItem } from "../types/db";
dotenv.config();

const { Pool } = pg;
const port =
  typeof process.env.DB_PORT === "string"
    ? Number(process.env.DB_PORT)
    : process.env.DB_PORT;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: port,
  password: process.env.DB_PASSWORD,
});

export async function createColumn(
  name: string,
  boardId: number,
  userId: number,
): Promise<ColumnDetails & DbItem> {
  const createdColumn = await pool.query<DbColumnDetails & DbItem>(
    "INSERT INTO columns (name, board_id, user_id) VALUES($1, $2, $3) RETURNING *",
    [name, boardId, userId],
  );

  return {
    name: createdColumn.rows[0].name,
    boardId: createdColumn.rows[0].board_id,
    id: createdColumn.rows[0].id,
  };
}

export async function createTask(
  title: string,
  columnId: number,
  userId: number,
  description: string = "",
): Promise<TaskDetails & DbItem> {
  const createdTask = await pool.query<DbTaskDetails & DbItem>(
    "INSERT INTO tasks (title, column_id, user_id, description) VALUES($1, $2, $3, $4) RETURNING *",
    [title, columnId, userId, description],
  );

  return {
    title: createdTask.rows[0].title,
    columnId: createdTask.rows[0].column_id,
    description: createdTask.rows[0].description,
    id: createdTask.rows[0].id,
  };
}

export async function createSubtask(
  title: string,
  taskId: number,
  userId: number,
  isCompleted: boolean = false,
): Promise<SubtaskDetail & DbItem> {
  const createdTask = await pool.query<DbSubtaskDetail & DbItem>(
    "INSERT INTO subtasks (task_id, user_id, title, is_completed) VALUES($1, $2, $3, $4) RETURNING *",
    [taskId, userId, title, isCompleted],
  );

  return {
    title: createdTask.rows[0].title,
    taskId: createdTask.rows[0].task_id,
    isCompleted: Boolean(createdTask.rows[0].is_completed),
    id: createdTask.rows[0].id,
  };
}

export async function createBoard(
  name: string,
  userId: number,
): Promise<BoardDetails & DbItem> {
  const createdBoard = await pool.query<BoardDetails & DbItem>(
    "INSERT INTO boards (name, user_id) VALUES($1, $2) RETURNING *",
    [name, userId],
  );

  return {
    name: createdBoard.rows[0].name,
    id: createdBoard.rows[0].id,
  };
}

export async function updateBoard(
  newName: string,
  boardId: number,
  userId: number,
): Promise<BoardDetails & DbItem> {
  const updatedBoard = await pool.query<BoardDetails & DbItem>(
    "UPDATE boards SET name=$1 WHERE id=$2 AND user_id=$3 RETURNING *",
    [newName, boardId, userId],
  );

  return {
    name: updatedBoard.rows[0].name,
    id: updatedBoard.rows[0].id,
  };
}

export async function updateColumn(
  newName: string,
  columnId: number,
  userId: number,
): Promise<ColumnDetails & DbItem> {
  const updatedColumn = await pool.query<DbColumnDetails & DbItem>(
    "UPDATE columns SET name=$1 WHERE id=$2 AND user_id=$3 RETURNING *",
    [newName, columnId, userId],
  );

  console.log(updatedColumn.rows[0]);
  return {
    name: updatedColumn.rows[0].name,
    boardId: updatedColumn.rows[0].board_id,
    id: updatedColumn.rows[0].id,
  };
}

export async function updateTask(
  taskId: number,
  userId: number,
  newTitle?: string,
  newDescription?: string,
): Promise<TaskDetails & DbItem> {
  const updatedTask = await pool.query<DbTaskDetails & DbItem>(
    "UPDATE tasks SET title=COALESCE($1, title), description=COALESCE($2, description) WHERE id=$3 AND user_id=$4 RETURNING *",
    [newTitle, newDescription, taskId, userId],
  );

  return {
    title: updatedTask.rows[0].title,
    description: updatedTask.rows[0].description,
    columnId: updatedTask.rows[0].column_id,
    id: updatedTask.rows[0].id,
  };
}

export async function updateSubtask(
  subtaskId: number,
  userId: number,
  newTitle?: string,
  newIsCompleted?: boolean,
): Promise<SubtaskDetail & DbItem> {
  const updatedTask = await pool.query<DbSubtaskDetail & DbItem>(
    "UPDATE subtasks SET title=COALESCE($1, title), is_completed=COALESCE($2, is_completed) WHERE id=$3 AND user_id=$4 RETURNING *",
    [newTitle, newIsCompleted, subtaskId, userId],
  );

  return {
    title: updatedTask.rows[0].title,
    isCompleted: Boolean(updatedTask.rows[0].is_completed),
    taskId: updatedTask.rows[0].task_id,
    id: updatedTask.rows[0].id,
  };
}

export async function deleteBoard(
  boardId: number,
  userId: number,
): Promise<BoardDetails & DbItem> {
  const deletedBoard = await pool.query<BoardDetails & DbItem>(
    "DELETE FROM boards WHERE id=$1 AND userId=$2 RETURNING *",
    [boardId, userId],
  );

  return {
    name: deletedBoard.rows[0].name,
    id: deletedBoard.rows[0].id,
  };
}

export async function deleteColumn(
  columnId: number,
  userId: number,
): Promise<ColumnDetails & DbItem> {
  console.log({ columnId, userId });
  const deletedColumn = await pool.query<DbColumnDetails & DbItem>(
    "DELETE FROM columns WHERE id=$1 AND user_id=$2 RETURNING *",
    [columnId, userId],
  );

  return {
    name: deletedColumn.rows[0].name,
    boardId: deletedColumn.rows[0].board_id,
    id: deletedColumn.rows[0].id,
  };
}

export async function deleteTask(
  taskId: number,
  userId: number,
): Promise<TaskDetails & DbItem> {
  const deletedTask = await pool.query<DbTaskDetails & DbItem>(
    "DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *",
    [taskId, userId],
  );

  return {
    title: deletedTask.rows[0].title,
    columnId: deletedTask.rows[0].column_id,
    description: deletedTask.rows[0].description,
    id: deletedTask.rows[0].id,
  };
}

export async function deleteSubtask(
  subtaskId: number,
  userId: number,
): Promise<SubtaskDetail & DbItem> {
  const deletedTask = await pool.query<DbSubtaskDetail & DbItem>(
    "DELETE FROM subtasks WHERE id=$1 AND user_id=$2 RETURNING *",
    [subtaskId, userId],
  );

  return {
    title: deletedTask.rows[0].title,
    taskId: deletedTask.rows[0].task_id,
    isCompleted: Boolean(deletedTask.rows[0].is_completed),
    id: deletedTask.rows[0].id,
  };
}

export async function getBoards(
  userId: number,
): Promise<(BoardDetails & DbItem)[]> {
  const boards = await pool.query<BoardDetails & DbItem>(
    "SELECT name, id FROM boards WHERE user_id=$1",
    [userId],
  );

  return boards.rows.map(({ id, name }) => {
    return { id, name };
  });
}

export async function getColumns(
  userId: number,
  boardId: number,
): Promise<(ColumnDetails & DbItem)[]> {
  const columns = await pool.query<DbColumnDetails & DbItem>(
    "SELECT name, id, board_id FROM columns WHERE user_id=$1 AND board_id=$2",
    [userId, boardId],
  );

  return columns.rows.map(({ id, name, board_id }) => {
    return { id, name, boardId: board_id };
  });
}

export async function getTasks(
  columnId: number,
  userId: number,
): Promise<(TaskDetails & DbItem)[]> {
  console.log({ columnId, userId });
  const columns = await pool.query<DbTaskDetails & DbItem>(
    "SELECT title, id, column_id, description FROM tasks WHERE user_id=$1 AND column_id=$2",
    [userId, columnId],
  );

  console.log({ rows: columns.rows });

  return columns.rows.map(({ id, title, description, column_id }) => {
    return { id, title, columnId: column_id, description };
  });
}

export async function getSubtasks(
  taskId: number,
  userId: number,
): Promise<(SubtaskDetail & DbItem)[]> {
  const tasks = await pool.query<DbSubtaskDetail & DbItem>(
    "SELECT title, id, is_completed, task_id FROM subtasks WHERE user_id=$1 AND task_id=$2",
    [userId, taskId],
  );

  console.log({ taskId, userId, rows: tasks.rows });

  return tasks.rows.map(({ id, title, is_completed, task_id }) => {
    return { id, title, taskId: task_id, isCompleted: Boolean(is_completed) };
  });
}

export async function getBoard(
  userId: number,
  boardId: number,
): Promise<BoardDetails & DbItem> {
  const board = await pool.query<DbBoardDetails & DbItem>(
    "SELECT name, id, user_id FROM boards WHERE user_id=$1 AND id=$2",
    [userId, boardId],
  );

  return {
    id: board.rows[0].id,
    name: board.rows[0].name,
    userId: board.rows[0].user_id,
  };
}

export async function getColumn(
  userId: number,
  columnId: number,
): Promise<ColumnDetails & DbItem> {
  const column = await pool.query<DbColumnDetails & DbItem>(
    "SELECT name, id, board_id FROM columns WHERE user_id=$1 AND id=$2",
    [userId, columnId],
  );

  return {
    id: column.rows[0].id,
    name: column.rows[0].name,
    boardId: column.rows[0].board_id,
  };
}

export async function getTask(
  userId: number,
  taskId: number,
): Promise<TaskDetails & DbItem> {
  const task = await pool.query<DbTaskDetails & DbItem>(
    "SELECT title, id, column_id, description FROM tasks WHERE user_id=$1 AND id=$2",
    [userId, taskId],
  );

  return {
    id: task.rows[0].id,
    title: task.rows[0].title,
    columnId: task.rows[0].column_id,
    description: task.rows[0].description,
  };
}

export async function getSubtask(
  userId: number,
  subtaskId: number,
): Promise<SubtaskDetail & DbItem> {
  const task = await pool.query<DbSubtaskDetail & DbItem>(
    "SELECT title, id, task_id, is_completed FROM subtasks WHERE user_id=$1 AND id=$2",
    [userId, subtaskId],
  );

  return {
    id: task.rows[0].id,
    title: task.rows[0].title,
    taskId: task.rows[0].task_id,
    isCompleted: Boolean(task.rows[0].is_completed),
  };
}

export async function createUser(username: string, hashedPassword: string) {
  const createdUser = await pool.query(
    "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *",
    [username, hashedPassword],
  );
  return createdUser.rows[0].id;
}

export async function getUser(username: string) {
  const query = "SELECT * FROM users WHERE username = $1";
  const values = [username];
  const result = await pool.query(query, values);

  return result.rows[0];
}

export async function cleanup() {
  try {
    await pool.end();
  } finally {
    process.exit(0);
  }
}
