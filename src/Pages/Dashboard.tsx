import { useState, useRef } from "react";
import useListDragAndDrop from "../components/custom_hooks/useListDragAndDrop";
import { useUserContext } from "../context/UserContext";
import AddItemButton from "../components/addButton";
import { IListCard, ICreateBoardData, IBoard } from "../config/interfaces";
import ListCard from "../components/ListCard";
import { addNewTask } from "../utils/listHandlers";
import { showToastError } from "../utils/toastMessages";
// import { createKanbanBoard, getAllBoards } from "../api/boardActions";
import { createLists } from "../api/listsActions";
import Sidebar from "../components/sidebar";

function Dashboard() {
  const { tokens } = useUserContext();

  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);
  const [lists, setLists] = useState<IListCard[]>([]);
  const [listTitle, setListTitle] = useState<ICreateBoardData>({
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const { listRefs, taskRefs } = useListDragAndDrop(lists, setLists);
  const token = tokens?.access_token;

  const handleCreateList = async (title: string) => {
    // const kanbanBoardId = 0;
    if (!selectedBoard) {
      showToastError("Please select a board first,");
      return;
    }

    if (!title.trim()) {
      showToastError("Title is required!");
      return;
    }

    const payload = {
      title,
      kanbanBoardId: selectedBoard.id,
    };

    setLoading(true);
    try {
      const newBoard = await createLists(payload, token);
      // Update the lists state with the new kanban board
      setLists((prevLists) => [
        ...prevLists,
        { id: newBoard.id, title: newBoard.title, tasks: [] },
      ]);
      setListTitle({ title: "" });
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
      <div className="w-full h-16 flex items-center justify-between px-16 bg-teal-400/5 backdrop-blur-lg">
        <div className="flex items-center">
          <h1 className="font-bold text-xl">{selectedBoard?.title}</h1>
        </div>
        <div className="flex items-center">
          <h1>People</h1>
          <button>Share</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex w-full flex-grow">
        <Sidebar
          setSelectedBoard={setSelectedBoard}
          setSelectedLists={setLists}
          selectedBoard={selectedBoard}
        />
        <div className="flex-grow">
          {/* Cards Section */}
          <div className="flex-grow w-full h-full flex gap-5 overflow-x-auto p-4 scrollbar-hide">
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
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  // parentRef={parentRef}
                />
              ))
            ) : (
              <div className="-z-10 flex flex-col items-center justify-center  w-full h-full">
                <h1 className="font-semibold text-xl mb-3">
                  You have no Lists yet, create some to view them{" "}
                </h1>
                <AddItemButton
                  buttonText="Create List"
                  placeholder="Enter list title"
                  confirmButtonText="Create"
                  onConfirm={(listTitle) => {
                    // Call handleCreateList with the input title
                    console.log(
                      "Board Title passed to handleCreateList:",
                      listTitle
                    );
                    handleCreateList(listTitle);
                  }}
                />
              </div>
            )}
            {lists.length > 0 ? (
              <AddItemButton
                buttonText="Create List"
                placeholder="Enter list title"
                confirmButtonText="Create"
                onConfirm={(listTitle) => {
                  // Call handleCreateList with the input title
                  console.log(
                    "Board Title passed to handleCreateList:",
                    listTitle
                  );
                  handleCreateList(listTitle);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
