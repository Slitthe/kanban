export interface AuthContext {
  isAuthenticated?: boolean;
  user?: TokenContent;
}

export interface TokenContent {
  userId: number;
  iat: number;
  exp: number;
}
