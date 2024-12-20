import { IListCard } from "../config/interfaces";
import { createTask } from "../api/taskActions";
// import { ITask } from "../types/tasks.types";

// Function to add a new list
// export const addNewList = (
//   lists: IListCard[],
//   title: string,
//   setLists: React.Dispatch<React.SetStateAction<IListCard[]>>
// ) => {
//   const newList: IListCard = {
//     id: lists.length + 1,
//     title,
//     tasks: [],
//   };
//   setLists((prevLists) => [...prevLists, newList]);
// };

// Function to add a task to a specific list
export const addNewTask = async (
  setLists: React.Dispatch<React.SetStateAction<IListCard[]>>,
  listId: number,
  taskName: string,
  token: string
) => {
  const payload = {
    title: taskName,
  };
  try {
    const response = await createTask(payload, token, listId);

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  id: response.task.id,
                  title: response.task.title,
                  status: response.task.status,
                  listId: response.task.listId,
                },
              ],
            }
          : list
      )
    );
  } catch (error) {
    console.error("Failed to create task:", error);
  }
};
