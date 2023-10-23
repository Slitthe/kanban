import {
  GetSubtasksPayload,
  SubtaskDetail,
  UpdateSubtaskPayload,
} from "../types/subtask";
import { AuthContext } from "../types/auth";
import { GraphQLError } from "graphql/error";
import {
  createSubtask,
  deleteSubtask,
  getSubtask,
  getSubtasks,
  updateSubtask,
} from "../db";
import { DbItem } from "../types/db";

export async function getSubtasksResolver(
  parent: {},
  getTasksPayload: GetSubtasksPayload,
  context: AuthContext,
) {
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  const { taskId } = getTasksPayload;

  try {
    return await getSubtasks(taskId, context.user.userId);
  } catch {
    throw new GraphQLError("Failed to fetch subtasks");
  }
}
export async function getSubtaskResolver(
  parent: {},
  getSubtaskPayload: DbItem,
  context: AuthContext,
) {
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  const { id } = getSubtaskPayload;
  console.log({ id });

  try {
    return await getSubtask(context.user?.userId, id);
  } catch {
    throw new GraphQLError("Failed to fetch subtask");
  }
}

export async function updateSubtaskResolver(
  parent: any,
  subtaskDetails: UpdateSubtaskPayload,
  context: AuthContext,
) {
  const { title, isCompleted, id } = subtaskDetails;

  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  try {
    return await updateSubtask(id, context.user.userId, title, isCompleted);
  } catch {
    throw new Error("Failed to update subtask");
  }
}

export async function deleteSubtaskResolver(
  parent: any,
  subtaskDetail: DbItem,
  context: AuthContext,
) {
  const { id } = subtaskDetail;

  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  try {
    return await deleteSubtask(id, context.user.userId);
  } catch {
    throw new Error("Failed to delete subtask");
  }
}

export async function createSubtaskResolver(
  parent: any,
  subtaskDetails: SubtaskDetail,
  context: AuthContext,
) {
  const { title, taskId, isCompleted } = subtaskDetails;
  if (!context.isAuthenticated || !context.user?.userId) {
    throw new GraphQLError("Unauthorized");
  }

  try {
    return await createSubtask(title, taskId, context.user.userId, isCompleted);
  } catch {
    throw new Error("Failed to save subtask");
  }
}
