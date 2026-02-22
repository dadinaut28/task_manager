export interface Task {
  id: number;
  description: string;
  user_id: number;
  completed: boolean;
  created_at: Date;
}

export function TaskCompletionCard({ tasks }: { tasks: Task[] }) {
  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <div className="task-completion-card w-75 sm:w-80 h-36 pt-3 px-3 bg-white rounded-lg shadow-md">
      <p className="text-violet-700 font-medium">TACHES ACCOMPLIES</p>
      <div className="flex justify-between mt-2">
        <span className="text-gray-700 font-bold">
          {" "}
          {completedTasks.length}/{tasks.length}
        </span>
        <span></span>
        <img src=".././images/tasks_icon.svg" alt="Icone taches" />
      </div>
    </div>
  );
}
