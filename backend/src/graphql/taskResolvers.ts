import { GetTasksPayload, TaskDetails, UpdateTaskPayload } from "../types/task";
import { AuthContext } from "../types/auth";
import { GraphQLError } from "graphql/error";
import {
  createTask,
  deleteTask,
  getColumn,
  getTask,
  getTasks,
  updateTask,
} from "../db";
import { DbItem } from "../types/db";

export async function getTasksResolver(
  parent: {},
  getTasksPayload: GetTasksPayload,
  context: AuthContext,
) {
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  const { columnId } = getTasksPayload;

  try {
    return await getTasks(columnId, context.user.userId);
  } catch {
    throw new GraphQLError("Failed to fetch tasks");
  }
}

export async function getTaskResolver(
  parent: {},
  taskDetail: DbItem,
  context: AuthContext,
) {
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  const { id } = taskDetail;

  try {
    return await getTask(context.user.userId, id);
  } catch {
    throw new GraphQLError("Failed to fetch task");
  }
}

export async function createTaskResolver(
  parent: any,
  columnDetails: TaskDetails,
  context: AuthContext,
) {
  const { title, columnId, description } = columnDetails;
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  try {
    const parentColumn = await getColumn(context.user?.userId, columnId);
    if (parentColumn.userId !== context.user?.userId) {
      throw new Error();
    }
    return await createTask(title, columnId, context.user.userId, description);
  } catch {
    throw new Error("Failed to save column");
  }
}

export async function updateTaskResolver(
  parent: any,
  taskDetails: UpdateTaskPayload,
  context: AuthContext,
) {
  const { title, description, id } = taskDetails;

  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  try {
    return await updateTask(id, context.user.userId, title, description);
  } catch {
    throw new Error("Failed to update task");
  }
}

export async function deleteTaskResolver(
  parent: any,
  taskDetail: DbItem,
  context: AuthContext,
) {
  const { id } = taskDetail;

  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  try {
    return await deleteTask(id, context.user.userId);
  } catch {
    throw new Error("Failed to delete task");
  }
}
