import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate?: Date;
  assigneeId: string;
  labels: string[];
}

const taskService = {
  async getTasks(filters?: Partial<{ status: string; priority: string; search: string }>) {
    const mockTasks: Task[] = [];
    if (filters?.status) {
      // Filter by status
    }
    if (filters?.priority) {
      // Filter by priority
    }
    if (filters?.search) {
      // Filter by search term
    }
    return mockTasks;
  },

  async createTask(taskData: Task) {
    console.log(taskData);
    console.log("API_URL", API_URL);
    //Add the token to the request
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  },

  async updateTask(id: string, taskData: Partial<Task>) {
    return { id, ...taskData } as Task;
  },

  async deleteTask(id: string) {
    return id;
  }
};

export default taskService; 