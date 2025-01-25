import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import { 
  fetchTasks, 
  setCurrentTask, 
  deleteTask, 
  setFilters 
} from '../../store/slices/taskSlice';
import { RootState } from '../../store';
import DashboardLayout from '../dashboardLayout/DashboardLayout';
import { 
  Plus,  
  Search, 
  Edit, 
  Trash2 
} from 'lucide-react';
import TaskModal from './TaskModal';
import { Task } from '../../services/taskService';

const TasksPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, filters } = useSelector((state: RootState) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = () => {
    dispatch(setCurrentTask(null));
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    dispatch(setCurrentTask(task));
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: string | undefined) => {
    if (id && window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filters.status || task.status === filters.status) &&
    (!filters.priority || task.priority === filters.priority)
  );

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading tasks...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
              <button 
                onClick={handleCreateTask}
                className="
                  flex items-center 
                  bg-indigo-600 text-white 
                  px-4 py-2 rounded-md 
                  hover:bg-indigo-700 
                  transition duration-300
                "
              >
                <Plus className="mr-2 w-5 h-5" /> Create Task
              </button>
            </div>

            {/* Filters and Search */}
            <div className="flex space-x-4 mb-6">
              <div className="relative flex-grow">
                <input 
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    w-full pl-10 pr-4 py-2 
                    border rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                  "
                />
                <Search className="absolute left-3 top-3 text-gray-400" />
              </div>

              {/* Status Filter */}
              <select 
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="
                  px-4 py-2 
                  border rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              >
                <option value="">All Statuses</option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Done">Done</option>
              </select>

              {/* Priority Filter */}
              <select 
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="
                  px-4 py-2 
                  border rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              >
                <option value="">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Tasks List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Priority</th>
                    <th className="p-3 text-left">Due Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{task.title}</td>
                      <td className="p-3">
                        <span 
                          className={`
                            px-3 py-1 rounded-full text-xs
                            ${task.status === 'Done' ? 'bg-green-100 text-green-800' : 
                              task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                              task.status === 'Review' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'}
                          `}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span 
                          className={`
                            px-3 py-1 rounded-full text-xs
                            ${task.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 
                              task.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                              task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'}
                          `}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-3">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEditTask(task)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Tasks State */}
            {filteredTasks.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No tasks found. Create your first task!
              </div>
            )}
          </>
        )}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </DashboardLayout>
  );
};

export default TasksPage;