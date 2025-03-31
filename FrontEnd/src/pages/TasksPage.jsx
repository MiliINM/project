// client/src/pages/TasksPage.jsx
import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import { TaskManager } from "../components/TaskManager";


export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskManager>
      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div className="text-center">
            <ImFileEmpty className="text-6xl text-pink-400 m-auto my-2" />
            <h1 className="font-bold text-xl text-white">
              No tasks yet, please add a new task
            </h1>
            <p className="text-gray-400 mt-2">
              Click on "Add Task" to create your first task
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </TaskManager>
  );
}

export default TasksPage;
