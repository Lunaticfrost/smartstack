import axios from 'axios';
import { Team } from '@/store/slices/teamSlice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const teamService = {
  async getTeams() {
    const token = localStorage.getItem('token');
    const response = await axios.get<Team[]>(`${API_URL}/teams`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async createTeam(teamData: Partial<Team>) {
    const token = localStorage.getItem('token');
    const response = await axios.post<Team>(`${API_URL}/teams`, teamData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async updateTeam(id: string, teamData: Partial<Team>) {
    const token = localStorage.getItem('token');
    const response = await axios.put<Team>(`${API_URL}/teams/${id}`, teamData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async deleteTeam(id: string) {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/teams/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}; 