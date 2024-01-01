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
    "mutation Register($username: String!, $password: String!) {\n  register(username: $username, password: $password) {\n    token\n  }\n}": types.RegisterDocument,
    "mutation CreateBoard($name: String!) {\n  createBoard(name: $name) {\n    name\n    id\n  }\n}": types.CreateBoardDocument,
    "mutation UpdateBoard($name: String!, $updateBoardId: ID!) {\n  updateBoard(name: $name, id: $updateBoardId) {\n    id\n    name\n  }\n}": types.UpdateBoardDocument,
    "mutation DeleteBoard($deleteBoardId: ID!) {\n  deleteBoard(id: $deleteBoardId) {\n    id\n    name\n  }\n}": types.DeleteBoardDocument,
    "query Boards {\n  boards {\n    id\n    name\n  }\n}": types.BoardsDocument,
    "query Board($boardId: ID!) {\n  board(id: $boardId) {\n    id\n    name\n  }\n}": types.BoardDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Login($username: String!, $password: String!) {\n        login(username: $username, password: $password) {\n            token\n        }\n    }\n"): (typeof documents)["\n    mutation Login($username: String!, $password: String!) {\n        login(username: $username, password: $password) {\n            token\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Register($username: String!, $password: String!) {\n  register(username: $username, password: $password) {\n    token\n  }\n}"): (typeof documents)["mutation Register($username: String!, $password: String!) {\n  register(username: $username, password: $password) {\n    token\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateBoard($name: String!) {\n  createBoard(name: $name) {\n    name\n    id\n  }\n}"): (typeof documents)["mutation CreateBoard($name: String!) {\n  createBoard(name: $name) {\n    name\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateBoard($name: String!, $updateBoardId: ID!) {\n  updateBoard(name: $name, id: $updateBoardId) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation UpdateBoard($name: String!, $updateBoardId: ID!) {\n  updateBoard(name: $name, id: $updateBoardId) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteBoard($deleteBoardId: ID!) {\n  deleteBoard(id: $deleteBoardId) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation DeleteBoard($deleteBoardId: ID!) {\n  deleteBoard(id: $deleteBoardId) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Boards {\n  boards {\n    id\n    name\n  }\n}"): (typeof documents)["query Boards {\n  boards {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Board($boardId: ID!) {\n  board(id: $boardId) {\n    id\n    name\n  }\n}"): (typeof documents)["query Board($boardId: ID!) {\n  board(id: $boardId) {\n    id\n    name\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;