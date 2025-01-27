import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate?: Date;
  assigneeId: string;
  labels: string[];
}

const taskService = {
  async getTasks() {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
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
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async deleteTask(id: string) {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

export default taskService; 