import { LatestTaskCard } from "./LatestTaskCard";
import { TaskCompletionCard, type Task } from "./TaskCompletionCard";

export function InfosCardContainer({
  tasks,
  loadTasks,
}: {
  tasks: Task[];
  loadTasks: () => void;
}) {
  return (
    <div className="flex lg:justify-center">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 py-3.5">
        <TaskCompletionCard tasks={tasks} />
        <LatestTaskCard tasks={tasks} loadTasks={loadTasks} />
      </div>
    </div>
  );
}
