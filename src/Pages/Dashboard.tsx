import { useState, useEffect } from "react";
import useListDragAndDrop from "../components/custom_hooks/useListDragAndDrop";
import { useUserContext } from "../context/UserContext";
import AddItemButton from "../components/addButton";
import { IListCard, ICreateBoardData } from "../config/interfaces";
import ListCard from "../components/ListCard";
import { addNewList, addNewTask } from "../utils/listHandlers";
import { showToastError } from "../utils/toastMessages";
import { createKanbanBoard, getAllBoards } from "../api/boardActions";
import { createLists, getAllLists } from "../api/listsActions";
import Sidebar from "../components/sidebar";

function Dashboard() {
  const { tokens } = useUserContext();

  const [lists, setLists] = useState<IListCard[]>([]);
  const [boardTitle, setBoardTitle] = useState<ICreateBoardData>({
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const { listRefs, taskRefs } = useListDragAndDrop(lists, setLists);
  const token = tokens?.access_token;

  useEffect(() => {
    getAllLists(token, setLists);
  }, [token]);

  const handleCreateBoard = async (title: string) => {
    const kanbanBoardId = 0;
    const payload = {
      title,
      kanbanBoardId,
    };
    if (!title.trim()) {
      showToastError("Title is required!");
      return;
    }
    console.log("Board Title inside handleCreateBoard:", title);
    setLoading(true);
    try {
      const newBoard = await createLists(payload, token);
      // Update the lists state with the new kanban board
      setLists((prevLists) => [
        ...prevLists,
        { id: newBoard.id, name: newBoard.title, tasks: [] },
      ]);
      setBoardTitle({ title: "" });
    } catch (error: any) {
      console.error("Error creating kanban board:", error);
      showToastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-screen bg-main_bg text-white flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl top-20 -left-10"></div>
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl bottom-20 right-20"></div>
      </div>
      {/* Header */}
      <div className="w-full h-16 flex items-center justify-around bg-teal-400/5 backdrop-blur-lg">
        <div className="flex items-center">
          <h1>Project Name</h1>
        </div>
        <div className="flex items-center">
          <h1>People</h1>
          <button>Share</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex w-full flex-grow">
        <Sidebar />
        <div className="flex-grow">
          {/* Cards Section */}
          <div className="flex-grow w-full mt-3 flex gap-5 overflow-x-auto p-4 scrollbar-hide">
            {/* Render existing cards */}
            {lists.length > 0 ? (
              lists.map((list) => (
                <ListCard
                  key={list.id}
                  list={list}
                  listRef={(el) => (listRefs.current[list.id] = el)}
                  taskRefs={Object.fromEntries(
                    list.tasks.map((task) => [
                      task.id,
                      (el) => (taskRefs.current[task.id] = el),
                    ])
                  )}
                  onAddTask={(taskName) =>
                    addNewTask(setLists, list.id, taskName)
                  }
                />
              ))
            ) : (
              <div>No lists</div>
            )}

            {/* Add New List Button */}
            <AddItemButton
              buttonText="Create List"
              placeholder="Enter list title"
              confirmButtonText="Create"
              onConfirm={(boardTitle) => {
                // Call handleCreateBoard with the input title
                console.log(
                  "Board Title passed to handleCreateBoard:",
                  boardTitle
                );
                handleCreateBoard(boardTitle);
              }}
              
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
