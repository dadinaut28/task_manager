import { useState } from "react";
import type { Task } from "./TaskCompletionCard";
import { updateTask } from "../queries";

export function LatestTaskRow({
  task,
  loadTasks,
}: {
  task: Task;
  loadTasks: () => void;
}) {
  const [isTaskCompleted, setIsTaskCompleted] = useState(task.completed);
  const handleCheckBoxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      setIsTaskCompleted(e.target.checked);
      await updateTask(task.id, task.description, e.target.checked);
      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex gap-5 items-center my-2">
      <input
        onChange={handleCheckBoxChange}
        checked={isTaskCompleted}
        type="checkbox"
      />
      <span>{task.description}</span>
    </div>
  );
}
