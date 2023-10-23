import {
  getBoardsResolver,
  getBoardResolver,
  deleteBoardResolver,
  createBoardResolver,
  updateBoardResolver,
} from "./boardResolvers";
import {
  createColumnResolver,
  deleteColumnResolver,
  getColumnResolver,
  getColumnsResolver,
  updateColumnResolver,
} from "./columnResolvers";
import {
  createTaskResolver,
  deleteTaskResolver,
  getTaskResolver,
  getTasksResolver,
  updateTaskResolver,
} from "./taskResolvers";
import {
  createSubtaskResolver,
  deleteSubtaskResolver,
  getSubtaskResolver,
  getSubtasksResolver,
  updateSubtaskResolver,
} from "./subtasksResolvers";
import { loginResolver, registerResolver } from "./authResolvers";
import {
  columnsOfBoardsResolver,
  subtasksOfTaskResolver,
  tasksOfColumnResolver,
} from "./relationsResolvers";

const resolvers: any = {
  Board: {
    columns: columnsOfBoardsResolver,
  },
  Column: {
    tasks: tasksOfColumnResolver,
  },
  Task: {
    subtasks: subtasksOfTaskResolver,
  },
  Query: {
    board: getBoardResolver,
    boards: getBoardsResolver,

    colum: getColumnResolver,
    columns: getColumnsResolver,

    task: getTaskResolver,
    tasks: getTasksResolver,

    subtask: getSubtaskResolver,
    subtasks: getSubtasksResolver,
  },
  Mutation: {
    deleteBoard: deleteBoardResolver,
    createBoard: createBoardResolver,
    updateBoard: updateBoardResolver,

    createColumn: createColumnResolver,
    updateColumn: updateColumnResolver,
    deleteColumn: deleteColumnResolver,

    createTask: createTaskResolver,
    updateTask: updateTaskResolver,
    deleteTask: deleteTaskResolver,

    createSubtask: createSubtaskResolver,
    updateSubtask: updateSubtaskResolver,
    deleteSubtask: deleteSubtaskResolver,

    login: loginResolver,
    register: registerResolver,
  },
};

export default resolvers;
