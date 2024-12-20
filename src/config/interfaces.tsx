// import { ITask } from "./tasks.types";

export interface IListCard {
  id: number;
  title: string;
  tasks: ITask[];
}

export interface IBoard {
  id: number;
  title: string;
  lists: IListCard[];
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ITask {
  id: number;
  title: string;
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
  isLoading: boolean;
}

export interface ICreateBoardData {
  title: string;
}

export interface ICreateListData {
  title: string;
  kanbanBoardId: number;
}

export interface TaskData {
  id: number;
  title: string;
  status: string;
  listId: number;
  createdAt: string;
  updatedAt: string;
}