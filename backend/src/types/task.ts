export interface TaskDetails {
  columnId: number;
  title: string;
  description?: string;
  userId: number;
}

export interface GetTasksPayload {
  columnId: number;
}
export interface DbTaskDetails {
  name: string;
  column_id: number;
  title: string;
  description?: string;
  user_id: number;
}
export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  id: number;
}
