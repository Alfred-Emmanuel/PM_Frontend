import { useState, useEffect } from "react";
import AddItemButton from "./addButton";
import { showToastError } from "../utils/toastMessages";
import {
  createKanbanBoard,
  getAllBoards,
  deleteBoard,
} from "../api/boardActions";
import { IBoard, IListCard } from "../config/interfaces";
import { useUserContext } from "../context/UserContext";
import { fetchListsForKanbanBoard } from "../api/boardActions";
import CustomModal from "./customModal";

interface SidebarProps {
  setSelectedBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
  setSelectedLists: React.Dispatch<React.SetStateAction<IListCard[]>>;
  selectedBoard: IBoard | null;
}

function Sidebar({
  setSelectedBoard,
  setSelectedLists,
  selectedBoard,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [visibleModalId, setVisibleModalId] = useState<number | null>(null);

  const { tokens, user } = useUserContext();
  const token = tokens?.access_token;

  const handleSvgClick = (boardId: number) => {
    setVisibleModalId((prevId) => (prevId === boardId ? null : boardId)); // Toggle modal visibility
  };

  const handleDelete = async (boardId: number) => {
    try {
      await deleteBoard(token, boardId);
      console.log(`Board ${boardId} deleted successfully`);

      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId)
      );

      if (selectedBoard?.id === boardId) {
        setSelectedBoard(null);
      }
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  useEffect(() => {
    getAllBoards(token, setBoards);
  }, [token, boards.length]);

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

  const handleBoardClick = async (board: IBoard) => {
    setSelectedBoard(board);
    try {
      const lists = await fetchListsForKanbanBoard(board.id, token);
      if (Array.isArray(lists)) {
        if (lists.length === 0) {
          setSelectedLists([]);
        } else {
          setSelectedLists(lists);
        }
      } else {
        console.error("Expected an array of lists but got:", lists);
        showToastError("Failed to load lists. Please try again.");
      }
    } catch (error: any) {
      if (error.message.includes("404")) {
        // Handle the case where no lists were found (404 is not an actual error in this case)
        console.warn("No lists found for this board.");
        setSelectedLists([]); // Show the empty state to encourage list creation
      } else {
        // Handle all other errors
        console.error("Error fetching lists for board:", error.message);
        showToastError("Failed to load lists. Please try again.");
      }
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50 h-full flex">
      {/* Sidebar */}
      <section
        className={`h-full bg-teal-400/5 backdrop-blur-lg text-white transition-all duration-300 ${
          isOpen ? "w-72" : "w-0"
        } overflow-hidden`}
      >
        {isOpen && (
          <div className="h-full flex flex-col justify-between">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-3">
                {user?.firstName} {user?.lastName}
              </h2>
              <ul className="flex flex-col gap-2">
                {boards.map((board) => (
                  <div
                    key={board.id}
                    className={`relative flex items-center justify-between py-2 px-2 cursor-pointer rounded-sm  ${
                      board.title == selectedBoard?.title
                        ? "bg-teal-400 text-black hover:bg-teal-500"
                        : "bg-primary/40 hover:bg-primary/70"
                    }`}
                    onClick={() => handleBoardClick(board)}
                  >
                    <ul>{board.title}</ul>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent div's onClick
                        handleSvgClick(board.id);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    {visibleModalId === board.id && (
                      <CustomModal
                        // isVisible={selectedBoard === board.id}
                        onClose={() => setSelectedBoard(null)}
                        className="absolute bg-primary text-white -right-0 z-50 top-7 rounded-md py-3 px-2 w-[70%]"
                      >
                        <p className=" text-balance mb-2">
                          Are you sure you want to delete this board?
                        </p>
                        <button
                          className=" bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          onClick={() => {
                            handleDelete(board.id);
                            setSelectedBoard(null);
                          }}
                        >
                          Delete
                        </button>
                      </CustomModal>
                    )}
                  </div>
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
