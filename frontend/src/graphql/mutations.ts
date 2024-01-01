import { graphql } from '../gql';

export const LOGIN = graphql(`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`);

export const REGISTER = graphql(`
    mutation Register($username: String!, $password: String!) {
        register(username: $username, password: $password) {
            token
        }
    }
`);

export const CREATE_BOARD = graphql(`
    mutation CreateBoard($name: String!) {
        createBoard(name: $name) {
            id
            name
        }
    }
`);

export const UPDATE_BOARD = graphql(`
    mutation UpdateBoard($name: String!, $updateBoardId: ID!) {
        updateBoard(name: $name, id: $updateBoardId) {
            id
            name
        }
    }
`);

export const UPDATE_COLUMN = graphql(`
    mutation UpdateColumn($name: String!, $updateColumnId: ID!) {
        updateColumn(name: $name, id: $updateColumnId) {
            id
            name
            boardId
        }
    }
`);

export const UPDATE_SUBTASK = graphql(`
    mutation UpdateSubtask($updateSubtaskId: ID!) {
        updateSubtask(id: $updateSubtaskId) {
            title
            isCompleted
            id
            taskId
        }
    }
`);

export const UPDATE_TASK = graphql(`
    mutation UpdateTask($updateTaskId: ID!) {
        updateTask(id: $updateTaskId) {
            columnId
            id
            description
            title
        }
    }
`);
export const DELETE_BOARD = graphql(`
    mutation DeleteBoard($deleteBoardId: ID!) {
        deleteBoard(id: $deleteBoardId) {
            id
            name
        }
    }
`);

export const DELETE_COLUMN = graphql(`
    mutation DeleteColumn($deleteColumnId: ID!) {
        deleteColumn(id: $deleteColumnId) {
            name
            id
            boardId
        }
    }
`);

export const DELETE_SUBTASK = graphql(`
    mutation DeleteSubtask($deleteSubtaskId: ID!) {
        deleteSubtask(id: $deleteSubtaskId) {
            isCompleted
            id
            taskId
            title
        }
    }
`);

export const DELETE_TASK = graphql(`
    mutation DeleteTask($deleteTaskId: ID!) {
        deleteTask(id: $deleteTaskId) {
            title
            id
            description
            columnId
        }
    }
`);
export const CREATE_COLUMN = graphql(`
    mutation CreateColumn($name: String!, $boardId: ID!) {
        createColumn(name: $name, boardId: $boardId) {
            id
            boardId
            name
        }
    }
`);

export const CREATE_SUBTASK = graphql(`
    mutation CreateSubtask($taskId: ID!, $title: String!) {
        createSubtask(taskId: $taskId, title: $title) {
            title
            taskId
            isCompleted
            id
        }
    }
`);

export const CREATE_TASK = graphql(`
    mutation CreateTask($columnId: ID!, $title: String!) {
        createTask(columnId: $columnId, title: $title) {
            columnId
            description
            id
            title
        }
    }
`);
