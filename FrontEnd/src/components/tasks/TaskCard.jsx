// client/src/components/tasks/TaskCard.jsx
import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import { FiTrash2, FiEdit } from "react-icons/fi";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <Card className="bg-zinc-900 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-pink-500/10">
      <header className="flex justify-between items-start mb-4">
        <h1 className="text-xl font-bold text-white">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button 
            onClick={() => deleteTask(task._id)}
            className="bg-red-500/20 hover:bg-red-500/40 text-red-300 p-2 rounded-full"
          >
            <FiTrash2 />
          </Button>
          <ButtonLink 
            to={`/tasks/${task._id}`}
            className="bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 p-2 rounded-full"
          >
            <FiEdit />
          </ButtonLink>
        </div>
      </header>
      
      <div className="mb-4">
        <p className="text-gray-300">{task.description}</p>
      </div>
      
      {task.date && (
        <div className="bg-zinc-800 px-3 py-1 rounded-md inline-block">
          <p className="text-xs text-pink-300 font-['Share_Tech_Mono']">
            {new Date(task.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </Card>
  );
}





