import React from "react";
import AddItemButton from "./addButton";
import { IListCard } from "../config/interfaces";
import Modal from "./modal";

interface ListCardProps {
  list: IListCard;
  listRef: (el: HTMLDivElement | null) => void;
  taskRefs: { [key: number]: (el: HTMLDivElement | null) => void };
  onAddTask: (taskName: string) => void;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // parentRef?: React.RefObject<HTMLElement>;
}

const ListCard: React.FC<ListCardProps> = ({
  list,
  listRef,
  taskRefs,
  onAddTask,
  isModalVisible,
  setIsModalVisible,
  // parentRef,
}) => {
  return (
    <div
      ref={listRef}
      className="w-[250px] bg-gray-800 rounded-lg shadow-md p-4 flex flex-col space-y-3 flex-shrink-0"
    >
      {/* Card Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{list.title.toUpperCase()}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
          onClick={() => setIsModalVisible(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <Modal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          height="200px"
          width="300px"
          // parentRef={parentRef} // Pass the ref of the parent container
          className="bg-white shadow-lg rounded-md"
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold">Hello, Modal!</h2>
            <p>Content goes here...</p>
          </div>
        </Modal>
      </div>

      {/* Tasks */}
      <div className="flex flex-col space-y-2">
        {list.tasks.map((task) => (
          <div
            key={task.id}
            ref={taskRefs[task.id]}
            className="px-3 py-2 bg-gray-700 rounded text-sm"
          >
            {task.name}
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <AddItemButton
        buttonText="Add a card"
        placeholder="Enter task name"
        confirmButtonText="Add Task"
        onConfirm={onAddTask}
        customInputContainerClass="flex flex-col gap-2 w-full"
      />
    </div>
  );
};

export default ListCard;
