import { useState } from "react";
import useListDragAndDrop from "./components/custom_hooks/useListDragAndDrop";
import { useUserContext } from "./context/UserContext";
import AddItemButton from "./components/addButton";
import {
  IListCard,
  ICreateBoardData,
  IBoard,
  TaskData,
} from "./config/interfaces";
import ListCard from "./components/ListCard";
import { addNewTask } from "./utils/listHandlers";
import { showToastError } from "./utils/toastMessages";
import { createLists } from "./api/listsActions";
import Sidebar from "./components/sidebar";
// import { fetchTasks } from "./api/taskActions";

function Dashboard() {
  const { tokens } = useUserContext();

  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);
  const [lists, setLists] = useState<IListCard[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [listTitle, setListTitle] = useState<ICreateBoardData>({
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { listRefs, taskRefs } = useListDragAndDrop(lists, setLists);
  const token = tokens?.access_token;

  console.log(listTitle, loading);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateList = async (title: string) => {
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
    <section className="relative h-screen  min-w-full bg-main_bg text-white flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl top-20 -left-10"></div>
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl bottom-20 right-20"></div>
      </div>
      {/* Header */}
      <div className="relative min-w-full h-16 flex items-center justify-between px-16 bg-teal-400/5 backdrop-blur-lg">
        <div className="flex items-center">
          {/* Toggle Button */}
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 absolute left-3 cursor-pointer z-20"
              onClick={toggleSidebar}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 absolute left-3 cursor-pointer z-20"
              onClick={toggleSidebar}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          )}
          <h1 className="font-bold text-xl">{selectedBoard?.title}</h1>
        </div>
        <div className="flex items-center">
          <h1>People</h1>
          <button>Share</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex min-w-full overflow-x-auto flex-grow">
        <Sidebar
          setSelectedBoard={setSelectedBoard}
          setSelectedLists={setLists}
          selectedBoard={selectedBoard}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        {selectedBoard ? (
          <div className="flex-grow">
            {/* Cards Section */}
            <div className="flex-grow w-full h-full flex gap-5 overflow-x-auto p-4 scrollbar-hide">
              {/* Render existing cards */}
              {lists.length > 0 ? (
                lists.map((list) => {
                  // Define listTasks outside of JSX
                  const listTasks = tasks.filter(
                    (task) => task.listId === list.id
                  );

                  return (
                    <ListCard
                      key={list.id}
                      list={list}
                      listRef={(el) => (listRefs.current[list.id] = el)}
                      taskRefs={Object.fromEntries(
                        listTasks.map((task) => [
                          task.id,
                          (el) => (taskRefs.current[task.id] = el),
                        ])
                      )}
                      onAddTask={(taskName) =>
                        addNewTask(setLists, list.id, taskName, String(token))
                      }
                      token={String(token)}
                      setTasks={setTasks}
                      tasks={listTasks} // Pass only the tasks for the current list
                    />
                  );
                })
              ) : (
                <div className="z-10 flex flex-col items-center justify-center w-full h-full">
                  <h1 className="font-semibold text-xl mb-3">
                    You have no Lists yet, create some to view them
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
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xl ">
            Select or create a board from the sidebar
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
