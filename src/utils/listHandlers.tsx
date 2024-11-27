import { IListCard } from "../config/interfaces";
// import { ITask } from "../types/tasks.types";

// Function to add a new list
export const addNewList = (
  lists: IListCard[],
  name: string,
  setLists: React.Dispatch<React.SetStateAction<IListCard[]>>
) => {
  const newList: IListCard = {
    id: lists.length + 1,
    name,
    tasks: [],
  };
  setLists((prevLists) => [...prevLists, newList]);
};

// Function to add a task to a specific list
export const addNewTask = (
  setLists: React.Dispatch<React.SetStateAction<IListCard[]>>,
  listId: number,
  taskName: string
) => {
  setLists((prevLists) =>
    prevLists.map((list) =>
      list.id === listId
        ? {
            ...list,
            tasks: [
              ...list.tasks,
              {
                id: Date.now(), // Generate a unique numeric ID
                name: taskName,
              },
            ],
          }
        : list
    )
  );
};

// export const addNewTask = (
//   listId: string,
//   taskName: string,
//   setLists: React.Dispatch<React.SetStateAction<ListCard[]>>
// ) => {
//   const newTask: Task = { id: `${Date.now()}`, name: taskName };

//   setLists((prevLists) =>
//     prevLists.map((list) =>
//       list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
//     )
//   );
// };
