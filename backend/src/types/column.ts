export interface ColumnDetails {
  name: string;
  boardId: number;
  userId: number;
}

export interface GetColumnsPayload {
  boardId: number;
}
export interface DbColumnDetails {
  name: string;
  board_id: number;
  user_id: number;
}
export interface UpdateColumnDetails {
  name: string;
  id: number;
}
