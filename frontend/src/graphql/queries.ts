import { graphql } from '../gql';

export const GET_BOARDS = graphql(`
    query Boards {
        boards {
            id
            name
        }
    }
`);

export const GET_BOARD = graphql(`
    query Board($boardId: ID!) {
        board(id: $boardId) {
            id
            name
        }
    }
`);

export const GET_COLUMNS = graphql(`
    query Columns($boardId: ID!) {
        columns(boardId: $boardId) {
            boardId
            id
            name
            boardId
        }
    }
`);

export const GET_COLUMN = graphql(`
    query Column($columnId: ID!) {
        column(id: $columnId) {
            boardId
            id
            name
        }
    }
`);

export const GET_SUBTASK = graphql(`
    query Subtask($subtaskId: ID!) {
        subtask(id: $subtaskId) {
            id
            isCompleted
            title
        }
    }
`);

export const GET_SUBTASKS = graphql(`
    query Subtasks($taskId: ID!) {
        subtasks(taskId: $taskId) {
            isCompleted
            id
            title
            taskId
        }
    }
`);

export const GET_TASK = graphql(`
    query Task($taskId: ID!) {
        task(id: $taskId) {
            columnId
            description
            id
            title
        }
    }
`);

export const GET_TASKS = graphql(`
    query Tasks($columnId: ID!) {
        tasks(columnId: $columnId) {
            columnId
            description
            id
            title
        }
    }
`);
