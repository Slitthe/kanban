/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation Login($username: String!, $password: String!) {\n        login(username: $username, password: $password) {\n            token\n        }\n    }\n": types.LoginDocument,
    "\n    mutation Register($username: String!, $password: String!) {\n        register(username: $username, password: $password) {\n            token\n        }\n    }\n": types.RegisterDocument,
    "\n    mutation CreateBoard($name: String!) {\n        createBoard(name: $name) {\n            id\n            name\n        }\n    }\n": types.CreateBoardDocument,
    "\n    mutation UpdateBoard($name: String!, $updateBoardId: ID!) {\n        updateBoard(name: $name, id: $updateBoardId) {\n            id\n            name\n        }\n    }\n": types.UpdateBoardDocument,
    "\n    mutation UpdateColumn($name: String!, $updateColumnId: ID!) {\n        updateColumn(name: $name, id: $updateColumnId) {\n            id\n            name\n            boardId\n        }\n    }\n": types.UpdateColumnDocument,
    "\n    mutation UpdateSubtask($updateSubtaskId: ID!) {\n        updateSubtask(id: $updateSubtaskId) {\n            title\n            isCompleted\n            id\n            taskId\n        }\n    }\n": types.UpdateSubtaskDocument,
    "\n    mutation UpdateTask($updateTaskId: ID!) {\n        updateTask(id: $updateTaskId) {\n            columnId\n            id\n            description\n            title\n        }\n    }\n": types.UpdateTaskDocument,
    "\n    mutation DeleteBoard($deleteBoardId: ID!) {\n        deleteBoard(id: $deleteBoardId) {\n            id\n            name\n        }\n    }\n": types.DeleteBoardDocument,
    "\n    mutation DeleteColumn($deleteColumnId: ID!) {\n        deleteColumn(id: $deleteColumnId) {\n            name\n            id\n            boardId\n        }\n    }\n": types.DeleteColumnDocument,
    "\n    mutation DeleteSubtask($deleteSubtaskId: ID!) {\n        deleteSubtask(id: $deleteSubtaskId) {\n            isCompleted\n            id\n            taskId\n            title\n        }\n    }\n": types.DeleteSubtaskDocument,
    "\n    mutation DeleteTask($deleteTaskId: ID!) {\n        deleteTask(id: $deleteTaskId) {\n            title\n            id\n            description\n            columnId\n        }\n    }\n": types.DeleteTaskDocument,
    "\n    mutation CreateColumn($name: String!, $boardId: ID!) {\n        createColumn(name: $name, boardId: $boardId) {\n            id\n            boardId\n            name\n        }\n    }\n": types.CreateColumnDocument,
    "\n    mutation CreateSubtask($taskId: ID!, $title: String!) {\n        createSubtask(taskId: $taskId, title: $title) {\n            title\n            taskId\n            isCompleted\n            id\n        }\n    }\n": types.CreateSubtaskDocument,
    "\n    mutation CreateTask($columnId: ID!, $title: String!) {\n        createTask(columnId: $columnId, title: $title) {\n            columnId\n            description\n            id\n            title\n        }\n    }\n": types.CreateTaskDocument,
    "\n    query Boards {\n        boards {\n            id\n            name\n        }\n    }\n": types.BoardsDocument,
    "\n    query Board($boardId: ID!) {\n        board(id: $boardId) {\n            id\n            name\n        }\n    }\n": types.BoardDocument,
    "\n    query Columns($boardId: ID!) {\n        columns(boardId: $boardId) {\n            boardId\n            id\n            name\n            boardId\n        }\n    }\n": types.ColumnsDocument,
    "\n    query Column($columnId: ID!) {\n        column(id: $columnId) {\n            boardId\n            id\n            name\n        }\n    }\n": types.ColumnDocument,
    "\n    query Subtask($subtaskId: ID!) {\n        subtask(id: $subtaskId) {\n            id\n            isCompleted\n            title\n        }\n    }\n": types.SubtaskDocument,
    "\n    query Subtasks($taskId: ID!) {\n        subtasks(taskId: $taskId) {\n            isCompleted\n            id\n            title\n            taskId\n        }\n    }\n": types.SubtasksDocument,
    "\n    query Task($taskId: ID!) {\n        task(id: $taskId) {\n            columnId\n            description\n            id\n            title\n        }\n    }\n": types.TaskDocument,
    "\n    query Tasks($columnId: ID!) {\n        tasks(columnId: $columnId) {\n            columnId\n            description\n            id\n            title\n        }\n    }\n": types.TasksDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Login($username: String!, $password: String!) {\n        login(username: $username, password: $password) {\n            token\n        }\n    }\n"): (typeof documents)["\n    mutation Login($username: String!, $password: String!) {\n        login(username: $username, password: $password) {\n            token\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Register($username: String!, $password: String!) {\n        register(username: $username, password: $password) {\n            token\n        }\n    }\n"): (typeof documents)["\n    mutation Register($username: String!, $password: String!) {\n        register(username: $username, password: $password) {\n            token\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateBoard($name: String!) {\n        createBoard(name: $name) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    mutation CreateBoard($name: String!) {\n        createBoard(name: $name) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateBoard($name: String!, $updateBoardId: ID!) {\n        updateBoard(name: $name, id: $updateBoardId) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateBoard($name: String!, $updateBoardId: ID!) {\n        updateBoard(name: $name, id: $updateBoardId) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateColumn($name: String!, $updateColumnId: ID!) {\n        updateColumn(name: $name, id: $updateColumnId) {\n            id\n            name\n            boardId\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateColumn($name: String!, $updateColumnId: ID!) {\n        updateColumn(name: $name, id: $updateColumnId) {\n            id\n            name\n            boardId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateSubtask($updateSubtaskId: ID!) {\n        updateSubtask(id: $updateSubtaskId) {\n            title\n            isCompleted\n            id\n            taskId\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateSubtask($updateSubtaskId: ID!) {\n        updateSubtask(id: $updateSubtaskId) {\n            title\n            isCompleted\n            id\n            taskId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateTask($updateTaskId: ID!) {\n        updateTask(id: $updateTaskId) {\n            columnId\n            id\n            description\n            title\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateTask($updateTaskId: ID!) {\n        updateTask(id: $updateTaskId) {\n            columnId\n            id\n            description\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteBoard($deleteBoardId: ID!) {\n        deleteBoard(id: $deleteBoardId) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteBoard($deleteBoardId: ID!) {\n        deleteBoard(id: $deleteBoardId) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteColumn($deleteColumnId: ID!) {\n        deleteColumn(id: $deleteColumnId) {\n            name\n            id\n            boardId\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteColumn($deleteColumnId: ID!) {\n        deleteColumn(id: $deleteColumnId) {\n            name\n            id\n            boardId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteSubtask($deleteSubtaskId: ID!) {\n        deleteSubtask(id: $deleteSubtaskId) {\n            isCompleted\n            id\n            taskId\n            title\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteSubtask($deleteSubtaskId: ID!) {\n        deleteSubtask(id: $deleteSubtaskId) {\n            isCompleted\n            id\n            taskId\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteTask($deleteTaskId: ID!) {\n        deleteTask(id: $deleteTaskId) {\n            title\n            id\n            description\n            columnId\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteTask($deleteTaskId: ID!) {\n        deleteTask(id: $deleteTaskId) {\n            title\n            id\n            description\n            columnId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateColumn($name: String!, $boardId: ID!) {\n        createColumn(name: $name, boardId: $boardId) {\n            id\n            boardId\n            name\n        }\n    }\n"): (typeof documents)["\n    mutation CreateColumn($name: String!, $boardId: ID!) {\n        createColumn(name: $name, boardId: $boardId) {\n            id\n            boardId\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateSubtask($taskId: ID!, $title: String!) {\n        createSubtask(taskId: $taskId, title: $title) {\n            title\n            taskId\n            isCompleted\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation CreateSubtask($taskId: ID!, $title: String!) {\n        createSubtask(taskId: $taskId, title: $title) {\n            title\n            taskId\n            isCompleted\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateTask($columnId: ID!, $title: String!) {\n        createTask(columnId: $columnId, title: $title) {\n            columnId\n            description\n            id\n            title\n        }\n    }\n"): (typeof documents)["\n    mutation CreateTask($columnId: ID!, $title: String!) {\n        createTask(columnId: $columnId, title: $title) {\n            columnId\n            description\n            id\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Boards {\n        boards {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query Boards {\n        boards {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Board($boardId: ID!) {\n        board(id: $boardId) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query Board($boardId: ID!) {\n        board(id: $boardId) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Columns($boardId: ID!) {\n        columns(boardId: $boardId) {\n            boardId\n            id\n            name\n            boardId\n        }\n    }\n"): (typeof documents)["\n    query Columns($boardId: ID!) {\n        columns(boardId: $boardId) {\n            boardId\n            id\n            name\n            boardId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Column($columnId: ID!) {\n        column(id: $columnId) {\n            boardId\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query Column($columnId: ID!) {\n        column(id: $columnId) {\n            boardId\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Subtask($subtaskId: ID!) {\n        subtask(id: $subtaskId) {\n            id\n            isCompleted\n            title\n        }\n    }\n"): (typeof documents)["\n    query Subtask($subtaskId: ID!) {\n        subtask(id: $subtaskId) {\n            id\n            isCompleted\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Subtasks($taskId: ID!) {\n        subtasks(taskId: $taskId) {\n            isCompleted\n            id\n            title\n            taskId\n        }\n    }\n"): (typeof documents)["\n    query Subtasks($taskId: ID!) {\n        subtasks(taskId: $taskId) {\n            isCompleted\n            id\n            title\n            taskId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Task($taskId: ID!) {\n        task(id: $taskId) {\n            columnId\n            description\n            id\n            title\n        }\n    }\n"): (typeof documents)["\n    query Task($taskId: ID!) {\n        task(id: $taskId) {\n            columnId\n            description\n            id\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Tasks($columnId: ID!) {\n        tasks(columnId: $columnId) {\n            columnId\n            description\n            id\n            title\n        }\n    }\n"): (typeof documents)["\n    query Tasks($columnId: ID!) {\n        tasks(columnId: $columnId) {\n            columnId\n            description\n            id\n            title\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;