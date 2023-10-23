export interface SubtaskDetail {
  taskId: number;
  title: string;
  isCompleted: boolean;
}

export interface GetSubtasksPayload {
  taskId: number;
}
export interface DbSubtaskDetail {
  title: string;
  task_id: number;
  is_completed: string;
}
export interface UpdateSubtaskPayload {
  isCompleted?: boolean;
  title?: string;
  id: number;
}
