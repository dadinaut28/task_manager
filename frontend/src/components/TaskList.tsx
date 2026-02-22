// import type { SetStateAction, Dispatch } from "react";
import { TaskRow } from "./TaskRow";
import type { Task } from "./TaskCompletionCard";
import Input from "./Input";
import Button from "./Button";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { createNewTask } from "../queries";

interface TaskListProps {
  tasks: Task[];
  loadTasks: () => void;
  onSearchOn: (input: string) => void;
  onSearchOff: () => void;
  searchOn: boolean;
}

function TaskList({
  tasks,
  loadTasks,
  onSearchOn,
  onSearchOff,
  searchOn,
}: TaskListProps) {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [showTaskCreationSuccessMessage, setShowTaskCreationSuccessMessage] =
    useState(false);
  const [showServerErrorMessage, setShowServerErrorMessage] = useState(false);
  const [showBadInputMessage, setShowBadInputMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const newTaskFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const mouseDownListener = (e: MouseEvent) => {
      if (showNewTaskForm) {
        if (
          newTaskFormRef.current &&
          e.target instanceof Node &&
          !newTaskFormRef.current.contains(e.target)
        ) {
          setShowNewTaskForm(false);
        }
      }
    };
    document.addEventListener("mousedown", mouseDownListener);

    return () => document.removeEventListener("mousedown", mouseDownListener);
  }, [showNewTaskForm]);

  const handleNewTaskFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (newTaskDescription) {
        setLoading(true);
        const status = await createNewTask(newTaskDescription);
        if (status === 201) {
          setShowTaskCreationSuccessMessage(true);
          setTimeout(() => {
            setShowTaskCreationSuccessMessage(false);
          }, 1500);
          setShowNewTaskForm(false);
          setNewTaskDescription("");
          setLoading(false);
          loadTasks();
        } else {
          setShowServerErrorMessage(true);
          setTimeout(() => {
            setShowServerErrorMessage(false);
          }, 1500);
          setLoading(false);
        }
      } else {
        setShowBadInputMessage(true);
        setTimeout(() => {
          setShowBadInputMessage(false);
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchButtonClick = () => {
    if (searchTerm) {
      onSearchOn(searchTerm);
    }
  };

  return (
    <div className="mt-7 px-4">
      {showNewTaskForm && (
        <form
          ref={newTaskFormRef}
          onSubmit={handleNewTaskFormSubmit}
          className="fixed left-1/2 -translate-1/2 top-1/2  flex flex-col w-72 sm:w-75 bg-white shadow-xl border border-gray-200 p-5 rounded-lg gap-2.5"
        >
          <Input
            className="pl-1.5 border border-gray-400 py-2"
            placeholder="Aller à la salle de sport"
            value={newTaskDescription}
            onChange={setNewTaskDescription}
          />
          <Button
            disabled={loading}
            className="bg-blue-500 text-white rounded-md py-1.5 font-medium"
            content={loading ? "Création..." : "Créer"}
          />
        </form>
      )}
      {showTaskCreationSuccessMessage && (
        <div className="fixed top-20 right-7 bg-amber-100 border border-gray-500 py-1.5 px-2">
          <p className="text-blue-950 text-lg font-medium">
            La tache a été créée avec succès !
          </p>
        </div>
      )}
      {showServerErrorMessage && (
        <div className="fixed top-20 right-7 bg-amber-100 border border-gray-500 py-1.5 px-2">
          <p className="text-blue-950 text-lg font-medium">
            Erreur interne ! Veuillez réessayer plus tard !
          </p>
        </div>
      )}
      {showBadInputMessage && (
        <div className="fixed top-20 right-7 bg-amber-100 border border-gray-500 py-1.5 px-2">
          <p className="text-blue-950 text-lg font-medium">
            Mauvaise entrée ! Veuillez réessayer !
          </p>
        </div>
      )}
      <div className="flex h-15 items-center justify-between px-2 bg-blue-50">
        <h2 className="text-blue-600 font-medium text-sm sm:text-lg">
          Liste de taches
        </h2>
        <div className="flex gap-3 items-center">
          <div className="flex items-center">
            <Input
              value={searchTerm}
              onChange={setSearchTerm}
              className="w-20 sm:w-40 lg:w-56 h-8 border border-gray-200 pl-1.5"
              placeholder="Cherchez une tache..."
            />
            <Button
              className="w-10 pl-2 h-8 bg-blue-700"
              onClick={handleSearchButtonClick}
            >
              <img className="h-6" src=".././icons/search-icon.png" alt="" />
            </Button>
          </div>
          {searchOn && (
            <Button
              className="w-10"
              onClick={() => {
                onSearchOff();
                setSearchTerm("");
              }}
            >
              <img src=".././icons/close-icon.svg" alt="" />
            </Button>
          )}
          <Button className="w-10" onClick={() => setShowNewTaskForm(true)}>
            <span className="flex gap-2">
              <img
                className="w-8"
                src=".././icons/plus.icon.svg"
                alt="Icone plus"
              />
            </span>
          </Button>
        </div>
      </div>
      <div className="px-4">
        {tasks.length > 0 ? (
          tasks.map((task) => {
            return <TaskRow key={task.id} loadTasks={loadTasks} task={task} />;
          })
        ) : (
          <p className="mt-16 text-center text-2xl font-medium text-blue-900">
            Aucune tache pour l'instant
          </p>
        )}
      </div>
    </div>
  );
}

export default TaskList;
