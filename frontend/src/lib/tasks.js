import { getToken } from "./auth";

const API_URL = "https://taskflow-backend-f361.onrender.com";

export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: getToken() },
  });
  return await res.json();
};

export const createTask = async (taskData) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify(taskData),
  });
  return await res.json();
};

export const updateTask = async (taskId, taskData) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify(taskData),
  });
  return await res.json();
};

export const deleteTask = async (taskId) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: { Authorization: getToken() },
  });
  return await res.json();
};
