import React from "react";
import AddItemButton from "./addButton";
import { IListCard } from "../config/interfaces";

interface ListCardProps {
  list: IListCard;
  listRef: (el: HTMLDivElement | null) => void;
  taskRefs: { [key: number]: (el: HTMLDivElement | null) => void };
  onAddTask: (taskName: string) => void;
}

const ListCard: React.FC<ListCardProps> = ({
  list,
  listRef,
  taskRefs,
  onAddTask,
}) => {
  return (
    <div
      ref={listRef}
      className="w-[250px] bg-gray-800 rounded-lg shadow-md p-4 flex flex-col space-y-3"
    >
      {/* Card Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{list.name.toUpperCase()}</h2>
        <button className="text-gray-400 hover:text-white">
          <i className="fas fa-ellipsis-h"></i>
        </button>
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
      />
    </div>
  );
};

export default ListCard;

// import React from "react";
// import { IListCard } from "../types/listCard.interface";
// import { ITask } from "../types/tasks.types";

// interface ListCardProps {
//   list: IListCard;
//   listRef: (el: HTMLDivElement | null) => void;
//   taskRefs: { [key: number]: (el: HTMLDivElement | null) => void };
//   onAddTask: (taskName: string) => void;
// }

// const ListCard: React.FC<ListCardProps> = ({
//   list,
//   listRef,
//   taskRefs,
//   onAddTask,
// }) => {
//   return (
//     <div ref={listRef} className="list-card">
//       <div className="list-header">
//         <h3>{list.name}</h3>
//       </div>
//       <div className="list-tasks">
//         {list.tasks.map((task) => (
//           <div key={task.id} ref={taskRefs[task.id]} className="task-card">
//             {task.name}
//           </div>
//         ))}
//       </div>
//       <button onClick={() => onAddTask("New Task")}>Add Task</button>
//     </div>
//   );
// };

// export default ListCard;
