import { useState, useEffect } from "react";
import axios from "axios";
import AuthForm from "./components/AuthForm";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import ProgressBar from "./components/ProgressBar";
import DeleteModal from "./components/DeleteModal";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getProfile,
} from "./lib/auth";
import { Sun, Moon } from "lucide-react";

const API_URL = "https://taskflow-backend-f361.onrender.com";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null,
    taskTitle: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });

  
  useEffect(() => {
    const initApp = async () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        await fetchProfile();
        await fetchTasks();
      } else {
        setLoading(false);
      }
    };
    initApp();
  }, []);

  
  const fetchProfile = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (err) {
      console.error("Failed to fetch profile:", err.message);
      logoutUser();
      setUser(null);
    }
  };

  
  const handleLogin = async (credentials) => {
    setAuthLoading(true);
    try {
      const result = await loginUser(credentials);
      setUser(result.user);
      await fetchProfile();
      await fetchTasks();
    } catch (err) {
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setAuthLoading(true);
    try {
      const result = await registerUser(userData);
      setUser(result.user);
      await fetchProfile();
      await fetchTasks();
    } catch (err) {
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setTasks([]);
  };

  
  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get(`${API_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(
        "Failed to fetch tasks:",
        err.response?.data?.error || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const res = await axiosInstance.post(`${API_URL}/tasks`, taskData);
      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(
        "Failed to create task:",
        err.response?.data?.error || err.message
      );
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const res = await axiosInstance.put(`${API_URL}/tasks/${id}`, updatedData);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(
        "Failed to update task:",
        err.response?.data?.error || err.message
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`${API_URL}/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" });
    } catch (err) {
      console.error(
        "Failed to delete task:",
        err.response?.data?.error || err.message
      );
    }
  };

  
  const handleDeleteClick = (taskId, taskTitle) => {
    setDeleteModal({ isOpen: true, taskId, taskTitle });
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskSubmit = async (taskData) => {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
      setEditingTask(null);
    } else {
      await createTask(taskData);
    }
    setShowTaskForm(false);
  };

  
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "Pending").length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
    completed: tasks.filter((task) => task.status === "Completed").length,
  };

  
  if (!user)
    return (
      <AuthForm
        onLogin={handleLogin}
        onRegister={handleRegister}
        loading={authLoading}
      />
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
     
      <div className="absolute top-6 right-2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full shadow-md bg-white dark:bg-gray-700 hover:scale-105 transition-transform"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
        </button>
      </div>

      <div className="flex">
        
        <div className="w-80 min-h-screen bg-white/50 dark:bg-gray-800/60 backdrop-blur-lg shadow-xl rounded-r-2xl border-r border-purple-200 dark:border-gray-700">
          <Sidebar
            onAddTask={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            currentUser={user}
            onLogout={handleLogout}
            stats={stats}
          />
        </div>


        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <ProgressBar total={stats.total} completed={stats.completed} />

            {filteredTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-lg p-10 max-w-lg mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <span className="text-3xl">📝</span>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-3">
                    {searchTerm || statusFilter ? "No tasks found" : "No tasks yet"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm || statusFilter
                      ? "Try adjusting your search or filter criteria."
                      : "Start your productivity journey by adding your first task!"}
                  </p>
                  {!searchTerm && !statusFilter && (
                    <button
                      onClick={() => {
                        setEditingTask(null);
                        setShowTaskForm(true);
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
                    >
                      Add Your First Task
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={updateTask}
                    onDelete={handleDeleteClick}
                    onEdit={() => handleEditClick(task)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


      <TaskForm
        isOpen={showTaskForm}
        onClose={() => {
          setShowTaskForm(false);
          setEditingTask(null);
        }}
        onSubmit={handleTaskSubmit}
        task={editingTask}
      />


      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" })
        }
        onConfirm={() => deleteTask(deleteModal.taskId)}
        taskTitle={deleteModal.taskTitle}
      />
    </div>
  );
}

export default App;
