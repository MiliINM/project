// client/src/pages/TaskFormPage.jsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { TaskManager } from "../components/TaskManager";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        await updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        await createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <TaskManager>
      <Card className="bg-zinc-900 p-6 border border-pink-500/30">
        <h2 className="text-2xl font-bold text-white mb-4 font-['Orbitron']">
          {params.id ? "Edit Task" : "Create New Task"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="title" className="text-pink-300">Task Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              {...register("title", { required: true })}
              autoFocus
              className="bg-zinc-800 border-pink-500/30 focus:border-pink-500 focus:ring-pink-500"
            />
            {errors.title && (
              <p className="text-pink-500 text-xs italic mt-1">Please enter a title.</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="description" className="text-pink-300">Description</Label>
            <Textarea
              name="description"
              id="description"
              rows="3"
              placeholder="Description"
              {...register("description")}
              className="bg-zinc-800 border-pink-500/30 focus:border-pink-500 focus:ring-pink-500"
            ></Textarea>
          </div>

          <div className="mb-6">
            <Label htmlFor="date" className="text-pink-300">Due Date</Label>
            <Input 
              type="date" 
              name="date" 
              {...register("date")} 
              className="bg-zinc-800 border-pink-500/30 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          
          <Button className="bg-pink-600 hover:bg-pink-700 text-white w-full py-2">
            {params.id ? "Update Task" : "Create Task"}
          </Button>
        </form>
      </Card>
    </TaskManager>
  );
}

export default TaskFormPage;
