import { CheckSquare, Plus, Search, Filter, LogOut, User } from "lucide-react";

const Sidebar = ({
  onAddTask,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  stats,
  currentUser,
  onLogout,
}) => {
  return (
    <div className="bg-gradient-to-b from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl h-full p-6 space-y-6 border-r border-indigo-200 dark:border-gray-700 transition-colors">
    
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckSquare className="text-indigo-600 dark:text-indigo-400 drop-shadow-md" size={36} />
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Manage your tasks efficiently
        </p>
      </div>


      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-md hover:shadow-xl transition">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
            <User className="text-white" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {currentUser?.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {currentUser?.email}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 py-2 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition"
        >
          <LogOut size={14} />
          Log Out
        </button>
      </div>


      <button
        onClick={onAddTask}
        className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-2xl"
      >
        <Plus size={18} />
        Add New Task
      </button>


      <div className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <Search size={16} className="text-indigo-600 dark:text-indigo-400" />
            Search Tasks
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-sm transition bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <Filter size={16} className="text-indigo-600 dark:text-indigo-400" />
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-sm transition bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          >
            <option value="">All Tasks</option>
            <option value="Pending">🟡 Pending</option>
            <option value="In Progress">🔵 In Progress</option>
            <option value="Completed">🟢 Completed</option>
          </select>
        </div>
      </div>


      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 space-y-3 shadow-md hover:shadow-xl transition">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm flex items-center gap-2">
          📊 Task Statistics
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Total:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {stats.total || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-600">Pending:</span>
            <span className="font-semibold text-yellow-600">
              {stats.pending || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-600">In Progress:</span>
            <span className="font-semibold text-blue-600">
              {stats.inProgress || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-600">Completed:</span>
            <span className="font-semibold text-green-600">
              {stats.completed || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
