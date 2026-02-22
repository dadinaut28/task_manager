const api_url = import.meta.env.VITE_API_URL;

export async function connect(email: string, password: string) {
  try {
    const response = await fetch(`${api_url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    const token = data.token;

    localStorage.setItem("task_manager_jwt_token", token);

    return response.status;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchTasks() {
  const response = await fetch(`${api_url}/tasks/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("task_manager_jwt_token")}`,
    },
  });
  const data = await response.json();

  return data.tasks;
}

export async function updateTask(
  taskId: number,
  newDescription: string,
  newStatus: boolean,
) {
  try {
    const response = await fetch(`${api_url}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("task_manager_jwt_token")}`,
      },
      body: JSON.stringify({ newDescription, newStatus }),
    });

    return response.status;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTask(taskId: number) {
  try {
    const response = await fetch(`${api_url}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("task_manager_jwt_token")}`,
      },
    });

    return response.status;
  } catch (err) {
    console.log(err);
  }
}

export async function createNewTask(description: string) {
  try {
    const response = await fetch(`${api_url}/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("task_manager_jwt_token")}`,
      },
      body: JSON.stringify({
        description,
      }),
    });
    return response.status;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserInfos() {
  try {
    const response = await fetch(`${api_url}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("task_manager_jwt_token")}`,
      },
    });

    const data = await response.json();
    return data.user;
  } catch (err) {
    console.log(err);
  }
}
