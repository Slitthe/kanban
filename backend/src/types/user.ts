export interface User {
  username: string;
  password: string;
}

export interface DbItem {
  id: number;
}

export interface AuthContext {
  isAuthenticated?: boolean;
  user?: TokenContent;
}

export interface TokenContent {
  userId: number;
  iat: number;
  exp: number;
}
