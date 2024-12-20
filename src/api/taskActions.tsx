import { apiPost, apiGet } from "@/utils/requests";
import { Endpoints } from "@/config/endpoints";
import { showToastError } from "@/utils/toastMessages";
import { ICreateBoardData } from "@/config/interfaces";

interface TaskData {
  message: string;
  task: {
    id: number;
    title: string;
    status: string;
    listId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const fetchTasks = async (token: string, listId: number) => {
  const url = Endpoints.fetchTasks + "/" + listId;
  try {
    return await apiGet<any>(url, token);
  } catch (error: any) {
    showToastError(error.message);
    throw error;
  }
};

export const createTask = async (
  payload: ICreateBoardData,
  token: string,
  listId: number
): Promise<TaskData> => {
  const url = Endpoints.createTasks + "/" + listId;
  try {
    return await apiPost<TaskData>(url, payload, token);
  } catch (error: any) {
    showToastError(error?.message);
    throw error;
  }
};
