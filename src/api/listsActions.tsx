import { apiPost } from "../utils/requests";
import { ICreateListData } from "../config/interfaces";
import { Endpoints } from "../config/endpoints";
import { showToastError } from "../utils/toastMessages";

interface Lists {
  // isDeleted: boolean;
  id: number;
  title: string;
  ownerId: number;
}


export const createLists = async (
  data: ICreateListData,
  token: string | undefined
): Promise<Lists> => {
  try {
    return await apiPost<Lists>(Endpoints.createList, data, token);
  } catch (error: any) {
    showToastError(error);
    throw error;
  }
};

// export function createTask(data: string, token: string | undefined) {}
