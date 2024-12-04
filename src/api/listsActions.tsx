import { apiPost, apiGet } from "../utils/requests";
import { ICreateListData, IListCard } from "../config/interfaces";
import { Endpoints } from "../config/endpoints";
import { showToastError } from "../utils/toastMessages";

interface Lists {
  // isDeleted: boolean;
  id: number;
  title: string;
  ownerId: number;
}

export async function getAllLists(
  token: string | undefined,
  setLists: React.Dispatch<React.SetStateAction<any>>
) {
  try {
    const response = await apiGet<any>(Endpoints.fetchLists, token);
    // console.log(response)
    const lists = response.data;
    // console.log(lists);
    const transformedLists: IListCard[] = lists.map((list: any) => ({
      id: list.id,
      name: list.title,
      tasks: [],
    }));
    setLists(transformedLists);
    return response;
  } catch (error: any) {
    showToastError(error);
    throw error;
  }
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
