import type { Task } from "./TaskCompletionCard";

export function LatestTaskCard({
  tasks,
}: {
  tasks: Task[];
  loadTasks: () => void;
}) {
  const latestTasks = tasks.slice(0, 3);

  return (
    <div className="task-completion-card w-75 sm:w-80 h-36 pt-3 pl-3 bg-white rounded-md shadow-md">
      <p className="text-green-400 font-medium">TACHES RECENTES</p>
      <div className="flex flex-col gap-1.5 mt-1.5">
        {latestTasks.map((task) => {
          return (
            <span className="truncate" key={task.id}>
              {task.description}
            </span>
          );
        })}
      </div>
    </div>
  );
}
