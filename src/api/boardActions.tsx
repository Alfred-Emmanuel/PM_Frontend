import { apiPost, apiGet } from "../utils/requests";
import { ICreateBoardData, IListCard } from "../config/interfaces";
import { Endpoints } from "../config/endpoints";
import { showToastError } from "../utils/toastMessages";

interface KanbanBoard {
  // isDeleted: boolean;
  id: number;
  title: string;
  ownerId: number;
}

export async function getAllBoards(
  token: string | undefined,
  setLists: React.Dispatch<React.SetStateAction<any>>
) {
  try {
    const response = await apiGet<any>(Endpoints.fetchBoards, token);
    // console.log(response)
    const boards = response.data;
    // console.log(boards);
    const transformedLists: IListCard[] = boards.map((board: any) => ({
      id: board.id,
      name: board.title,
      tasks: [],
    }));
    setLists(transformedLists);
    return response;
  } catch (error: any) {
    showToastError(error);
    throw error;
  }
}

export const createKanbanBoard = async (
  data: ICreateBoardData,
  token: string | undefined
): Promise<KanbanBoard> => {
  try {
    return await apiPost<KanbanBoard>(Endpoints.createBoard, data, token);
  } catch (error: any) {
    showToastError(error);
    throw error;
  }
};


export function createTask(
  data: string,
  token: string | undefined, 
) {}
