import { useState } from "react";
import useListDragAndDrop from "../components/custom_hooks/useListDragAndDrop";
import AddItemButton from "../components/addButton";
import { IListCard } from "../config/interfaces";
import ListCard from "../components/ListCard";
import { addNewList, addNewTask } from "../utils/listHandlers";

function Dashboard() {
  const [lists, setLists] = useState<IListCard[]>([
    { id: 1, name: "Todo", tasks: [{ id: 1, name: "Task 1" }] },
    { id: 2, name: "In Progress", tasks: [{ id: 2, name: "Task 2" }] },
  ]);
  const { listRefs, taskRefs } = useListDragAndDrop(lists, setLists);

  return (
    <section className="relative h-screen bg-main_bg text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl top-20 -left-10"></div>
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl bottom-20 right-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col w-full">
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

        {/* Cards Section */}
        <div className="flex-grow w-full mt-3 flex gap-5 overflow-x-auto overflow-y-hidden p-4">
          {/* Render existing cards */}
          {lists.map((list) => (
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
              onAddTask={(taskName) => addNewTask(setLists, list.id, taskName)}
            />
          ))}

          {/* Add New List Button */}
          <AddItemButton
            buttonText="Add list"
            placeholder="Enter list name"
            confirmButtonText="Add List"
            onConfirm={(listName) => {
              addNewList(lists, listName, setLists);
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
