import { gql } from '@/__generated__';

const GET_BOARDS = gql(`query Boards {
  boards {
    id
    name
  }
}`);

const GET_BOARD = gql(`query Board($boardId: ID!) {
  board(id: $boardId) {
    id
    name
  }
}`);
