import { AuthContext, DbItem, User } from "../types/user";
import { GraphQLError } from "graphql/error";
import bcrypt from "bcrypt";
import {
  createBoard,
  createColumn,
  createUser,
  deleteBoard,
  deleteColumn,
  getBoard,
  getBoards,
  getColumn,
  getColumns,
  getUser,
  updateBoard,
  updateColumn,
} from "../db";
import jwt from "jsonwebtoken";
import { BoardDetails } from "../types/board";
import {
  ColumnDetails,
  GetColumnsPayload,
  UpdateColumnDetails,
} from "../types/column";

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
        throw new Error("Failed to save column");
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
