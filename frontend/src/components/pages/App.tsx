import { useEffect, useRef, useState } from "react";
import "./App.css";
const apiUrl = import.meta.env.VITE_API_URL;

import TaskList from "../TaskList.tsx";
import { fetchTasks } from "../../queries.ts";
import { useNavigate } from "react-router";
import { SideBar } from "../SideBar.tsx";
import { NavBar } from "./NavBar.tsx";
import { InfosCardContainer } from "../InfosCardContainer.tsx";
import type { Task } from "../TaskCompletionCard.tsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  // When research is active
  const [searchOn, setSearchOn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // When screen size is bigger than 855px
  const [isScreenLarge, setIsScreenLarge] = useState(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);

  const onMenuButtonClick = () => {
    setIsSideBarOpened(true);
  };

  const onSideBarClose = () => {
    setIsSideBarOpened(false);
    console.log("Screen inside close click: " + isScreenLarge);
  };

  const appRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const isLarge = entry.contentRect.width > 885;
      setIsScreenLarge(isLarge);
    });

    if (appRef.current) observer.observe(appRef.current);
  }, []);

  useEffect(() => {
    if (isScreenLarge) {
      setIsSideBarOpened(true);
    } else {
      setIsSideBarOpened(false);
    }
  }, [isScreenLarge]);

  const loadTasks = async () => {
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  const onSearchOn = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchOn(true);
  };

  const onSearchOff = () => {
    setSearchOn(false);
  };

  const finalTasks = searchOn
    ? tasks.filter((task: Task) => {
        return task.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : tasks;

  const checkToken = async () => {
    const token = localStorage.getItem("task_manager_jwt_token");
    if (!token) {
      return navigate("/login");
    }

    const response = await fetch(`${apiUrl}/verify`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });

    if (response.status !== 200) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
    loadTasks();
  }, []);

  return (
    <div ref={appRef} className="flex w-full bg-gray-100">
      <SideBar
        isScreenLarge={isScreenLarge}
        isSideBarOpened={isSideBarOpened}
        onSideBarClose={onSideBarClose}
      />
      <div className={isScreenLarge ? "w-5/6" : "w-full"}>
        <NavBar
          isScreenLarge={isScreenLarge}
          onMenuButtonClick={onMenuButtonClick}
        />
        <div className="pt-4 px-4">
          <h2 className="text-3xl text-gray-600 my-3">Tableau de bord</h2>
          <InfosCardContainer tasks={tasks} loadTasks={loadTasks} />
        </div>

        <TaskList
          tasks={finalTasks}
          loadTasks={loadTasks}
          onSearchOn={onSearchOn}
          onSearchOff={onSearchOff}
          searchOn={searchOn}
        />
      </div>
    </div>
  );
}

export default App;
