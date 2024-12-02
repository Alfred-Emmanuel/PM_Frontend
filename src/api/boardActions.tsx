import { boardEndpoint } from "./api";
import { ICreateBoardData, IListCard } from "../config/interfaces";
import { Endpoints } from "../config/endpoints";
import { showToastError } from "../utils/toastMessages";

interface KanbanBoard {
  // isDeleted: boolean;
  id: number;
  title: string;
  ownerId: number;
}

export function createKanbanBoard(
  data: ICreateBoardData,
  token: string | undefined
): Promise<KanbanBoard> {
  const { createBoard } = Endpoints;
  // const { title } = data;
  return boardEndpoint
    .post<KanbanBoard>(createBoard, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("API Response:", res.data);
      return res.data;
    })
    .catch((error: any) => {
      showToastError(error.response?.data || error.message);
      console.error(
        "Error creating kanban board:",
        error.response?.data || error.message
      );
      throw error;
    });
}

export function getAllBoards(
  token: string | undefined,
  setLists: React.Dispatch<React.SetStateAction<any>>
) {
  const { fetchBoards } = Endpoints;
  return boardEndpoint
    .get(fetchBoards, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      const boards = res.data.data;
      const transformedLists: IListCard[] = boards.map((board: any) => ({
        id: board.id,
        name: board.title,
        tasks: [], // Placeholder for tasks (since the API doesn't return them)
      }));

      setLists(transformedLists);
      return res.data;
    })
    .catch((error) => {
      showToastError(error.response?.data || error.message);
      throw Error;
    });
}
