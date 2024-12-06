import { apiPost, apiGet, apiDelete } from "../utils/requests";
import { ICreateBoardData, IBoard, IListCard } from "../config/interfaces";
import { Endpoints } from "../config/endpoints";
import { showToastError } from "../utils/toastMessages";
import { config } from "../config/config";

interface KanbanBoard {
  // isDeleted: boolean;
  id: number;
  title: string;
  ownerId: number;
}

export const fetchListsForKanbanBoard = async (
  id: number,
  token: string | undefined
): Promise<IListCard[]> => {
  const url =
    config.api.base_url +
    config.api.protected +
    config.endpoints.kanbanBoard.base_url +
    "/" +
    id +
    config.endpoints.kanbanBoard.fetch_board_lists;

  // console.log(url);
  try {
    const data: IListCard[] = await apiGet(url, token); // Pass the URL and token
    console.log("Fetched Lists:", data);
    return data.map((list) => ({
      id: list.id,
      title: list.title,
      tasks: [],
    }));
  } catch (error: any) {
    console.error("Error fetching lists:", error.message);
    throw error;
  }
};

export async function getAllBoards(
  token: string | undefined,
  setBoards: React.Dispatch<React.SetStateAction<any>>
) {
  try {
    const response = await apiGet<any>(Endpoints.fetchBoards, token);
    // console.log(response)
    const boards = response.data;
    // console.log(boards);
    const transformedBoards: IBoard[] = boards.map((board: any) => ({
      id: board.id,
      title: board.title,
      lists: [],
    }));
    setBoards(transformedBoards);
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

export const deleteBoard = async (
  token: string | undefined,
  boardId: number
) => {
  try {
    return await apiDelete(`${Endpoints.deleteBoard}/${boardId}`, token);
  } catch (error: any) {
    showToastError(error);
    throw Error;
  }
};
