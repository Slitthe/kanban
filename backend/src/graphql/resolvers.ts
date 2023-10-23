import { AuthContext, DbItem, User } from "../types/user";
import { GraphQLError } from "graphql/error";
import bcrypt from "bcrypt";
import {
  createBoard,
  createColumn,
  createSubtask,
  createTask,
  createUser,
  deleteBoard,
  deleteColumn,
  deleteSubtask,
  deleteTask,
  getBoard,
  getBoards,
  getColumn,
  getColumns,
  getSubtask,
  getSubtasks,
  getTask,
  getTasks,
  getUser,
  updateBoard,
  updateColumn,
  updateSubtask,
  updateTask,
} from "../db";
import jwt from "jsonwebtoken";
import { BoardDetails } from "../types/board";
import {
  ColumnDetails,
  GetColumnsPayload,
  UpdateColumnDetails,
} from "../types/column";
import { GetTasksPayload, TaskDetails, UpdateTaskPayload } from "../types/task";
import {
  GetSubtasksPayload,
  SubtaskDetail,
  UpdateSubtaskPayload,
} from "../types/subtask";

// interface Resolvers {
//   query: {
//     [key: string]: (
//       parent: any,
//       data: any,
//       context: AuthContext,
//     ) => Promise<any>;
//   };
//   mutation: {
//     [key: string]: (
//       parent: any,
//       data: any,
//       context: AuthContext,
//     ) => Promise<any>;
//   };
// }

const resolvers: any = {
  Board: {
    async columns(parent: BoardDetails & DbItem, _: {}, context: AuthContext) {
      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      const { id: boardId } = parent;

      try {
        return await getColumns(context.user.userId, boardId);
      } catch {
        throw new GraphQLError("Failed to get columns");
      }
    },
  },
  Query: {
    async boards(parent: {}, _: {}, context: AuthContext) {
      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      try {
        return await getBoards(context.user.userId);
      } catch {
        throw new GraphQLError("Failed to fetch boards");
      }
    },
    async board(parent: {}, boardDetails: DbItem, context: AuthContext) {
      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      const { id } = boardDetails;

      try {
        return await getBoard(context.user.userId, id);
      } catch {
        throw new GraphQLError("Failed to fetch boards");
      }
    },
    async columns(
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
    },
    async tasks(
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
    },
    async subtasks(
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
    },
    async subtask(parent: {}, getSubtaskPayload: DbItem, context: AuthContext) {
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
    },
    async column(parent: {}, columnDetails: DbItem, context: AuthContext) {
      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      const { id } = columnDetails;

      try {
        return await getColumn(context.user.userId, id);
      } catch {
        throw new GraphQLError("Failed to fetch column");
      }
    },
    async task(parent: {}, taskDetail: DbItem, context: AuthContext) {
      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      const { id } = taskDetail;

      try {
        return await getTask(context.user.userId, id);
      } catch {
        throw new GraphQLError("Failed to fetch task");
      }
    },
  },
  Mutation: {
    async createBoard(
      parent: any,
      boardDetails: BoardDetails,
      context: AuthContext,
    ) {
      const { name } = boardDetails;
      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      try {
        return await createBoard(name, context.user.userId);
      } catch {
        throw new Error("Failed to save board");
      }
    },
    async createColumn(
      parent: any,
      columnDetails: ColumnDetails,
      context: AuthContext,
    ) {
      const { name, boardId } = columnDetails;
      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      try {
        return await createColumn(name, boardId, context.user.userId);
      } catch {
        throw new Error("Failed to save Task");
      }
    },
    async createTask(
      parent: any,
      columnDetails: TaskDetails,
      context: AuthContext,
    ) {
      const { title, columnId, description } = columnDetails;
      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      try {
        return await createTask(
          title,
          columnId,
          context.user.userId,
          description,
        );
      } catch {
        throw new Error("Failed to save column");
      }
    },
    async createSubtask(
      parent: any,
      subtaskDetails: SubtaskDetail,
      context: AuthContext,
    ) {
      const { title, taskId, isCompleted } = subtaskDetails;
      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      try {
        return await createSubtask(
          title,
          taskId,
          context.user.userId,
          isCompleted,
        );
      } catch {
        throw new Error("Failed to save subtask");
      }
    },

    async updateBoard(
      parent: any,
      boardDetails: BoardDetails & DbItem,
      context: AuthContext,
    ) {
      const { name, id } = boardDetails;

      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      try {
        return await updateBoard(name, id, context.user.userId);
      } catch {
        throw new Error("Failed to update board");
      }
    },

    async updateColumn(
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
    },
    async updateTask(
      parent: any,
      taskDetails: UpdateTaskPayload,
      context: AuthContext,
    ) {
      const { title, description, id } = taskDetails;
      console.log({ taskDetails });

      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      try {
        return await updateTask(id, context.user.userId, title, description);
      } catch {
        throw new Error("Failed to update task");
      }
    },
    async updateSubtask(
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
    },
    async deleteBoard(parent: any, boardDetails: DbItem, context: AuthContext) {
      const { id } = boardDetails;

      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      try {
        return await deleteBoard(id, context.user.userId);
      } catch {
        throw new Error("Failed to delete board");
      }
    },
    async deleteColumn(
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
    },
    async deleteTask(parent: any, taskDetail: DbItem, context: AuthContext) {
      const { id } = taskDetail;

      if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError("Unauthorized");
      }

      try {
        return await deleteTask(id, context.user.userId);
      } catch {
        throw new Error("Failed to delete task");
      }
    },
    async deleteSubtask(
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
    },
    async register(parent: any, user: User) {
      const { username, password } = user;

      if (!username || !password) {
        throw new GraphQLError("Missing fields");
      }

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (err) {
        throw new GraphQLError("Couldn't create user");
      }

      try {
        if (!hashedPassword) {
          throw new Error();
        }
        const userId = await createUser(username, hashedPassword);
        if (process.env.JWT_SECRET) {
          const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "4h",
          });
          return { username, token };
        } else {
          throw new GraphQLError("Couldn't create user");
        }
      } catch (err) {
        throw new GraphQLError("Couldn't create user");
      }
    },
    async login(parent: any, user: User) {
      const { username, password } = user;
      if (!username || !password) {
        throw new GraphQLError("Missing fields");
      }
      //
      let dbUser = await getUser(username);

      if (!dbUser) {
        throw new GraphQLError("Invalid credentials");
      }

      const passwordMatch = await bcrypt.compare(password, dbUser.password);

      if (!passwordMatch) {
        throw new GraphQLError("Invalid credentials");
      }

      if (process.env.JWT_SECRET) {
        const token = jwt.sign({ userId: dbUser.id }, process.env.JWT_SECRET, {
          expiresIn: "4h",
        });
        return { token };
      } else {
        throw new GraphQLError("Error");
      }
    },
  },
};

export default resolvers;
