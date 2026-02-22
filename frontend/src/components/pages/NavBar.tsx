import { useEffect, useState } from "react";
import { getUserInfos } from "../../queries";
import Button from "../Button";

export function NavBar({
  isScreenLarge,
  onMenuButtonClick,
}: {
  isScreenLarge: boolean | null;
  onMenuButtonClick: () => void;
}) {
  interface User {
    id: number;
    username: string;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getUserInfos();
      setUser(user);
    })();
  }, []);
  return (
    <nav className="h-16 w-full flex items-center pl-5 shadow-md bg-white ">
      {!isScreenLarge && (
        <Button className="bg-none" onClick={onMenuButtonClick}>
          <img className="w-8" src="../../icons/menu.png" alt="" />
        </Button>
      )}
      <h2 className="absolute text-xl right-5  font-medium text-blue-950">
        {user?.username}
      </h2>
    </nav>
  );
}
