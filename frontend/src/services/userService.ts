import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface User {
  _id: string;
  name: string;
  email: string;
}

const userService = {
  async getUsers(): Promise<User[]> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
};

export default userService;