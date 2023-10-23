import {
  ColumnDetails,
  GetColumnsPayload,
  UpdateColumnDetails,
} from "../types/column";
import { AuthContext } from "../types/auth";
import { GraphQLError } from "graphql/error";
import {
  createColumn,
  deleteColumn,
  getBoard,
  getColumn,
  getColumns,
  updateColumn,
} from "../db";
import { DbItem } from "../types/db";

export async function getColumnsResolver(
  parent: {},
  getColumnsPayload: GetColumnsPayload,
  context: AuthContext,
) {
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  const { boardId } = getColumnsPayload;

  try {
    return await getColumns(context.user.userId, boardId);
  } catch {
    throw new GraphQLError("Failed to fetch columns");
  }
}

export async function getColumnResolver(
  parent: {},
  columnDetails: DbItem,
  context: AuthContext,
) {
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  const { id } = columnDetails;

  try {
    return await getColumn(context.user.userId, id);
  } catch {
    throw new GraphQLError("Failed to fetch column");
  }
}

export async function createColumnResolver(
  parent: any,
  columnDetails: ColumnDetails,
  context: AuthContext,
) {
  console.log({ columnDetails });
  const { name, boardId } = columnDetails;
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  try {
    const parentBoard = await getBoard(context.user.userId, boardId);
    if (parentBoard.userId !== context.user?.userId) {
      throw new Error();
    }
    return await createColumn(name, boardId, context.user.userId);
  } catch {
    throw new Error("Failed to save column");
  }
}

export async function updateColumnResolver(
  parent: any,
  boardDetails: UpdateColumnDetails,
  context: AuthContext,
) {
  const { name, id } = boardDetails;

  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  try {
    return await updateColumn(name, id, context.user.userId);
  } catch {
    throw new Error("Failed to update board");
  }
}

export async function deleteColumnResolver(
  parent: any,
  columnDetail: DbItem,
  context: AuthContext,
) {
  const { id } = columnDetail;

  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  try {
    return await deleteColumn(id, context.user.userId);
  } catch {
    throw new Error("Failed to delete column");
  }
}
