import { gql } from '@/__generated__';

export const LOGIN = gql(`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`);

export const REGISTER =
    gql(`mutation Register($username: String!, $password: String!) {
  register(username: $username, password: $password) {
    token
  }
}`);

export const CREATE_BOARD = gql(`mutation CreateBoard($name: String!) {
  createBoard(name: $name) {
    name
    id
  }
}`);

export const UPDATE_BOARD =
    gql(`mutation UpdateBoard($name: String!, $updateBoardId: ID!) {
  updateBoard(name: $name, id: $updateBoardId) {
    id
    name
  }
}`);

export const DELETE_BOARD = gql(`mutation DeleteBoard($deleteBoardId: ID!) {
  deleteBoard(id: $deleteBoardId) {
    id
    name
  }
}`);
