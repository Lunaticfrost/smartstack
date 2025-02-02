import { Project } from '@/store/slices/projectSlice';
import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const projectService = {
    
  async getProjects() {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data, 'response.data');
    return response.data;
  },
  async createProject(project: Project) {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/projects`, project, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  async updateProject(id: string, project: Project) {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/projects/${id}`, project, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  async deleteProject(id: string) {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  async getProjectTasks(id: string) {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/projects/${id}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};