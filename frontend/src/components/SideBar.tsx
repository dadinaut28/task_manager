import { Link, useNavigate } from "react-router";
import Button from "./Button";
import { useState } from "react";

export function SideBar({
  isScreenLarge,
  isSideBarOpened,
  onSideBarClose,
}: {
  isScreenLarge: boolean | null;
  isSideBarOpened: boolean | null;
  onSideBarClose: () => void;
}) {
  const navigate = useNavigate();
  const [showDeconnectionConfirmationBox, setShowDeconnectionConfirmationBox] =
    useState(false);
  let sideBarClass = "";
  if (!isScreenLarge && isSideBarOpened) {
    sideBarClass =
      "fixed h-screen shadow-xl border border-gray-600 top-0 bottom-0 left-0 bg-blue-500 w-2/6 h-screen pl-3 pt-8 text-white text-md";
  } else if (!isScreenLarge && !isSideBarOpened) {
    sideBarClass = "hidden";
  } else if (isScreenLarge && isSideBarOpened) {
    sideBarClass =
      "sticky top-0 bottom-0 left-0 bg-blue-500 w-1/6 h-screen pl-3 pt-8 text-white text-md";
  }

  const deconnect = () => {
    localStorage.removeItem("task_manager_jwt_token");
    navigate("/login");
  };

  return (
    <aside className={sideBarClass}>
      {!isScreenLarge && (
        <Button onClick={onSideBarClose} className=" absolute top-3 right-5">
          <img className="w-8" src=".././icons/x.png" alt="Close icon" />
          {/* <p>Fermer</p> */}
        </Button>
      )}
      {showDeconnectionConfirmationBox && (
        <div className="w-68 sm:w-75 lg:w-90 fixed right-4 top-20 bg-amber-50 p-2 border border-gray-400">
          <p className="text-blue-950 font-medium text-lg">
            Etes-vous sur de vouloir vous déconnecter ?
            <div className="mt-3 flex gap-3">
              <Button
                onClick={deconnect}
                className="bg-blue-600 px-2.5 rounded-sm text-white"
                content="Oui"
              />
              <Button
                onClick={() => setShowDeconnectionConfirmationBox(false)}
                className="bg-blue-600 px-2.5 rounded-sm text-white"
                content="Non"
              />
            </div>
          </p>
        </div>
      )}
      <h2 className="text-lg font-bold text-white">ToDoList</h2>
      <ul className="mt-8 flex flex-col gap-6">
        <li className="">
          <Link to="/">Tableau de bord</Link>
        </li>
        <li>
          <Button
            onClick={() => setShowDeconnectionConfirmationBox(true)}
            className="sx"
            content="Déconnexion"
          />
        </li>
      </ul>
    </aside>
  );
}
