import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import Button from "./Button";
import Input from "./Input";
import { deleteTask, updateTask } from "../queries";
import type { Task } from "./TaskCompletionCard";

interface TaskRowProps {
  task: Task;
  loadTasks: () => void;
}

export function TaskRow({ task, loadTasks }: TaskRowProps) {
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [showTaskUpdateSuccessMessage, setShowTaskUpdateSuccessMessage] =
    useState(false);
  const [showServerErrorMessage, setShowServerErrorMessage] = useState(false);
  const [showBadInputMessage, setShowBadInputMessage] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(task.completed);
  const [showTaskDeletionConfirmationBox, setShowTaskDeletionConfirmationBox] =
    useState(false);
  const [showTaskDeletionSuccessMessage, setShowTaskDeletionSuccessMessage] =
    useState(false);

  const updateTaskFormRef = useRef<null | HTMLFormElement>(null);

  useEffect(() => {
    const mousedownListener = (e: MouseEvent) => {
      if (showUpdateTaskForm) {
        if (
          updateTaskFormRef.current &&
          e.target instanceof Node &&
          !updateTaskFormRef.current.contains(e.target)
        ) {
          setShowUpdateTaskForm(false);
        }
      }
    };

    document.addEventListener("mousedown", mousedownListener);

    return () => document.removeEventListener("mousedown", mousedownListener);
  }, [showUpdateTaskForm]);

  const handleTaskUpdateFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (newDescription) {
      try {
        const status = await updateTask(
          task.id,
          newDescription,
          task.completed,
        );

        if (status === 200) {
          setShowTaskUpdateSuccessMessage(true);
          setTimeout(() => {
            setShowTaskUpdateSuccessMessage(false);
          }, 1500);
          loadTasks();
        } else {
          setShowServerErrorMessage(true);
          setTimeout(() => {
            setShowServerErrorMessage(false);
          }, 1500);
        }

        setShowUpdateTaskForm(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowBadInputMessage(true);
      setTimeout(() => {
        setShowBadInputMessage(false);
      }, 1500);
    }
  };

  const handleCheckBoxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsTaskCompleted(e.target.checked);
    await updateTask(task.id, task.description, e.target.checked);
  };

  const handleTaskDeletion = async () => {
    try {
      const status = await deleteTask(task.id);
      if (status) {
        setShowTaskDeletionConfirmationBox(false);
        setShowTaskDeletionSuccessMessage(true);

        setTimeout(() => {
          setShowTaskDeletionSuccessMessage(false);
        }, 2000);
        loadTasks();
      } else {
        setShowServerErrorMessage(true);
        setTimeout(() => {
          setShowServerErrorMessage(false);
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white h-14 my-5 px-5 shadow-md">
      {showTaskUpdateSuccessMessage && (
        <div className="fixed top-20 right-7 bg-amber-100 border border-gray-500 py-1.5 px-2">
          <p className="text-blue-950 text-lg font-medium">
            Tache mise à jour avec succès !
          </p>
        </div>
      )}
      {showBadInputMessage && (
        <div className="fixed top-20 right-7 bg-amber-100 border border-gray-500 py-1.5 px-2">
          <p className="text-blue-950 text-lg font-medium">
            Mauvaise entrée Veuillez réessayer!
          </p>
        </div>
      )}
      {showServerErrorMessage && (
        <div className="fixed top-20 right-7 bg-amber-100 border border-gray-500 py-1.5 px-2">
          <p className="text-blue-950 text-lg font-medium">
            Erreur interne ! Veuillez réessayer!
          </p>
        </div>
      )}
      {showTaskDeletionSuccessMessage && (
        <div className="fixed top-20 right-7 bg-amber-100 border border-gray-500 py-1.5 px-2">
          <p className="text-blue-950 text-lg font-medium">
            La tache a bien été supprimée !
          </p>
        </div>
      )}
      {showTaskDeletionConfirmationBox && (
        <div className="fixed w-70 md:w-82 top-20 right-8 px-2 py-2.5 border border-gray-500 bg-amber-50">
          <p className="text-md sm:text-lg text-blue-950 font-bold">
            Voulez vous vraiment supprimer cette tache ?
          </p>
          <div className="flex gap-4 mt-5">
            <Button
              onClick={handleTaskDeletion}
              content="Oui"
              className="bg-blue-600 px-2 text-white cursor-pointer"
            />
            <Button
              onClick={() => setShowTaskDeletionConfirmationBox(false)}
              content="Non"
              className="bg-blue-600 px-2 text-white cursor-pointer"
            />
          </div>
        </div>
      )}
      <div className="flex gap-2 items-center">
        <input
          onChange={handleCheckBoxChange}
          checked={isTaskCompleted}
          type="checkbox"
        />
        <span
          className={`truncate w-40 sm:w-60 md:w-80 lg:w-120 inline-block ${isTaskCompleted && "line-through"}`}
        >
          {task.description}
        </span>
      </div>
      <div className="flex gap-4">
        {!showUpdateTaskForm && (
          <button
            onClick={() => {
              setShowUpdateTaskForm(true);
            }}
          >
            <img
              className="w-6 cursor-pointer"
              src=".././icons/editing.png"
              alt="Icon edit"
            />
          </button>
        )}
        <button onClick={() => setShowTaskDeletionConfirmationBox(true)}>
          <img
            className="w-6 cursor-pointer"
            src=".././icons/bin.png"
            alt="Icon bin"
          />
        </button>
      </div>

      {showUpdateTaskForm && (
        <form
          ref={updateTaskFormRef}
          onSubmit={handleTaskUpdateFormSubmit}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 flex flex-col bg-white rounded-lg h-48 p-5 pt-8 shadow-lg w-72 sm:w-75"
        >
          <Input
            className="border pl-1.5 border-gray-300 h-9"
            value={newDescription}
            onChange={setNewDescription}
          />
          <Button
            content="Terminer"
            className="bg-blue-500 text-white rounded-md py-1 text-sm px-2 mt-6 cursor-pointer"
          />
        </form>
      )}
    </div>
  );
}
