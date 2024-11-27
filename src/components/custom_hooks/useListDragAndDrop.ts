import { useEffect, useRef } from "react";
import {
  dropTargetForElements,
  draggable,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { IListCard } from "../../config/interfaces";
// import { ITask } from "../../config/interfaces";

function useListDragAndDrop(
  lists: IListCard[],
  setLists: React.Dispatch<React.SetStateAction<IListCard[]>>
) {
  const listRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const taskRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    // Make lists draggable and droppable
    lists.forEach((list) => {
      const listElement = listRefs.current[list.id];
      if (!listElement) return;

      const listCleanup = draggable({
        element: listElement,
        getInitialData: () => ({ type: "list", listId: list.id }),
      });

      const dropCleanup = dropTargetForElements({
        element: listElement,
        getData: () => ({ type: "list", listId: list.id }),
        onDrop: ({ source, location }) => {
          if (source.data.type === "task") {
            const taskId = source.data.taskId;
            const destListId = location.current.dropTargets[0]?.data.listId;

            if (destListId != null) {
              setLists((prevLists) => {
                const newLists = [...prevLists];

                // Find source list and task
                const sourceList = newLists.find((l) =>
                  l.tasks.some((t) => t.id === taskId)
                );
                const task = sourceList?.tasks.find((t) => t.id === taskId);
                if (!sourceList || !task) return prevLists;

                // Remove task from source list
                sourceList.tasks = sourceList.tasks.filter(
                  (t) => t.id !== taskId
                );

                // Add task to destination list
                const destList = newLists.find((l) => l.id === destListId);
                destList?.tasks.push(task);

                return newLists;
              });
            }
          }
        },
      });

      cleanups.push(listCleanup, dropCleanup);

      // Make tasks draggable and droppable
      list.tasks.forEach((task) => {
        const taskElement = taskRefs.current[task.id];
        if (!taskElement) return;

        const taskCleanup = draggable({
          element: taskElement,
          getInitialData: () => ({ type: "task", taskId: task.id }),
        });

        cleanups.push(taskCleanup);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [lists, setLists]);

  return { listRefs, taskRefs };
}

export default useListDragAndDrop;
