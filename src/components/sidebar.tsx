import { useState, useEffect } from "react";
import AddItemButton from "./addButton";
import { showToastError } from "../utils/toastMessages";
import { createKanbanBoard, getAllBoards } from "../api/boardActions";
import { IBoard } from "../config/interfaces";
import { useUserContext } from "../context/UserContext";

interface SidebarProps {
  setSelectedBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
}

function Sidebar({ setSelectedBoard }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [boards, setBoards] = useState<IBoard[]>([]);

  const { tokens } = useUserContext();
  const token = tokens?.access_token;

  console.log(loading);
  console.log(boardTitle);

  useEffect(() => {
    getAllBoards(token, setBoards);
  }, [token]);

  const handleCreateBoard = async (title: string) => {
    // const kanbanBoardId = 0;

    if (!title.trim()) {
      showToastError("Title is required!");
      return;
    }
    console.log("Board Title inside handleCreateBoard:", title);
    setLoading(true);
    try {
      const newBoard = await createKanbanBoard({ title }, token);
      // Update the lists state with the new kanban board
      setBoards((prevBoard) => [
        ...prevBoard,
        { id: newBoard.id, title: newBoard.title, lists: [] },
      ]);
      setBoardTitle("");
    } catch (error: any) {
      console.error("Error creating kanban board:", error);
      showToastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-full flex">
      {/* Sidebar */}
      <section
        className={`h-full bg-teal-400/5 backdrop-blur-lg text-white transition-all duration-300 ${
          isOpen ? "w-56" : "w-0"
        } overflow-hidden`}
      >
        {isOpen && (
          <div className="h-full flex flex-col justify-between">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-3">Alfred</h2>
              <ul className="flex flex-col gap-2">
                {boards.map((board) => (
                  <ul
                    key={board.id}
                    className="bg-primary/40 py-2 pl-2 cursor-pointer rounded-sm hover:bg-primary/70"
                    onClick={() => {
                      setSelectedBoard(board);
                    }}
                  >
                    {board.title}
                  </ul>
                ))}
              </ul>
            </div>
            <div className="h-28 flex items-center justify-center">
              <AddItemButton
                buttonText="Create Board"
                placeholder="Enter board name"
                confirmButtonText="Create"
                onConfirm={(boardTitle) => {
                  // Call handleCreateBoard with the input title
                  console.log(
                    "Board Title passed to handleCreateBoard:",
                    boardTitle
                  );
                  handleCreateBoard(boardTitle);
                }}
                customInputContainerClass="flex flex-col gap-2"
                customButtonClass="w-[50%] px-4 py-2 bg-teal-400 text-black rounded-lg hover:bg-teal-500"
              />
            </div>
          </div>
        )}
      </section>

      {/* Toggle Button */}
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 absolute -top-10 left-2 cursor-pointer z-20"
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
          className="size-6 absolute -top-10 left-2 cursor-pointer z-20"
          onClick={toggleSidebar}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      )}
    </div>
  );
}

export default Sidebar;
