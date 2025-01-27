import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import { RootState } from '../../store';
import { createTask, fetchTasks, updateTask } from '../../store/slices/taskSlice';
import { X, Plus } from 'lucide-react';
import { Task } from '../../services/taskService';
import userService, { User } from '@/services/userService';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTask = useSelector((state: RootState) => state.tasks.currentTask);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await userService.getUsers();
      setUsers(data);
      console.log("users", data);
    };
    loadUsers();
  }, []);

  const [formData, setFormData] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'Todo' as Task['status'],
    priority: 'Medium' as Task['priority'],
    dueDate: undefined,
    assigneeId: '',
    labels: []
  });

  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    if (currentTask) {
      setFormData({
        title: currentTask.title || '',
        description: currentTask.description || '',
        status: currentTask.status || 'Todo',
        priority: currentTask.priority || 'Medium',
        dueDate: currentTask.dueDate || undefined,
        assigneeId: currentTask.assigneeId || '',
        labels: currentTask.labels || []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Todo' as Task['status'],
        priority: 'Medium' as Task['priority'],
        dueDate: undefined,
        assigneeId: '',
        labels: []
      });
    }
  }, [currentTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'dueDate') {
      setFormData(prev => ({ ...prev, [name]: value ? new Date(value) : undefined }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddLabel = () => {
    if (newLabel.trim() && !formData.labels.includes(newLabel.trim())) {
      setFormData(prev => ({
        ...prev,
        labels: [...prev.labels, newLabel.trim()]
      }));
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (label: string) => {
    setFormData(prev => ({
      ...prev,
      labels: prev.labels.filter(l => l !== label)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined
    };

    if (currentTask && currentTask._id) {
      // Update existing task
      dispatch(updateTask({ 
        id: currentTask._id, 
        taskData 
      }));
    } else {
      // Create new task
      dispatch(createTask(taskData));
    }

    onClose();
    dispatch(fetchTasks());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {currentTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 pl-2">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="
                mt-1 h-7 block w-full rounded-md border-gray-300 
                shadow-sm focus:border-indigo-500 focus:ring-indigo-500
                sm:text-sm pl-2
              "
              placeholder="Enter task title"
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 pl-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="
                mt-1 block w-full rounded-md border-gray-300 
                shadow-sm focus:border-indigo-500 focus:ring-indigo-500
                sm:text-sm pl-2 pt-1
              "
              placeholder="Enter task description"
            />
          </div>

          {/* Assignee */}
          <div>
            <label htmlFor="assigneeId" className="block text-sm font-medium text-gray-700 pl-2">
              Assignee
            </label>
            <select
              id="assigneeId"
              name="assigneeId"
              value={formData.assigneeId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-2 h-7"
            >
              <option value="">Select an assignee</option>
              {users.map((user: User) => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 pl-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
                  mt-1 block w-full rounded-md border-gray-300 
                  shadow-sm focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm pl-2 h-7
                "
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 pl-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="
                  mt-1 block w-full rounded-md border-gray-300 
                  shadow-sm focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm pl-2 h-7
                "
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 pl-2">
              Due Date
            </label>
            <div className="relative">
            {/* <Calendar className="absolute left-3 top-3 text-gray-400" /> */}
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                className="
                  mt-1 block w-full rounded-md border-gray-300 
                  shadow-sm focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm pl-10 pl-2 h-7
                "
              />
              
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-medium text-gray-700 pl-2">
              Labels
            </label>
            <div className="flex items-center mt-1">
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="
                  block w-full rounded-md border-gray-300 
                  shadow-sm focus:border-indigo-500 focus:ring-indigo-500
                  sm:text-sm mr-2 pl-2 h-7
                "
                placeholder="Add a label"
              />
              <button
                type="button"
                onClick={handleAddLabel}
                className="
                  bg-indigo-600 text-white rounded-md 
                  px-3 py-2 hover:bg-indigo-700
                "
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Existing Labels */}
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.labels.map((label) => (
                <span 
                  key={label} 
                  className="
                    inline-flex items-center 
                    bg-indigo-100 text-indigo-800 
                    rounded-full px-3 py-1 text-sm
                    space-x-2
                  "
                >
                  {label}
                  <button 
                    type="button"
                    onClick={() => handleRemoveLabel(label)}
                    className="ml-2 text-indigo-500 hover:text-indigo-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4 py-2 border border-gray-300 
                rounded-md text-sm font-medium 
                text-gray-700 hover:bg-gray-50
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                px-4 py-2 border border-transparent 
                rounded-md text-sm font-medium 
                text-white bg-indigo-600 hover:bg-indigo-700
              "
            >
              {currentTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;