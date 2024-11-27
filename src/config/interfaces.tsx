// import { ITask } from "./tasks.types";

export interface IListCard {
  id: number;
  name: string;
  tasks: ITask[];
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ITask {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // isDeleted: boolean;
  // createdAt: string;
  // updatedAt: string;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface IUserContextType {
  user: IUser | null;
  tokens: ITokens | null;
  setUser: (user: IUser | null) => void;
  setTokens: (tokens: ITokens | null) => void;
  refreshToken: () => void;
}
