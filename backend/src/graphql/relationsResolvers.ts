import { BoardDetails } from "../types/board";
import { DbItem } from "../types/db";
import { AuthContext } from "../types/auth";
import { GraphQLError } from "graphql/error";
import { getColumns, getSubtasks, getTasks } from "../db";
import { TaskDetails } from "../types/task";
import { SubtaskDetail } from "../types/subtask";

export async function columnsOfBoardsResolver(
  parent: BoardDetails & DbItem,
  _: {},
  context: AuthContext,
) {
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  const { id: boardId } = parent;

  try {
    return await getColumns(context.user.userId, boardId);
  } catch {
    throw new GraphQLError("Failed to get columns");
  }
}

export async function tasksOfColumnResolver(
  parent: TaskDetails & DbItem,
  _: {},
  context: AuthContext,
) {
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  const { id: columnId } = parent;

  try {
    return await getTasks(columnId, context.user.userId);
  } catch {
    throw new GraphQLError("Failed to get tasks");
  }
}

export async function subtasksOfTaskResolver(
  parent: SubtaskDetail & DbItem,
  _: {},
  context: AuthContext,
) {
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  const { id: taskId } = parent;

  try {
    return await getSubtasks(taskId, context.user.userId);
  } catch {
    throw new GraphQLError("Failed to get subtasks");
  }
}
