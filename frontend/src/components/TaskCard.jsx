import { useState } from "react";
import { Trash2, Edit3, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    due_date: task.due_date ? task.due_date.split("T")[0] : "",
  });

  
  const statusColors = {
    Pending:
      "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-400 dark:from-yellow-900 dark:to-yellow-800 dark:border-yellow-600",
    "In Progress":
      "bg-gradient-to-r from-sky-100 to-sky-200 border-sky-400 dark:from-sky-900 dark:to-sky-800 dark:border-sky-600",
    Completed:
      "bg-gradient-to-r from-green-100 to-green-200 border-green-400 dark:from-green-900 dark:to-green-800 dark:border-green-600",
  };

  
  const statusBadgeColors = {
    Pending: "bg-yellow-500",
    "In Progress": "bg-sky-500",
    Completed: "bg-green-500",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task._id, editForm);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    onUpdate(task._id, { ...task, status: newStatus });
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border p-6 transition hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <textarea
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              value={editForm.status}
              onChange={(e) =>
                setEditForm({ ...editForm, status: e.target.value })
              }
              className="px-2 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <input
              type="date"
              value={editForm.due_date}
              onChange={(e) =>
                setEditForm({ ...editForm, due_date: e.target.value })
              }
              className="px-2 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-sky-400 to-sky-600 text-white py-2 rounded-lg shadow-md hover:scale-105 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl shadow-lg border-2 p-6 transition hover:shadow-2xl ${statusColors[task.status]}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {task.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-block w-3 h-3 rounded-full ${statusBadgeColors[task.status]}`}
            ></span>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-gray-800 dark:text-gray-200 focus:ring-0"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full bg-white/70 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 shadow transition"
          >
            <Edit3 size={16} className="text-gray-700 dark:text-gray-200" />
          </button>
          <button
            onClick={() => onDelete(task._id, task.title)}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {task.description ? (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {task.description}
        </p>
      ) : (
        <p className="text-sm italic text-gray-400 dark:text-gray-500 mb-3">
          No description added.
        </p>
      )}
      {task.due_date && (
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-1">
          <Calendar size={14} /> {format(new Date(task.due_date), "MMM dd, yyyy")}
        </div>
      )}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <Clock size={12} /> Created{" "}
        {format(new Date(task.created_at), "MMM dd, yyyy")}
      </div>
    </div>
  );
};

export default TaskCard;
