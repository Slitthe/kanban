import pg from "pg";
import dotenv from "dotenv";
import { DbItem } from "../types/user";
import { BoardDetails } from "../types/board";
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

export async function createUser(username: string, hashedPassword: string) {
  const createdUser = await pool.query(
    "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *",
    [username, hashedPassword],
  );
  return createdUser.rows[0].id;
}

export async function createBoard(
  name: string,
  userId: number,
): Promise<BoardDetails & DbItem> {
  const createdBoard = await pool.query<BoardDetails & DbItem>(
    "INSERT INTO boards (name, userId) VALUES($1, $2) RETURNING *",
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
    "UPDATE boards SET name=$1 WHERE id=$2 AND userId=$3 RETURNING *",
    [newName, boardId, userId],
  );

  console.log({ t: updatedBoard.rows[0], newName, boardId, userId });
  return {
    name: updatedBoard.rows[0].name,
    id: updatedBoard.rows[0].id,
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

export async function getBoards(
  userId: number,
): Promise<(BoardDetails & DbItem)[]> {
  console.log({ userId });
  const boards = await pool.query<BoardDetails & DbItem>(
    "SELECT name, id FROM boards WHERE userId=$1",
    [userId],
  );

  console.log(boards);

  return boards.rows.map(({ id, name }) => {
    console.log({ id, name });
    return { id, name };
  });
}

export async function getBoard(
  userId: number,
  boardId: number,
): Promise<BoardDetails & DbItem> {
  console.log({ userId });
  const board = await pool.query<BoardDetails & DbItem>(
    "SELECT name, id FROM boards WHERE userId=$1 AND id=$2",
    [userId, boardId],
  );

  return {
    id: board.rows[0].id,
    name: board.rows[0].name,
  };
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
