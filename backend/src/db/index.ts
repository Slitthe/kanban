import pg from "pg";
import dotenv from "dotenv";
import { DbItem } from "../types/user";
import { BoardDetails } from "../types/board";
import { ColumnDetails, DbColumnDetails } from "../types/column";
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

export async function getBoard(
  userId: number,
  boardId: number,
): Promise<BoardDetails & DbItem> {
  const board = await pool.query<BoardDetails & DbItem>(
    "SELECT name, id FROM boards WHERE user_id=$1 AND id=$2",
    [userId, boardId],
  );

  return {
    id: board.rows[0].id,
    name: board.rows[0].name,
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
