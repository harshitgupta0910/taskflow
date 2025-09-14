import { useState, useEffect } from "react";

const TaskForm = ({ isOpen, onClose, onSubmit, task }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Pending",
        due_date: task.due_date ? task.due_date.split("T")[0] : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "Pending",
        due_date: "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };


  // const handleChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-purple-200 dark:border-purple-600 transform transition-all duration-300 scale-100 animate-fadeIn">
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6 text-center">
          {task ? "✏️ Edit Task" : "📝 Add Task"}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
            required
            className="w-full px-4 py-3 border border-purple-200 dark:border-purple-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />


          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
            rows="3"
            className="w-full px-4 py-3 border border-purple-200 dark:border-purple-600 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />


          <div className="flex gap-3">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="Pending">⏳ Pending</option>
              <option value="In Progress">🚀 In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>

            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>


          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
            >
              {task ? "💾 Save Changes" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-medium shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105 transition-transform"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
