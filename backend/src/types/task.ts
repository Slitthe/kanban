export interface TaskDetails {
  columnId: number;
  title: string;
  description?: string;
}

export interface GetTasksPayload {
  columnId: number;
}
export interface DbTaskDetails {
  name: string;
  column_id: number;
  title: string;
  description?: string;
}
export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  id: number;
}
